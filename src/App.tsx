import { useState } from 'react'
import './App.css'

function App() {
  const [selectedFile, setSelectedFile] = useState<string | null>(null)

  const handleOpenFile = async () => {
    try {
      const result = await window.ipcRenderer.openFileDialog()
      
      if (!result.canceled && result.filePaths.length > 0) {
        const filePath = result.filePaths[0]
        setSelectedFile(filePath)
        console.log('Selected file:', filePath)
      }
    } catch (error) {
      console.error('Error opening file:', error)
    }
  }

  return (
    <div className="container">
      <h1>LangPub EPUB Reader</h1>
      <button onClick={handleOpenFile}>Open EPUB File</button>
      
      {selectedFile && (
        <div className="file-info">
          <h2>Selected File:</h2>
          <p>{selectedFile}</p>
        </div>
      )}
    </div>
  )
}

export default App
