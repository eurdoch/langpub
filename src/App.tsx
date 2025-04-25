import { useState } from 'react'
import './App.css'

function App() {
  const [selectedFilePath, setSelectedFilePath] = useState<string | null>(null)
  const [epubContents, setEpubContents] = useState<EpubContents | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleOpenDialog = async () => {
    try {
      // Open dialog to select only EPUB files
      const filePath = await window.electron.openFileDialog([{ name: 'EPUB Files', extensions: ['epub'] }])
      if (filePath) {
        setSelectedFilePath(filePath)
        setIsLoading(true)
        console.log('File selected:', filePath)
        
        // Parse the EPUB and get its contents using epub2
        const contents = await window.electron.parseEpub(filePath)
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
            <div className="mb-4">
              <h4 className="text-md font-medium text-gray-800 mb-1">Metadata</h4>
              <div className="border border-gray-200 rounded p-3 bg-gray-50">
                <p className="text-sm font-semibold mb-1">Title: {epubContents.metadata.title}</p>
                <p className="text-sm mb-1">Author: {epubContents.metadata.creator}</p>
                <p className="text-sm mb-1">Language: {epubContents.metadata.language}</p>
                {epubContents.metadata.publisher && (
                  <p className="text-sm mb-1">Publisher: {epubContents.metadata.publisher}</p>
                )}
                {epubContents.metadata.description && (
                  <div className="mt-2">
                    <p className="text-sm font-semibold mb-1">Description:</p>
                    <p className="text-xs italic">{epubContents.metadata.description.substring(0, 200)}
                      {epubContents.metadata.description.length > 200 && '...'}
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Table of Contents */}
            <div className="mb-4">
              <h4 className="text-md font-medium text-gray-800 mb-1">Table of Contents</h4>
              <div className="max-h-60 overflow-y-auto border border-gray-200 rounded p-2 bg-gray-50">
                <ul className="text-xs">
                  {epubContents.toc.map((item, index) => (
                    <li key={index} className="py-1" style={{ marginLeft: `${item.level * 12}px` }}>
                      {item.title || `(Untitled - ${item.id})`}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Spine Items */}
            <div>
              <h4 className="text-md font-medium text-gray-800 mb-1">Content Files</h4>
              <div className="max-h-60 overflow-y-auto border border-gray-200 rounded p-2 bg-gray-50">
                <ul className="text-xs font-mono">
                  {epubContents.spine.map((item, index) => (
                    <li key={index} className="py-1 truncate">
                      {item.href} ({item.mediaType})
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* File paths */}
            <div className="mt-4 text-xs text-gray-500">
              <p>NCX Path: {epubContents.ncxPath}</p>
              <p>OPF Path: {epubContents.opfPath}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
