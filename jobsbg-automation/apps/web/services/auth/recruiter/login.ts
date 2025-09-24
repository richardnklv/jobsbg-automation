import { API_BASE_URL } from '../../config';

export const loginRecruiter = async (email: string, password: string) => {
  const response = await fetch(`${API_BASE_URL}/auth/recruiter/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (!response.ok) {
    throw new Error(`Recruiter login failed: ${response.statusText}`);
  }

  const data = await response.json();

  if (data.access_token) {
    localStorage.setItem('auth_token', data.access_token);
  }

  return data;
};
