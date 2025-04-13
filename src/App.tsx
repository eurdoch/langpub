import { useState } from 'react'

// Define types for the audiobook conversion result
interface AudiobookChapter {
  contentType: string;
  chapterNumber?: number;
  title: string;
  sentences: string[];
  wordCount?: number;
  estimatedDuration?: string;
}

interface AudiobookResult {
  title: string;
  author: string;
  totalChapters: number;
  estimatedTotalDuration: string;
  chapters: AudiobookChapter[];
}

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<{ success: boolean; message: string } | null>(null);
  // State for audiobook data and sentence navigation
  const [audiobookData, setAudiobookData] = useState<AudiobookResult | null>(null);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);

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
    <div className="flex flex-col justify-center items-center min-h-screen p-6">
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
          <div className="mt-8">
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
                <div className="p-6 h-[200px] flex items-center justify-center overflow-auto">
                  {currentSentence ? (
                    <p className="text-lg">{currentSentence}</p>
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
  );
}

export default App
