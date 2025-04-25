import { useState } from 'react'
import './App.css'

function App() {
  const [selectedFilePath, setSelectedFilePath] = useState<string | null>(null)

  const handleOpenDialog = async () => {
    try {
      // Open dialog to select only EPUB files
      const filePath = await window.electron.openFileDialog([{ name: 'EPUB Files', extensions: ['epub'] }])
      if (filePath) {
        setSelectedFilePath(filePath)
        console.log('File selected:', filePath)
      }
    } catch (error) {
      console.error('Error selecting file:', error)
    }
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-100">
      <div className="rounded-lg bg-white p-8 shadow-md">
        <button
          onClick={handleOpenDialog}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Open Epub
        </button>
        
        {selectedFilePath && (
          <div className="mt-4 text-sm text-gray-600">
            Selected: {selectedFilePath}
          </div>
        )}
      </div>
    </div>
  )
}

export default App
