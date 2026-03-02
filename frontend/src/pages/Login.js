import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import LightRays from '../components/LightRays';
import { ShieldCheck, ArrowRight, Lock } from 'lucide-react'; // Assuming you have lucide-react
import '../styles/Global.css';
import '../styles/Login.css'; // We'll create this specific file

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      alert("Invalid Credentials");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      {/* Background Animation */}
      <div className="background-layer">
        <LightRays
          raysOrigin="top-center"
          raysColor="#3b82f6" // TalkFlow Blue
          raysSpeed={0.5}
          lightSpread={0.8}
          rayLength={1.5}
          pulsating={true}
          followMouse={true}
          mouseInfluence={0.3}
        />
      </div>

      {/* Main Content */}
      <div className="login-container">
        
        {/* Branding Section */}
        <div className="brand-header">
          <div className="brand-logo">
            <ShieldCheck size={48} color="#3b82f6" strokeWidth={1.5} />
          </div>
          <h1>TalkFlow</h1>
          <p>Secure Communication Archival System</p>
        </div>

        {/* Login Form */}
        <form className="login-card glass-card" onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email Address</label>
            <input 
              type="email" 
              placeholder="admin@talkflow.com" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          
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
            {isLoading ? 'Authenticating...' : (
              <>
                Enter Archive <ArrowRight size={18} />
              </>
            )}
          </button>
          <div style={{textAlign: 'center', marginTop: '10px', fontSize: '0.9rem', color: '#94a3b8'}}>
            New to TalkFlow?{' '}
            <Link to="/signup" style={{color: '#3b82f6', textDecoration: 'none', fontWeight: '500'}}>
              Create Account
            </Link>
          </div>
        </form>

        {/* Footer Credit */}
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

export default Login;