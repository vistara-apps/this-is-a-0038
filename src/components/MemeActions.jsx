import React, { useState } from 'react';
import { Download, Share2, Copy, Twitter, Facebook, Instagram } from 'lucide-react';

const MemeActions = ({ meme }) => {
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  
  // Handle meme download
  const handleDownload = async () => {
    if (!meme) return;
    
    try {
      setIsDownloading(true);
      
      // Create a canvas to combine image and text
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // Load the image
      const img = new Image();
      img.crossOrigin = 'Anonymous'; // Enable CORS for the image
      
      // Wait for the image to load
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = meme.imageUrl;
      });
      
      // Set canvas dimensions to match image
      canvas.width = img.width;
      canvas.height = img.height;
      
      // Draw the image
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      // Configure text style
      ctx.fillStyle = 'white';
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 5;
      ctx.textAlign = 'center';
      ctx.font = 'bold 36px Impact, sans-serif';
      
      // Draw top text
      if (meme.topText) {
        ctx.textBaseline = 'top';
        ctx.strokeText(meme.topText, canvas.width / 2, 20);
        ctx.fillText(meme.topText, canvas.width / 2, 20);
      }
      
      // Draw bottom text
      if (meme.bottomText) {
        ctx.textBaseline = 'bottom';
        ctx.strokeText(meme.bottomText, canvas.width / 2, canvas.height - 20);
        ctx.fillText(meme.bottomText, canvas.width / 2, canvas.height - 20);
      }
      
      // Convert canvas to blob
      const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
      
      // Create download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `meme-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error downloading meme:', err);
      alert('Failed to download meme. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };
  
  // Handle share button click
  const handleShareClick = () => {
    setShowShareOptions(!showShareOptions);
  };
  
  // Handle share to platform
  const handleShare = (platform) => {
    // In a real app, this would share to the selected platform
    alert(`Sharing to ${platform} would be implemented here`);
    setShowShareOptions(false);
  };
  
  // Handle copy to clipboard
  const handleCopy = () => {
    // In a real app, this would copy the meme URL to clipboard
    alert('Copy to clipboard would be implemented here');
    setShowShareOptions(false);
  };
  
  return (
    <div className="relative">
      {/* Main share button */}
      <button
        onClick={handleShareClick}
        className="flex-1 bg-white/10 text-white font-medium py-2 px-4 rounded-lg hover:bg-white/20 transition-all flex items-center justify-center gap-2"
      >
        <Share2 className="w-4 h-4" />
        Share
      </button>
      
      {/* Download button */}
      <button
        onClick={handleDownload}
        disabled={isDownloading}
        className="flex-1 bg-white/10 text-white font-medium py-2 px-4 rounded-lg hover:bg-white/20 transition-all flex items-center justify-center gap-2 ml-2"
      >
        {isDownloading ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            <span>Downloading...</span>
          </>
        ) : (
          <>
            <Download className="w-4 h-4" />
            <span>Download</span>
          </>
        )}
      </button>
      
      {/* Share options dropdown */}
      {showShareOptions && (
        <div className="absolute right-0 bottom-full mb-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-2 w-48 z-10">
          <div className="space-y-1">
            <button
              onClick={() => handleShare('Twitter')}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors text-left text-white"
            >
              <Twitter className="w-4 h-4 text-blue-400" />
              Twitter
            </button>
            <button
              onClick={() => handleShare('Facebook')}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors text-left text-white"
            >
              <Facebook className="w-4 h-4 text-blue-600" />
              Facebook
            </button>
            <button
              onClick={() => handleShare('Instagram')}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors text-left text-white"
            >
              <Instagram className="w-4 h-4 text-pink-500" />
              Instagram
            </button>
            <button
              onClick={handleCopy}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors text-left text-white"
            >
              <Copy className="w-4 h-4 text-purple-400" />
              Copy Link
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemeActions;

