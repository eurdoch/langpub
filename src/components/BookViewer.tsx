import { useState, useEffect } from 'react'
import { ReactReader, ReactReaderStyle } from 'react-reader'

interface BookViewerProps {
  filePath: string
}

const BookViewer: React.FC<BookViewerProps> = ({ filePath }) => {
  const [location, setLocation] = useState<string | number>(0)
  const [bookUrl, setBookUrl] = useState<string | null>(null)
  const [totalLocations, setTotalLocations] = useState<number>(0)
  const [progress, setProgress] = useState<number>(0)

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
      setProgress(percentage)
    }
  }

  return (
    <div className="book-viewer-container">
      {bookUrl ? (
        <>
          <div className="reader-container">
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
                  }
                })
                
                // Store total locations for progress calculation
                rendition.book.ready.then(() => {
                  rendition.book.locations.generate().then((locations) => {
                    setTotalLocations(locations.length)
                  })
                })
              }}
              epubOptions={{
                flow: 'scrolled', // or 'paginated'
                manager: 'continuous'
              }}
              tocChanged={toc => {
                console.log('Table of contents:', toc)
              }}
              epubInitOptions={{
                openAs: 'epub'
              }}
              loadingView={<div className="loading">Loading...</div>}
              showToc={true}
              styles={readerStyles}
            />
          </div>
          <div className="controls">
            <div className="progress-info">
              {progress > 0 ? `${progress}% read` : ''}
            </div>
          </div>
        </>
      ) : (
        <div className="loading">Loading book...</div>
      )}
    </div>
  )
}

// Custom styles for the reader
const readerStyles: ReactReaderStyle = {
  container: {
    position: 'relative',
    width: '100%',
    height: '100%',
    overflow: 'hidden'
  },
  readerArea: {
    position: 'relative',
    width: '100%',
    height: 'calc(100% - 40px)',
    overflow: 'hidden',
    backgroundColor: '#fff'
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

export default BookViewer
