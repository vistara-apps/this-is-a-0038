import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Login from './Login';
import Signup from './Signup';
import PasswordReset from './PasswordReset';

const Auth = () => {
  const { user, loading } = useAuth();
  const [authMode, setAuthMode] = useState('login'); // 'login', 'signup', 'reset'
  
  // If user is authenticated or loading, don't show auth modal
  if (user || loading) {
    return null;
  }
  
  // Render the appropriate auth form based on mode
  const renderAuthForm = () => {
    switch (authMode) {
      case 'signup':
        return <Signup onModeChange={setAuthMode} />;
      case 'reset':
        return <PasswordReset onModeChange={setAuthMode} />;
      default:
        return <Login onModeChange={setAuthMode} />;
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="glass-effect rounded-lg p-6 border border-white/20 w-full max-w-md">
        {renderAuthForm()}
      </div>
    </div>
  );
};

export default Auth;

