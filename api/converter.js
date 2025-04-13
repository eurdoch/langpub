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
 * @param {number} [options.batchSize] - Number of chapters to process in parallel
 * @param {number} [options.delayMs] - Milliseconds to wait between batches
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
    batchSize: options.batchSize || 3,
    delayMs: options.delayMs || 2000,
    onProgress: options.onProgress || ((status) => console.log(status))
  };

  // Initialize the Google Generative AI with the API key
  const genAI = new GoogleGenerativeAI(options.geminiApiKey);
  const model = genAI.getGenerativeModel({ model: config.modelName });
  
  config.onProgress(`Starting EPUB to audiobook JSON conversion`);
  
  try {
    // Extract text from EPUB
    const bookContent = await extractTextFromEpub(options.epub);
    config.onProgress(`Extracted ${bookContent.chapters.length} chapters from EPUB`);
    
    // Create metadata object
    const bookMetadata = {
      title: bookContent.title,
      author: bookContent.author
    };
    
    // Process all chapters in batches
    const processedChapters = await processBatchesWithDelay(
      bookContent.chapters, 
      bookMetadata,
      config.batchSize,
      config.delayMs
    );
    
    // Combine everything into final audiobook JSON
    const audiobookJSON = {
      title: bookContent.title,
      author: bookContent.author,
      totalChapters: processedChapters.length,
      processedAt: new Date().toISOString(),
      // Calculate total duration if available
      estimatedTotalDuration: calculateTotalDuration(processedChapters),
      chapters: processedChapters
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
      
      // Get the spine and manifest to determine reading order
      const manifestItems = getManifestItems(opfDoc);
      const spineItemrefs = getSpineItemrefs(opfDoc);
      
      // Get the OPF directory to resolve relative paths
      const opfDir = path.dirname(opfPath);
      
      // Extract chapters based on spine order
      const chapters = [];
      let chapterIndex = 0;
      
      for (const itemref of spineItemrefs) {
        const idref = itemref.getAttribute('idref');
        if (!idref) continue;
        
        const manifestItem = manifestItems.find(item => item.id === idref);
        if (!manifestItem) continue;
        
        // Only process HTML/XHTML content
        if (manifestItem.mediaType.includes('html') || manifestItem.mediaType.includes('xhtml')) {
          const chapterPath = path.join(opfDir, manifestItem.href);
          const chapterEntry = zip.getEntry(chapterPath);
          
          if (chapterEntry) {
            const chapterContent = chapterEntry.getData().toString('utf8');
            const chapterTitle = manifestItem.title || `Chapter ${chapterIndex + 1}`;
            
            // Clean HTML content
            const cleanText = cleanHtml(chapterContent);
            
            chapters.push({
              id: chapterIndex++,
              title: chapterTitle,
              content: cleanText
            });
          }
        }
      }
      
      return {
        title,
        author,
        chapters
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
      'dc': 'http://purl.org/dc/elements/1.1/'
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
   * Processes a single chapter with Gemini API
   * @param {Object} chapter - Chapter to process
   * @param {Object} bookMetadata - Book metadata including title and author
   * @returns {Promise<Object>} Promise resolving to processed chapter data
   */
  async function processChapterWithGemini(chapter, bookMetadata) {
    try {
      config.onProgress(`Processing chapter: ${chapter.title}`);
      
      // Prepare prompt for Gemini
      const promptText = `
      Convert this chapter content into a structured JSON format suitable for an audiobook application.
      The JSON should include sections for narration timing, pause points, and vocal emphasis.  It should only include text content and only main chapters, not preface or prologues or copyright or table of contents.
      
      Book title: ${bookMetadata.title}
      Author: ${bookMetadata.author}
      Chapter title: ${chapter.title}
      
      Analyze the content and organize it into:
      1. Paragraphs with timing estimates (words per minute: 150)
      2. Dialog sections that should have different voice characteristics
      3. Section breaks where pauses should occur
      4. Important phrases or words that should receive emphasis
      
      Here's the content to process:
      ${chapter.content.substring(0, 15000)} 
      ${chapter.content.length > 15000 ? "... [content truncated for prompt size]" : ""}
      
      Return ONLY a valid JSON object with structure like this example:
      {
        "chapterId": 1,
        "chapterTitle": "Example Chapter",
        "estimatedDuration": "8m 30s",
        "sections": [
          {
            "type": "paragraph",
            "content": "Text here...",
            "timing": "45s",
            "emphasis": [{"text": "important phrase", "level": "medium"}]
          },
          {
            "type": "dialog",
            "speaker": "Character name if identifiable",
            "content": "Dialog text here...",
            "timing": "15s"
          },
          {
            "type": "sectionBreak",
            "pauseDuration": "2s"
          }
        ]
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
        return parsedJSON;
      } catch (parseError) {
        config.onProgress(`Error parsing JSON for chapter "${chapter.title}": ${parseError instanceof Error ? parseError.message : 'Unknown error'}`);
        // Attempt to clean and fix common JSON issues
        const cleanedJSON = jsonContent
          .replace(/```json/g, '')
          .replace(/```/g, '')
          .trim();
          
        try {
          return JSON.parse(cleanedJSON);
        } catch (secondError) {
          config.onProgress("Failed to parse JSON even after cleaning. Returning raw text.");
          // Return object with error info instead of throwing
          return {
            chapterId: chapter.id,
            chapterTitle: chapter.title,
            estimatedDuration: "0m 0s",
            sections: [],
            error: "JSON parsing failed",
            rawResponse: text.substring(0, 500) + "..." // First 500 chars for debugging
          };
        }
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      config.onProgress(`Error processing chapter "${chapter.title}" with Gemini API: ${errorMessage}`);
      // Return object with error info instead of throwing
      return {
        chapterId: chapter.id,
        chapterTitle: chapter.title,
        estimatedDuration: "0m 0s",
        sections: [],
        error: errorMessage,
        processed: false
      };
    }
  }

  /**
   * Processes chapters in batches with delay between batches
   * @param {Array} chapters - Array of chapters to process
   * @param {Object} bookMetadata - Book metadata including title and author
   * @param {number} batchSize - Number of chapters to process in parallel
   * @param {number} delayMs - Milliseconds to wait between batches
   * @returns {Promise<Array>} Promise resolving to array of processed chapters
   */
  async function processBatchesWithDelay(
    chapters, 
    bookMetadata, 
    batchSize = 3, 
    delayMs = 2000
  ) {
    const results = [];
    const batches = [];
    
    // Split chapters into batches
    for (let i = 0; i < chapters.length; i += batchSize) {
      batches.push(chapters.slice(i, i + batchSize));
    }
    
    config.onProgress(`Processing ${chapters.length} chapters in ${batches.length} batches of ${batchSize}`);
    
    // Process each batch with delay between batches
    for (let i = 0; i < batches.length; i++) {
      config.onProgress(`Processing batch ${i+1} of ${batches.length}`);
      
      // Process chapters in current batch concurrently
      const batchPromises = batches[i].map(chapter => 
        processChapterWithGemini(chapter, bookMetadata)
      );
      
      const batchResults = await Promise.all(batchPromises);
      results.push(...batchResults);
      
      // Add delay between batches to avoid rate limiting
      if (i < batches.length - 1) {
        config.onProgress(`Waiting ${delayMs/1000} seconds before next batch...`);
        await new Promise(resolve => setTimeout(resolve, delayMs));
      }
    }
    
    return results;
  }

  /**
   * Calculates total audiobook duration from chapter durations
   * @param {Array} chapters - Array of processed chapters
   * @returns {string} Formatted total duration string
   */
  function calculateTotalDuration(chapters) {
    try {
      // Find chapters with estimatedDuration
      const chaptersWithDuration = chapters.filter(ch => ch.estimatedDuration);
      
      if (chaptersWithDuration.length === 0) {
        return "Unknown"; // No duration info available
      }
      
      // Convert durations like "5m 30s" to seconds
      const durationRegex = /(\d+)m\s+(\d+)s/;
      let totalSeconds = 0;
      
      chaptersWithDuration.forEach(chapter => {
        const match = chapter.estimatedDuration.match(durationRegex);
        if (match) {
          const minutes = parseInt(match[1], 10);
          const seconds = parseInt(match[2], 10);
          totalSeconds += (minutes * 60) + seconds;
        }
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
