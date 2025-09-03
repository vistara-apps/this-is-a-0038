import React from 'react'

const MemeDisplay = ({ meme }) => {
  return (
    <div className="bg-white/10 rounded-lg p-4 border border-white/20">
      <div className="meme-canvas">
        <img
          src={meme.imageUrl}
          alt="Meme template"
          className="w-full h-auto rounded-lg"
        />
        {meme.topText && (
          <div className="meme-text top">
            {meme.topText}
          </div>
        )}
        {meme.bottomText && (
          <div className="meme-text bottom">
            {meme.bottomText}
          </div>
        )}
      </div>
      
      <div className="mt-4 flex items-center justify-between">
        <div className="text-purple-200 text-sm">
          Style: <span className="text-white capitalize">{meme.humorStyle}</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-purple-200 text-sm">
            Engagement Score: <span className="text-white font-bold">{meme.engagementScore}%</span>
          </div>
          <div className={`px-2 py-1 rounded text-xs font-medium ${
            meme.viralityPrediction === 'High' 
              ? 'bg-green-500/20 text-green-300' 
              : 'bg-yellow-500/20 text-yellow-300'
          }`}>
            {meme.viralityPrediction} Viral Potential
          </div>
        </div>
      </div>
    </div>
  )
}

export default MemeDisplay