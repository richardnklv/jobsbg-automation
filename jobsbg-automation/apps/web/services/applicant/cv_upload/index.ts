import { API_BASE_URL } from '../../config';

export const uploadCV = async (file: File) => {
  // Get JWT token from localStorage (stored after successful login)
  const token = localStorage.getItem('auth_token');
  console.log('cv upload token : ', token);

  if (!token) {
    throw new Error('No authentication token found. Please log in first.');
  }

  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE_URL}/cv/upload`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Upload failed' }));
    throw new Error(errorData.message || `Upload failed: ${response.statusText}`);
  }

  return response.json();
};