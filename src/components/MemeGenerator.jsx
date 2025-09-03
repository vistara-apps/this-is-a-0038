import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import { Upload, Type, Wand2, Download, Share2 } from 'lucide-react'
import HumorTuner from './HumorTuner'
import MemeDisplay from './MemeDisplay'

const MemeGenerator = () => {
  const { generateMeme, isGenerating, currentMeme } = useApp()
  const [prompt, setPrompt] = useState('')
  const [selectedImage, setSelectedImage] = useState(null)
  const [inputMode, setInputMode] = useState('text') // 'text' or 'image'
  const [humorStyle, setHumorStyle] = useState('witty')

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      setSelectedImage(file)
      setInputMode('image')
    }
  }

  const handleGenerate = async () => {
    if (!prompt.trim() && !selectedImage) return
    
    await generateMeme(prompt, selectedImage, humorStyle)
  }

  const handleDownload = () => {
    // In a real app, this would generate and download the meme image
    alert('Download functionality would be implemented here')
  }

  const handleShare = () => {
    // In a real app, this would share to social platforms
    alert('Share functionality would be implemented here')
  }

  return (
    <div className="space-y-6">
      <div className="glass-effect rounded-lg p-6 border border-white/20">
        <h2 className="text-2xl font-bold text-white mb-6">Rapid Meme Creator</h2>
        
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
                <div className="border-2 border-dashed border-white/30 rounded-lg p-6 text-center hover:border-purple-400 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <Upload className="w-8 h-8 text-purple-300 mx-auto mb-2" />
                    <p className="text-purple-200">
                      {selectedImage ? selectedImage.name : 'Click to upload an image'}
                    </p>
                  </label>
                </div>
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
              disabled={isGenerating || (!prompt.trim() && !selectedImage)}
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
                    onClick={handleDownload}
                    className="flex-1 bg-white/10 text-white font-medium py-2 px-4 rounded-lg hover:bg-white/20 transition-all flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                  <button
                    onClick={handleShare}
                    className="flex-1 bg-white/10 text-white font-medium py-2 px-4 rounded-lg hover:bg-white/20 transition-all flex items-center justify-center gap-2"
                  >
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
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
  )
}

export default MemeGenerator