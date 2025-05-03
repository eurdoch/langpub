import { useState, useEffect, useCallback } from 'react'
import './App.css'

interface ParsedContent {
  title: string
  bodyText: string | null
  htmlContent: string | null
  styles: string[]
  cssFiles: CssFile[]
  error?: string
}

function App() {
  const [selectedFilePath, setSelectedFilePath] = useState<string | null>(null)
  const [epubContents, setEpubContents] = useState<EpubContents | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [spineItemsContent, setSpineItemsContent] = useState<Record<string, ParsedContent>>({})
  const [loadingItems, setLoadingItems] = useState<Record<string, boolean>>({})
  
  // Handle text selection
  const handleMouseUp = useCallback(() => {
    const selection = window.getSelection()
    if (selection && selection.toString().trim().length > 0) {
      const selectedText = selection.toString().trim()
      console.log('Selected text:', selectedText)
      
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
      }
    }
  }, [])
  
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
      <div className="w-full h-full flex flex-col">
        {/* Simple header with Open button */}
        <header className="bg-blue-600 p-2 shadow-md">
          <button
            onClick={handleOpenDialog}
            className="bg-white hover:bg-gray-100 text-blue-800 font-bold py-2 px-4 rounded"
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Open Epub'}
          </button>
        </header>

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
            <div className="max-w-4xl mx-auto">
              {epubContents.metadata && (
                <h1 className="text-2xl font-bold mb-8 text-center">
                  {epubContents.metadata.title}
                </h1>
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
            <div className="h-full flex items-center justify-center">
              <p className="text-lg text-gray-500">Open an EPUB file to begin</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default App