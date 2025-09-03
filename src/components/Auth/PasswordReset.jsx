import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const PasswordReset = ({ onModeChange }) => {
  const { resetPassword, error, setError } = useAuth();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous errors
    setError(null);
    
    // Validate email
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    
    try {
      setIsSubmitting(true);
      await resetPassword(email);
      setIsSuccess(true);
    } catch (err) {
      // Error is handled by the auth context
      console.error('Password reset error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (isSuccess) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white">Check Your Email</h2>
          <p className="text-purple-200 mt-2">
            We've sent a password reset link to {email}
          </p>
        </div>
        
        <div className="bg-green-500/20 text-green-300 p-4 rounded-lg text-center">
          <p>Password reset instructions have been sent to your email.</p>
        </div>
        
        <div className="text-center">
          <button
            onClick={() => onModeChange('login')}
            className="text-purple-300 hover:text-white font-medium"
          >
            Back to Sign In
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white">Reset Password</h2>
        <p className="text-purple-200 mt-2">
          Enter your email to receive a password reset link
        </p>
      </div>
      
      {error && (
        <div className="bg-red-500/20 text-red-300 p-3 rounded-lg text-sm">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-white font-medium mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="you@example.com"
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-6 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Sending...' : 'Send Reset Link'}
        </button>
      </form>
      
      <div className="text-center">
        <button
          onClick={() => onModeChange('login')}
          className="text-purple-300 hover:text-white font-medium"
        >
          Back to Sign In
        </button>
      </div>
    </div>
  );
};

export default PasswordReset;

