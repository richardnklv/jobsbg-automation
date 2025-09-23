'use client';

import { useState } from 'react';
import { useAppRouter } from '../services/router';
import { loginUser } from '../services/auth/login';
import { registerUser } from '../services/auth/register';

export default function AuthPage() {
  const { navigate } = useAppRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const result = await loginUser(email, password);
      console.log('Login successful:', result);

      // Store the JWT token
      if (result.access_token) {
        localStorage.setItem('auth_token', result.access_token);
      }

      alert('Login successful!');
      navigate.upload(); // Redirect to upload page
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    setLoading(true);
    try {
      const result = await registerUser(email, password, firstName, lastName);
      console.log('Registration successful:', result);

      alert('Registration successful! Please log in to continue.');
      // Stay on login page after registration
    } catch (error) {
      console.error('Register error:', error);
      alert('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold">JobsBG</h1>
          <p className="text-gray-600 mt-2">Find your perfect job match</p>
        </div>
        
        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          {!isLogin && (
            <>
              <div>
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  autoComplete="given-name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  autoComplete="family-name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </>
          )}
          
          <div className="flex gap-4">
            <button
              onClick={handleLogin}
              disabled={loading}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-medium transition-colors"
            >
              {loading ? 'Please wait...' : 'Login'}
            </button>
            
            <button
              onClick={handleRegister}
              disabled={loading}
              className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-medium transition-colors"
            >
              {loading ? 'Please wait...' : 'Register'}
            </button>
          </div>
        </form>
        
        <div className="text-center mt-6">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 hover:underline"
          >
            {isLogin ? "Need to register? Show register fields" : "Already registered? Hide register fields"}
          </button>
        </div>
      </div>
    </div>
  );
}
