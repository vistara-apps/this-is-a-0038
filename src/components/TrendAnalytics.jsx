import React, { useState, useEffect } from 'react'
import { TrendingUp, Hash, Users, Clock } from 'lucide-react'

const TrendAnalytics = () => {
  const [trends, setTrends] = useState([])
  const [templates, setTemplates] = useState([])

  useEffect(() => {
    // Mock trend data
    setTrends([
      { id: 1, hashtag: '#AIMemeLord', growth: '+245%', posts: '12.4K', category: 'Tech' },
      { id: 2, hashtag: '#MondayMood', growth: '+89%', posts: '8.7K', category: 'Lifestyle' },
      { id: 3, hashtag: '#CoffeeFirst', growth: '+156%', posts: '15.2K', category: 'Lifestyle' },
      { id: 4, hashtag: '#WorkFromHome', growth: '+67%', posts: '22.1K', category: 'Work' },
      { id: 5, hashtag: '#AITakeover', growth: '+203%', posts: '9.8K', category: 'Tech' }
    ])

    setTemplates([
      { id: 1, name: 'Distracted Boyfriend', usage: '15.2K', trend: 'up' },
      { id: 2, name: 'Drake Pointing', usage: '12.8K', trend: 'up' },
      { id: 3, name: 'Woman Yelling at Cat', usage: '11.4K', trend: 'down' },
      { id: 4, name: 'This is Fine', usage: '9.7K', trend: 'up' },
      { id: 5, name: 'Change My Mind', usage: '8.3K', trend: 'stable' }
    ])
  }, [])

  return (
    <div className="space-y-6">
      <div className="glass-effect rounded-lg p-6 border border-white/20">
        <h2 className="text-2xl font-bold text-white mb-6">Trend Analytics</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Trending Hashtags */}
          <div className="bg-white/5 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-4">
              <Hash className="w-5 h-5 text-purple-400" />
              <h3 className="text-lg font-semibold text-white">Trending Hashtags</h3>
            </div>
            
            <div className="space-y-3">
              {trends.map((trend) => (
                <div key={trend.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div>
                    <div className="text-white font-medium">{trend.hashtag}</div>
                    <div className="text-purple-200 text-sm">{trend.category}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-green-400 font-semibold">{trend.growth}</div>
                    <div className="text-purple-200 text-sm">{trend.posts} posts</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Popular Templates */}
          <div className="bg-white/5 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-purple-400" />
              <h3 className="text-lg font-semibold text-white">Popular Templates</h3>
            </div>
            
            <div className="space-y-3">
              {templates.map((template) => (
                <div key={template.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div>
                    <div className="text-white font-medium">{template.name}</div>
                    <div className="text-purple-200 text-sm">{template.usage} uses today</div>
                  </div>
                  <div className={`px-2 py-1 rounded text-xs font-medium ${
                    template.trend === 'up' 
                      ? 'bg-green-500/20 text-green-300' 
                      : template.trend === 'down'
                      ? 'bg-red-500/20 text-red-300'
                      : 'bg-gray-500/20 text-gray-300'
                  }`}>
                    {template.trend === 'up' ? '↗' : template.trend === 'down' ? '↘' : '→'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <Users className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">2.4M</div>
            <div className="text-purple-200 text-sm">Active Memers</div>
          </div>
          
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <Hash className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">156K</div>
            <div className="text-purple-200 text-sm">Memes Created Today</div>
          </div>
          
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <Clock className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">42s</div>
            <div className="text-purple-200 text-sm">Avg. Generation Time</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TrendAnalytics