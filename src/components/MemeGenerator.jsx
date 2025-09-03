import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Upload, Type, Wand2, Download, Share2, Save, AlertCircle } from 'lucide-react';
import HumorTuner from './HumorTuner';
import MemeDisplay from './MemeDisplay';
import ImageUploader from './ImageUploader';
import MemeActions from './MemeActions';

const MemeGenerator = () => {
  const { 
    generateMeme, 
    isGenerating, 
    currentMeme, 
    error, 
    setError,
    user,
    saveMemeToCollection
  } = useApp();
  
  const [prompt, setPrompt] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [inputMode, setInputMode] = useState('text'); // 'text' or 'image'
  const [humorStyle, setHumorStyle] = useState('witty');
  const [isSaving, setIsSaving] = useState(false);
  
  // Clear error when inputs change
  useEffect(() => {
    if (error) {
      setError(null);
    }
  }, [prompt, selectedImage, humorStyle, setError, error]);

  const handleGenerate = async () => {
    // Validate inputs
    if (!prompt.trim() && !selectedImage) {
      setError('Please enter a prompt or upload an image');
      return;
    }
    
    try {
      await generateMeme(prompt, selectedImage, humorStyle);
    } catch (err) {
      // Error is handled by the context
      console.error('Failed to generate meme:', err);
    }
  };

  const handleSave = async () => {
    if (!currentMeme) return;
    
    try {
      setIsSaving(true);
      await saveMemeToCollection(currentMeme);
    } catch (err) {
      console.error('Failed to save meme:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageSelect = (file) => {
    setSelectedImage(file);
    if (file) {
      setInputMode('image');
    }
  };

  // Check if user has generations left
  const canGenerate = user?.subscriptionTier === 'Viral' || (user?.generationsLeft > 0);

  return (
    <div className="space-y-6">
      <div className="glass-effect rounded-lg p-6 border border-white/20">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Rapid Meme Creator</h2>
          
          {/* Generations counter */}
          {user && user.subscriptionTier !== 'Viral' && (
            <div className="bg-white/10 px-3 py-1 rounded-full text-sm">
              <span className="text-purple-200">
                {user.generationsLeft} / {user.totalGenerations} generations left
              </span>
            </div>
          )}
        </div>
        
        {/* Error message */}
        {error && (
          <div className="bg-red-500/20 text-red-300 p-3 rounded-lg mb-6 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}
        
        {/* Warning if no generations left */}
        {!canGenerate && (
          <div className="bg-yellow-500/20 text-yellow-300 p-3 rounded-lg mb-6 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <div>
              <p className="font-medium">No generations left</p>
              <p className="text-sm">Upgrade your plan to create more memes</p>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="space-y-6">
            {/* Mode Selection */}
            <div className="flex gap-2">
              <button
                onClick={() => setInputMode('text')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  inputMode === 'text'
                    ? 'bg-purple-500 text-white'
                    : 'bg-white/10 text-purple-200 hover:bg-white/20'
                }`}
              >
                <Type className="w-4 h-4" />
                Text Prompt
              </button>
              <button
                onClick={() => setInputMode('image')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  inputMode === 'image'
                    ? 'bg-purple-500 text-white'
                    : 'bg-white/10 text-purple-200 hover:bg-white/20'
                }`}
              >
                <Upload className="w-4 h-4" />
                Upload Image
              </button>
            </div>

            {/* Text Input */}
            {inputMode === 'text' && (
              <div>
                <label className="block text-white font-medium mb-2">
                  Describe your meme idea
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g., A cat looking confused at a computer"
                  className="w-full h-24 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            )}

            {/* Image Upload */}
            {inputMode === 'image' && (
              <div>
                <label className="block text-white font-medium mb-2">
                  Upload your meme template
                </label>
                <ImageUploader 
                  onImageSelect={handleImageSelect} 
                  selectedImage={selectedImage} 
                />
              </div>
            )}

            {/* Additional prompt for images */}
            {inputMode === 'image' && selectedImage && (
              <div>
                <label className="block text-white font-medium mb-2">
                  Meme context (optional)
                </label>
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g., When Monday hits different"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            )}

            {/* Humor Tuner */}
            <HumorTuner humorStyle={humorStyle} setHumorStyle={setHumorStyle} />

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={isGenerating || (!prompt.trim() && !selectedImage) || !canGenerate}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-6 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="w-5 h-5" />
                  Generate Meme
                </>
              )}
            </button>
          </div>

          {/* Preview Section */}
          <div className="space-y-4">
            {currentMeme ? (
              <>
                <MemeDisplay meme={currentMeme} />
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex-1 bg-white/10 text-white font-medium py-2 px-4 rounded-lg hover:bg-white/20 transition-all flex items-center justify-center gap-2"
                  >
                    {isSaving ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        Save
                      </>
                    )}
                  </button>
                  <MemeActions meme={currentMeme} />
                </div>
              </>
            ) : (
              <div className="bg-white/5 border-2 border-dashed border-white/20 rounded-lg h-64 flex items-center justify-center">
                <div className="text-center">
                  <Wand2 className="w-12 h-12 text-purple-300 mx-auto mb-3" />
                  <p className="text-purple-200">Your generated meme will appear here</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemeGenerator;
