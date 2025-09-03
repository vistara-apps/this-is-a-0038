import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { Crown, CreditCard, Zap, TrendingUp, Calendar, LogOut, AlertCircle, Download, Shield } from 'lucide-react';
import { SUBSCRIPTION_PLANS, createCheckoutSession, createPortalSession } from '../services/stripe';

const Account = () => {
  const { user, memes } = useApp();
  const { signOut } = useAuth?.() || {};
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Get current plan details
  const currentPlan = Object.values(SUBSCRIPTION_PLANS).find(
    plan => plan.id.toLowerCase() === user?.subscriptionTier?.toLowerCase()
  ) || SUBSCRIPTION_PLANS.FREE;
  
  // Calculate days until renewal
  const daysUntilRenewal = 12; // In a real app, this would be calculated from subscription data
  
  // Handle plan upgrade
  const handleUpgrade = async (planId) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // In a real app, this would redirect to Stripe checkout
      const checkoutUrl = await createCheckoutSession(planId, user.id, user.email);
      window.location.href = checkoutUrl;
    } catch (err) {
      console.error('Error upgrading plan:', err);
      setError('Failed to initiate upgrade. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle billing portal
  const handleManageBilling = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // In a real app, this would redirect to Stripe billing portal
      const portalUrl = await createPortalSession(user.id);
      window.location.href = portalUrl;
    } catch (err) {
      console.error('Error opening billing portal:', err);
      setError('Failed to open billing portal. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle sign out
  const handleSignOut = async () => {
    try {
      setIsLoading(true);
      await signOut?.();
    } catch (err) {
      console.error('Error signing out:', err);
      setError('Failed to sign out. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle data export
  const handleExportData = () => {
    // In a real app, this would generate and download a JSON file with user data
    const userData = {
      user: {
        email: user.email,
        subscriptionTier: user.subscriptionTier,
        createdAt: new Date().toISOString()
      },
      memes: memes
    };
    
    const dataStr = JSON.stringify(userData, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    
    const exportFileDefaultName = `mememaster-data-${Date.now()}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="space-y-6">
      <div className="glass-effect rounded-lg p-6 border border-white/20">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Account Management</h2>
          
          <button
            onClick={handleSignOut}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 text-purple-200 hover:bg-white/20 hover:text-white transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
        
        {/* Error message */}
        {error && (
          <div className="bg-red-500/20 text-red-300 p-3 rounded-lg mb-6 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}
        
        {/* User Info */}
        <div className="bg-white/5 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">
                {user.email.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h3 className="text-white font-semibold">{user.email}</h3>
              <div className="flex items-center gap-2 mt-1">
                <Crown className="w-4 h-4 text-yellow-400" />
                <span className="text-purple-200">{user.subscriptionTier} Plan</span>
              </div>
            </div>
          </div>
        </div>

        {/* Usage Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <Zap className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">
              {user.subscriptionTier === 'Viral' ? '∞' : user.generationsLeft}
            </div>
            <div className="text-purple-200 text-sm">Generations Left</div>
          </div>
          
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <TrendingUp className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">
              {user.subscriptionTier === 'Viral' ? '∞' : (user.totalGenerations - user.generationsLeft)}
            </div>
            <div className="text-purple-200 text-sm">Used This Month</div>
          </div>
          
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <Calendar className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{daysUntilRenewal}</div>
            <div className="text-purple-200 text-sm">Days Until Renewal</div>
          </div>
        </div>

        {/* Subscription Plans */}
        <div className="bg-white/5 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">Subscription Plans</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.values(SUBSCRIPTION_PLANS).map((plan) => {
              const isCurrent = plan.id.toLowerCase() === user.subscriptionTier.toLowerCase();
              
              return (
                <div
                  key={plan.id}
                  className={`p-4 rounded-lg border transition-all ${
                    isCurrent
                      ? 'border-purple-400 bg-white/10'
                      : 'border-white/20 bg-white/5'
                  }`}
                >
                  <div className="text-center mb-4">
                    <h4 className="text-white font-semibold">{plan.name}</h4>
                    <div className="flex items-baseline justify-center mt-2">
                      <span className="text-2xl font-bold text-white">${plan.price}</span>
                      <span className="text-purple-200 text-sm">/{plan.period}</span>
                    </div>
                  </div>
                  
                  <ul className="space-y-2 mb-4">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="text-purple-200 text-sm flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <button
                    onClick={() => !isCurrent && handleUpgrade(plan.id)}
                    disabled={isCurrent || isLoading}
                    className={`w-full py-2 px-4 rounded-lg font-medium transition-all ${
                      isCurrent
                        ? 'bg-purple-500/20 text-purple-300 cursor-default'
                        : 'bg-purple-500 text-white hover:bg-purple-600 disabled:opacity-50'
                    }`}
                  >
                    {isCurrent ? 'Current Plan' : `Upgrade to ${plan.name}`}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Billing */}
        <div className="bg-white/5 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <CreditCard className="w-5 h-5 text-purple-400" />
            <h3 className="text-lg font-semibold text-white">Billing Information</h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
              <div>
                <div className="text-white font-medium">Payment Method</div>
                <div className="text-purple-200 text-sm">•••• •••• •••• 4242</div>
              </div>
              <button 
                onClick={handleManageBilling}
                disabled={isLoading}
                className="text-purple-400 hover:text-purple-300 font-medium disabled:opacity-50"
              >
                Update
              </button>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
              <div>
                <div className="text-white font-medium">Next Billing Date</div>
                <div className="text-purple-200 text-sm">December 15, 2024</div>
              </div>
              <button 
                onClick={handleManageBilling}
                disabled={isLoading}
                className="text-purple-400 hover:text-purple-300 font-medium disabled:opacity-50"
              >
                Manage
              </button>
            </div>
          </div>
        </div>
        
        {/* Privacy & Data */}
        <div className="bg-white/5 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-5 h-5 text-purple-400" />
            <h3 className="text-lg font-semibold text-white">Privacy & Data</h3>
          </div>
          
          <div className="space-y-3">
            <button
              onClick={handleExportData}
              className="w-full flex justify-between items-center p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
            >
              <div className="text-left">
                <div className="text-white font-medium">Export Your Data</div>
                <div className="text-purple-200 text-sm">Download all your memes and account information</div>
              </div>
              <Download className="w-5 h-5 text-purple-400" />
            </button>
            
            <button
              className="w-full flex justify-between items-center p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
            >
              <div className="text-left">
                <div className="text-white font-medium">Delete Account</div>
                <div className="text-purple-200 text-sm">Permanently delete your account and all data</div>
              </div>
              <div className="px-2 py-1 bg-red-500/20 text-red-300 rounded text-xs font-medium">
                Danger
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
