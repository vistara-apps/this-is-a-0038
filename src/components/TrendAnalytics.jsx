import React, { useState, useEffect } from 'react';
import { TrendingUp, Hash, Users, Clock, RefreshCw, Filter, Search } from 'lucide-react';
import { useApp } from '../context/AppContext';
import TrendChart from './TrendChart';

const TrendAnalytics = () => {
  const { user } = useApp();
  const [trends, setTrends] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeframe, setTimeframe] = useState('day'); // 'day', 'week', 'month'
  const [category, setCategory] = useState('all'); // 'all', 'tech', 'lifestyle', 'work', etc.
  const [searchQuery, setSearchQuery] = useState('');
  
  // Check if user has access to trends (Pro or Viral plan)
  const hasTrendAccess = user?.subscriptionTier === 'Pro' || user?.subscriptionTier === 'Viral';

  // Load trend data
  useEffect(() => {
    const loadTrendData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // In a real app, this would fetch data from an API
        // For now, we'll use mock data with a delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock trend data
        const mockTrends = [
          { id: 1, hashtag: '#AIMemeLord', growth: '+245%', growthValue: 245, posts: '12.4K', postsValue: 12400, category: 'Tech' },
          { id: 2, hashtag: '#MondayMood', growth: '+89%', growthValue: 89, posts: '8.7K', postsValue: 8700, category: 'Lifestyle' },
          { id: 3, hashtag: '#CoffeeFirst', growth: '+156%', growthValue: 156, posts: '15.2K', postsValue: 15200, category: 'Lifestyle' },
          { id: 4, hashtag: '#WorkFromHome', growth: '+67%', growthValue: 67, posts: '22.1K', postsValue: 22100, category: 'Work' },
          { id: 5, hashtag: '#AITakeover', growth: '+203%', growthValue: 203, posts: '9.8K', postsValue: 9800, category: 'Tech' },
          { id: 6, hashtag: '#MemeEconomy', growth: '+178%', growthValue: 178, posts: '7.3K', postsValue: 7300, category: 'Entertainment' },
          { id: 7, hashtag: '#CryptoMemes', growth: '+122%', growthValue: 122, posts: '5.9K', postsValue: 5900, category: 'Finance' },
          { id: 8, hashtag: '#GamingLife', growth: '+95%', growthValue: 95, posts: '11.2K', postsValue: 11200, category: 'Gaming' }
        ];
        
        // Mock template data
        const mockTemplates = [
          { id: 1, name: 'Distracted Boyfriend', usage: '15.2K', usageValue: 15200, trend: 'up', imageUrl: 'https://i.imgur.com/QbRXRRk.jpg' },
          { id: 2, name: 'Drake Pointing', usage: '12.8K', usageValue: 12800, trend: 'up', imageUrl: 'https://i.imgur.com/dTLMhTj.jpg' },
          { id: 3, name: 'Woman Yelling at Cat', usage: '11.4K', usageValue: 11400, trend: 'down', imageUrl: 'https://i.imgur.com/H7GdWZT.jpg' },
          { id: 4, name: 'This is Fine', usage: '9.7K', usageValue: 9700, trend: 'up', imageUrl: 'https://i.imgur.com/KTcQYFq.jpg' },
          { id: 5, name: 'Change My Mind', usage: '8.3K', usageValue: 8300, trend: 'stable', imageUrl: 'https://i.imgur.com/LkfA4sI.jpg' },
          { id: 6, name: 'Two Buttons', usage: '7.5K', usageValue: 7500, trend: 'up', imageUrl: 'https://i.imgur.com/v4YUTj4.jpg' },
          { id: 7, name: 'Expanding Brain', usage: '6.9K', usageValue: 6900, trend: 'down', imageUrl: 'https://i.imgur.com/xJrSWQu.jpg' },
          { id: 8, name: 'Surprised Pikachu', usage: '6.2K', usageValue: 6200, trend: 'stable', imageUrl: 'https://i.imgur.com/u4NxZeG.jpg' }
        ];
        
        // Filter by category if needed
        const filteredTrends = category === 'all' 
          ? mockTrends 
          : mockTrends.filter(trend => trend.category.toLowerCase() === category.toLowerCase());
        
        // Filter by search query if provided
        const searchedTrends = searchQuery
          ? filteredTrends.filter(trend => 
              trend.hashtag.toLowerCase().includes(searchQuery.toLowerCase()) ||
              trend.category.toLowerCase().includes(searchQuery.toLowerCase())
            )
          : filteredTrends;
        
        setTrends(searchedTrends);
        setTemplates(mockTemplates);
      } catch (err) {
        console.error('Error loading trend data:', err);
        setError('Failed to load trend data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    
    if (hasTrendAccess) {
      loadTrendData();
    }
  }, [hasTrendAccess, timeframe, category, searchQuery]);

  // Handle refresh button click
  const handleRefresh = () => {
    // Reload trend data
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };
  
  // Render upgrade prompt if user doesn't have access
  if (!hasTrendAccess) {
    return (
      <div className="space-y-6">
        <div className="glass-effect rounded-lg p-6 border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-6">Trend Analytics</h2>
          
          <div className="bg-white/5 rounded-lg p-8 text-center">
            <TrendingUp className="w-16 h-16 text-purple-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Upgrade to Access Trend Analytics</h3>
            <p className="text-purple-200 mb-6 max-w-md mx-auto">
              Trend Analytics helps you create relevant and timely memes by showing you what's currently trending across social platforms.
            </p>
            <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-6 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200">
              Upgrade to Pro
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="glass-effect rounded-lg p-6 border border-white/20">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Trend Analytics</h2>
          
          <div className="flex items-center gap-2">
            {/* Timeframe selector */}
            <div className="bg-white/10 rounded-lg p-1 flex">
              <button
                onClick={() => setTimeframe('day')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  timeframe === 'day' ? 'bg-purple-500 text-white' : 'text-purple-200 hover:bg-white/10'
                }`}
              >
                Day
              </button>
              <button
                onClick={() => setTimeframe('week')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  timeframe === 'week' ? 'bg-purple-500 text-white' : 'text-purple-200 hover:bg-white/10'
                }`}
              >
                Week
              </button>
              <button
                onClick={() => setTimeframe('month')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  timeframe === 'month' ? 'bg-purple-500 text-white' : 'text-purple-200 hover:bg-white/10'
                }`}
              >
                Month
              </button>
            </div>
            
            {/* Refresh button */}
            <button
              onClick={handleRefresh}
              disabled={isLoading}
              className="p-2 rounded-lg bg-white/10 text-purple-200 hover:bg-white/20 hover:text-white transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
        
        {/* Search and filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-purple-300" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search trends..."
              className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="w-5 h-5 text-purple-300" />
            </div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="pl-10 pr-8 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none"
            >
              <option value="all">All Categories</option>
              <option value="tech">Tech</option>
              <option value="lifestyle">Lifestyle</option>
              <option value="work">Work</option>
              <option value="entertainment">Entertainment</option>
              <option value="finance">Finance</option>
              <option value="gaming">Gaming</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="w-5 h-5 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
        
        {/* Error message */}
        {error && (
          <div className="bg-red-500/20 text-red-300 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}
        
        {/* Loading state */}
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
          </div>
        ) : (
          <>
            {/* Trend visualization */}
            <div className="bg-white/5 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-purple-400" />
                <h3 className="text-lg font-semibold text-white">Trend Growth</h3>
              </div>
              
              <TrendChart trends={trends.slice(0, 5)} />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Trending Hashtags */}
              <div className="bg-white/5 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-4">
                  <Hash className="w-5 h-5 text-purple-400" />
                  <h3 className="text-lg font-semibold text-white">Trending Hashtags</h3>
                </div>
                
                {trends.length === 0 ? (
                  <div className="text-center py-8 text-purple-200">
                    No trends found for your search criteria
                  </div>
                ) : (
                  <div className="space-y-3 max-h-96 overflow-y-auto">
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
                )}
              </div>

              {/* Popular Templates */}
              <div className="bg-white/5 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-purple-400" />
                  <h3 className="text-lg font-semibold text-white">Popular Templates</h3>
                </div>
                
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {templates.map((template) => (
                    <div key={template.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded bg-white/10 overflow-hidden flex-shrink-0">
                          {template.imageUrl && (
                            <img 
                              src={template.imageUrl} 
                              alt={template.name} 
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        <div>
                          <div className="text-white font-medium">{template.name}</div>
                          <div className="text-purple-200 text-sm">{template.usage} uses today</div>
                        </div>
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
          </>
        )}
      </div>
    </div>
  );
};

export default TrendAnalytics;
