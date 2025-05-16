import { useState, useEffect } from 'react'
import { ReactReader } from 'react-reader'
import type { Contents } from 'epubjs'

interface BookViewerProps {
  filePath: string
  onTextSelection?: (text: string | null) => void
  onBookLoaded?: (text: string) => void
}

const BookViewer: React.FC<BookViewerProps> = ({ filePath, onTextSelection, onBookLoaded }) => {
  const [location, setLocation] = useState<string | number>(0)
  const [bookUrl, setBookUrl] = useState<string | null>(null)
  const [totalLocations, setTotalLocations] = useState<number>(0)
  // const [progress, setProgress] = useState<number>(0)
  const [selectedText, setSelectedText] = useState<string | null>(null)

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
                  
                  // Extract a sample of text from the book for language detection
                  if (onBookLoaded) {
                    try {
                      // Get text from the current section
                      const contents = rendition.getContents() as any
                      const content = contents && contents.length > 0 ? contents[0] : null
                      if (content) {
                        // Get the content document
                        const doc = content.document
                        if (doc && doc.body) {
                          // Extract text content from body
                          let sampleText = doc.body.textContent || ''
                          
                          // Clean up the text and limit to a reasonable size
                          sampleText = sampleText.replace(/\s+/g, ' ').trim().substring(0, 1000)
                          
                          if (sampleText) {
                            console.log('Found sample text for language detection')
                            onBookLoaded(sampleText)
                          } else {
                            // If no text is found, try to navigate to the next section and try again
                            rendition.next().then(() => {
                              setTimeout(() => {
                                const nextContents = rendition.getContents() as any
                                const nextContent = nextContents && nextContents.length > 0 ? nextContents[0] : null
                                if (nextContent && nextContent.document && nextContent.document.body) {
                                  const nextSampleText = nextContent.document.body.textContent || ''
                                  const cleanedText = nextSampleText.replace(/\s+/g, ' ').trim().substring(0, 1000)
                                  if (cleanedText) {
                                    onBookLoaded(cleanedText)
                                  }
                                }
                              }, 300)
                            }).catch(err => {
                              console.error('Error navigating to next section:', err)
                            })
                          }
                        }
                      }
                    } catch (error) {
                      console.error('Error extracting text for language detection:', error)
                    }
                  }
                })
                
                // Try to extract sample text from the book after content is loaded
                rendition.on('rendered', (section: any) => {
                  if (onBookLoaded && section) {
                    // Only do this once
                    const extractTextHandler = () => {
                      try {
                        const contents = rendition.getContents() as any
                        const content = contents && contents.length > 0 ? contents[0] : null
                        if (content && content.document && content.document.body) {
                          let sampleText = content.document.body.textContent || ''
                          sampleText = sampleText.replace(/\s+/g, ' ').trim().substring(0, 1000)
                          
                          if (sampleText) {
                            console.log('Found sample text on render for language detection')
                            onBookLoaded(sampleText)
                            // Remove the event listener to avoid multiple calls
                            rendition.off('rendered', extractTextHandler)
                          }
                        }
                      } catch (error) {
                        console.error('Error extracting text on render:', error)
                      }
                    }
                    
                    // Add the event handler
                    rendition.on('rendered', extractTextHandler)
                    // Call it immediately for the first render
                    extractTextHandler()
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
                      if (onTextSelection) {
                        onTextSelection(text)
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

// Custom styles for the reader - commented out since we're not using them
// due to TypeScript errors with the current react-reader type definitions
/*
const readerStyles = {
  container: {
    position: 'relative',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    padding: 0,
    margin: 0
  },
  readerArea: {
    position: 'relative',
    width: '100%',
    height: '100%',
    overflow: 'auto',
    backgroundColor: '#fff',
    padding: 0,
    margin: 0
  },
  tocArea: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: '256px',
    background: '#f2f2f2',
    borderRight: '1px solid #ddd',
    overflowY: 'auto',
    zIndex: 1
  },
  tocButtonExpanded: {
    background: '#f2f2f2'
  }
}
*/

export default BookViewer
