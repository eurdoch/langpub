import { useState, useEffect, useCallback, useRef } from 'react'
import './App.css'

const API_BASE_URL = 'https://langpub.directto.link'

// Function to detect language of text using Electron's net module
async function detectLanguage(text: string): Promise<string> {
  try {
    console.log('Detecting language using Electron net module')
    const data = await window.electron.apiRequest(
      `${API_BASE_URL}/language`,
      'POST',
      { text }
    )
    
    console.log('Detected language:', data.language)
    return data.language
  } catch (error) {
    console.error('Error detecting language:', error)
    return 'Unknown' // Default fallback
  }
}

// Function to translate text to English using Electron's net module
async function translateText(text: string, language: string): Promise<string> {
  try {
    console.log('Translating text using Electron net module')
    const data = await window.electron.apiRequest(
      `${API_BASE_URL}/translate`,
      'POST',
      { 
        text,
        language,
      }
    )
    
    return data.translated_text
  } catch (error) {
    console.error('Error translating text:', error)
    return `[Translation failed: ${error}]` // Error message as fallback
  }
}

// Function to get details about a word
async function explainWord(word: string, language: string): Promise<string> {
  try {
    console.log(`Looking up details for "${word}" in ${language}`)
    
    const data = await window.electron.apiRequest(
      `${API_BASE_URL}/explain`,
      'POST',
      {
        word,
        language,
      }
    )
    
    return data.explanation || 'No explanation available'
  } catch (error) {
    console.error('Error explaining word:', error)
    return `Unable to get details for "${word}": ${error}`
  }
}

// Function to generate speech audio for text using Electron's net module
async function generateSpeech(text: string, language: string): Promise<HTMLAudioElement | null> {
  try {
    console.log('Generating speech for text:', text.substring(0, 50) + '...')
    console.log('Language for speech:', language)
    
    // Check if language is in expected format (likely the cause of 400 error)
    let processedLanguage = language
    
    // Handle common language code formats and convert to expected language names
    const languageMap: Record<string, string> = {
      'en': 'English',
      'en-us': 'English',
      'en-gb': 'English',
      'fr': 'French',
      'fr-fr': 'French',
      'de': 'German',
      'de-de': 'German',
      'es': 'Spanish',
      'es-es': 'Spanish',
      'it': 'Italian',
      'it-it': 'Italian',
      'ja': 'Japanese',
      'jp': 'Japanese',
      'zh': 'Chinese',
      'zh-cn': 'Chinese',
      'pt': 'Portuguese',
      'pt-br': 'Portuguese',
      'nl': 'Dutch'
    }
    
    // Convert language code to language name if needed
    const lowerLang = language.toLowerCase()
    if (languageMap[lowerLang]) {
      processedLanguage = languageMap[lowerLang]
      console.log(`Converting language code "${language}" to language name "${processedLanguage}"`)
    }
    
    // Speech API URL
    const speechApiUrl = `${API_BASE_URL}/speech`
    
    try {
      // Make request to speech API using Electron's net module
      console.log('Sending request to speech API:', {
        url: speechApiUrl,
        language: processedLanguage,
        textLength: text.length
      })
      
      const response = await window.electron.apiRequest(
        speechApiUrl,
        'POST',
        { 
          text,
          language: processedLanguage,
        },
        true // Signal that we expect binary data
      )
            
      if (!response) {
        console.error('Speech generation failed: No response data received')
        return null
      }
      
      console.log('Response type:', typeof response)
      
      const binaryString = atob(response.data);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
      }

      // Create a Blob from the binary data
      const blob = new Blob([bytes], { type: 'audio/mpeg' });

      // Create an audio URL
      const audioUrl = URL.createObjectURL(blob);

      // Play the audio
      const audio = new Audio(audioUrl);
      return audio;
    } catch (apiError) {
      console.error('Error calling speech API:', apiError)
      
      // Implement fallback behavior
      console.log('Using fallback method for speech generation')
      
      // For demonstration, we'll return null for now
      // In a production app, you might implement additional fallback methods
      return null
    }
  } catch (error) {
    console.error('Error in generateSpeech function:', error)
    return null
  }
}

// Helper function to convert base64 to Blob
function base64ToBlob(base64: string, mimeType: string): Blob {
  try {
    // Make sure we have a valid base64 string
    if (!base64 || typeof base64 !== 'string') {
      console.error('Invalid base64 data:', typeof base64)
      throw new Error('Invalid base64 data')
    }
    
    // Remove any data URL prefix if present
    let cleanBase64 = base64
    if (base64.includes(',')) {
      cleanBase64 = base64.split(',')[1]
      console.log('Removed data URL prefix from base64 string')
    }
    
    // Parse the base64 data
    const byteCharacters = atob(cleanBase64)
    console.log(`Decoded base64 string, length: ${byteCharacters.length} bytes`)
    
    const byteArrays = []
    const sliceSize = 1024
    
    // Process in slices to handle larger files
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize)
      const byteNumbers = new Array(slice.length)
      
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i)
      }
      
      byteArrays.push(new Uint8Array(byteNumbers))
    }
    
    // Create and return a Blob from all the typed array chunks
    const blob = new Blob(byteArrays, { type: mimeType })
    console.log(`Created Blob of type ${mimeType}, size: ${blob.size} bytes`)
    return blob
  } catch (error) {
    console.error('Error converting base64 to Blob:', error)
    // Return a minimal valid audio blob as a fallback
    return new Blob([''], { type: mimeType })
  }
}

interface ParsedContent {
  title: string
  bodyText: string | null
  htmlContent: string | null
  styles: string[]
  cssFiles: CssFile[]
  error?: string
}

function App() {
  const [selectedFilePath, setSelectedFilePath] = useState<string | null>(null)
  const [epubContents, setEpubContents] = useState<EpubContents | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [spineItemsContent, setSpineItemsContent] = useState<Record<string, ParsedContent>>({})
  const [loadingItems, setLoadingItems] = useState<Record<string, boolean>>({})
  
  // State for tracking selected and translated text
  const [selectedText, setSelectedText] = useState<string>('')
  const [detectedLanguage, setDetectedLanguage] = useState<string>('')
  const [translatedText, setTranslatedText] = useState<string>('')
  const [isTranslating, setIsTranslating] = useState<boolean>(false)
  
  // State for audio playback
  const [isGeneratingSpeech, setIsGeneratingSpeech] = useState<boolean>(false)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  
  // State for word selection
  const [selectedWord, setSelectedWord] = useState<string>('')
  const [wordDetails, setWordDetails] = useState<string>('')
  const [wordAudio, setWordAudio] = useState<HTMLAudioElement | null>(null)
  const [isGeneratingWordSpeech, setIsGeneratingWordSpeech] = useState<boolean>(false)
  const [isPlayingWordAudio, setIsPlayingWordAudio] = useState<boolean>(false)
  
  // Handle text selection with language detection and translation
  const handleMouseUp = useCallback(async (event?: React.MouseEvent) => {
    // Ignore mouseup events from the play button
    if (event?.target instanceof HTMLButtonElement && 
        event.target.closest('button')?.title?.includes('audio')) {
      console.log('Ignoring mouseup from play/pause button')
      return
    }
    
    const selection = window.getSelection()
    if (selection && selection.toString().trim().length > 0) {
      const selectedTextContent = selection.toString().trim()
      
      // Update selected text state
      setSelectedText(selectedTextContent)
      console.log('Selected text:', selectedTextContent)
      
      // Get the range and its bounding rectangle for position information
      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0)
        const rect = range.getBoundingClientRect()
        console.log('Selection position:', {
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height
        })
        
        // Get selection context (parent element information)
        const parentNode = range.startContainer.parentNode as HTMLElement
        if (parentNode) {
          console.log('Selection parent element:', parentNode.tagName)
          console.log('Selection parent classes:', parentNode.className)
        }
        
        try {
          // Start translation process
          setIsTranslating(true)
          
          // Check if we have language info from the EPUB metadata
          let detectedLang = 'Unknown'
          
          if (epubContents?.metadata?.language) {
            // Use language from EPUB metadata if available
            detectedLang = epubContents.metadata.language
            setDetectedLanguage(detectedLang)
            console.log('Using language from EPUB metadata:', detectedLang)
          } else {
            // Detect language using API
            console.log('Detecting language...')
            detectedLang = await detectLanguage(selectedTextContent)
            setDetectedLanguage(detectedLang)
          }
          
          // Stop any currently playing audio
          if (audioRef.current) {
            audioRef.current.pause()
          }
          
          // Start generating speech
          setIsGeneratingSpeech(true)
          
          // Generate speech in parallel with translation
          const speech = await generateSpeech(selectedTextContent, detectedLang)
          if (speech) {
            speech.onended = () => {
              setIsPlaying(false);
            };
          }
          audioRef.current = speech;
          
          setIsGeneratingSpeech(false);

          // Only translate if not already English
          let translated = selectedTextContent // Default to original text
          
          if (detectedLang.toLowerCase() !== 'english' && 
              detectedLang.toLowerCase() !== 'en' && 
              detectedLang.toLowerCase() !== 'en-us') {
            
            console.log('Translating from', detectedLang, 'to English...')
            translated = await translateText(selectedTextContent, detectedLang)
            
            console.log('Translation:', {
              original: selectedTextContent,
              language: detectedLang,
              translated: translated
            })
          } else {
            console.log('Text is already in English, no translation needed')
          }
          
          // Update state with translation
          setTranslatedText(translated)
          setIsTranslating(false)
          
          // Clear selection after processing to avoid duplicate processing
          if (window.getSelection) {
            if (window.getSelection()?.empty) {  // Chrome
              window.getSelection()?.empty()
            } else if (window.getSelection()?.removeAllRanges) {  // Firefox
              window.getSelection()?.removeAllRanges()
            }
          }
          
        } catch (error) {
          console.error('Error processing text selection:', error)
          setIsTranslating(false)
          setIsGeneratingSpeech(false)
        }
      }
    }
  }, [epubContents?.metadata?.language])
  
  // Add a document-level listener as a fallback
  useEffect(() => {
    // This handles selections that might happen outside our main content area
    document.addEventListener('mouseup', handleMouseUp)
    
    return () => {
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [handleMouseUp])
  
  // Clean up any resources when component unmounts
  useEffect(() => {
    return () => {
      // No cleanup needed since we're directly using Audio objects now
    }
  }, [])
  
  // Function to toggle audio playback for full text
  const toggleAudio = useCallback(async () => {
    console.log('Toggle full text audio called')
    
    if (!audioRef.current) {
      console.error('Cannot play audio: No audio reference available')
      return
    }
    
    const audio = audioRef.current
    
    try {
      if (isPlaying) {
        console.log('Pausing audio playback')
        audio.pause()
        setIsPlaying(false)
      } else {
        console.log('Starting audio playback attempt')
        
        try {
          // We'll attempt to play in a separate try/catch
          console.log('Attempting to play audio...')
          await audio.play()
          console.log('Audio playback started successfully!')
          setIsPlaying(true)
        } catch (playError) {
          console.error('Error playing audio:', playError)
          
          // Detailed diagnostics
          console.log('Audio element diagnostics:', {
            currentSrc: audio.currentSrc,
            networkState: audio.networkState, // NETWORK_EMPTY, NETWORK_IDLE, NETWORK_LOADING, NETWORK_NO_SOURCE
            readyState: audio.readyState,     // HAVE_NOTHING, HAVE_METADATA, HAVE_CURRENT_DATA, HAVE_FUTURE_DATA, HAVE_ENOUGH_DATA
            error: audio.error?.code,        // MEDIA_ERR_ABORTED, MEDIA_ERR_NETWORK, MEDIA_ERR_DECODE, MEDIA_ERR_SRC_NOT_SUPPORTED
            errorMessage: audio.error?.message
          })
          
          // Let's try one more time with a slight delay
          setTimeout(() => {
            console.log('Retrying audio playback after delay...')
            audio.play()
              .then(() => {
                console.log('Retry successful')
                setIsPlaying(true)
              })
              .catch(retryError => {
                console.error('Retry also failed:', retryError)
              })
          }, 500)
        }
      }
    } catch (error) {
      console.error('Unexpected error in toggleAudio:', error)
    }
  }, [isPlaying])
  
  // Function to toggle word audio playback
  const toggleWordAudio = useCallback(async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    console.log('Toggle word audio called')
    
    if (!wordAudio) {
      console.error('Cannot play word audio: No audio reference available')
      return
    }
    
    try {
      if (isPlayingWordAudio) {
        console.log('Pausing word audio playback')
        wordAudio.pause()
        setIsPlayingWordAudio(false)
      } else {
        console.log('Starting word audio playback')
        
        // Make sure the word audio is at the beginning
        wordAudio.currentTime = 0
        
        try {
          await wordAudio.play()
          console.log('Word audio playback started successfully')
          setIsPlayingWordAudio(true)
          
          // Auto-reset when audio ends
          wordAudio.onended = () => {
            console.log('Word audio playback ended')
            setIsPlayingWordAudio(false)
          }
        } catch (playError) {
          console.error('Error playing word audio:', playError)
          setIsPlayingWordAudio(false)
        }
      }
    } catch (error) {
      console.error('Unexpected error in toggleWordAudio:', error)
    }
  }, [wordAudio, isPlayingWordAudio])
  
  // Function to parse HTML content in the browser
  const parseHtmlContent = (result: SpineItemContent): ParsedContent => {
    try {
      if (!result.success || !result.content) {
        throw new Error(result.error || 'No content provided')
      }
      
      const html = result.content
      
      // Create a DOM parser
      const parser = new DOMParser()
      const doc = parser.parseFromString(html, 'text/html')
      
      // Extract title
      const title = doc.querySelector('title')?.textContent || 'No title'
      
      // Extract body text
      const body = doc.querySelector('body')
      const bodyText = body ? body.textContent : null
      
      // Extract all CSS styles
      const styles: string[] = []
      
      // Get inline styles
      const styleElements = doc.querySelectorAll('style')
      styleElements.forEach(styleEl => {
        if (styleEl.textContent) {
          styles.push(styleEl.textContent)
        }
      })
      
      // Get linked stylesheets
      const linkElements = doc.querySelectorAll('link[rel="stylesheet"]')
      linkElements.forEach(linkEl => {
        const href = linkEl.getAttribute('href')
        if (href) {
          console.log('Found linked stylesheet:', href)
          styles.push(`/* External stylesheet: ${href} */`)
        }
      })
      
      // Get the HTML content of the body for rendering
      const htmlContent = body ? body.innerHTML : null
      
      // Include external CSS files from result
      const cssFiles = result.cssFiles || []
      console.log(`Including ${cssFiles.length} CSS files with content`)
      
      return { 
        title, 
        bodyText: bodyText ? 
          (bodyText.substring(0, 300) + (bodyText.length > 300 ? '...' : '')) : 
          null,
        htmlContent,
        styles,
        cssFiles
      }
    } catch (error) {
      console.error('Error parsing HTML:', error)
      return { 
        title: 'Parse Error', 
        bodyText: null,
        htmlContent: null,
        styles: [],
        cssFiles: [],
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }

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
        
        // Automatically load all spine items
        if (contents.spine && contents.spine.length > 0) {
          // Reset content if we load a new book
          setSpineItemsContent({})
          
          // Track which items are loading
          const newLoadingItems: Record<string, boolean> = {}
          
          // Load all spine items
          const loadPromises = contents.spine.map(async (item) => {
            try {
              newLoadingItems[item.fullPath] = true
              
              const result = await window.electron.getSpineItemContent(item.fullPath)
              if (result.success) {
                const parsed = parseHtmlContent(result)
                setSpineItemsContent(prev => ({ 
                  ...prev, 
                  [item.fullPath]: parsed 
                }))
              } else {
                console.error(`Error loading spine item ${item.fullPath}:`, result.error)
                setSpineItemsContent(prev => ({ 
                  ...prev, 
                  [item.fullPath]: { 
                    title: 'Error', 
                    bodyText: null, 
                    htmlContent: null,
                    styles: [],
                    cssFiles: [],
                    error: result.error || 'Unknown error' 
                  } 
                }))
              }
              
              newLoadingItems[item.fullPath] = false
            } catch (error) {
              console.error(`Error processing spine item ${item.fullPath}:`, error)
              newLoadingItems[item.fullPath] = false
            }
          })
          
          setLoadingItems(newLoadingItems)
          
          // Wait for all spine items to load
          await Promise.all(loadPromises)
        }
        
        setIsLoading(false)
      }
    } catch (error) {
      console.error('Error processing EPUB:', error)
      setIsLoading(false)
    }
  }

  return (
    <div className="flex h-screen w-screen bg-white overflow-hidden">
      {/* Main container with two columns */}
      <div className="flex flex-row w-full h-full">
        {/* Left column with book content - shared header */}
        <div className="w-3/4 h-full flex flex-col">
          {/* Content area */}
          <main 
            className="flex-1 overflow-auto p-4"
            onMouseUp={(e) => handleMouseUp(e)}
          >
            {isLoading ? (
              <div className="h-full flex items-center justify-center">
                <p className="text-lg">Loading EPUB...</p>
              </div>
            ) : epubContents && epubContents.spine ? (
              <div>
                {epubContents.metadata && (
                  <div className="flex justify-between items-center mb-4">
                    <h1 className="text-xl font-bold">
                      {epubContents.metadata.title}
                    </h1>
                    <button
                      onClick={handleOpenDialog}
                      className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded text-sm"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Loading...' : 'Open Book'}
                    </button>
                  </div>
                )}
                
                {/* Render all spine items in reading order */}
                {epubContents.spine.map((item, index) => (
                  <div key={index} className="mb-12 border-b border-gray-200 pb-8">
                    {/* Apply styles for this spine item */}
                    {spineItemsContent[item.fullPath] && spineItemsContent[item.fullPath].styles && 
                     spineItemsContent[item.fullPath].styles.length > 0 && (
                      <style>
                        {spineItemsContent[item.fullPath].styles.join('\n')}
                      </style>
                    )}
                    
                    {/* Apply CSS from external files */}
                    {spineItemsContent[item.fullPath] && spineItemsContent[item.fullPath].cssFiles && 
                     spineItemsContent[item.fullPath].cssFiles.map((cssFile, cssIndex) => (
                      <style key={cssIndex} data-source={cssFile.path}>
                        {cssFile.content}
                      </style>
                    ))}
                    
                    {/* Render HTML content with styles */}
                    {loadingItems[item.fullPath] ? (
                      <div className="py-4 text-center text-gray-500">Loading chapter...</div>
                    ) : spineItemsContent[item.fullPath] && spineItemsContent[item.fullPath].htmlContent ? (
                      <div 
                        className="epub-content" 
                        dangerouslySetInnerHTML={{ __html: spineItemsContent[item.fullPath].htmlContent }}
                      />
                    ) : spineItemsContent[item.fullPath] && spineItemsContent[item.fullPath].error ? (
                      <div className="py-4 text-center text-red-500">
                        Error loading chapter: {spineItemsContent[item.fullPath].error}
                      </div>
                    ) : (
                      <div className="py-4 text-center text-gray-500">Waiting to load chapter...</div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center">
                <p className="text-lg text-gray-500 mb-4">Open an EPUB file to begin</p>
                <button
                  onClick={handleOpenDialog}
                  className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded"
                >
                  Open EPUB
                </button>
              </div>
            )}
          </main>
        </div>
        
        {/* Right column for translations */}
        <div className="w-1/4 h-full flex flex-col border-l border-gray-300 bg-gray-50">
          <header className="bg-blue-600 p-3 text-white font-medium">
            Translation Panel
          </header>
          
          <div className="flex-1 overflow-auto p-4">
            {isTranslating ? (
              <div className="animate-pulse p-4 rounded-lg bg-white shadow mb-4">
                <p className="text-gray-500">Translating...</p>
              </div>
            ) : selectedText ? (
              <div className="p-4 rounded-lg bg-white shadow mb-4">
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="text-sm text-gray-500 font-medium">Original ({detectedLanguage})</h3>
                    {isGeneratingSpeech ? (
                      <span className="text-xs text-blue-500 animate-pulse">Generating audio...</span>
                    ) : (
                      <button 
                        type="button"
                        className={`text-white text-xs px-3 py-1 rounded-full flex items-center gap-1 ${audioRef.current ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400'}`}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleAudio();
                        }}
                        title={isPlaying ? "Pause audio" : "Play audio"}
                        disabled={!audioRef.current}
                      >
                        {isPlaying ? (
                          <>
                            <span className="text-lg">❚❚</span>
                            <span>Pause</span>
                          </>
                        ) : (
                          <>
                            <span className="text-lg">▶</span>
                            <span>Play</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                  <p className="text-gray-800 break-words">
                    {selectedText.split(/\s+/).map((word, index) => (
                      <span key={`word-${index}`}>
                        <span 
                          className={`cursor-pointer ${selectedWord === word ? 'bg-blue-100 font-bold' : 'hover:bg-gray-100'}`}
                          onClick={async () => {
                            setSelectedWord(word);
                            setWordDetails(''); // Clear any previous explanation
                            
                            try {
                              setIsGeneratingWordSpeech(true);
                              
                              // Only generate speech, don't fetch explanation yet
                              const audio = await generateSpeech(word, detectedLanguage);
                              setWordAudio(audio);
                              setIsGeneratingWordSpeech(false);
                            } catch (error) {
                              console.error('Error generating speech for word:', error);
                              setIsGeneratingWordSpeech(false);
                            }
                          }}
                        >
                          {word}
                        </span>
                        {index < selectedText.split(/\s+/).length - 1 ? ' ' : ''}
                      </span>
                    ))}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-sm text-gray-500 font-medium mb-1">Translation (English)</h3>
                  <p className="text-gray-800 break-words">{translatedText}</p>
                </div>
                
                {/* Word Explorer display */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h3 className="text-sm text-gray-500 font-medium mb-2">Word Explorer</h3>
                  
                  {/* Word details box */}
                  {selectedWord ? (
                    <div className="bg-white rounded-md p-4 border border-gray-200 shadow-sm">
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center gap-2">
                          <div className="px-3 py-1 bg-blue-100 rounded-md">
                            <h4 className="text-md font-bold text-blue-800">{selectedWord}</h4>
                          </div>
                          
                          {isGeneratingWordSpeech ? (
                            <span className="text-xs text-blue-500 animate-pulse">Generating audio...</span>
                          ) : wordAudio ? (
                            <button 
                              type="button"
                              className={`text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 ${
                                isPlayingWordAudio ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
                              }`}
                              onClick={toggleWordAudio}
                              title={isPlayingWordAudio ? "Pause word audio" : "Play word audio"}
                            >
                              {isPlayingWordAudio ? (
                                <>
                                  <span className="text-sm">❚❚</span>
                                </>
                              ) : (
                                <>
                                  <span className="text-sm">▶</span>
                                </>
                              )}
                            </button>
                          ) : null}
                        </div>
                        
                        <div>
                          {wordDetails === 'Loading...' ? (
                            <span className="text-xs text-blue-500 animate-pulse">Looking up...</span>
                          ) : (
                            <button 
                              type="button"
                              className="text-xs text-white bg-green-600 hover:bg-green-700 px-2 py-1 rounded-md flex items-center gap-1"
                              onClick={async () => {
                                if (!selectedWord) return;
                                
                                setWordDetails('Loading...');
                                try {
                                  const details = await explainWord(selectedWord, detectedLanguage);
                                  setWordDetails(details);
                                } catch (error) {
                                  setWordDetails(`Error: ${error}`);
                                }
                              }}
                              disabled={!selectedWord || wordDetails === 'Loading...'}
                              title="Get explanation for this word"
                            >
                              <span>Explain</span>
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="text-sm text-gray-600 prose prose-sm">
                        {wordDetails === 'Loading...' ? (
                          <div className="animate-pulse space-y-2">
                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                          </div>
                        ) : (
                          <div dangerouslySetInnerHTML={{ __html: wordDetails.replace(/\n/g, '<br>') }} />
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-100 rounded-md p-4 text-center text-gray-500">
                      <p>Click any word in the original text to see details</p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 mt-8">
                <p>Select text to translate</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
