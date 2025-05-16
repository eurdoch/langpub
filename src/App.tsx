import { useState } from 'react'
import './App.css'
import BookViewer from './components/BookViewer'

function App() {
  const [selectedFile, setSelectedFile] = useState<string | null>(null)
  const [selectedText, setSelectedText] = useState<string | null>(null)

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
        <div className="main-content">
          <div className="viewer-container">
            <BookViewer 
              filePath={selectedFile} 
              onTextSelection={setSelectedText} 
            />
          </div>
          <div className="right-panel">
            <div className="panel-header">
              <h2>Translation</h2>
            </div>
            <div className="panel-content">
              {selectedText ? (
                <div className="selected-text-panel">
                  <h3>Original:</h3>
                  <div className="text-snippet">{selectedText}</div>
                </div>
              ) : (
                <p className="no-selection">Select text from the book to translate it.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
