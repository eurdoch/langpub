import { useState, useEffect, useCallback, useRef } from 'react'
import './App.css'

// Base URL for API calls
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

// Debug function to create test audio - useful when API isn't working
function createTestAudio(): string {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.type = 'sine';
  oscillator.frequency.value = 440; // A4 note
  gainNode.gain.value = 0.5;
  
  const duration = 2;
  const audioBuffer = audioContext.createBuffer(1, audioContext.sampleRate * duration, audioContext.sampleRate);
  const channelData = audioBuffer.getChannelData(0);
  
  for (let i = 0; i < audioBuffer.length; i++) {
    channelData[i] = Math.sin(2 * Math.PI * 440 * i / audioContext.sampleRate);
  }
  
  // Convert AudioBuffer to WAV
  const blob = audioBufferToWav(audioBuffer);
  const url = URL.createObjectURL(blob);
  
  return url;
}

// Helper function to convert AudioBuffer to WAV
function audioBufferToWav(buffer: AudioBuffer): Blob {
  const numChannels = buffer.numberOfChannels;
  const sampleRate = buffer.sampleRate;
  const format = 1; // PCM
  const bitDepth = 16;
  
  const dataLength = buffer.length * numChannels * (bitDepth / 8);
  const headerLength = 44;
  const totalLength = headerLength + dataLength;
  
  const arrayBuffer = new ArrayBuffer(totalLength);
  const dataView = new DataView(arrayBuffer);
  
  // RIFF chunk descriptor
  writeString(dataView, 0, 'RIFF');
  dataView.setUint32(4, totalLength - 8, true);
  writeString(dataView, 8, 'WAVE');
  
  // fmt sub-chunk
  writeString(dataView, 12, 'fmt ');
  dataView.setUint32(16, 16, true); // sub-chunk size
  dataView.setUint16(20, format, true); // audio format
  dataView.setUint16(22, numChannels, true);
  dataView.setUint32(24, sampleRate, true);
  dataView.setUint32(28, sampleRate * numChannels * (bitDepth / 8), true); // byte rate
  dataView.setUint16(32, numChannels * (bitDepth / 8), true); // block align
  dataView.setUint16(34, bitDepth, true);
  
  // data sub-chunk
  writeString(dataView, 36, 'data');
  dataView.setUint32(40, dataLength, true);
  
  // Write audio data
  let offset = 44;
  for (let i = 0; i < buffer.length; i++) {
    for (let channel = 0; channel < numChannels; channel++) {
      const sample = buffer.getChannelData(channel)[i];
      const sample16 = Math.max(-1, Math.min(1, sample)) * 32767;
      dataView.setInt16(offset, sample16, true);
      offset += 2;
    }
  }
  
  return new Blob([arrayBuffer], { type: 'audio/wav' });
}

// Helper to write strings to DataView
function writeString(dataView: DataView, offset: number, str: string): void {
  for (let i = 0; i < str.length; i++) {
    dataView.setUint8(offset + i, str.charCodeAt(i));
  }
}

// Function to generate speech audio for text using Electron's net module
async function generateSpeech(text: string, language: string): Promise<string | null> {
  try {
    console.log('Generating speech for text:', text.substring(0, 50) + '...')
    console.log('Language for speech:', language)
    
    // TEMPORARY: Use test audio instead of real API
    console.log('Using test audio due to API issues')
    return createTestAudio()
    
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
    console.log('Speech API URL:', speechApiUrl)
    
    try {
      // Make request to speech API using Electron's net module
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
      
      // Try to create a blob URL from the base64 data
      try {
        const audioBlob = base64ToBlob(response, 'audio/mpeg')
        const audioUrl = URL.createObjectURL(audioBlob)
        console.log('Speech audio generated successfully')
        return audioUrl
      } catch (blobError) {
        console.error('Error creating audio blob:', blobError)
        console.error('Response data type:', typeof response)
        if (typeof response === 'string') {
          console.error('Response data preview:', response.substring(0, 100))
        }
        return null
      }
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
  const byteCharacters = atob(base64)
  const byteNumbers = new Array(byteCharacters.length)
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i)
  }
  const byteArray = new Uint8Array(byteNumbers)
  return new Blob([byteArray], { type: mimeType })
}

interface ParsedContent {
  title: string
  bodyText: string | null
  htmlContent: string | null
  styles: string[]
  cssFiles: CssFile[]
  error?: string
}

// No longer needed with history section removed

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
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [isGeneratingSpeech, setIsGeneratingSpeech] = useState<boolean>(false)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  
  // Handle text selection with language detection and translation
  const handleMouseUp = useCallback(async () => {
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
          
          // Release previous audio URL if it exists
          if (audioUrl) {
            URL.revokeObjectURL(audioUrl)
            setAudioUrl(null)
          }
          
          // Start generating speech
          setIsGeneratingSpeech(true)
          
          // Generate speech in parallel with translation
          const speechPromise = generateSpeech(selectedTextContent, detectedLang)
          
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
          
          // Wait for speech generation to complete
          const speechUrl = await speechPromise
          setAudioUrl(speechUrl)
          setIsGeneratingSpeech(false)
          
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
  
  // Clean up audio URLs when component unmounts
  useEffect(() => {
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl)
      }
    }
  }, [audioUrl])
  
  // Function to toggle audio playback
  const toggleAudio = useCallback(() => {
    console.log('Toggle audio called')
    
    if (!audioRef.current) {
      console.log('Cannot play audio: No audio reference available')
      return
    }
    
    if (!audioUrl) {
      console.log('Cannot play audio: No audio URL available')
      return
    }
    
    console.log('Audio element exists:', !!audioRef.current)
    console.log('Audio URL:', audioUrl)
    console.log('Current play state:', isPlaying ? 'Playing' : 'Paused')
    
    try {
      if (isPlaying) {
        console.log('Pausing audio playback')
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        console.log('Starting audio playback')
        const playPromise = audioRef.current.play()
        
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log('Audio playback started successfully')
              setIsPlaying(true)
            })
            .catch(error => {
              console.error('Error playing audio:', error)
              // Check if the audio element has a valid source
              console.log('Audio source:', audioRef.current?.src)
              // Check if audio data is loaded
              console.log('Audio ready state:', audioRef.current?.readyState)
              console.log('Audio paused state:', audioRef.current?.paused)
              console.log('Audio element:', audioRef.current)
            })
        } else {
          console.log('Play promise is undefined, setting isPlaying state directly')
          setIsPlaying(true)
        }
      }
    } catch (error) {
      console.error('Unexpected error in toggleAudio:', error)
    }
  }, [audioUrl, isPlaying])
  
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
            onMouseUp={handleMouseUp}
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
                        className={`text-white text-xs px-3 py-1 rounded-full flex items-center gap-1 ${audioUrl ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400'}`}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleAudio();
                        }}
                        title={isPlaying ? "Pause audio" : "Play audio"}
                        disabled={!audioUrl}
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
                  <p className="text-gray-800 break-words">{selectedText}</p>
                  
                  {/* Audio element */}
                  <audio 
                    ref={audioRef}
                    src={audioUrl || undefined}
                    onEnded={() => setIsPlaying(false)}
                    onPause={() => setIsPlaying(false)}
                    onPlay={() => setIsPlaying(true)}
                    onError={(e) => console.error('Audio error:', e)}
                    onLoadedData={() => console.log('Audio data loaded')}
                    controls={false}
                    style={{ display: 'none' }}
                  />
                </div>
                
                <div>
                  <h3 className="text-sm text-gray-500 font-medium mb-1">Translation (English)</h3>
                  <p className="text-gray-800 break-words">{translatedText}</p>
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