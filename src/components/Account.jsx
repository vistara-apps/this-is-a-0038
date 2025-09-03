import React from 'react'
import { useApp } from '../context/AppContext'
import { Crown, CreditCard, Zap, TrendingUp, Calendar } from 'lucide-react'

const Account = () => {
  const { user } = useApp()

  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: '/month',
      features: ['5 generations/month', 'Basic humor styles', 'Standard quality'],
      current: false
    },
    {
      name: 'Pro',
      price: '$10',
      period: '/month',
      features: ['50 generations/month', 'Advanced humor tuning', 'HD quality', 'Trend insights'],
      current: true
    },
    {
      name: 'Viral',
      price: '$25',
      period: '/month',
      features: ['Unlimited generations', 'All humor styles', '4K quality', 'Full analytics', 'Priority support'],
      current: false
    }
  ]

  return (
    <div className="space-y-6">
      <div className="glass-effect rounded-lg p-6 border border-white/20">
        <h2 className="text-2xl font-bold text-white mb-6">Account Management</h2>
        
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
            <div className="text-2xl font-bold text-white">{user.generationsLeft}</div>
            <div className="text-purple-200 text-sm">Generations Left</div>
          </div>
          
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <TrendingUp className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{user.totalGenerations - user.generationsLeft}</div>
            <div className="text-purple-200 text-sm">Used This Month</div>
          </div>
          
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <Calendar className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">12</div>
            <div className="text-purple-200 text-sm">Days Until Renewal</div>
          </div>
        </div>

        {/* Subscription Plans */}
        <div className="bg-white/5 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-4">Subscription Plans</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`p-4 rounded-lg border transition-all ${
                  plan.current
                    ? 'border-purple-400 bg-white/10'
                    : 'border-white/20 bg-white/5'
                }`}
              >
                <div className="text-center mb-4">
                  <h4 className="text-white font-semibold">{plan.name}</h4>
                  <div className="flex items-baseline justify-center mt-2">
                    <span className="text-2xl font-bold text-white">{plan.price}</span>
                    <span className="text-purple-200 text-sm">{plan.period}</span>
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
                  className={`w-full py-2 px-4 rounded-lg font-medium transition-all ${
                    plan.current
                      ? 'bg-purple-500/20 text-purple-300 cursor-default'
                      : 'bg-purple-500 text-white hover:bg-purple-600'
                  }`}
                  disabled={plan.current}
                >
                  {plan.current ? 'Current Plan' : 'Upgrade'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Billing */}
        <div className="bg-white/5 rounded-lg p-4">
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
              <button className="text-purple-400 hover:text-purple-300 font-medium">
                Update
              </button>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
              <div>
                <div className="text-white font-medium">Next Billing Date</div>
                <div className="text-purple-200 text-sm">December 15, 2024</div>
              </div>
              <button className="text-purple-400 hover:text-purple-300 font-medium">
                Manage
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Account