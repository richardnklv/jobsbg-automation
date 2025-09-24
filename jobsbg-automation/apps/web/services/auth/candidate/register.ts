import { API_BASE_URL } from '../../config';

export const registerUser = async (email: string, password: string, firstName: string, lastName: string) => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      email, 
      password, 
      first_name: firstName, 
      last_name: lastName 
    })
  });

  if (!response.ok) {
    throw new Error(`Registration failed: ${response.statusText}`);
  }

  return response.json();
};
