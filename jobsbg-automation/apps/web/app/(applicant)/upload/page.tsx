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

    if (!selectedFile.type.includes('pdf') && !selectedFile.name.endsWith('.pdf')) {
      setError('Please select a PDF file only.');
      return;
    }

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
    <div style={{
      minHeight: '100vh',
      background: '#0a0a0a',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: 'SFMono-Regular, Menlo, Monaco, Consolas, monospace',
      boxSizing: 'border-box'
    }}>
      <div style={{
        maxWidth: '500px',
        width: '100%',
        background: '#000',
        border: '2px solid #222',
        borderRadius: '6px',
        padding: '32px',
        boxShadow: '0 2px 16px 0 rgba(0,0,0,0.30)',
      }}>
        
        <div style={{ textAlign: 'left', marginBottom: '32px' }}>
          <h1 style={{
            fontSize: '36px',
            color: '#39FF14',
            fontWeight: 900,
            margin: 0,
            letterSpacing: '0.5px',
          }}>
            &gt; upload_cv
          </h1>
          <p style={{
            color: '#39FF14',
            opacity: 0.8,
            margin: '8px 0 0 0',
            fontSize: '14px',
          }}>
            Deploy your resume to the system
          </p>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', cursor: 'pointer' }}>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
              disabled={uploading}
            />
            <div style={{
              border: '2px dashed #333',
              borderRadius: '4px',
              padding: '24px',
              textAlign: 'center',
              color: '#39FF14',
              background: uploading ? '#0a0a0a' : 'transparent',
              transition: 'all 0.2s ease',
              position: 'relative',
              overflow: 'hidden',
            }}
            onMouseOver={(e) => {
              if (!uploading) {
                e.currentTarget.style.borderColor = '#39FF14';
                e.currentTarget.style.background = '#0a0a0a';
              }
            }}
            onMouseOut={(e) => {
              if (!uploading) {
                e.currentTarget.style.borderColor = '#333';
                e.currentTarget.style.background = 'transparent';
              }
            }}>
              
              {uploading && (
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(57, 255, 20, 0.1), transparent)',
                  animation: 'scan 2s infinite linear',
                }}></div>
              )}

              <div style={{ position: 'relative', zIndex: 1 }}>
                {uploading ? (
                  <div>
                    <div style={{ fontSize: '16px', marginBottom: '8px' }}>
                      Processing...
                    </div>
                    <div style={{
                      fontSize: '12px',
                      opacity: 0.7,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px',
                    }}>
                      <span style={{ animation: 'blink 1s infinite' }}>▓</span>
                      <span style={{ animation: 'blink 1s infinite 0.2s' }}>▓</span>
                      <span style={{ animation: 'blink 1s infinite 0.4s' }}>▓</span>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div style={{ fontSize: '16px', marginBottom: '4px' }}>
                      Click to select PDF file
                    </div>
                    <div style={{ fontSize: '12px', opacity: 0.7 }}>
                      Max size: 10MB
                    </div>
                  </div>
                )}
              </div>
            </div>
          </label>
        </div>

        {file && (
          <div style={{
            color: '#39FF14',
            fontSize: '12px',
            marginBottom: '16px',
            padding: '8px',
            background: '#0a0a0a',
            borderRadius: '4px',
            border: '1px solid #222',
          }}>
            &gt; {file.name}
          </div>
        )}

        {error && (
          <div style={{
            color: '#ff4444',
            fontSize: '12px',
            marginBottom: '16px',
            padding: '8px',
            background: '#1a0606',
            borderRadius: '4px',
            border: '1px solid #442222',
          }}>
            ERROR: {error}
          </div>
        )}

        {uploadResult && (
          <div style={{
            color: '#39FF14',
            fontSize: '12px',
            padding: '12px',
            background: '#0a1a0a',
            borderRadius: '4px',
            border: '1px solid #224422',
          }}>
            <div style={{ marginBottom: '4px' }}>SUCCESS: Upload completed</div>
            <div style={{ opacity: 0.7 }}>CV_ID: {uploadResult.cv?.id}</div>
            <div style={{ opacity: 0.7 }}>STATUS: {uploadResult.message}</div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes scan {
          0% { left: -100%; }
          100% { left: 100%; }
        }
        
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}