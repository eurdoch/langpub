import { useState } from 'react'
import './App.css'
import BookViewer from './components/BookViewer'

function App() {
  const [selectedFile, setSelectedFile] = useState<string | null>(null)
  const [selectedText, setSelectedText] = useState<string | null>(null)
  const [translatedText, setTranslatedText] = useState<string | null>(null)
  const [isTranslating, setIsTranslating] = useState<boolean>(false)
  const [bookLanguage, setBookLanguage] = useState<string | null>(null)
  const [isDetectingLanguage, setIsDetectingLanguage] = useState<boolean>(false)

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
  
  const detectBookLanguage = async (sampleText: string) => {
    if (!sampleText) return
    
    setIsDetectingLanguage(true)
    
    try {
      // Detect the book's language using the API proxy
      const languageResponse = await window.ipcRenderer.apiProxy('/language', 'POST', { text: sampleText })
      
      if (languageResponse.status !== 200 || !languageResponse.data) {
        throw new Error('Failed to detect book language')
      }
      
      const detectedLanguage = languageResponse.data.language
      console.log('Detected book language:', detectedLanguage)
      setBookLanguage(detectedLanguage)
    } catch (error) {
      console.error('Language detection error:', error)
      // Set a fallback language if detection fails
      setBookLanguage('Unknown')
    } finally {
      setIsDetectingLanguage(false)
    }
  }
  
  const translateText = async (text: string) => {
    if (!text) return
    
    setIsTranslating(true)
    setTranslatedText(null)
    
    try {
      // If book language hasn't been detected yet or was Unknown,
      // try to detect it from the selected text
      let languageToUse = bookLanguage
      
      if (!languageToUse || languageToUse === 'Unknown') {
        console.log('No book language detected yet, detecting from selection')
        // Call the language detection API 
        const languageResponse = await window.ipcRenderer.apiProxy('/language', 'POST', { text })
        
        if (languageResponse.status === 200 && languageResponse.data) {
          languageToUse = languageResponse.data.language
          // Store this language for future use
          setBookLanguage(languageToUse)
        } else {
          // Default to English if we can't detect the language
          languageToUse = 'English'
        }
      }
      
      // Use the language for translation
      const translateResponse = await window.ipcRenderer.apiProxy('/translate', 'POST', { 
        language: languageToUse, 
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
      translateText(text)
    } else {
      setTranslatedText(null)
    }
  }
  
  const handleBookLoaded = (sampleText: string) => {
    // Only detect language if we haven't already or if we encountered an error
    if (!bookLanguage || bookLanguage === 'Unknown') {
      console.log('Book loaded, extracting language from sample text...')
      detectBookLanguage(sampleText)
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
              onBookLoaded={handleBookLoaded}
            />
          </div>
          <div className="right-panel">
            <div className="panel-header">
              <h2>Translation {bookLanguage && !isDetectingLanguage ? `(${bookLanguage})` : ''}</h2>
            </div>
            <div className="panel-content">
              {selectedText ? (
                <div className="selected-text-panel">
                  <h3>Original:</h3>
                  <div className="text-snippet">{selectedText}</div>
                  
                  {isDetectingLanguage ? (
                    <div className="translation-loading">Detecting book language...</div>
                  ) : isTranslating ? (
                    <div className="translation-loading">Translating...</div>
                  ) : bookLanguage && translatedText ? (
                    <>
                      <h3>Translated:</h3>
                      <div className="text-snippet translation">{translatedText}</div>
                    </>
                  ) : bookLanguage === 'Unknown' ? (
                    <div className="translation-error">
                      Could not detect book language. Translation unavailable.
                    </div>
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
