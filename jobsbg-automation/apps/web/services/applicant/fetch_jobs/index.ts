const API_BASE_URL = 'http://localhost:3000';

export const fetchJobsByIds = async (jobIds: string[]) => {
  const token = localStorage.getItem('auth_token');
  if (!token) {
    throw new Error('No authentication token found. Please log in first.');
  }

  const response = await fetch(`${API_BASE_URL}/job-post/fetch-by-ids`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ job_ids: jobIds }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Failed to fetch jobs' }));
    throw new Error(errorData.message || `Fetch failed: ${response.statusText}`);
  }

  return response.json();
};
