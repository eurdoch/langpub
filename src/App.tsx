import { useState } from 'react'
import './App.css'
import BookViewer from './components/BookViewer'

function App() {
  const [selectedFile, setSelectedFile] = useState<string | null>(null)
  const [selectedText, setSelectedText] = useState<string | null>(null)
  const [translatedText, setTranslatedText] = useState<string | null>(null)
  const [isTranslating, setIsTranslating] = useState<boolean>(false)

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
  
  const detectAndTranslateText = async (text: string) => {
    if (!text) return
    
    setIsTranslating(true)
    setTranslatedText(null)
    
    try {
      // First detect the language using the API proxy
      const languageResponse = await window.ipcRenderer.apiProxy('/language', 'POST', { text })
      
      if (languageResponse.status !== 200 || !languageResponse.data) {
        throw new Error('Failed to detect language')
      }
      
      const detectedLanguage = languageResponse.data.language
      console.log('Detected language:', detectedLanguage)
      
      // Then translate the text using the API proxy
      const translateResponse = await window.ipcRenderer.apiProxy('/translate', 'POST', { 
        language: detectedLanguage, 
        text 
      })
      
      if (translateResponse.status !== 200 || !translateResponse.data) {
        throw new Error('Failed to translate text')
      }
      
      setTranslatedText(translateResponse.data.translated_text)
    } catch (error) {
      console.error('Translation error:', error)
      setTranslatedText('Translation failed. Please try again.')
    } finally {
      setIsTranslating(false)
    }
  }
  
  const handleTextSelection = (text: string | null) => {
    setSelectedText(text)
    
    if (text) {
      detectAndTranslateText(text)
    } else {
      setTranslatedText(null)
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
              onTextSelection={handleTextSelection} 
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
                  
                  {isTranslating ? (
                    <div className="translation-loading">Translating...</div>
                  ) : translatedText ? (
                    <>
                      <h3>Translated:</h3>
                      <div className="text-snippet translation">{translatedText}</div>
                    </>
                  ) : null}
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
