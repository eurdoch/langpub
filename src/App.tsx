import React, { useState, useRef } from 'react'
import './App.css'
import BookViewer from './components/BookViewer'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import IconButton from '@mui/material/IconButton'
import CircularProgress from '@mui/material/CircularProgress'
import Button from '@mui/material/Button'

function App() {
  const [selectedFile, setSelectedFile] = useState<string | null>(null)
  const [selectedText, setSelectedText] = useState<string | null>(null)
  const [translatedText, setTranslatedText] = useState<string | null>(null)
  const [isTranslating, setIsTranslating] = useState<boolean>(false)
  const [bookLanguage, setBookLanguage] = useState<string | null>(null)
  const [isDetectingLanguage, setIsDetectingLanguage] = useState<boolean>(false)
  const [isLoadingAudio, setIsLoadingAudio] = useState<boolean>(false)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  
  // Word details states
  const [selectedWord, setSelectedWord] = useState<string | null>(null)
  const [translatedWord, setTranslatedWord] = useState<string | null>(null)
  const [isTranslatingWord, setIsTranslatingWord] = useState<boolean>(false)
  const [wordAudioUrl, setWordAudioUrl] = useState<string | null>(null)
  const [isLoadingWordAudio, setIsLoadingWordAudio] = useState<boolean>(false)
  const wordAudioRef = useRef<HTMLAudioElement | null>(null)
  
  // Word explanation states
  const [wordExplanation, setWordExplanation] = useState<string | null>(null)
  const [isExplainingWord, setIsExplainingWord] = useState<boolean>(false)

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
    
    // Clear any previous audio
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl)
      setAudioUrl(null)
    }
    
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
      
      // Also fetch the audio in the background
      fetchAudio(text, languageToUse)
    } catch (error) {
      console.error('Translation error:', error)
      setTranslatedText('Translation failed. Please try again.')
    } finally {
      setIsTranslating(false)
    }
  }
  
  const fetchAudio = async (text: string, language: string) => {
    try {
      setIsLoadingAudio(true)
      
      // Use the speech endpoint to get audio
      const speechResponse = await window.ipcRenderer.apiProxy('/speech', 'POST', {
        language,
        text
      })
      
      if (speechResponse.status === 200) {
        // The response is an ArrayBuffer containing the MP3 data
        // First convert the response data to a Uint8Array
        const base64String = speechResponse.data
        
        // Check if the response is already binary or if it's a base64 string
        let audioData
        if (typeof base64String === 'string') {
          const binaryString = atob(base64String)
          const bytes = new Uint8Array(binaryString.length)
          for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i)
          }
          audioData = bytes
        } else {
          // Handle case where data is already a binary format
          audioData = new Uint8Array(base64String)
        }
        
        // Create a blob and an object URL
        const blob = new Blob([audioData], { type: 'audio/mp3' })
        const url = URL.createObjectURL(blob)
        setAudioUrl(url)
        
        console.log('Audio fetched successfully')
      } else {
        console.error('Error fetching audio:', speechResponse)
      }
    } catch (error) {
      console.error('Error fetching audio:', error)
    } finally {
      setIsLoadingAudio(false)
    }
  }
  
  const playAudio = () => {
    if (audioRef.current && audioUrl) {
      audioRef.current.play()
    } else if (selectedText && bookLanguage) {
      // If audio hasn't been fetched yet, fetch it now
      fetchAudio(selectedText, bookLanguage)
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
  
  const handleWordClick = (word: string) => {
    if (!word || word.trim() === '') return
    
    // Clean the word (should be already clean from the regex, but just to be safe)
    const cleanWord = word.trim().replace(/[.,!?;:""''()[\]{}]/g, '')
    if (cleanWord === '') return
    
    console.log('Clicked word:', cleanWord)
    
    // Reset explanation
    setWordExplanation(null)
    
    // Set the selected word
    setSelectedWord(cleanWord)
    
    // Translate the word
    translateWord(cleanWord)
    
    // Get audio for the word
    fetchWordAudio(cleanWord)
  }
  
  const translateWord = async (word: string) => {
    if (!word || !bookLanguage) return
    
    setIsTranslatingWord(true)
    setTranslatedWord(null)
    
    try {
      // Use the API to translate just this word
      const translateResponse = await window.ipcRenderer.apiProxy('/translate', 'POST', { 
        language: bookLanguage, 
        text: word 
      })
      
      if (translateResponse.status === 200 && translateResponse.data) {
        setTranslatedWord(translateResponse.data.translated_text)
      } else {
        throw new Error('Failed to translate word')
      }
    } catch (error) {
      console.error('Word translation error:', error)
      setTranslatedWord('Translation failed')
    } finally {
      setIsTranslatingWord(false)
    }
  }
  
  const fetchWordAudio = async (word: string) => {
    if (!word || !bookLanguage) return
    
    setIsLoadingWordAudio(true)
    
    // Clear any previous audio
    if (wordAudioUrl) {
      URL.revokeObjectURL(wordAudioUrl)
      setWordAudioUrl(null)
    }
    
    try {
      // Use the speech endpoint to get audio for just this word
      const speechResponse = await window.ipcRenderer.apiProxy('/speech', 'POST', {
        language: bookLanguage,
        text: word
      })
      
      if (speechResponse.status === 200) {
        // Process the audio data similarly to the fetchAudio function
        const base64String = speechResponse.data
        
        let audioData
        if (typeof base64String === 'string') {
          const binaryString = atob(base64String)
          const bytes = new Uint8Array(binaryString.length)
          for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i)
          }
          audioData = bytes
        } else {
          audioData = new Uint8Array(base64String)
        }
        
        const blob = new Blob([audioData], { type: 'audio/mp3' })
        const url = URL.createObjectURL(blob)
        setWordAudioUrl(url)
        
        console.log('Word audio fetched successfully')
      }
    } catch (error) {
      console.error('Error fetching word audio:', error)
    } finally {
      setIsLoadingWordAudio(false)
    }
  }
  
  const playWordAudio = () => {
    if (wordAudioRef.current && wordAudioUrl) {
      wordAudioRef.current.play()
    }
  }
  
  const explainWord = async () => {
    if (!selectedWord || !bookLanguage) return
    
    setIsExplainingWord(true)
    setWordExplanation(null)
    
    try {
      // Use the explain endpoint to get an explanation for the word
      const explainResponse = await window.ipcRenderer.apiProxy('/explain', 'POST', {
        word: selectedWord,
        language: bookLanguage
      })
      
      if (explainResponse.status === 200 && explainResponse.data) {
        setWordExplanation(explainResponse.data.explanation)
      } else {
        throw new Error('Failed to get word explanation')
      }
    } catch (error) {
      console.error('Word explanation error:', error)
      setWordExplanation('Could not get explanation for this word.')
    } finally {
      setIsExplainingWord(false)
    }
  }

  return (
    <div className="container">
      <div className="header">
        <button onClick={handleOpenFile} className="open-epub-button">Open Epub</button>
      </div>
      
      {!selectedFile ? (
        <div className="welcome">
          <p>Welcome to LangPub! Click the Open Epub button to get started.</p>
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
                  <div className="snippet-header">
                    <h3>Original:</h3>
                    {bookLanguage && (
                      <div className="audio-controls">
                        {isLoadingAudio ? (
                          <CircularProgress size={24} />
                        ) : (
                          <IconButton 
                            aria-label="play audio" 
                            onClick={playAudio}
                            disabled={!bookLanguage || isLoadingAudio}
                            size="small"
                            className="play-button"
                          >
                            <VolumeUpIcon />
                          </IconButton>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="text-snippet">
                    {selectedText && selectedText.split(/\s+/).map((word, index, array) => {
                      // Split the word into the actual word and any punctuation that follows
                      const match = word.match(/^([\wÀ-ÿ\u00C0-\u017F]+)(.*)$/)
                      
                      const isLastWord = index === array.length - 1
                      
                      if (match) {
                        const [, actualWord, punctuation] = match
                        return (
                          <React.Fragment key={index}>
                            <span 
                              className="clickable-word"
                              onClick={() => handleWordClick(actualWord)}
                            >
                              {actualWord}
                            </span>
                            {punctuation}
                            {!isLastWord && ' '}
                          </React.Fragment>
                        )
                      } else {
                        // If there's no match (e.g., just punctuation), render without click handler
                        return (
                          <React.Fragment key={index}>
                            <span>{word}</span>
                            {!isLastWord && ' '}
                          </React.Fragment>
                        )
                      }
                    })}
                  </div>
                  <audio ref={audioRef} src={audioUrl || ''} />{/* Hidden audio element */}
                  
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
                  
                  {/* Word details section */}
                  {selectedWord && (
                    <div className="word-details">
                      <h3>Word Details</h3>
                      <div className="word-details-content">
                        <div className="word-row">
                          <div className="word-original">
                            <span className="word-label">Original:</span>
                            <span className="word-value">{selectedWord}</span>
                            <IconButton 
                              aria-label="play word audio" 
                              onClick={playWordAudio}
                              disabled={!wordAudioUrl || isLoadingWordAudio}
                              size="small"
                              className="word-play-button"
                            >
                              {isLoadingWordAudio ? (
                                <CircularProgress size={18} />
                              ) : (
                                <VolumeUpIcon fontSize="small" />
                              )}
                            </IconButton>
                          </div>
                          <div className="word-translation">
                            <span className="word-label">Translation:</span>
                            {isTranslatingWord ? (
                              <span className="word-loading">Translating...</span>
                            ) : (
                              <span className="word-value">{translatedWord}</span>
                            )}
                          </div>
                        </div>
                        
                        {!wordExplanation && !isExplainingWord && (
                          <div className="word-explanation-button-container">
                            <Button 
                              variant="outlined" 
                              size="small" 
                              onClick={explainWord}
                              startIcon={<InfoOutlinedIcon />}
                              className="explain-button"
                            >
                              Explain this word
                            </Button>
                          </div>
                        )}
                        
                        {isExplainingWord && (
                          <div className="word-explanation-loading">
                            <CircularProgress size={20} />
                            <span>Getting explanation...</span>
                          </div>
                        )}
                        
                        {wordExplanation && (
                          <div className="word-explanation">
                            <h4>Explanation:</h4>
                            <div className="explanation-content">
                              {wordExplanation}
                            </div>
                          </div>
                        )}
                      </div>
                      <audio ref={wordAudioRef} src={wordAudioUrl || ''} />
                    </div>
                  )}
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
