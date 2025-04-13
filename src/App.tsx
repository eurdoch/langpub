import { useState, useCallback } from 'react'

// Define types for the audiobook conversion result
interface AudiobookChapter {
  contentType: string;
  chapterNumber?: number;
  title: string;
  sentences: string[];
  wordCount?: number;
  estimatedDuration?: string;
  language?: string;
}

interface AudiobookResult {
  title: string;
  author: string;
  language: string;
  totalChapters: number;
  estimatedTotalDuration: string;
  chapters: AudiobookChapter[];
}

// Translation result interface
interface TranslationResult {
  original: string;
  translated: string;
  isLoading: boolean;
  error?: string;
}

// Language code to full name mapping
const LANGUAGE_CODES: Record<string, string> = {
  'en': 'English',
  'fr': 'French',
  'de': 'German',
  'es': 'Spanish',
  'it': 'Italian',
  'pt': 'Portuguese',
  'nl': 'Dutch',
  'ja': 'Japanese',
  'zh': 'Chinese',
  'ko': 'Korean',
  'ru': 'Russian',
  'ar': 'Arabic',
  'hi': 'Hindi',
  'tr': 'Turkish',
  'pl': 'Polish',
  'uk': 'Ukrainian',
  'vi': 'Vietnamese',
  'sv': 'Swedish',
  'no': 'Norwegian',
  'da': 'Danish',
  'fi': 'Finnish',
  'cs': 'Czech',
  'el': 'Greek',
  'he': 'Hebrew',
  'id': 'Indonesian',
  'th': 'Thai'
}

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<{ success: boolean; message: string } | null>(null);
  // State for audiobook data and sentence navigation
  const [audiobookData, setAudiobookData] = useState<AudiobookResult | null>(null);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  
  // State for clicked word and selected text
  const [clickedWord, setClickedWord] = useState<string | null>(null);
  const [selectedText, setSelectedText] = useState<string | null>(null);
  
  // State for translations
  const [wordTranslation, setWordTranslation] = useState<TranslationResult | null>(null);
  const [selectionTranslation, setSelectionTranslation] = useState<TranslationResult | null>(null);
  
  // Get current language from the book or current chapter
  const getCurrentLanguage = useCallback(() => {
    if (!audiobookData) return 'en';
    
    // Try to get language from chapter first, then fall back to book language
    const chapterLanguage = audiobookData.chapters[currentChapterIndex]?.language;
    const bookLanguage = audiobookData.language;
    
    return chapterLanguage || bookLanguage || 'en';
  }, [audiobookData, currentChapterIndex]);
  
  // Convert language code to full language name
  const getLanguageName = useCallback((langCode: string) => {
    // Strip region code if present (e.g., 'en-US' -> 'en')
    const baseCode = langCode.split('-')[0].toLowerCase();
    return LANGUAGE_CODES[baseCode] || 'English';
  }, []);
  
  // Function to translate text
  const translateText = useCallback(async (text: string, isWord: boolean = false) => {
    if (!text || !audiobookData) return;
    
    const languageCode = getCurrentLanguage();
    const languageName = getLanguageName(languageCode);
    
    // Skip translation if already in English
    if (languageCode === 'en') {
      if (isWord) {
        setWordTranslation({
          original: text,
          translated: 'Already in English',
          isLoading: false
        });
      } else {
        setSelectionTranslation({
          original: text,
          translated: 'Already in English',
          isLoading: false
        });
      }
      return;
    }
    
    // Set loading state
    if (isWord) {
      setWordTranslation({
        original: text,
        translated: '',
        isLoading: true
      });
    } else {
      setSelectionTranslation({
        original: text,
        translated: '',
        isLoading: true
      });
    }
    
    try {
      const apiUrl = import.meta.env.PROD 
        ? 'https://langpub.directto.link/translate'
        : 'http://localhost:3004/translate';
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          language: languageName,
          text: text
        })
      });
      
      if (!response.ok) {
        throw new Error('Translation failed');
      }
      
      const result = await response.json();
      
      if (isWord) {
        setWordTranslation({
          original: text,
          translated: result.translated_text,
          isLoading: false
        });
      } else {
        setSelectionTranslation({
          original: text,
          translated: result.translated_text,
          isLoading: false
        });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      if (isWord) {
        setWordTranslation({
          original: text,
          translated: '',
          isLoading: false,
          error: errorMessage
        });
      } else {
        setSelectionTranslation({
          original: text,
          translated: '',
          isLoading: false,
          error: errorMessage
        });
      }
    }
  }, [audiobookData, getCurrentLanguage, getLanguageName]);
  
  // Handler for text selection
  const handleTextSelection = () => {
    const selection = window.getSelection()?.toString().trim();
    if (selection && selection.length > 0) {
      setSelectedText(selection);
      translateText(selection, false);
    }
  };
  
  // Handler for word click
  const handleWordClick = (word: string) => {
    setClickedWord(word);
    translateText(word, true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      // Clear previous conversion results
      setAudiobookData(null);
      setCurrentChapterIndex(0);
      setCurrentSentenceIndex(0);
      uploadFile(selectedFile);
    }
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  }

  // Add your Gemini API key (would normally be handled more securely)
  const uploadFile = async (fileToUpload: File) => {
    setUploading(true);
    setUploadResult(null);
    
    try {
      const formData = new FormData();
      formData.append('file', fileToUpload);
      // Add your API key to the request
      formData.append('apiKey', 'YOUR_GEMINI_API_KEY'); // Replace with your actual key or environment variable
      
      const apiUrl = import.meta.env.PROD 
        ? 'https://langpub.directto.link/conversion'
        : 'http://localhost:3004/conversion';
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formData
      });
      
      const result = await response.json();
      console.log('Conversion result: ', result);
      
      if (response.ok) {
        setUploadResult({
          success: true,
          message: `File converted successfully: "${result.result.title}" by ${result.result.author}`
        });
        
        // Save the audiobook data
        setAudiobookData(result.result);
      } else {
        setUploadResult({
          success: false,
          message: result.error || 'Conversion failed'
        });
      }
    } catch (error) {
      setUploadResult({
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    } finally {
      setUploading(false);
    }
  }

  // Handler for next sentence button
  const handleNextSentence = () => {
    if (!audiobookData || !audiobookData.chapters[currentChapterIndex]) return;
    
    const currentChapter = audiobookData.chapters[currentChapterIndex];
    const sentencesCount = currentChapter.sentences.length;
    
    if (currentSentenceIndex < sentencesCount - 1) {
      // Go to next sentence in current chapter
      setCurrentSentenceIndex(currentSentenceIndex + 1);
    } else if (currentChapterIndex < audiobookData.chapters.length - 1) {
      // Go to first sentence of next chapter
      setCurrentChapterIndex(currentChapterIndex + 1);
      setCurrentSentenceIndex(0);
    }
  };

  // Handler for previous sentence button
  const handlePrevSentence = () => {
    if (!audiobookData) return;
    
    if (currentSentenceIndex > 0) {
      // Go to previous sentence in current chapter
      setCurrentSentenceIndex(currentSentenceIndex - 1);
    } else if (currentChapterIndex > 0) {
      // Go to last sentence of previous chapter
      const prevChapter = audiobookData.chapters[currentChapterIndex - 1];
      setCurrentChapterIndex(currentChapterIndex - 1);
      setCurrentSentenceIndex(prevChapter.sentences.length - 1);
    }
  };

  // Current sentence display or placeholder
  const currentSentence = audiobookData 
    && audiobookData.chapters.length > 0 
    && audiobookData.chapters[currentChapterIndex]
    && audiobookData.chapters[currentChapterIndex].sentences
    && audiobookData.chapters[currentChapterIndex].sentences[currentSentenceIndex];

  // Current chapter title
  const currentChapterTitle = audiobookData 
    && audiobookData.chapters.length > 0 
    && audiobookData.chapters[currentChapterIndex]
    ? audiobookData.chapters[currentChapterIndex].title
    : '';

  return (
    <div className="flex min-h-screen">
      {/* Main content area - 2/3 of viewport */}
      <div className="w-2/3 p-6 flex flex-col items-center">
        <div className="text-center max-w-2xl">
          <h1 className="text-2xl font-bold mb-6">EPUB to Audiobook Converter</h1>
          
          {!audiobookData && (
            <form onSubmit={handleSubmit} className="mb-8">
              <label className="block mb-4">
                <span className="block mb-2">Select an EPUB file to convert:</span>
                <input 
                  type="file" 
                  accept=".epub"
                  onChange={handleFileChange}
                  disabled={uploading}
                  className="block w-full text-sm text-slate-500 
                    file:mr-4 file:py-2 file:px-4 
                    file:rounded-full file:border-0 
                    file:text-sm file:font-semibold 
                    file:bg-violet-50 file:text-violet-700 
                    hover:file:bg-violet-100"
                />
              </label>
              
              {file && (
                <div className="mt-4 p-4 bg-gray-50 rounded">
                  <p className="font-semibold">{file.name}</p>
                  <p className="text-sm text-gray-600">Size: {(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              )}
            </form>
          )}
          
          {uploading && (
            <div className="my-8 flex flex-col items-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mb-4"></div>
              <p className="text-lg">Converting EPUB to audiobook format...</p>
              <p className="text-sm text-gray-600 mt-2">This may take several minutes for large files</p>
            </div>
          )}
          
          {uploadResult && !audiobookData && (
            <div className={`my-6 p-4 rounded ${uploadResult.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
              <p>{uploadResult.message}</p>
            </div>
          )}
          
          {audiobookData && (
            <div className="mt-8 w-full">
              <div className="mb-6 p-4 bg-blue-50 rounded">
                <h2 className="text-xl font-bold">{audiobookData.title}</h2>
                <p className="text-gray-700">by {audiobookData.author}</p>
                <div className="mt-2 text-sm text-gray-600">
                  <p>{audiobookData.totalChapters} chapters</p>
                  <p>Estimated duration: {audiobookData.estimatedTotalDuration}</p>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">
                  Chapter {audiobookData.chapters[currentChapterIndex]?.chapterNumber || currentChapterIndex + 1}: {currentChapterTitle}
                </h3>
                
                <div className="border border-gray-200 rounded-lg bg-white shadow-sm mb-4">
                  {/* Fixed height content area to prevent layout shifts */}
                  <div 
                    className="p-6 h-[200px] flex items-center justify-center overflow-auto"
                    onMouseUp={handleTextSelection} // Detect selection when mouse is released
                    onTouchEnd={handleTextSelection} // Support for touch devices
                  >
                    {currentSentence ? (
                      <p className="text-lg leading-relaxed select-text"> {/* Ensure text is selectable */}
                        {currentSentence.split(' ').map((word, index) => (
                          <span 
                            key={index}
                            onClick={() => handleWordClick(word)}
                            className="cursor-pointer hover:bg-blue-100 px-0.5 rounded transition-colors"
                          >
                            {word}{index < currentSentence.split(' ').length - 1 ? ' ' : ''}
                          </span>
                        ))}
                      </p>
                    ) : (
                      <p className="text-gray-500 italic">No content available</p>
                    )}
                  </div>
                  
                  {/* Fixed navigation bar */}
                  <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-between items-center">
                    <span className="text-sm text-gray-600 w-1/3 text-left">
                      Sentence {currentSentenceIndex + 1} of {audiobookData.chapters[currentChapterIndex]?.sentences?.length || 0}
                    </span>
                    
                    <div className="flex gap-4 w-1/3 justify-center">
                      <button 
                        onClick={handlePrevSentence}
                        disabled={currentChapterIndex === 0 && currentSentenceIndex === 0}
                        className="w-24 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Previous
                      </button>
                      <button 
                        onClick={handleNextSentence}
                        disabled={
                          currentChapterIndex === audiobookData.chapters.length - 1 && 
                          currentSentenceIndex === (audiobookData.chapters[currentChapterIndex]?.sentences?.length || 0) - 1
                        }
                        className="w-24 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next
                      </button>
                    </div>
                    
                    <div className="w-1/3 text-right">
                      <span className="text-sm text-gray-600">
                        Chapter {audiobookData.chapters[currentChapterIndex]?.chapterNumber || currentChapterIndex + 1}/{audiobookData.totalChapters}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => {
                  setFile(null);
                  setAudiobookData(null);
                  setUploadResult(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
              >
                Convert another file
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Right sidebar - 1/3 of viewport */}
      <div className="w-1/3 bg-gray-50 border-l border-gray-200 p-6 overflow-auto h-screen">
        <h2 className="text-xl font-bold mb-4">Translation & Interactions</h2>
        
        {audiobookData ? (
          <div>
            {/* Current Language Display */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Book Language</h3>
              <div className="bg-white p-4 rounded shadow-sm">
                <p className="text-center">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-medium">
                    {getLanguageName(audiobookData.language || 'en')}
                  </span>
                </p>
              </div>
            </div>
            
            {/* Word Translation Display */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Word Translation</h3>
              <div className="bg-white p-4 rounded shadow-sm min-h-[120px] flex flex-col">
                {wordTranslation ? (
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Original:</p>
                      <p className="text-lg font-medium text-blue-700">{wordTranslation.original}</p>
                    </div>
                    
                    {wordTranslation.isLoading ? (
                      <div className="flex justify-center items-center py-2">
                        <div className="animate-spin h-5 w-5 border-2 border-blue-500 rounded-full border-t-transparent"></div>
                        <span className="ml-2 text-sm text-gray-600">Translating...</span>
                      </div>
                    ) : wordTranslation.error ? (
                      <p className="text-red-500 text-sm">{wordTranslation.error}</p>
                    ) : (
                      <div>
                        <p className="text-sm text-gray-500">Translation:</p>
                        <p className="text-lg">{wordTranslation.translated}</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-gray-500">Click any word in the text to see its translation</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Text Selection Translation */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Selection Translation</h3>
              <div className="bg-white p-4 rounded shadow-sm min-h-[160px] overflow-auto">
                {selectionTranslation ? (
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Original:</p>
                      <p className="italic text-blue-800">"{selectionTranslation.original}"</p>
                    </div>
                    
                    {selectionTranslation.isLoading ? (
                      <div className="flex justify-center items-center py-2">
                        <div className="animate-spin h-5 w-5 border-2 border-blue-500 rounded-full border-t-transparent"></div>
                        <span className="ml-2 text-sm text-gray-600">Translating...</span>
                      </div>
                    ) : selectionTranslation.error ? (
                      <p className="text-red-500 text-sm">{selectionTranslation.error}</p>
                    ) : (
                      <div>
                        <p className="text-sm text-gray-500">Translation:</p>
                        <p>"{selectionTranslation.translated}"</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-gray-500">Select any text to see its translation</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Book Information */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Book Information</h3>
              <div className="bg-white p-4 rounded shadow-sm">
                <p><strong>Title:</strong> {audiobookData.title}</p>
                <p><strong>Author:</strong> {audiobookData.author}</p>
                <p><strong>Chapters:</strong> {audiobookData.totalChapters}</p>
                <p><strong>Duration:</strong> {audiobookData.estimatedTotalDuration}</p>
              </div>
            </div>
            
            {/* Current Chapter Info */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Current Chapter</h3>
              <div className="bg-white p-4 rounded shadow-sm">
                <p><strong>Chapter:</strong> {audiobookData.chapters[currentChapterIndex]?.chapterNumber || currentChapterIndex + 1}</p>
                <p><strong>Title:</strong> {currentChapterTitle}</p>
                {audiobookData.chapters[currentChapterIndex]?.wordCount && (
                  <p><strong>Word Count:</strong> {audiobookData.chapters[currentChapterIndex].wordCount}</p>
                )}
                {audiobookData.chapters[currentChapterIndex]?.estimatedDuration && (
                  <p><strong>Duration:</strong> {audiobookData.chapters[currentChapterIndex].estimatedDuration}</p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white p-4 rounded shadow-sm">
            <p className="text-gray-500">Select and convert an EPUB file to see details here.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App
