/**
 * EPUB to Audiobook JSON Converter (JavaScript version with adm-zip)
 * Converts an EPUB file to a structured JSON format suitable for audiobook applications
 * using Google's Gemini AI API for content processing.
 */

import fs from 'fs';
import path from 'path';
import { GoogleGenerativeAI } from '@google/generative-ai';
import AdmZip from 'adm-zip';
import { DOMParser } from 'xmldom';
import xpath from 'xpath';

/**
 * Converts an EPUB file to a structured audiobook JSON format
 * using Google's Gemini AI API for content processing.
 * 
 * @param {Object} options - Configuration options for the conversion
 * @param {string|Buffer} options.epub - Path to the EPUB file or file buffer
 * @param {string} options.geminiApiKey - Google Gemini API key
 * @param {string} [options.modelName] - Gemini model to use
 * @param {Function} [options.onProgress] - Callback function for progress updates
 * @returns {Promise<Object>} Promise resolving to the audiobook JSON object
 */
export async function convertEpubToAudiobookJSON(options) {
  // Validate required options
  if (!options.epub) throw new Error('EPUB file or buffer is required');
  if (!options.geminiApiKey) throw new Error('Gemini API key is required');
  
  // Set default options
  const config = {
    modelName: options.modelName || "gemini-1.5-pro",
    onProgress: options.onProgress || ((status) => console.log(status))
  };

  // Initialize the Google Generative AI with the API key
  const genAI = new GoogleGenerativeAI(options.geminiApiKey);
  const model = genAI.getGenerativeModel({ model: config.modelName });
  
  config.onProgress(`Starting EPUB to audiobook JSON conversion`);
  
  try {
    // Extract text from EPUB
    const bookContent = await extractTextFromEpub(options.epub);
    config.onProgress(`Extracted ${bookContent.sections.length} content sections from EPUB`);
    
    // Create metadata object
    const bookMetadata = {
      title: bookContent.title,
      author: bookContent.author,
      language: bookContent.language
    };
    
    // Process each content section individually
    const processedSections = [];
    for (let i = 0; i < bookContent.sections.length; i++) {
      const section = bookContent.sections[i];
      config.onProgress(`Processing section ${i+1}/${bookContent.sections.length}: ${section.sourceHref}`);
      
      // Process section with Gemini
      const processedSection = await processContentWithGemini(section, bookMetadata);
      processedSections.push(processedSection);
    }
    
    // Filter out content that should not be included
    const includedSections = processedSections.filter(
      section => section.include !== false
    );
    
    // Count chapters
    const chapters = includedSections.filter(
      section => section.contentType === "chapter"
    );
    
    // Combine everything into final audiobook JSON
    const audiobookJSON = {
      title: bookContent.title,
      author: bookContent.author,
      language: bookContent.language,
      totalContent: includedSections.length,
      totalChapters: chapters.length,
      processedAt: new Date().toISOString(),
      // Calculate total duration if available
      estimatedTotalDuration: calculateTotalDuration(includedSections),
      chapters: chapters,
      frontMatter: includedSections.filter(s => s.contentType !== "chapter" && s.contentType !== "error"),
      content: processedSections // Include all processed sections for reference
    };
    
    config.onProgress(`Audiobook JSON conversion completed`);
    
    return audiobookJSON;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    config.onProgress(`Error: Failed to process EPUB to audiobook JSON: ${errorMessage}`);
    throw error;
  }
  
  /**
   * Extracts text content from an EPUB file or buffer using adm-zip
   * @param {string|Buffer} epubSource - Path to the EPUB file or file buffer
   * @returns {Promise<Object>} Promise resolving to book content with chapters
   */
  async function extractTextFromEpub(epubSource) {
    try {
      // Initialize zip from file path or buffer
      const zip = new AdmZip(epubSource);
      
      // Extract and parse container.xml to find the OPF file
      const containerXml = zip.getEntry('META-INF/container.xml');
      if (!containerXml) {
        throw new Error('Invalid EPUB: Missing container.xml');
      }
      
      const containerContent = containerXml.getData().toString('utf8');
      const parser = new DOMParser();
      const containerDoc = parser.parseFromString(containerContent, 'application/xml');
      const select = xpath.useNamespaces({
        'ns': 'urn:oasis:names:tc:opendocument:xmlns:container'
      });
      
      const rootfileNode = select('//ns:rootfile', containerDoc);
      if (!rootfileNode || rootfileNode.length === 0) {
        throw new Error('Invalid EPUB: Cannot find rootfile in container.xml');
      }
      
      // Get the OPF file path
      const opfPath = rootfileNode[0].getAttribute('full-path');
      if (!opfPath) {
        throw new Error('Invalid EPUB: Missing OPF path');
      }
      
      // Extract and parse the OPF file
      const opfEntry = zip.getEntry(opfPath);
      if (!opfEntry) {
        throw new Error(`Invalid EPUB: Missing OPF file at ${opfPath}`);
      }
      
      const opfContent = opfEntry.getData().toString('utf8');
      const opfDoc = parser.parseFromString(opfContent, 'application/xml');
      
      // Get book metadata
      const title = getTextFromXpath('//dc:title', opfDoc) || 'Untitled Book';
      const author = getTextFromXpath('//dc:creator', opfDoc) || 'Unknown Author';
      
      // Try to extract language from various possible locations
      let language = getTextFromXpath('//dc:language', opfDoc);
      
      // If not found in standard DC tag, try other common locations
      if (!language) {
        // Check if it's in the package element xml:lang attribute
        const packageElement = opfDoc.getElementsByTagName('package')[0];
        if (packageElement && packageElement.getAttribute('xml:lang')) {
          language = packageElement.getAttribute('xml:lang');
        } else {
          // Check if it's in any metadata element with a 'lang' property
          const metaElements = opfDoc.getElementsByTagName('meta');
          for (let i = 0; i < metaElements.length; i++) {
            const meta = metaElements[i];
            if (meta.getAttribute('name') === 'dc:language' || 
                meta.getAttribute('property') === 'language' ||
                meta.getAttribute('name') === 'language') {
              language = meta.getAttribute('content') || meta.textContent;
              break;
            }
          }
        }
      }
      
      // Default to English if no language is found
      language = language || 'en';
      
      // Get the spine and manifest to determine reading order
      const manifestItems = getManifestItems(opfDoc);
      const spineItemrefs = getSpineItemrefs(opfDoc);
      
      // Get the OPF directory to resolve relative paths
      const opfDir = path.dirname(opfPath);
      
      // Extract content sections based on spine order
      const sections = [];
      let sectionIndex = 0;
      
      for (const itemref of spineItemrefs) {
        const idref = itemref.getAttribute('idref');
        if (!idref) continue;
        
        const manifestItem = manifestItems.find(item => item.id === idref);
        if (!manifestItem) continue;
        
        // Only process HTML/XHTML content
        if (manifestItem.mediaType.includes('html') || manifestItem.mediaType.includes('xhtml')) {
          const contentPath = path.join(opfDir, manifestItem.href);
          const contentEntry = zip.getEntry(contentPath);
          
          if (contentEntry) {
            const rawContent = contentEntry.getData().toString('utf8');
            // Try to extract title from content if possible
            let rawTitle = manifestItem.title || '';
            
            // Clean HTML content
            const cleanText = cleanHtml(rawContent);
            
            sections.push({
              id: sectionIndex++,
              sourceId: idref,
              sourceHref: manifestItem.href,
              title: rawTitle,
              content: cleanText
            });
          }
        }
      }
      
      return {
        title,
        author,
        language,
        sections
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Failed to extract EPUB content: ${errorMessage}`);
    }
  }
  
  /**
   * Helper function to extract text from an XPath query
   */
  function getTextFromXpath(xpathQuery, doc) {
    const select = xpath.useNamespaces({
      'dc': 'http://purl.org/dc/elements/1.1/',
      'opf': 'http://www.idpf.org/2007/opf',
      'xml': 'http://www.w3.org/XML/1998/namespace'
    });
    
    const nodes = select(xpathQuery, doc);
    if (nodes && nodes.length > 0) {
      return nodes[0].textContent;
    }
    return null;
  }
  
  /**
   * Extract manifest items from OPF document
   */
  function getManifestItems(opfDoc) {
    const items = [];
    const manifestNodes = opfDoc.getElementsByTagName('item');
    
    for (let i = 0; i < manifestNodes.length; i++) {
      const item = manifestNodes.item(i);
      if (item) {
        const id = item.getAttribute('id');
        const href = item.getAttribute('href');
        const mediaType = item.getAttribute('media-type');
        
        if (id && href && mediaType) {
          items.push({ id, href, mediaType });
        }
      }
    }
    
    return items;
  }
  
  /**
   * Extract spine itemrefs from OPF document
   */
  function getSpineItemrefs(opfDoc) {
    const itemrefs = [];
    const spineNode = opfDoc.getElementsByTagName('spine').item(0);
    
    if (spineNode) {
      const itemrefNodes = spineNode.getElementsByTagName('itemref');
      for (let i = 0; i < itemrefNodes.length; i++) {
        const itemref = itemrefNodes.item(i);
        if (itemref) {
          itemrefs.push(itemref);
        }
      }
    }
    
    return itemrefs;
  }
  
  /**
   * Clean HTML content by removing tags and normalizing whitespace
   */
  function cleanHtml(html) {
    return html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  /**
   * Identify the content type of a single section with Gemini API
   * @param {Object} section - Content section to analyze
   * @param {Object} bookMetadata - Book metadata including title and author
   * @returns {Promise<Object>} Promise resolving to content type data
   */
  async function processContentWithGemini(section, bookMetadata) {
    try {
      config.onProgress(`Analyzing content from: ${section.sourceHref}`);
      
      // Prepare prompt for Gemini - only asking for content type identification
      const promptText = `
      Analyze this content from an EPUB file and determine what it represents.
      
      Book title: ${bookMetadata.title}
      Author: ${bookMetadata.author}
      Language: ${bookMetadata.language || 'en'}
      Source file: ${section.sourceHref}
      
      Determine what this content represents by analyzing a sample of it:
      - Is it a chapter? If so, identify the chapter number and title
      - Is it front matter (copyright, dedication, preface, etc.)? If so, identify the type
      - Is it a table of contents? If so, mark it as such
      - Is it other content? If so, identify its purpose in the book
      
      Here's a sample of the content to analyze:
      ${section.content.substring(0, 3000)} 
      ${section.content.length > 3000 ? "... [content truncated]" : ""}
      
      Return ONLY a valid JSON object with a structure like this:
      {
        "contentType": "chapter", // or "frontmatter", "toc", "copyright", "dedication", "preface", "appendix", etc.
        "chapterNumber": 1, // if applicable
        "title": "Chapter Title", // or appropriate title based on content
        "include": true // whether this should be included in final audiobook
      }
      
      Return only the JSON. Do not include any explanations.
      `;

      const result = await model.generateContent(promptText);
      const response = result.response;
      const text = response.text();
      
      // Extract JSON from the response
      const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || 
                        text.match(/```\n([\s\S]*?)\n```/) || 
                        text.match(/{[\s\S]*}/);
                        
      const jsonContent = jsonMatch ? jsonMatch[1] || jsonMatch[0] : text;
      
      // Parse and validate the JSON
      try {
        const parsedJSON = JSON.parse(jsonContent.trim());
        const contentInfo = {
          ...parsedJSON,
          sourceId: section.sourceId,
          sourceHref: section.sourceHref
        };
        
        // If this is a chapter, parse the content into sentences
        if (contentInfo.contentType === "chapter" && contentInfo.include !== false) {
          config.onProgress(`Processing chapter: ${contentInfo.title || section.sourceHref}`);
          contentInfo.sentences = parseSentences(section.content, bookMetadata.language);
          
          // Estimate duration based on word count (150 words per minute)
          const wordCount = countWords(section.content, bookMetadata.language);
          const durationMinutes = Math.max(1, Math.round(wordCount / 150));
          contentInfo.estimatedDuration = `${durationMinutes}m 0s`;
          contentInfo.wordCount = wordCount;
          contentInfo.language = bookMetadata.language;
        }
        
        return contentInfo;
      } catch (parseError) {
        config.onProgress(`Error parsing JSON for content "${section.sourceHref}": ${parseError instanceof Error ? parseError.message : 'Unknown error'}`);
        // Attempt to clean and fix common JSON issues
        const cleanedJSON = jsonContent
          .replace(/```json/g, '')
          .replace(/```/g, '')
          .trim();
          
        try {
          const parsed = JSON.parse(cleanedJSON);
          const contentInfo = {
            ...parsed,
            sourceId: section.sourceId,
            sourceHref: section.sourceHref
          };
          
          // If this is a chapter, parse the content into sentences
          if (contentInfo.contentType === "chapter" && contentInfo.include !== false) {
            contentInfo.sentences = parseSentences(section.content, bookMetadata.language);
            
            // Estimate duration based on word count (150 words per minute)
            const wordCount = countWords(section.content, bookMetadata.language);
            const durationMinutes = Math.max(1, Math.round(wordCount / 150));
            contentInfo.estimatedDuration = `${durationMinutes}m 0s`;
            contentInfo.wordCount = wordCount;
            contentInfo.language = bookMetadata.language;
          }
          
          return contentInfo;
        } catch (secondError) {
          config.onProgress("Failed to parse JSON even after cleaning. Returning error object.");
          // Return object with error info instead of throwing
          return {
            contentType: "error",
            sourceId: section.sourceId,
            sourceHref: section.sourceHref,
            include: false,
            error: "JSON parsing failed",
            rawResponse: text.substring(0, 500) + "..." // First 500 chars for debugging
          };
        }
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      config.onProgress(`Error processing content "${section.sourceHref}" with Gemini API: ${errorMessage}`);
      // Return object with error info instead of throwing
      return {
        contentType: "error",
        sourceId: section.sourceId,
        sourceHref: section.sourceHref,
        include: false,
        error: errorMessage,
        processed: false
      };
    }
  }
  
  /**
   * Parse text into sentences, with language-specific handling
   * @param {string} text - The text to parse
   * @param {string} language - The language code (e.g., 'en', 'fr', 'es')
   * @returns {Array<string>} Array of sentences
   */
  function parseSentences(text, language = 'en') {
    // Clean up the text first
    const cleanText = text
      .replace(/\s+/g, ' ')
      .trim();
    
    // Language-specific sentence ending patterns
    // This map contains regex patterns for different languages
    const languagePatterns = {
      // English and most Latin languages
      'en': /([.!?])\s+(?=[A-Z])/g,
      'fr': /([.!?])\s+(?=[A-Z])/g,
      'es': /([.!?])\s+(?=[A-Z¿¡])/g,
      'de': /([.!?])\s+(?=[A-ZÄÖÜß])/g,
      'it': /([.!?])\s+(?=[A-Z])/g,
      
      // For languages that don't use Latin alphabet or have different sentence structures,
      // we'll fall back to more basic patterns
      'ja': /([。！？])/g, // Japanese
      'zh': /([。！？])/g, // Chinese
      'ko': /([.!?。！？])/g // Korean
      
      // Add more languages as needed
    };
    
    // Get the appropriate pattern based on language, or default to English
    // Only use the first 2 characters of language code (e.g., 'en-US' -> 'en')
    const langCode = (language || 'en').substring(0, 2).toLowerCase();
    const sentenceRegex = languagePatterns[langCode] || languagePatterns['en'];
    
    // For languages with special sentence structures (Chinese, Japanese, etc.)
    if (['ja', 'zh', 'ko'].includes(langCode)) {
      // Simply split on sentence ending punctuation
      return cleanText.split(sentenceRegex)
        .map(s => s.trim())
        .filter(s => s.length > 0);
    }
    
    // Standard sentence splitting for Latin-based languages
    const sentences = cleanText.split(sentenceRegex)
      .reduce((result, part, index, array) => {
        // Add the part to the result
        if (index % 2 === 0) {
          // If this is a text part
          if (index < array.length - 1) {
            // If there's a punctuation part after this, combine them
            result.push(part + array[index + 1]);
          } else {
            // Otherwise just add the part
            result.push(part);
          }
        }
        return result;
      }, [])
      .map(s => s.trim())
      .filter(s => s.length > 0);
    
    return sentences;
  }
  
  /**
   * Count words in text with language-aware handling
   * @param {string} text - The text to count words in
   * @param {string} language - The language code (e.g., 'en', 'zh')
   * @returns {number} Number of words
   */
  function countWords(text, language = 'en') {
    // Get the language code (first 2 characters, lowercase)
    const langCode = (language || 'en').substring(0, 2).toLowerCase();
    
    // For East Asian languages that don't use spaces between words
    if (['zh', 'ja', 'ko'].includes(langCode)) {
      // Estimate by characters: rough approximation that 2.5 characters = 1 word
      // This is an estimation method commonly used for word count in these languages
      return Math.ceil(text.replace(/\s+/g, '').length / 2.5);
    }
    
    // For languages using spaces as word separators
    return text.split(/\s+/).filter(w => w.length > 0).length;
  }


  /**
   * Calculates total audiobook duration from all content section durations
   * @param {Array} contentSections - Array of processed content sections
   * @returns {string} Formatted total duration string
   */
  function calculateTotalDuration(contentSections) {
    try {
      // Find sections with estimatedDuration that should be included
      const sectionsWithDuration = contentSections.filter(
        section => section.estimatedDuration && 
        (section.include === undefined || section.include === true)
      );
      
      if (sectionsWithDuration.length === 0) {
        return "Unknown"; // No duration info available
      }
      
      // Convert durations like "5m 30s" to seconds
      const durationRegex = /(\d+)h\s*|(\d+)m\s*|(\d+)s/g;
      let totalSeconds = 0;
      
      sectionsWithDuration.forEach(section => {
        const duration = section.estimatedDuration;
        let seconds = 0;
        let match;
        
        // Reset regex index
        durationRegex.lastIndex = 0;
        
        // Process all matches (hours, minutes, seconds)
        while ((match = durationRegex.exec(duration)) !== null) {
          if (match[1]) { // hours
            seconds += parseInt(match[1], 10) * 3600;
          } else if (match[2]) { // minutes
            seconds += parseInt(match[2], 10) * 60;
          } else if (match[3]) { // seconds
            seconds += parseInt(match[3], 10);
          }
        }
        
        totalSeconds += seconds;
      });
      
      // Format total time as hours, minutes, seconds
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      
      let formattedTime = "";
      if (hours > 0) formattedTime += `${hours}h `;
      if (minutes > 0 || hours > 0) formattedTime += `${minutes}m `;
      formattedTime += `${seconds}s`;
      
      return formattedTime.trim();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      config.onProgress(`Error calculating total duration: ${errorMessage}`);
      return "Calculation Error";
    }
  }
}

export default convertEpubToAudiobookJSON;
