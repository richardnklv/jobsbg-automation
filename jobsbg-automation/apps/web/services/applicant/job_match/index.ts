import { API_BASE_URL } from '../../config';

export const fetchTopJobMatches = async () => {
  // Get JWT token from localStorage (stored after successful login)
  const token = localStorage.getItem('auth_token');
  if (!token) {
    throw new Error('No authentication token found. Please log in first.');
  }

  const response = await fetch(`${API_BASE_URL}/matching/top-jobs`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Failed to fetch job matches' }));
    throw new Error(errorData.message || `Fetch failed: ${response.statusText}`);
  }

  return response.json();
};
