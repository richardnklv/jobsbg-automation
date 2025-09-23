'use client';

import { useState } from 'react';
import { uploadCV } from '../../../services/applicant/cv_upload';

export default function UploadCV() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<any>(null);
  const [error, setError] = useState<string>('');

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // Validate file type
    if (!selectedFile.type.includes('pdf') && !selectedFile.name.endsWith('.pdf')) {
      setError('Please select a PDF file only.');
      return;
    }

    // Validate file size (10MB limit)
    if (selectedFile.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB.');
      return;
    }

    setFile(selectedFile);
    setUploading(true);
    setError('');
    setUploadResult(null);

    try {
      console.log('Uploading CV:', selectedFile.name);
      const result = await uploadCV(selectedFile);
      setUploadResult(result);
      alert('CV uploaded and processed successfully!');
    } catch (error) {
      console.error('Upload failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Upload failed. Please try again.';
      setError(errorMessage);
      alert(errorMessage);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="text-center max-w-md w-full">
        <h1 className="text-4xl font-bold mb-8">Upload Your CV</h1>

        <div className="space-y-4">
          <label className="block">
            <input
              type="file"
              accept=".pdf"
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

          {error && (
            <p className="text-sm text-red-600 bg-red-50 p-2 rounded">
              {error}
            </p>
          )}

          {uploadResult && (
            <div className="text-sm text-green-600 bg-green-50 p-4 rounded">
              <p className="font-medium">Upload successful!</p>
              <p>CV ID: {uploadResult.cv?.id}</p>
              <p>Message: {uploadResult.message}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}