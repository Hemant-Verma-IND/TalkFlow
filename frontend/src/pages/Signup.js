import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import LightRays from '../components/LightRays';
import { ShieldCheck, ArrowRight, Lock, User, Mail } from 'lucide-react';
import '../styles/Global.css';
import '../styles/Login.css'; // We reuse the premium Login styles

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // New State for error messages
  const [isLoading, setIsLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    // 1. Frontend Validation
    if (!validateEmail(email)) {
      return setError('Please enter a valid email address');
    }
    if (password.length < 6) {
      return setError('Password must be at least 6 characters long');
    }

    setIsLoading(true);
    try {
      await register(username, email, password);
      navigate('/');
    } catch (err) {
      // 2. Catch Backend Error (e.g. "User already exists")
      const msg = err.response?.data?.message || "Registration failed";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="login-wrapper">
      {/* Background Animation */}
      <div className="background-layer">
        <LightRays
          raysOrigin="bottom-center" // Different origin for variety
          raysColor="#3b82f6"
          raysSpeed={0.6}
          lightSpread={1.0}
        />
      </div>

      <div className="login-container">
        
        <div className="brand-header">
          <div className="brand-logo">
            <ShieldCheck size={48} color="#3b82f6" strokeWidth={1.5} />
          </div>
          <h1>Join TalkFlow</h1>
          <p>Create your secure archival vault</p>
        </div>

        <form className="login-card glass-card" onSubmit={handleSubmit}>
          {error && (
            <div style={{
              background: 'rgba(255, 68, 68, 0.1)',
              border: '1px solid #ff4444',
              color: '#ff4444',
              padding: '10px',
              borderRadius: '8px',
              fontSize: '0.85rem',
              textAlign: 'center'
            }}>
              {error}
            </div>
          )}

          {/* Username Field */}
          <div className="input-group">
            <label>Username</label>
            <div className="password-wrapper">
              <input 
                type="text" 
                placeholder="TalkFlowUser" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                required 
              />
              <User size={16} className="input-icon" />
            </div>
          </div>

          {/* Email Field */}
          <div className="input-group">
            <label>Email Address</label>
            <div className="password-wrapper">
              <input 
                type="email" 
                placeholder="user@example.com" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
              <Mail size={16} className="input-icon" />
            </div>
          </div>
          
          {/* Password Field */}
          <div className="input-group">
            <label>Password</label>
            <div className="password-wrapper">
              <input 
                type="password" 
                placeholder="••••••••" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
              <Lock size={16} className="input-icon" />
            </div>
          </div>

          <button type="submit" disabled={isLoading} className="login-btn">
            {isLoading ? 'Creating Vault...' : (
              <>
                Create Account <ArrowRight size={18} />
              </>
            )}
          </button>

          <div style={{textAlign: 'center', marginTop: '10px', fontSize: '0.9rem', color: '#94a3b8'}}>
            Already have an account?{' '}
            <Link to="/login" style={{color: '#3b82f6', textDecoration: 'none', fontWeight: '500'}}>
              Log In
            </Link>
          </div>
        </form>

        <div className="login-footer">
          <p>
            Designed with ❤️ by{' '}
            <a 
              href="https://www.linkedin.com/in/hemant-verma-ind/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="footer-link"
            >
              Hemant Verma
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;