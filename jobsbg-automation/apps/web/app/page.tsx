"use client";

import { useState, useEffect } from 'react';
import './terminal-cursor.css';

// Typewriter animation for modal headline
function TypewriterHeadline() {
  const first = 'Точната работа.';
  const second = ' Точно за тебе';
  const [firstText, setFirstText] = useState('');
  const [secondText, setSecondText] = useState('');
  const [showExcl, setShowExcl] = useState(false);

  useEffect(() => {
    let i = 0;
    const typeFirst = () => {
      if (i <= first.length) {
        setFirstText(first.slice(0, i));
        i++;
        setTimeout(typeFirst, 50);
      } else {
        setTimeout(() => {
          let j = 0;
          const typeSecond = () => {
            if (j <= second.length) {
              setSecondText(second.slice(0, j));
              j++;
              setTimeout(typeSecond, 45);
            } else {
              setTimeout(() => setShowExcl(true), 500);
            }
          };
          typeSecond();
        }, 800);
      }
    };
    typeFirst();
  }, []);

  return (
    <p className="text-2xl mt-4 font-extrabold" style={{
      color: '#39FF14',
      fontWeight: 900,
      fontFamily: 'SFMono-Regular, Menlo, Monaco, Consolas, monospace',
      marginTop: 8,
      minHeight: 10,
      textAlign: 'left',
    }}>
      {firstText}
      {secondText}
      {showExcl && <span>!</span>}
    </p>
  );
}

import { colors } from '../components/theme/colors';
import { useAppRouter } from '../services/router';
import { loginUser } from '../services/auth/candidate/login';
import { registerUser } from '../services/auth/candidate/register';
import BackgroundSkeleton from '../components/shared/background_skeleton';
import SimpleButton from '../components/shared/simple_button';

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

      if (result.access_token) {
        localStorage.setItem('auth_token', result.access_token);
      }

      alert('Login successful!');
      navigate.upload();
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
    } catch (error) {
      console.error('Register error:', error);
      alert('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      position: 'relative', 
      minHeight: '100vh', 
      width: '100%', 
      background: colors.background,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      overflowX: 'hidden', // Only for this page
      overflowY: 'hidden', // Only for this page
      boxSizing: 'border-box',
    }}>
      <BackgroundSkeleton />
      
      <div className="w-full" style={{
        maxWidth: 500,
        background: '#000',
        borderRadius: 6,
        boxShadow: '0 2px 16px 0 rgba(0,0,0,0.30)',
        padding: '32px',
        color: '#39FF14',
        fontFamily: 'SFMono-Regular, Menlo, Monaco, Consolas, monospace',
        border: '2px solid #222',
        letterSpacing: '0.5px',
        position: 'relative',
        zIndex: 2,
      }}>
        
        <div style={{ textAlign: 'left', marginBottom: 32 }}>
          <h1 style={{
            fontSize: '48px',
            letterSpacing: '0.5px',
            color: '#39FF14',
            fontWeight: 900,
            fontFamily: 'SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            gap: 4
          }}>
            <span>&gt; </span>MyJobBg<span className="terminal-cursor">_</span>
          </h1>
          <TypewriterHeadline />
        </div>
        
        <form onSubmit={(e) => e.preventDefault()}>
          <div style={{ marginBottom: 16 }}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div style={{ marginBottom: 16 }}>
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
              <div style={{ marginBottom: 16 }}>
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  autoComplete="given-name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div style={{ marginBottom: 16 }}>
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
          
          <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
            <SimpleButton
              onClick={handleLogin}
              text={loading ? 'Please wait...' : 'Login'}
              description="Sign in to continue"
              disabled={loading}
              className="flex-1"
            />
            <SimpleButton
              onClick={handleRegister}
              text={loading ? 'Please wait...' : 'Register'}
              description="Create a new account"
              disabled={loading}
              className="flex-1"
            />
          </div>
        </form>
        
        <div style={{ textAlign: 'center' }}>
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