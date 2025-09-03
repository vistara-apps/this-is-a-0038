import React, { useState } from 'react'
import { Settings as SettingsIcon, Palette, Zap, Shield, Bell } from 'lucide-react'

const Settings = () => {
  const [notifications, setNotifications] = useState(true)
  const [autoSave, setAutoSave] = useState(true)
  const [highQuality, setHighQuality] = useState(false)

  return (
    <div className="space-y-6">
      <div className="glass-effect rounded-lg p-6 border border-white/20">
        <h2 className="text-2xl font-bold text-white mb-6">Settings</h2>
        
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
            </div>
          </div>

          {/* Theme Settings */}
          <div className="bg-white/5 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-4">
              <Palette className="w-5 h-5 text-purple-400" />
              <h3 className="text-lg font-semibold text-white">Appearance</h3>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              <button className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg border-2 border-purple-400">
                <div className="text-white text-sm font-medium">Purple (Current)</div>
              </button>
              <button className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg border-2 border-transparent opacity-60">
                <div className="text-white text-sm font-medium">Ocean</div>
              </button>
              <button className="p-3 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg border-2 border-transparent opacity-60">
                <div className="text-white text-sm font-medium">Forest</div>
              </button>
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="bg-white/5 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-purple-400" />
              <h3 className="text-lg font-semibold text-white">Privacy</h3>
            </div>
            
            <div className="space-y-3">
              <button className="w-full text-left p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                <div className="text-white font-medium">Download My Data</div>
                <div className="text-purple-200 text-sm">Export all your generated memes and data</div>
              </button>
              
              <button className="w-full text-left p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                <div className="text-white font-medium">Delete Account</div>
                <div className="text-purple-200 text-sm">Permanently delete your account and data</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings