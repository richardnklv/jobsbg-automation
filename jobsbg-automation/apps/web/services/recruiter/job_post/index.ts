import { API_BASE_URL } from '../../config';

export const createJobPost = async (payload: { description?: string; requirements?: string; offer?: string; end_date?: string | null; }) => {
  const token = localStorage.getItem('auth_token');

  if (!token) {
    throw new Error('No authentication token found. Please log in first.');
  }

  const response = await fetch(`${API_BASE_URL}/job-post`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Create job post failed' }));
    throw new Error(errorData.message || `Create job post failed: ${response.statusText}`);
  }

  return response.json();
};
