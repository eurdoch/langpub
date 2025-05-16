import { useState } from 'react'
import './App.css'
import BookViewer from './components/BookViewer'

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
      <div className="header">
        <h1>LangPub EPUB Reader</h1>
        <button onClick={handleOpenFile}>Open EPUB File</button>
      </div>
      
      {!selectedFile ? (
        <div className="welcome">
          <p>Welcome to LangPub! Click the button above to open an EPUB file.</p>
        </div>
      ) : (
        <div className="viewer-container">
          <BookViewer filePath={selectedFile} />
        </div>
      )}
    </div>
  )
}

export default App
