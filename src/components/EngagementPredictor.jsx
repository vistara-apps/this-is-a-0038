import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import { Target, TrendingUp, Users, Share2, Heart } from 'lucide-react'

const EngagementPredictor = () => {
  const { memes } = useApp()
  const [selectedMeme, setSelectedMeme] = useState(null)

  const getPredictionDetails = (score) => {
    if (score >= 90) return { level: 'Viral', color: 'text-green-400', bg: 'bg-green-500/20' }
    if (score >= 75) return { level: 'High', color: 'text-blue-400', bg: 'bg-blue-500/20' }
    if (score >= 60) return { level: 'Medium', color: 'text-yellow-400', bg: 'bg-yellow-500/20' }
    return { level: 'Low', color: 'text-red-400', bg: 'bg-red-500/20' }
  }

  const generatePredictionFactors = (meme) => {
    return [
      { factor: 'Visual Appeal', score: 85, description: 'Strong composition and clear text' },
      { factor: 'Humor Timing', score: meme.engagementScore - 10, description: 'Well-timed comedic elements' },
      { factor: 'Trend Relevance', score: 92, description: 'Matches current viral patterns' },
      { factor: 'Shareability', score: meme.engagementScore + 5, description: 'High potential for social sharing' },
      { factor: 'Emotional Impact', score: 78, description: 'Evokes strong emotional response' }
    ]
  }

  return (
    <div className="space-y-6">
      <div className="glass-effect rounded-lg p-6 border border-white/20">
        <h2 className="text-2xl font-bold text-white mb-6">AI Meme Engagement Predictor</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Meme Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Your Generated Memes</h3>
            
            {memes.length === 0 ? (
              <div className="bg-white/5 rounded-lg p-6 text-center">
                <Target className="w-12 h-12 text-purple-300 mx-auto mb-3" />
                <p className="text-purple-200">Generate some memes first to see predictions</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {memes.map((meme) => {
                  const prediction = getPredictionDetails(meme.engagementScore)
                  return (
                    <button
                      key={meme.id}
                      onClick={() => setSelectedMeme(meme)}
                      className={`w-full p-3 rounded-lg border transition-all text-left ${
                        selectedMeme?.id === meme.id
                          ? 'border-purple-400 bg-white/20'
                          : 'border-white/20 bg-white/5 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={meme.imageUrl}
                          alt="Meme preview"
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1">
                          <div className="text-white font-medium text-sm truncate">
                            {meme.topText || meme.prompt || 'Untitled Meme'}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${prediction.bg} ${prediction.color}`}>
                              {prediction.level}
                            </span>
                            <span className="text-purple-200 text-xs">
                              {meme.engagementScore}% score
                            </span>
                          </div>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          {/* Prediction Analysis */}
          <div className="space-y-4">
            {selectedMeme ? (
              <>
                <div className="bg-white/5 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-3">Engagement Analysis</h3>
                  
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white">{selectedMeme.engagementScore}%</div>
                      <div className="text-purple-200 text-sm">Overall Score</div>
                    </div>
                    <div className={`px-3 py-2 rounded-lg ${getPredictionDetails(selectedMeme.engagementScore).bg}`}>
                      <div className={`font-semibold ${getPredictionDetails(selectedMeme.engagementScore).color}`}>
                        {getPredictionDetails(selectedMeme.engagementScore).level} Potential
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-white font-medium">Performance Factors</h4>
                    {generatePredictionFactors(selectedMeme).map((factor, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-purple-200 text-sm">{factor.factor}</span>
                          <span className="text-white font-medium">{factor.score}%</span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                            style={{ width: `${factor.score}%` }}
                          ></div>
                        </div>
                        <p className="text-purple-200 text-xs">{factor.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-3">Predicted Metrics</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <Heart className="w-6 h-6 text-red-400 mx-auto mb-1" />
                      <div className="text-white font-semibold">
                        {Math.floor(selectedMeme.engagementScore * 50)}
                      </div>
                      <div className="text-purple-200 text-xs">Expected Likes</div>
                    </div>
                    
                    <div className="text-center">
                      <Share2 className="w-6 h-6 text-blue-400 mx-auto mb-1" />
                      <div className="text-white font-semibold">
                        {Math.floor(selectedMeme.engagementScore * 12)}
                      </div>
                      <div className="text-purple-200 text-xs">Expected Shares</div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-white/5 rounded-lg p-6 text-center">
                <Target className="w-12 h-12 text-purple-300 mx-auto mb-3" />
                <p className="text-purple-200">Select a meme to see detailed predictions</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EngagementPredictor