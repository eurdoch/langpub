import React, { useState, useRef, ChangeEvent } from 'react'
import './App.css'
import BookViewer from './components/BookViewer'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import IconButton from '@mui/material/IconButton'
import CircularProgress from '@mui/material/CircularProgress'
import Button from '@mui/material/Button'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { availableLanguages } from './language'

function App() {
  const [selectedFile, setSelectedFile] = useState<string | null>(null)
  const [selectedText, setSelectedText] = useState<string | null>(null)
  const [translatedText, setTranslatedText] = useState<string | null>(null)
  const [isTranslating, setIsTranslating] = useState<boolean>(false)
  const [bookLanguage, setBookLanguage] = useState<string | null>(null)
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
        
        // Reset language and selected text when loading a new book
        setBookLanguage(null)
        setSelectedText(null)
        setTranslatedText(null)
        setSelectedWord(null)
        setTranslatedWord(null)
        setWordExplanation(null)
        
        // Set the new file path
        setSelectedFile(filePath)
        console.log('Selected file:', filePath)
      }
    } catch (error) {
      console.error('Error opening file:', error)
    }
  }
  
  const translateText = async (text: string) => {
    if (!text) return
      // TODO notify user to select language
    if (!bookLanguage) return
    
    setIsTranslating(true)
    setTranslatedText(null)
    
    // Clear any previous audio
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl)
      setAudioUrl(null)
    }
    
    // Reset audio loading state
    setIsLoadingAudio(false)
    
    try {
      const translateResponse = await window.ipcRenderer.apiProxy('/translate', 'POST', { 
        language: bookLanguage, 
        text 
      })
      
      if (translateResponse.status !== 200 || !translateResponse.data) {
        throw new Error('Failed to translate text')
      }
      
      setTranslatedText(translateResponse.data.translated_text)
      fetchAudio(text, bookLanguage)
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
  
  // Handle language change from the dropdown
  const handleLanguageChange = (event: ChangeEvent<HTMLInputElement> | Event) => {
    const newLanguage = (event.target as HTMLInputElement).value
    
    // Only update if the language has changed
    if (newLanguage !== bookLanguage) {
      console.log('Language changed to:', newLanguage)
      setBookLanguage(newLanguage)
    }
  }

  const handleTextSelection = (text: string | null) => {
    // Only update if text is provided (not null)
    // This allows us to ignore the clearing events and keep the current state
    if (text) {
      // Only update if the text is different from what's already selected
      if (text !== selectedText) {
        setSelectedText(text)
        translateText(text)
      }
    }
    // When text is null, we do nothing - maintaining the current state
  }
  
  const handleWordClick = (word: string) => {
    if (!word || word.trim() === '') return
    
    // Just trim whitespace but preserve internal punctuation
    const trimmedWord = word.trim()
    
    // Only remove punctuation from the start and end of the word
    const cleanWord = trimmedWord
      .replace(/^[^\wÀ-ÿ\u00C0-\u017F]+/, '') // Remove leading punctuation
      .replace(/[^\wÀ-ÿ\u00C0-\u017F]+$/, '') // Remove trailing punctuation
    
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
  
  const translateWord = async (word: string, forcedLanguage?: string) => {
    if (!word) return
    
    // Use forced language or bookLanguage
    const languageToUse = forcedLanguage || bookLanguage
    
    // If we still don't have a language, we can't translate
    if (!languageToUse) return
    
    setIsTranslatingWord(true)
    setTranslatedWord(null)
    
    try {
      // Use the API to translate just this word
      const translateResponse = await window.ipcRenderer.apiProxy('/translate', 'POST', { 
        language: languageToUse, 
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
  
  const fetchWordAudio = async (word: string, forcedLanguage?: string) => {
    if (!word) return
    
    // Use forced language or bookLanguage
    const languageToUse = forcedLanguage || bookLanguage
    
    // If we still don't have a language, we can't get audio
    if (!languageToUse) return
    
    setIsLoadingWordAudio(true)
    
    // Clear any previous audio
    if (wordAudioUrl) {
      URL.revokeObjectURL(wordAudioUrl)
      setWordAudioUrl(null)
    }
    
    try {
      // Use the speech endpoint to get audio for just this word
      const speechResponse = await window.ipcRenderer.apiProxy('/speech', 'POST', {
        language: languageToUse,
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
              setBookLanguage={setBookLanguage}
            />
          </div>
          <div className="right-panel">
            <div className="panel-header">
              <h2>Translation</h2>
              <div className="language-selector">
                <Select
                  onChange={handleLanguageChange}
                  value={bookLanguage}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Language' }}
                  className="language-select"
                >
                  {availableLanguages.map((language) => (
                    <MenuItem key={language} value={language}>
                      {language}
                    </MenuItem>
                  ))}
                </Select>
              </div>
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
                        ) : audioUrl ? (
                          <IconButton 
                            aria-label="play audio" 
                            onClick={playAudio}
                            size="small"
                            className="play-button"
                          >
                            <VolumeUpIcon />
                          </IconButton>
                        ) : null}
                      </div>
                    )}
                  </div>
                  <div className="text-snippet">
                    {selectedText && selectedText.split(/\s+/).map((word, index, array) => {
                      const isLastWord = index === array.length - 1
                      
                      // Check if the word has any alphanumeric characters
                      if (/[\wÀ-ÿ\u00C0-\u017F]/.test(word)) {
                        // Extract leading and trailing punctuation
                        const match = word.match(/^([^\wÀ-ÿ\u00C0-\u017F]*)(.+?)([^\wÀ-ÿ\u00C0-\u017F]*)$/)
                        
                        if (match) {
                          const [, leadingPunct, actualWord, trailingPunct] = match
                          return (
                            <React.Fragment key={index}>
                              {leadingPunct}
                              <span 
                                className="clickable-word"
                                onClick={() => handleWordClick(actualWord)}
                              >
                                {actualWord}
                              </span>
                              {trailingPunct}
                              {!isLastWord && ' '}
                            </React.Fragment>
                          )
                        }
                      }
                      
                      // If there's no match (e.g., just punctuation), render without click handler
                      return (
                        <React.Fragment key={index}>
                          <span>{word}</span>
                          {!isLastWord && ' '}
                        </React.Fragment>
                      )
                    })}
                  </div>
                  <audio ref={audioRef} src={audioUrl || ''} />{/* Hidden audio element */}
                  
                  {isTranslating ? (
                    <div className="translation-loading">Translating...</div>
                  ) : (
                    <>
                      <h3>Translated:</h3>
                      <div className="text-snippet translation">{translatedText}</div>
                    </>
                  )}
                  
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
