import { API_BASE_URL } from '../config';

export const loginUser = async (email: string, password: string) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      password
    })
  });

  if (!response.ok) {
    throw new Error(`Login failed: ${response.statusText}`);
  }

  const data = await response.json();
  
  // Store the access token in localStorage for future authenticated requests
  if (data.access_token) {
    localStorage.setItem('auth_token', data.access_token);
    console.log('auth_token br0-;', data.access_token);
  }

  return data;
};
