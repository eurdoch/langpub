import { useState, useEffect, useCallback } from 'react'
import './App.css'

// Base URL for API calls
const API_BASE_URL = 'https://langpub.directto.link'

// Function to detect language of text using Electron's net module
async function detectLanguage(text: string): Promise<string> {
  try {
    console.log('Detecting language using Electron net module')
    const data = await window.electron.apiRequest(
      `${API_BASE_URL}/language`,
      'POST',
      { text }
    )
    
    console.log('Detected language:', data.language)
    return data.language
  } catch (error) {
    console.error('Error detecting language:', error)
    return 'Unknown' // Default fallback
  }
}

// Function to translate text to English using Electron's net module
async function translateText(text: string, language: string): Promise<string> {
  try {
    console.log('Translating text using Electron net module')
    const data = await window.electron.apiRequest(
      `${API_BASE_URL}/translate`,
      'POST',
      { 
        text,
        language,
      }
    )
    
    return data.translated_text
  } catch (error) {
    console.error('Error translating text:', error)
    return `[Translation failed: ${error}]` // Error message as fallback
  }
}

interface ParsedContent {
  title: string
  bodyText: string | null
  htmlContent: string | null
  styles: string[]
  cssFiles: CssFile[]
  error?: string
}

// Define an interface for translation data
interface TranslationInfo {
  originalText: string
  translatedText: string
  language: string
  timestamp: number
}

function App() {
  const [selectedFilePath, setSelectedFilePath] = useState<string | null>(null)
  const [epubContents, setEpubContents] = useState<EpubContents | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [spineItemsContent, setSpineItemsContent] = useState<Record<string, ParsedContent>>({})
  const [loadingItems, setLoadingItems] = useState<Record<string, boolean>>({})
  
  // State for tracking selected and translated text
  const [selectedText, setSelectedText] = useState<string>('')
  const [detectedLanguage, setDetectedLanguage] = useState<string>('')
  const [translatedText, setTranslatedText] = useState<string>('')
  const [isTranslating, setIsTranslating] = useState<boolean>(false)
  const [translationHistory, setTranslationHistory] = useState<TranslationInfo[]>([])
  
  // Handle text selection with language detection and translation
  const handleMouseUp = useCallback(async () => {
    const selection = window.getSelection()
    if (selection && selection.toString().trim().length > 0) {
      const selectedTextContent = selection.toString().trim()
      
      // Update selected text state
      setSelectedText(selectedTextContent)
      console.log('Selected text:', selectedTextContent)
      
      // Get the range and its bounding rectangle for position information
      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0)
        const rect = range.getBoundingClientRect()
        console.log('Selection position:', {
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height
        })
        
        // Get selection context (parent element information)
        const parentNode = range.startContainer.parentNode as HTMLElement
        if (parentNode) {
          console.log('Selection parent element:', parentNode.tagName)
          console.log('Selection parent classes:', parentNode.className)
        }
        
        try {
          // Start translation process
          setIsTranslating(true)
          
          // Check if we have language info from the EPUB metadata
          let detectedLang = 'Unknown'
          
          if (epubContents?.metadata?.language) {
            // Use language from EPUB metadata if available
            detectedLang = epubContents.metadata.language
            setDetectedLanguage(detectedLang)
            console.log('Using language from EPUB metadata:', detectedLang)
          } else {
            // Detect language using API
            console.log('Detecting language...')
            detectedLang = await detectLanguage(selectedTextContent)
            setDetectedLanguage(detectedLang)
          }
          
          // Only translate if not already English
          if (detectedLang.toLowerCase() !== 'english' && 
              detectedLang.toLowerCase() !== 'en' && 
              detectedLang.toLowerCase() !== 'en-us') {
            
            console.log('Translating from', detectedLang, 'to English...')
            const translated = await translateText(selectedTextContent, detectedLang)
            
            // Update state with translation
            setTranslatedText(translated)
            
            // Add to translation history
            setTranslationHistory(prev => [
              {
                originalText: selectedTextContent,
                translatedText: translated,
                language: detectedLang,
                timestamp: Date.now()
              },
              ...prev,
            ].slice(0, 20)) // Keep only last 20 translations
            
            console.log('Translation:', {
              original: selectedTextContent,
              language: detectedLang,
              translated: translated
            })
          } else {
            console.log('Text is already in English, no translation needed')
            setTranslatedText(selectedTextContent) // Same text since it's already English
          }
          
          setIsTranslating(false)
        } catch (error) {
          console.error('Error processing text selection:', error)
          setIsTranslating(false)
        }
      }
    }
  }, [epubContents?.metadata?.language])
  
  // Add a document-level listener as a fallback
  useEffect(() => {
    // This handles selections that might happen outside our main content area
    document.addEventListener('mouseup', handleMouseUp)
    
    return () => {
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [handleMouseUp])
  
  // Function to parse HTML content in the browser
  const parseHtmlContent = (result: SpineItemContent): ParsedContent => {
    try {
      if (!result.success || !result.content) {
        throw new Error(result.error || 'No content provided')
      }
      
      const html = result.content
      
      // Create a DOM parser
      const parser = new DOMParser()
      const doc = parser.parseFromString(html, 'text/html')
      
      // Extract title
      const title = doc.querySelector('title')?.textContent || 'No title'
      
      // Extract body text
      const body = doc.querySelector('body')
      const bodyText = body ? body.textContent : null
      
      // Extract all CSS styles
      const styles: string[] = []
      
      // Get inline styles
      const styleElements = doc.querySelectorAll('style')
      styleElements.forEach(styleEl => {
        if (styleEl.textContent) {
          styles.push(styleEl.textContent)
        }
      })
      
      // Get linked stylesheets
      const linkElements = doc.querySelectorAll('link[rel="stylesheet"]')
      linkElements.forEach(linkEl => {
        const href = linkEl.getAttribute('href')
        if (href) {
          console.log('Found linked stylesheet:', href)
          styles.push(`/* External stylesheet: ${href} */`)
        }
      })
      
      // Get the HTML content of the body for rendering
      const htmlContent = body ? body.innerHTML : null
      
      // Include external CSS files from result
      const cssFiles = result.cssFiles || []
      console.log(`Including ${cssFiles.length} CSS files with content`)
      
      return { 
        title, 
        bodyText: bodyText ? 
          (bodyText.substring(0, 300) + (bodyText.length > 300 ? '...' : '')) : 
          null,
        htmlContent,
        styles,
        cssFiles
      }
    } catch (error) {
      console.error('Error parsing HTML:', error)
      return { 
        title: 'Parse Error', 
        bodyText: null,
        htmlContent: null,
        styles: [],
        cssFiles: [],
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }

  const handleOpenDialog = async () => {
    try {
      // Open dialog to select only EPUB files
      const filePath = await window.electron.openFileDialog([{ name: 'EPUB Files', extensions: ['epub'] }])
      if (filePath) {
        setSelectedFilePath(filePath)
        setIsLoading(true)
        console.log('File selected:', filePath)
        
        // Unzip the EPUB and get its contents using adm-zip
        const contents = await window.electron.unzipEpub(filePath)
        console.log('EPUB contents:', contents)
        setEpubContents(contents)
        
        // Automatically load all spine items
        if (contents.spine && contents.spine.length > 0) {
          // Reset content if we load a new book
          setSpineItemsContent({})
          
          // Track which items are loading
          const newLoadingItems: Record<string, boolean> = {}
          
          // Load all spine items
          const loadPromises = contents.spine.map(async (item) => {
            try {
              newLoadingItems[item.fullPath] = true
              
              const result = await window.electron.getSpineItemContent(item.fullPath)
              if (result.success) {
                const parsed = parseHtmlContent(result)
                setSpineItemsContent(prev => ({ 
                  ...prev, 
                  [item.fullPath]: parsed 
                }))
              } else {
                console.error(`Error loading spine item ${item.fullPath}:`, result.error)
                setSpineItemsContent(prev => ({ 
                  ...prev, 
                  [item.fullPath]: { 
                    title: 'Error', 
                    bodyText: null, 
                    htmlContent: null,
                    styles: [],
                    cssFiles: [],
                    error: result.error || 'Unknown error' 
                  } 
                }))
              }
              
              newLoadingItems[item.fullPath] = false
            } catch (error) {
              console.error(`Error processing spine item ${item.fullPath}:`, error)
              newLoadingItems[item.fullPath] = false
            }
          })
          
          setLoadingItems(newLoadingItems)
          
          // Wait for all spine items to load
          await Promise.all(loadPromises)
        }
        
        setIsLoading(false)
      }
    } catch (error) {
      console.error('Error processing EPUB:', error)
      setIsLoading(false)
    }
  }

  return (
    <div className="flex h-screen w-screen bg-white overflow-hidden">
      {/* Main container with two columns */}
      <div className="flex flex-row w-full h-full">
        {/* Left column with book content - shared header */}
        <div className="w-3/4 h-full flex flex-col">
          {/* Content area */}
          <main 
            className="flex-1 overflow-auto p-4"
            onMouseUp={handleMouseUp}
          >
            {isLoading ? (
              <div className="h-full flex items-center justify-center">
                <p className="text-lg">Loading EPUB...</p>
              </div>
            ) : epubContents && epubContents.spine ? (
              <div>
                {epubContents.metadata && (
                  <div className="flex justify-between items-center mb-4">
                    <h1 className="text-xl font-bold">
                      {epubContents.metadata.title}
                    </h1>
                    <button
                      onClick={handleOpenDialog}
                      className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded text-sm"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Loading...' : 'Open Book'}
                    </button>
                  </div>
                )}
                
                {/* Render all spine items in reading order */}
                {epubContents.spine.map((item, index) => (
                  <div key={index} className="mb-12 border-b border-gray-200 pb-8">
                    {/* Apply styles for this spine item */}
                    {spineItemsContent[item.fullPath] && spineItemsContent[item.fullPath].styles && 
                     spineItemsContent[item.fullPath].styles.length > 0 && (
                      <style>
                        {spineItemsContent[item.fullPath].styles.join('\n')}
                      </style>
                    )}
                    
                    {/* Apply CSS from external files */}
                    {spineItemsContent[item.fullPath] && spineItemsContent[item.fullPath].cssFiles && 
                     spineItemsContent[item.fullPath].cssFiles.map((cssFile, cssIndex) => (
                      <style key={cssIndex} data-source={cssFile.path}>
                        {cssFile.content}
                      </style>
                    ))}
                    
                    {/* Render HTML content with styles */}
                    {loadingItems[item.fullPath] ? (
                      <div className="py-4 text-center text-gray-500">Loading chapter...</div>
                    ) : spineItemsContent[item.fullPath] && spineItemsContent[item.fullPath].htmlContent ? (
                      <div 
                        className="epub-content" 
                        dangerouslySetInnerHTML={{ __html: spineItemsContent[item.fullPath].htmlContent }}
                      />
                    ) : spineItemsContent[item.fullPath] && spineItemsContent[item.fullPath].error ? (
                      <div className="py-4 text-center text-red-500">
                        Error loading chapter: {spineItemsContent[item.fullPath].error}
                      </div>
                    ) : (
                      <div className="py-4 text-center text-gray-500">Waiting to load chapter...</div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center">
                <p className="text-lg text-gray-500 mb-4">Open an EPUB file to begin</p>
                <button
                  onClick={handleOpenDialog}
                  className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded"
                >
                  Open EPUB
                </button>
              </div>
            )}
          </main>
        </div>
        
        {/* Right column for translations */}
        <div className="w-1/4 h-full flex flex-col border-l border-gray-300 bg-gray-50">
          <header className="bg-blue-600 p-3 text-white font-medium">
            Translation Panel
          </header>
          
          <div className="flex-1 overflow-auto p-4">
            {isTranslating ? (
              <div className="animate-pulse p-4 rounded-lg bg-white shadow mb-4">
                <p className="text-gray-500">Translating...</p>
              </div>
            ) : selectedText ? (
              <div className="p-4 rounded-lg bg-white shadow mb-4">
                <div className="mb-3">
                  <h3 className="text-sm text-gray-500 font-medium mb-1">Original ({detectedLanguage})</h3>
                  <p className="text-gray-800 break-words">{selectedText}</p>
                </div>
                
                <div>
                  <h3 className="text-sm text-gray-500 font-medium mb-1">Translation (English)</h3>
                  <p className="text-gray-800 break-words">{translatedText}</p>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 mt-8">
                <p>Select text to translate</p>
              </div>
            )}
            
            {/* Translation history */}
            {translationHistory.length > 0 && (
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-2 mt-6">History</h3>
                {translationHistory.map((item, index) => (
                  <div key={index} className="p-3 rounded-lg bg-white shadow-sm mb-3 text-sm">
                    <p className="text-xs text-gray-500 mb-1">
                      {new Date(item.timestamp).toLocaleTimeString()} · {item.language}
                    </p>
                    <p className="text-gray-800 mb-2 line-clamp-2">{item.originalText}</p>
                    <p className="text-gray-600 line-clamp-2">{item.translatedText}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App