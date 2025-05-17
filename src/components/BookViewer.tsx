import { useState, useEffect, useRef } from 'react'
import { ReactReader } from 'react-reader'
import type { Contents } from 'epubjs'
import { availableLanguages, detectLanguage } from '../language'

interface BookViewerProps {
  filePath: string
  onTextSelection?: (text: string | null) => void
  setBookLanguage: (language: string) => void
}

const BookViewer: React.FC<BookViewerProps> = ({ filePath, onTextSelection, setBookLanguage }) => {
  const [location, setLocation] = useState<string | number>(0)
  const [bookUrl, setBookUrl] = useState<string | null>(null)
  const [totalLocations, setTotalLocations] = useState<number>(0)
  const [selectedText, setSelectedText] = useState<string | null>(null)
  const onTextSelectionRef = useRef(onTextSelection)

  // Update ref when prop changes
  useEffect(() => {
    onTextSelectionRef.current = onTextSelection
  }, [onTextSelection])

  useEffect(() => {
    if (!filePath) return
    
    let objectUrl: string | null = null
    
    // Load the book
    const loadBook = async () => {
      try {
        // Read the file directly using Electron's IPC
        const fileResult = await window.ipcRenderer.readFile(filePath)
        
        if (fileResult.success && fileResult.data) {
          // Create a blob from the base64 data
          const binaryData = atob(fileResult.data)
          const arrayBuffer = new ArrayBuffer(binaryData.length)
          const uint8Array = new Uint8Array(arrayBuffer)
          
          for (let i = 0; i < binaryData.length; i++) {
            uint8Array[i] = binaryData.charCodeAt(i)
          }
          
          const blob = new Blob([uint8Array], { type: 'application/epub+zip' })
          objectUrl = URL.createObjectURL(blob)
          
          // Set book URL for ReactReader
          setBookUrl(objectUrl)
        } else {
          throw new Error(fileResult.error || 'Failed to read file')
        }
      } catch (error) {
        console.error('Error loading EPUB:', error)
      }
    }

    loadBook()

    // Cleanup
    return () => {
      // Revoke object URL to avoid memory leaks
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl)
      }
    }
  }, [filePath])

  // Calculate reading progress
  const locationChanged = (epubcifi: string) => {
    // Persist location
    setLocation(epubcifi)
    
    // Calculate progress
    if (totalLocations > 0) {
      const currentLocation = epubcifi.split('/')[2]
      const percentage = Math.round((parseInt(currentLocation) / totalLocations) * 100)
      // setProgress(percentage)
      console.log(`Reading progress: ${percentage}%`)
    }
  }

  return (
    <div className="book-viewer-container" style={{ position: 'relative' }}>
      {bookUrl ? (
        <>
          <div className="reader-container" style={{ height: '100%', overflow: 'auto' }}>
            <ReactReader
              url={bookUrl}
              location={location}
              locationChanged={locationChanged}
              getRendition={rendition => {
                // Set styles on rendition
                rendition.themes.default({
                  '::selection': {
                    background: 'rgba(74, 144, 226, 0.3)'
                  },
                  '.epubjs-hl': {
                    fill: 'rgba(74, 144, 226, 0.3)'
                  },
                  'body': {
                    padding: '0 8px !important',
                    margin: '0 !important'
                  }
                })
                
                // Store total locations for progress calculation
                rendition.book.ready.then(() => {
                  rendition.book.locations.generate(1000).then((locations: any) => {
                    setTotalLocations(locations.length)
                  })
                })
                
                rendition.on('rendered', (section: any) => {
                  // We only need to detect the language once
                  const languageDetectionHandler = async () => {
                    try {
                      // First check if we can get the language from metadata
                      const dcLanguage = rendition.book.package.metadata.language;
                      const convertedLanguage = languageMap[dcLanguage];
                      
                      if (convertedLanguage) {
                        // We found the language in metadata
                        console.log("Found language in book metadata:", convertedLanguage);
                        setBookLanguage(convertedLanguage);
                        rendition.off('rendered', languageDetectionHandler);
                        return;
                      }
                      
                      console.log("Attempting to detect language from spine item...");
                      
                      // Access spine items from the book
                      const fourthItem = rendition.book.spine.spineItems[3];
                      fourthItem.load(rendition.book.load.bind(rendition.book))
                        .then(contents => {
                          const paragraphs = contents.querySelectorAll('p');
                          if (paragraphs.length >= 2) {
                            const firstParagraph = paragraphs[0].textContent.trim();
                            const secondParagraph = paragraphs[1].textContent.trim();
                            
                            const excerpt = firstParagraph + "\n\n" + secondParagraph;
                            detectLanguage(excerpt).then(detectedLanguage => {
                              console.log('Detected language: ', detectedLanguage);
                              if (availableLanguages.includes(detectedLanguage)) {
                                setBookLanguage(detectedLanguage);
                              } 
                            });
                          } else {
                            console.log("No paragraphs found in this spine item");
                          }
                          
                          // When done, unload to free memory
                          fourthItem.unload();
                        })
                        .catch(error => {
                          console.error("Error loading spine item:", error);
                        });
                        
                    } catch (error) {
                      console.error("Error detecting language from content:", error);
                    }
                  };
                  
                  // Call the handler for the first render and register it for future renders
                  languageDetectionHandler();
                })
                
                // Add selection event listener
                rendition.on('selected', (_cfiRange: string, contents: Contents) => {
                  // Get the selected text
                  const text = contents.window.getSelection()?.toString()
                  if (text && text.trim() !== '') {
                    console.log('Selected text:', text)
                    
                    // Check if the selected text is different from the current one
                    if (text !== selectedText) {
                      setSelectedText(text)
                      // Pass selected text to parent component if callback exists
                      if (onTextSelectionRef.current) {
                        onTextSelectionRef.current(text)
                      }
                    }
                  }
                })
                
                // Handle clicks without selections
                rendition.on('mouseup', () => {
                  // Get current selection
                  const selection = window.getSelection()
                  const hasSelection = selection && !selection.isCollapsed && selection.toString().trim() !== ''
                  
                  // Only clear if there's no selection and it was a click (not a drag)
                  if (!hasSelection) {
                    // We don't clear the selection here, 
                    // which allows the right panel content to remain
                    
                    // Note: We're not calling onTextSelection(null) here,
                    // which means the App component will keep its current state
                  }
                })
              }}
              epubOptions={{
                flow: 'scrolled',
                manager: 'continuous',
                infinite: true
              }}
              tocChanged={toc => {
                console.log('Table of contents:', toc)
              }}
              epubInitOptions={{
                openAs: 'epub'
              }}
              loadingView={<div className="loading">Loading...</div>}
              showToc={true}
              // Omitting styles because of TypeScript error
              // styles={readerStyles as any}
            />
          </div>
        </>
      ) : (
        <div className="loading">Loading book...</div>
      )}
    </div>
  )
}

export default BookViewer
