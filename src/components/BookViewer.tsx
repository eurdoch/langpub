import { useState, useEffect, useRef } from 'react'
import { ReactReader } from 'react-reader'
import type { Contents } from 'epubjs'
import { languageMap, detectLanguage } from '../language'

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
                  
                  const dcLanguage = rendition.book.package.metadata.language;
                  //const convertedLanguage = languageMap[dcLanguage];
                  const convertedLanguage = null;
                  if (convertedLanguage) {
                    setBookLanguage(convertedLanguage);
                  } else {
                    // No metadata language found, try to detect it from the content
                    console.log("No language metadata found, attempting to detect language...");
                    
                    // Using the rendition to detect language from current content
                    try {
                      // Get the current contents
                      const contents = rendition.getContents();
                      if (contents && contents.length > 0) {
                        const firstContent = contents[0];
                        if (firstContent && firstContent.document) {
                          // Get text content from the document
                          const doc = firstContent.document;
                          
                          // Get paragraphs from the document
                          const paragraphs = doc.querySelectorAll('p');
                          
                          if (paragraphs.length > 0) {
                            // Extract a couple of paragraphs of text
                            let sampleText = '';
                            const maxParagraphs = Math.min(paragraphs.length, 5);
                            
                            for (let i = 0; i < maxParagraphs; i++) {
                              if (paragraphs[i] && paragraphs[i].textContent) {
                                sampleText += paragraphs[i].textContent + ' ';
                              }
                            }
                            
                            // If we don't have enough text, try to get more from the body
                            if (sampleText.length < 100 && doc.body) {
                              sampleText = doc.body.textContent || '';
                            }
                            
                            // Ensure we have enough text for detection (trim to 1000 chars if too long)
                            sampleText = sampleText.trim().substring(0, 1000);
                            
                            if (sampleText.length > 100) { // Ensure we have enough text to analyze
                              console.log("Detecting language from text sample:", sampleText.substring(0, 100) + "...");
                              
                              // Call the language detection function
                              detectLanguage(sampleText).then(detectedLanguage => {
                                console.log("Detected language:", detectedLanguage);
                                
                                // Set the book language
                                if (detectedLanguage) {
                                  setBookLanguage(detectedLanguage);
                                }
                              });
                            } else {
                              console.log("Not enough text to detect language, sample length:", sampleText.length);
                            }
                          } else {
                            console.log("No paragraphs found in the document");
                          }
                        }
                      } else {
                        console.log("No contents available yet");
                      }
                    } catch (error) {
                      console.error("Error detecting language from content:", error);
                    }
                  }
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
