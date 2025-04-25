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
        
        // Unzip the EPUB and get its contents
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
            <h3 className="text-lg font-medium text-gray-800 mb-2">EPUB Contents</h3>
            <div className="max-h-96 overflow-y-auto border border-gray-200 rounded p-2 bg-gray-50">
              <ul className="text-xs font-mono">
                {epubContents.entries.slice(0, 20).map((entry, index) => (
                  <li key={index} className={`${entry.isDirectory ? 'font-bold' : ''} py-1`}>
                    {entry.name} {!entry.isDirectory && `(${entry.size} bytes)`}
                  </li>
                ))}
                {epubContents.entries.length > 20 && (
                  <li className="italic text-gray-500">
                    ...and {epubContents.entries.length - 20} more files
                  </li>
                )}
              </ul>
            </div>
            
            {epubContents.containerXml && (
              <div className="mt-4">
                <h4 className="text-md font-medium text-gray-800 mb-1">Container XML</h4>
                <pre className="text-xs bg-gray-50 p-2 rounded border border-gray-200 overflow-x-auto">
                  {epubContents.containerXml.substring(0, 500)}
                  {epubContents.containerXml.length > 500 && '...'}
                </pre>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default App
