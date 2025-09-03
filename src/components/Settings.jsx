import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Palette, Zap, Shield, Bell, Save, AlertCircle, Monitor, Moon, Sun } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Settings = () => {
  const { user, setError: setAppError } = useApp();
  const [notifications, setNotifications] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const [highQuality, setHighQuality] = useState(false);
  const [theme, setTheme] = useState('purple'); // 'purple', 'ocean', 'forest'
  const [colorMode, setColorMode] = useState('system'); // 'light', 'dark', 'system'
  const [apiKey, setApiKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  
  // Load settings from localStorage on mount
  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem('mememaster_settings');
      if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        setNotifications(settings.notifications ?? true);
        setAutoSave(settings.autoSave ?? true);
        setHighQuality(settings.highQuality ?? false);
        setTheme(settings.theme ?? 'purple');
        setColorMode(settings.colorMode ?? 'system');
      }
    } catch (err) {
      console.error('Error loading settings:', err);
    }
  }, []);
  
  // Save settings to localStorage when they change
  useEffect(() => {
    try {
      const settings = {
        notifications,
        autoSave,
        highQuality,
        theme,
        colorMode
      };
      localStorage.setItem('mememaster_settings', JSON.stringify(settings));
    } catch (err) {
      console.error('Error saving settings:', err);
    }
  }, [notifications, autoSave, highQuality, theme, colorMode]);
  
  // Handle save settings
  const handleSaveSettings = async () => {
    try {
      setIsLoading(true);
      setError(null);
      setSuccessMessage(null);
      
      // In a real app, this would save settings to the server
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccessMessage('Settings saved successfully');
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (err) {
      console.error('Error saving settings:', err);
      setError('Failed to save settings. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle API key save
  const handleSaveApiKey = async () => {
    try {
      setIsLoading(true);
      setError(null);
      setSuccessMessage(null);
      
      // Validate API key
      if (!apiKey.trim()) {
        setError('Please enter a valid API key');
        return;
      }
      
      // In a real app, this would validate and save the API key
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Clear API key input and show success message
      setApiKey('');
      setSuccessMessage('API key saved successfully');
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (err) {
      console.error('Error saving API key:', err);
      setError('Failed to save API key. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="glass-effect rounded-lg p-6 border border-white/20">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Settings</h2>
          
          <button
            onClick={handleSaveSettings}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-500 text-white hover:bg-purple-600 transition-colors disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Settings</span>
              </>
            )}
          </button>
        </div>
        
        {/* Error message */}
        {error && (
          <div className="bg-red-500/20 text-red-300 p-3 rounded-lg mb-6 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}
        
        {/* Success message */}
        {successMessage && (
          <div className="bg-green-500/20 text-green-300 p-3 rounded-lg mb-6 flex items-center gap-2">
            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p>{successMessage}</p>
          </div>
        )}
        
        <div className="space-y-6">
          {/* Generation Settings */}
          <div className="bg-white/5 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-purple-400" />
              <h3 className="text-lg font-semibold text-white">Generation Settings</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white font-medium">High Quality Output</div>
                  <div className="text-purple-200 text-sm">Generate memes in higher resolution</div>
                </div>
                <button
                  onClick={() => setHighQuality(!highQuality)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    highQuality ? 'bg-purple-500' : 'bg-white/20'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      highQuality ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white font-medium">Auto-save Generated Memes</div>
                  <div className="text-purple-200 text-sm">Automatically save memes to your collection</div>
                </div>
                <button
                  onClick={() => setAutoSave(!autoSave)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    autoSave ? 'bg-purple-500' : 'bg-white/20'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      autoSave ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              
              {/* API Key Input */}
              <div className="pt-2 border-t border-white/10">
                <div className="text-white font-medium mb-2">OpenAI API Key (Optional)</div>
                <div className="text-purple-200 text-sm mb-3">
                  Use your own API key for meme generation
                </div>
                <div className="flex gap-2">
                  <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="sk-..."
                    className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <button
                    onClick={handleSaveApiKey}
                    disabled={isLoading || !apiKey.trim()}
                    className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:hover:bg-purple-500"
                  >
                    Save Key
                  </button>
                </div>
                <p className="text-purple-200/70 text-xs mt-2">
                  Your API key is stored securely and never shared
                </p>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white/5 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-4">
              <Bell className="w-5 h-5 text-purple-400" />
              <h3 className="text-lg font-semibold text-white">Notifications</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white font-medium">Trend Alerts</div>
                  <div className="text-purple-200 text-sm">Get notified about trending meme formats</div>
                </div>
                <button
                  onClick={() => setNotifications(!notifications)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notifications ? 'bg-purple-500' : 'bg-white/20'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notifications ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white font-medium">Weekly Digest</div>
                  <div className="text-purple-200 text-sm">Receive a weekly summary of top memes</div>
                </div>
                <button
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors bg-white/20`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-1`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Theme Settings */}
          <div className="bg-white/5 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-4">
              <Palette className="w-5 h-5 text-purple-400" />
              <h3 className="text-lg font-semibold text-white">Appearance</h3>
            </div>
            
            <div className="mb-6">
              <div className="text-white font-medium mb-3">Theme</div>
              <div className="grid grid-cols-3 gap-3">
                <button 
                  onClick={() => setTheme('purple')}
                  className={`p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg border-2 transition-all ${
                    theme === 'purple' ? 'border-purple-400' : 'border-transparent opacity-60 hover:opacity-80'
                  }`}
                >
                  <div className="text-white text-sm font-medium">Purple</div>
                </button>
                <button 
                  onClick={() => setTheme('ocean')}
                  className={`p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg border-2 transition-all ${
                    theme === 'ocean' ? 'border-blue-400' : 'border-transparent opacity-60 hover:opacity-80'
                  }`}
                >
                  <div className="text-white text-sm font-medium">Ocean</div>
                </button>
                <button 
                  onClick={() => setTheme('forest')}
                  className={`p-3 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg border-2 transition-all ${
                    theme === 'forest' ? 'border-green-400' : 'border-transparent opacity-60 hover:opacity-80'
                  }`}
                >
                  <div className="text-white text-sm font-medium">Forest</div>
                </button>
              </div>
            </div>
            
            <div>
              <div className="text-white font-medium mb-3">Color Mode</div>
              <div className="flex gap-3">
                <button 
                  onClick={() => setColorMode('light')}
                  className={`flex-1 p-3 rounded-lg border transition-all ${
                    colorMode === 'light' 
                      ? 'bg-white/20 border-white/40' 
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <Sun className="w-5 h-5 text-yellow-300 mx-auto mb-1" />
                  <div className="text-white text-sm font-medium">Light</div>
                </button>
                <button 
                  onClick={() => setColorMode('dark')}
                  className={`flex-1 p-3 rounded-lg border transition-all ${
                    colorMode === 'dark' 
                      ? 'bg-white/20 border-white/40' 
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <Moon className="w-5 h-5 text-blue-300 mx-auto mb-1" />
                  <div className="text-white text-sm font-medium">Dark</div>
                </button>
                <button 
                  onClick={() => setColorMode('system')}
                  className={`flex-1 p-3 rounded-lg border transition-all ${
                    colorMode === 'system' 
                      ? 'bg-white/20 border-white/40' 
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <Monitor className="w-5 h-5 text-purple-300 mx-auto mb-1" />
                  <div className="text-white text-sm font-medium">System</div>
                </button>
              </div>
            </div>
          </div>

          {/* Advanced Settings */}
          <div className="bg-white/5 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-4">
              <SettingsIcon className="w-5 h-5 text-purple-400" />
              <h3 className="text-lg font-semibold text-white">Advanced</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white font-medium">Developer Mode</div>
                  <div className="text-purple-200 text-sm">Enable advanced customization options</div>
                </div>
                <button
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors bg-white/20`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-1`}
                  />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white font-medium">Analytics</div>
                  <div className="text-purple-200 text-sm">Help improve MemeMaster AI with anonymous usage data</div>
                </div>
                <button
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors bg-purple-500`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
