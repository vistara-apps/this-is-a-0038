import React, { createContext, useContext, useState } from 'react'

const AppContext = createContext()

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within AppProvider')
  }
  return context
}

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: '1',
    email: 'user@example.com',
    subscriptionTier: 'Pro',
    generationsLeft: 42,
    totalGenerations: 50
  })

  const [memes, setMemes] = useState([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [currentMeme, setCurrentMeme] = useState(null)

  const generateMeme = async (prompt, imageFile, humorStyle = 'witty') => {
    setIsGenerating(true)
    
    try {
      // Simulate AI generation with mock data
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const newMeme = {
        id: Date.now(),
        prompt,
        imageUrl: imageFile ? URL.createObjectURL(imageFile) : '/api/placeholder/500/400',
        topText: generateMockCaption(prompt, humorStyle, 'top'),
        bottomText: generateMockCaption(prompt, humorStyle, 'bottom'),
        humorStyle,
        createdAt: new Date(),
        engagementScore: Math.floor(Math.random() * 40) + 60, // 60-100
        viralityPrediction: Math.random() > 0.5 ? 'High' : 'Medium'
      }
      
      setCurrentMeme(newMeme)
      setMemes(prev => [newMeme, ...prev])
      setUser(prev => ({ ...prev, generationsLeft: prev.generationsLeft - 1 }))
    } catch (error) {
      console.error('Error generating meme:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const generateMockCaption = (prompt, style, position) => {
    const captions = {
      witty: {
        top: ['WHEN YOU REALIZE', 'THAT MOMENT WHEN', 'ME TRYING TO'],
        bottom: ['MAKES PERFECT SENSE', 'EVERY SINGLE TIME', 'NAILED IT']
      },
      absurd: {
        top: ['BANANA PHILOSOPHY', 'QUANTUM CONFUSION', 'SPAGHETTI LOGIC'],
        bottom: ['BECAUSE REASONS', 'OBVIOUSLY', 'MAKES TOTAL SENSE']
      },
      dry: {
        top: ['OH GREAT', 'FANTASTIC', 'WONDERFUL'],
        bottom: ['EXACTLY WHAT I NEEDED', 'PERFECT TIMING', 'JUST PERFECT']
      }
    }
    
    const styleData = captions[style] || captions.witty
    const options = styleData[position]
    return options[Math.floor(Math.random() * options.length)]
  }

  const value = {
    user,
    setUser,
    memes,
    setMemes,
    isGenerating,
    setIsGenerating,
    currentMeme,
    setCurrentMeme,
    generateMeme
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}