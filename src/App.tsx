import { useState, useEffect } from 'react'
import './App.css'

interface ParsedContent {
  title: string
  bodyText: string | null
  error?: string
}

function App() {
  const [selectedFilePath, setSelectedFilePath] = useState<string | null>(null)
  const [epubContents, setEpubContents] = useState<EpubContents | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedSpineIndex, setSelectedSpineIndex] = useState<number | null>(null)
  const [spineItemsContent, setSpineItemsContent] = useState<Record<string, ParsedContent>>({})
  const [loadingItems, setLoadingItems] = useState<Record<string, boolean>>({})
  
  // Function to parse HTML content in the browser
  const parseHtmlContent = (html: string): ParsedContent => {
    try {
      // Create a DOM parser
      const parser = new DOMParser()
      const doc = parser.parseFromString(html, 'text/html')
      
      // Extract title
      const title = doc.querySelector('title')?.textContent || 'No title'
      
      // Extract body text
      const body = doc.querySelector('body')
      const bodyText = body ? body.textContent : null
      
      return { 
        title, 
        bodyText: bodyText ? 
          (bodyText.substring(0, 300) + (bodyText.length > 300 ? '...' : '')) : 
          null 
      }
    } catch (error) {
      console.error('Error parsing HTML:', error)
      return { 
        title: 'Parse Error', 
        bodyText: null,
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
        setIsLoading(false)
      }
    } catch (error) {
      console.error('Error processing EPUB:', error)
      setIsLoading(false)
    }
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-100">
      <div className="rounded-lg bg-white p-8 shadow-md max-w-2xl w-full">
        <button
          onClick={handleOpenDialog}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Open Epub'}
        </button>
        
        {selectedFilePath && (
          <div className="mt-4 text-sm text-gray-600 truncate">
            Selected: {selectedFilePath}
          </div>
        )}

        {epubContents && (
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-800 mb-2">EPUB Information</h3>
            
            {/* Metadata section */}
            {epubContents.metadata && (
              <div className="mb-4">
                <h4 className="text-md font-medium text-gray-800 mb-1">Metadata</h4>
                <div className="border border-gray-200 rounded p-3 bg-gray-50">
                  <p className="text-sm font-semibold mb-1">Title: {epubContents.metadata.title}</p>
                  <p className="text-sm mb-1">Author: {epubContents.metadata.creator}</p>
                  <p className="text-sm mb-1">Language: {epubContents.metadata.language}</p>
                  {epubContents.metadata.publisher && (
                    <p className="text-sm mb-1">Publisher: {epubContents.metadata.publisher}</p>
                  )}
                  <p className="text-sm mb-1">OPF Path: {epubContents.metadata.opfPath}</p>
                </div>
              </div>
            )}
            
            {/* Container XML */}
            {epubContents.containerXml && (
              <div className="mb-4">
                <h4 className="text-md font-medium text-gray-800 mb-1">Container XML</h4>
                <div className="max-h-60 overflow-y-auto border border-gray-200 rounded p-2 bg-gray-50">
                  <pre className="text-xs whitespace-pre-wrap">
                    {epubContents.containerXml}
                  </pre>
                </div>
              </div>
            )}
            
            {/* OPF Content */}
            {epubContents.metadata && epubContents.metadata.opfContent && (
              <div className="mb-4">
                <h4 className="text-md font-medium text-gray-800 mb-1">OPF Content</h4>
                <div className="max-h-60 overflow-y-auto border border-gray-200 rounded p-2 bg-gray-50">
                  <pre className="text-xs whitespace-pre-wrap">
                    {epubContents.metadata.opfContent}
                  </pre>
                </div>
              </div>
            )}
            
            {/* Spine Items */}
            <div className="mb-4">
              <h4 className="text-md font-medium text-gray-800 mb-1">Spine Items</h4>
              <div className="max-h-60 overflow-y-auto border border-gray-200 rounded p-2 bg-gray-50">
                <ul className="text-xs font-mono">
                  {epubContents.spine && epubContents.spine.map((item, index) => (
                    <li key={index} className="py-1">
                      <div className="truncate">
                        <span className="font-semibold">{index + 1}.</span> {item.fullPath} 
                        <span className="text-gray-500"> ({item.mediaType})</span>
                      </div>
                      <div className="ml-5 mt-1 flex">
                        <button 
                          onClick={() => {
                            if (selectedSpineIndex === index) {
                              setSelectedSpineIndex(null)
                            } else {
                              setSelectedSpineIndex(index)
                              // Load content if not already loaded
                              if (!spineItemsContent[item.fullPath] && !loadingItems[item.fullPath]) {
                                setLoadingItems(prev => ({ ...prev, [item.fullPath]: true }))
                                window.electron.getSpineItemContent(item.fullPath)
                                  .then(result => {
                                    if (result.success && result.content) {
                                      const parsed = parseHtmlContent(result.content)
                                      setSpineItemsContent(prev => ({ 
                                        ...prev, 
                                        [item.fullPath]: parsed 
                                      }))
                                    } else {
                                      setSpineItemsContent(prev => ({ 
                                        ...prev, 
                                        [item.fullPath]: { 
                                          title: 'Error', 
                                          bodyText: null, 
                                          error: result.error || 'Unknown error' 
                                        } 
                                      }))
                                    }
                                    setLoadingItems(prev => ({ ...prev, [item.fullPath]: false }))
                                  })
                                  .catch(error => {
                                    console.error(`Error loading spine item ${item.fullPath}:`, error)
                                    setSpineItemsContent(prev => ({ 
                                      ...prev, 
                                      [item.fullPath]: { 
                                        title: 'Error', 
                                        bodyText: null, 
                                        error: error.message 
                                      } 
                                    }))
                                    setLoadingItems(prev => ({ ...prev, [item.fullPath]: false }))
                                  })
                              }
                            }
                          }}
                          className="text-xs bg-gray-200 hover:bg-blue-100 px-2 py-1 rounded"
                        >
                          {loadingItems[item.fullPath] ? 'Loading...' : (selectedSpineIndex === index ? 'Hide Content' : 'View Content')}
                        </button>
                      </div>
                      
                      {/* Show content when selected */}
                      {selectedSpineIndex === index && (
                        <div className="ml-5 mt-2 text-xs text-gray-700 border-l-2 border-blue-200 pl-2">
                          {loadingItems[item.fullPath] ? (
                            <div>Loading content...</div>
                          ) : spineItemsContent[item.fullPath] ? (
                            <>
                              {spineItemsContent[item.fullPath].title && (
                                <div><span className="font-semibold">Title:</span> {spineItemsContent[item.fullPath].title}</div>
                              )}
                              {spineItemsContent[item.fullPath].bodyText && (
                                <div className="italic mt-1 text-gray-500">{spineItemsContent[item.fullPath].bodyText}</div>
                              )}
                              {spineItemsContent[item.fullPath].error && (
                                <div className="text-red-500">Error: {spineItemsContent[item.fullPath].error}</div>
                              )}
                            </>
                          ) : (
                            <div>No content loaded</div>
                          )}
                        </div>
                      )}
                    </li>
                  ))}
                  {(!epubContents.spine || epubContents.spine.length === 0) && (
                    <li className="text-gray-500 italic">No spine items found</li>
                  )}
                </ul>
              </div>
            </div>
            
            {/* EPUB Files */}
            <div>
              <h4 className="text-md font-medium text-gray-800 mb-1">All Files</h4>
              <div className="max-h-60 overflow-y-auto border border-gray-200 rounded p-2 bg-gray-50">
                <ul className="text-xs font-mono">
                  {epubContents.entries.map((entry, index) => (
                    <li key={index} className="py-1 truncate">
                      <span className={entry.isDirectory ? 'font-bold' : ''}>
                        {entry.name}
                      </span>
                      {!entry.isDirectory && ` (${entry.size} bytes)`}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* File path */}
            <div className="mt-4 text-xs text-gray-500">
              <p>EPUB Path: {epubContents.path}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
