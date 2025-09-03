import React from 'react'
import { Zap, TrendingUp, Target, Settings, User, Crown } from 'lucide-react'

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'generator', label: 'Meme Generator', icon: Zap },
    { id: 'trends', label: 'Trend Analytics', icon: TrendingUp },
    { id: 'predictor', label: 'Engagement Predictor', icon: Target },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'account', label: 'Account', icon: User }
  ]

  return (
    <div className="w-64 min-h-screen glass-effect border-r border-white/20">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <Crown className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">MemeMaster AI</h1>
            <p className="text-purple-200 text-sm">Craft viral memes</p>
          </div>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-white/20 text-white shadow-lg'
                    : 'text-purple-200 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            )
          })}
        </nav>

        <div className="mt-8 p-4 bg-white/10 rounded-lg border border-white/20">
          <div className="flex items-center gap-2 mb-2">
            <Crown className="w-4 h-4 text-yellow-400" />
            <span className="text-white font-medium">Pro Plan</span>
          </div>
          <div className="text-purple-200 text-sm mb-3">
            42/50 generations left
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
              style={{ width: '84%' }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar