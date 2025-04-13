import { useState } from 'react'

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false)
  const [uploadResult, setUploadResult] = useState<{ success: boolean; message: string } | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile);
      uploadFile(selectedFile)
    }
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  const uploadFile = async (fileToUpload: File) => {
    setUploading(true)
    setUploadResult(null)
    
    try {
      const formData = new FormData()
      formData.append('file', fileToUpload)
      
      const apiUrl = import.meta.env.PROD 
        ? 'https://langpub.directto.link/conversion'
        : 'http://localhost:3004/conversion'
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formData
        // Don't set Content-Type - browser will set it with correct boundary for multipart/form-data
      })
      
      const result = await response.json()
      
      if (response.ok) {
        setUploadResult({
          success: true,
          message: `File "${result.filename}" uploaded successfully`
        })
      } else {
        setUploadResult({
          success: false,
          message: result.error || 'Upload failed'
        })
      }
    } catch (error) {
      setUploadResult({
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      })
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <h1 className="mb-4">File Upload</h1>
        
        <form onSubmit={handleSubmit}>
          <input 
            type="file" 
            onChange={handleFileChange}
            disabled={uploading}
          />
          
          {file && (
            <div className="mt-4">
              <p>Selected file: {file.name}</p>
              <p>Size: {(file.size / 1024).toFixed(1)} KB</p>
            </div>
          )}
          
          {file && (
            <button 
              type="submit" 
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
              disabled={uploading || !file}
            >
              Upload File
            </button>
          )}
          
          {uploading && (
            <div className="mt-4">
              <p>Uploading...</p>
            </div>
          )}
          
          {uploadResult && (
            <div className={`mt-4 ${uploadResult.success ? 'text-green-600' : 'text-red-600'}`}>
              <p>{uploadResult.message}</p>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

export default App
