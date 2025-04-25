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
            
            {/* EPUB Files */}
            <div>
              <h4 className="text-md font-medium text-gray-800 mb-1">EPUB Contents</h4>
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
