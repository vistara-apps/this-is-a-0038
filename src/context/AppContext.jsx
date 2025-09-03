import React, { createContext, useContext, useState, useEffect } from 'react';
import { generateMemeCaption, analyzeMemeEngagement } from '../services/openai';
import { getUserMemes, saveMeme, uploadMemeImage } from '../services/supabase';
import { uploadToIPFS } from '../services/pinata';
import { useAuth } from './AuthContext';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  // Use the auth context to get user data
  const { user: authUser } = useAuth?.() || { user: {
    id: '1',
    email: 'user@example.com',
    subscriptionTier: 'Pro',
    generationsLeft: 42,
    totalGenerations: 50
  }};
  
  const [user, setUser] = useState(authUser);
  const [memes, setMemes] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentMeme, setCurrentMeme] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Update user when authUser changes
  useEffect(() => {
    if (authUser) {
      setUser(authUser);
    }
  }, [authUser]);
  
  // Load user's memes on mount
  useEffect(() => {
    const loadMemes = async () => {
      if (user?.id) {
        try {
          setLoading(true);
          const userMemes = await getUserMemes(user.id);
          setMemes(userMemes || []);
        } catch (err) {
          console.error('Error loading memes:', err);
          setError('Failed to load memes');
        } finally {
          setLoading(false);
        }
      }
    };
    
    loadMemes();
  }, [user?.id]);

  /**
   * Generate a meme with AI
   * @param {string} prompt - User's meme description
   * @param {File} imageFile - Optional image file
   * @param {string} humorStyle - Selected humor style
   */
  const generateMeme = async (prompt, imageFile, humorStyle = 'witty') => {
    setIsGenerating(true);
    setError(null);
    
    try {
      // Check if user has generations left
      if (user.subscriptionTier !== 'Viral' && user.generationsLeft <= 0) {
        throw new Error('No generations left. Please upgrade your plan.');
      }
      
      // Upload image if provided
      let imageUrl = '';
      if (imageFile) {
        // In a production app, we would use either Supabase or Pinata
        // For now, we'll use a local URL
        imageUrl = URL.createObjectURL(imageFile);
        
        // Simulate upload delay
        await new Promise(resolve => setTimeout(resolve, 1000));
      } else {
        // Use a placeholder image
        imageUrl = 'https://placehold.co/600x400/764ba2/ffffff?text=MemeMaster+AI';
      }
      
      // Generate captions with OpenAI
      const captions = await generateMemeCaption(prompt, humorStyle, imageUrl);
      
      // Create new meme object
      const newMeme = {
        id: Date.now().toString(),
        userId: user.id,
        prompt,
        imageUrl,
        topText: captions.topText,
        bottomText: captions.bottomText,
        humorStyle,
        createdAt: new Date().toISOString(),
        engagementScore: 0,
        viralityPrediction: ''
      };
      
      // Analyze engagement potential
      const engagementData = await analyzeMemeEngagement(newMeme);
      newMeme.engagementScore = engagementData.engagementScore;
      newMeme.viralityPrediction = engagementData.viralityPrediction;
      newMeme.factors = engagementData.factors;
      
      // Save meme to database
      // In a production app, we would use Supabase
      // await saveMeme(newMeme);
      
      // Update state
      setCurrentMeme(newMeme);
      setMemes(prev => [newMeme, ...prev]);
      
      // Decrement generations left if not on Viral plan
      if (user.subscriptionTier !== 'Viral') {
        setUser(prev => ({ 
          ...prev, 
          generationsLeft: Math.max(0, prev.generationsLeft - 1) 
        }));
      }
      
      return newMeme;
    } catch (err) {
      console.error('Error generating meme:', err);
      setError(err.message || 'Failed to generate meme');
      throw err;
    } finally {
      setIsGenerating(false);
    }
  };

  /**
   * Save a meme to the user's collection
   * @param {Object} meme - Meme to save
   */
  const saveMemeToCollection = async (meme) => {
    try {
      setLoading(true);
      
      // In a production app, we would use Supabase
      // await saveMeme(meme);
      
      // For now, just add to local state if not already there
      if (!memes.find(m => m.id === meme.id)) {
        setMemes(prev => [meme, ...prev]);
      }
      
      return meme;
    } catch (err) {
      console.error('Error saving meme:', err);
      setError('Failed to save meme');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Delete a meme from the user's collection
   * @param {string} memeId - ID of meme to delete
   */
  const deleteMeme = async (memeId) => {
    try {
      setLoading(true);
      
      // In a production app, we would use Supabase
      // await deleteMeme(memeId);
      
      // Remove from local state
      setMemes(prev => prev.filter(meme => meme.id !== memeId));
      
      // Clear current meme if it's the one being deleted
      if (currentMeme?.id === memeId) {
        setCurrentMeme(null);
      }
      
      return true;
    } catch (err) {
      console.error('Error deleting meme:', err);
      setError('Failed to delete meme');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Analyze a meme's engagement potential
   * @param {Object} meme - Meme to analyze
   */
  const analyzeMeme = async (meme) => {
    try {
      setLoading(true);
      
      // Get engagement prediction
      const engagementData = await analyzeMemeEngagement(meme);
      
      // Update meme with prediction data
      const updatedMeme = {
        ...meme,
        engagementScore: engagementData.engagementScore,
        viralityPrediction: engagementData.viralityPrediction,
        factors: engagementData.factors
      };
      
      // Update in state if it exists
      setMemes(prev => 
        prev.map(m => m.id === meme.id ? updatedMeme : m)
      );
      
      // Update current meme if it's the one being analyzed
      if (currentMeme?.id === meme.id) {
        setCurrentMeme(updatedMeme);
      }
      
      return updatedMeme;
    } catch (err) {
      console.error('Error analyzing meme:', err);
      setError('Failed to analyze meme');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    setUser,
    memes,
    setMemes,
    isGenerating,
    setIsGenerating,
    currentMeme,
    setCurrentMeme,
    error,
    setError,
    loading,
    generateMeme,
    saveMemeToCollection,
    deleteMeme,
    analyzeMeme
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
