'use client';

import { useState } from 'react';

export default function UploadCV() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    
    setFile(selectedFile);
    setUploading(true);
    
    // TODO: Replace with actual API call to backend
    try {
      console.log('Uploading CV:', selectedFile.name);
      // await uploadCVService(selectedFile);
      alert('CV uploaded successfully!');
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">Upload Your CV</h1>
        
        <div className="space-y-4">
          <label className="block">
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileUpload}
              className="hidden"
              disabled={uploading}
            />
            <button
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors"
              disabled={uploading}
              onClick={() => (document.querySelector('input[type="file"]') as HTMLInputElement)?.click()}
            >
              {uploading ? 'Uploading...' : 'Upload CV'}
            </button>
          </label>
          
          {file && (
            <p className="text-sm text-gray-600">
              Selected: {file.name}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}