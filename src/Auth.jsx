import React, { useState } from 'react';
import './auth.css';
import Dashboard from './Dashboard';
import { useAuth } from "./hooks/useAuth";

const API_BASE_URL = 'https://authentication-system-3it4.onrender.com';

const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </svg>
);

const LockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

const UserIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const LogOutIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
    <polyline points="16 17 21 12 16 7"></polyline>
    <line x1="21" y1="12" x2="9" y2="12"></line>
  </svg>
);

const CheckCircleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

const XCircleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="15" y1="9" x2="9" y2="15"></line>
    <line x1="9" y1="9" x2="15" y2="15"></line>
  </svg>
);

const GoogleIcon = () => (
  <svg className="google-icon" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

function App() {
  const [view, setView] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [mfaCode, setMfaCode] = useState('');
  const [qrCode, setQrCode] = useState('');
  // const [secret, setSecret] = useState('');
  // const [token, setToken] = useState('');
  // const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [jwtUser, setJWTUser] = useState(false);
  const [googleUser, setGoogleUser] = useState(false);
  const [MfaUser, setMfaUser] = useState(false);
const { user, login, logout } = useAuth();

  const handleSignup = async () => {
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name })
      });

      const data = await response.json();

      if (data.status === 'success') {
        setSuccess('Account created! You can now login.');
        setTimeout(() => setView('login'), 2000);
      } else {
        setError(data.message || 'Signup failed');
      }
    } catch (err) {
      setError('Network error. Make sure your API is running on port 8000.');
    } finally {
      setLoading(false);
    }
  };

const handleLogin = async () => {
  setError('');
  setSuccess('');
  setLoading(true);

  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    console.log("first data", data.status);

    if (data.status === "success") {
      // setToken(data.token);

      const user = await getUser(); 
      console.log("user", user);

      if (user) {
        login(user); 
      }

      if (user?.mfa_enabled) {
        setView("mfa-verify");
      } else {
        setView("dashboard");
      }
    } else {
      setError(data.message || 'Login failed');
    }
  } catch (err) {
    setError('Network error. Make sure your API is running on port 8000.');
  } finally {
    setLoading(false);
  }
};



const getUser = async () => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/user/${encodeURIComponent(email)}`,
      { method: 'GET', headers: { 'Content-Type': 'application/json' } }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('usersssss', data);

    const user = data.user;

    if (user.mfa_enabled) setMfaUser(true);
    if (user.is_google_user) setGoogleUser(true);
    if (!user.is_google_user) setJWTUser(true);

    return user; // ✅ return it
  } catch (error) {
    console.error('Failed to fetch user:', error.message);
    return null; 
  }
};





  const handleGoogleLogin = () => {
    window.location.href = `${API_BASE_URL}/google/login?company_url=${window.location.origin}`;
  };

  const setupMFA = async () => {
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/setup_mfa?email=${email}`, {
        method: 'POST'
      });

      const data = await response.json();

      if (data.status === 'success') {
        setQrCode(data.qr_code);
        // setSecret(data.secret);
        setView('mfa-setup');
      } else {
        setError('Failed to setup MFA');
      }
    } catch (err) {
      setError('Network error. Make sure your API is running.');
    } finally {
      setLoading(false);
    }
  };

  const verifyMFA = async () => {
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/verify_mfa?email=${email}&code=${mfaCode}`, {
        method: 'POST'
      });

      const data = await response.json();

      if (data.status === 'success') {
        setSuccess('MFA verified! Redirecting...');
        setTimeout(() => {
          setView('dashboard');
          setMfaCode('');
        }, 1500);
      } else {
        setError('Invalid code. Please try again.');
      }
    } catch (err) {
      setError('Verification failed');
    } finally {
      setLoading(false);
    }
  };


 const handleLogout = () => {
    logout();
  setView("login");
};


  const authLabels = [];

if (MfaUser) authLabels.push("MFA Enabled");
if (googleUser) authLabels.push("Google OAuth");
if (jwtUser) authLabels.push("JWT Auth");

  const handleKeyPress = (e, callback) => {
    if (e.key === 'Enter') {
      callback();
    }
  };

  if (view === 'login') {
    return (
      <div className="app-container">
        <div className="card">
          <div className="card-header">
            <div className="icon-container primary">
              <ShieldIcon />
            </div>
            <h1>Welcome Back</h1>
            <p className="subtitle">Sign in to your account</p>
          </div>

          {error && (
            <div className="alert error">
              <XCircleIcon />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="alert success">
              <CheckCircleIcon />
              <span>{success}</span>
            </div>
          )}

          <div className="form-group">
            <label>Email</label>
            <div className="input-wrapper">
              <MailIcon />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, handleLogin)}
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="input-wrapper">
              <LockIcon />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, handleLogin)}
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="btn btn-primary"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>

          <div className="divider">
            <div className="divider-text">
              <span>Or continue with</span>
            </div>
          </div>

          <button onClick={handleGoogleLogin} className="google-btn">
            <GoogleIcon />
            Sign in with Google
          </button>

          <button onClick={() => setView('mfa-verify')} className="google-btn">
            Sign in with MFA
          </button>

          <p className="text-center">
            Don't have an account?{' '}
            <button onClick={() => setView('signup')} className="text-link">
              Sign up
            </button>
          </p>
        </div>
      </div>
    );
  }

  if (view === 'signup') {
    return (
      <div className="app-container">
        <div className="card">
          <div className="card-header">
            <div className="icon-container primary">
              <ShieldIcon />
            </div>
            <h1>Create Account</h1>
            <p className="subtitle">Join us today</p>
          </div>

          {error && (
            <div className="alert error">
              <XCircleIcon />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="alert success">
              <CheckCircleIcon />
              <span>{success}</span>
            </div>
          )}

          <div className="form-group">
            <label>Name</label>
            <div className="input-wrapper">
              <UserIcon />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Email</label>
            <div className="input-wrapper">
              <MailIcon />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="input-wrapper">
              <LockIcon />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, handleSignup)}
                placeholder="••••••••"
              />
            </div>
            <p className="input-hint">At least 8 characters</p>
          </div>

          <button
            onClick={handleSignup}
            disabled={loading}
            className="btn btn-primary"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>

  <div className="divider">
            <div className="divider-text">
              <span>Or continue with</span>
            </div>
          </div>

          <button onClick={handleGoogleLogin} className="google-btn">
            <GoogleIcon />
            Sign up with Google
          </button>
          <p className="text-center">
            Already have an account?{' '}
            <button onClick={() => setView('login')} className="text-link">
              Sign in
            </button>
          </p>
        </div>
      </div>
    );
  }

  if (view === 'mfa-setup') {
    return (
      <div className="app-container">
        <div className="card">
          <div className="card-header">
            <div className="icon-container success">
              <ShieldIcon />
            </div>
            <h1>Setup 2FA</h1>
            <p className="subtitle">Scan this QR code with your authenticator app</p>
          </div>

          <div className="qr-container">
            <img src={qrCode} alt="QR Code" />
          </div>

          <div className="code-box">
            <p>Manual entry code:</p>
            {/* <code>{secret}</code> */}
          </div>

          <button
            onClick={() => setView('mfa-verify')}
            className="btn btn-primary"
          >
            Continue to Verification
          </button>
        </div>
      </div>
    );
  }

  if (view === 'mfa-verify') {
    return (
      <div className="app-container">
        <div className="card">
          <div className="card-header">
            <div className="icon-container primary">
              <LockIcon />
            </div>
<label>Email</label>
            <div className="input-wrapper">
              <MailIcon />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, handleLogin)}
                placeholder="you@example.com"
              />
            </div>
            <h1>Enter Code</h1>
            <p className="subtitle">Enter the 6-digit code from your authenticator app</p>
          </div>

          {error && (
            <div className="alert error">
              <XCircleIcon />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="alert success">
              <CheckCircleIcon />
              <span>{success}</span>
            </div>
          )}

          <div className="form-group">
            <input
              type="text"
              value={mfaCode}
              onChange={(e) => setMfaCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              onKeyPress={(e) => handleKeyPress(e, () => mfaCode.length === 6 && verifyMFA())}
              className="mfa-input"
              placeholder="000000"
              maxLength={6}
            />
          </div>

          <button
            onClick={verifyMFA}
            disabled={loading || mfaCode.length !== 6}
            className="btn btn-primary"
          >
            {loading ? 'Verifying...' : 'Verify Code'}
          </button>
        </div>
      </div>
    );
  }

if (view === 'dashboard') {
  return (
    <Dashboard
      user={user}
      email={email}
      handleLogout={handleLogout}
      loading={loading}
      authLabels={authLabels}
      setupMFA={setupMFA}
    />
  );
}


  return null;
}

export default App;