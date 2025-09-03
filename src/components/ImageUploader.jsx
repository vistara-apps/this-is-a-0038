import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Image } from 'lucide-react';

const ImageUploader = ({ onImageSelect, selectedImage, className = '' }) => {
  const [error, setError] = useState(null);
  
  // Handle file drop
  const onDrop = useCallback((acceptedFiles) => {
    // Reset error
    setError(null);
    
    // Validate file
    if (acceptedFiles.length === 0) {
      return;
    }
    
    const file = acceptedFiles[0];
    
    // Check file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5MB');
      return;
    }
    
    // Pass file to parent component
    onImageSelect(file);
  }, [onImageSelect]);
  
  // Initialize dropzone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    maxFiles: 1
  });
  
  // Clear selected image
  const handleClear = (e) => {
    e.stopPropagation();
    onImageSelect(null);
    setError(null);
  };
  
  // Preview selected image
  const renderPreview = () => {
    if (!selectedImage) return null;
    
    return (
      <div className="relative">
        <img
          src={URL.createObjectURL(selectedImage)}
          alt="Selected template"
          className="w-full h-auto rounded-lg object-cover"
        />
        <button
          onClick={handleClear}
          className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70 transition-colors"
          aria-label="Remove image"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  };
  
  return (
    <div className={className}>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg transition-colors cursor-pointer ${
          isDragActive
            ? 'border-purple-400 bg-purple-500/10'
            : 'border-white/30 hover:border-purple-400'
        } ${selectedImage ? 'p-2' : 'p-6 text-center'}`}
      >
        <input {...getInputProps()} />
        
        {selectedImage ? (
          renderPreview()
        ) : (
          <div>
            <Upload className="w-8 h-8 text-purple-300 mx-auto mb-2" />
            <p className="text-purple-200">
              {isDragActive
                ? 'Drop the image here'
                : 'Drag & drop an image, or click to select'}
            </p>
            <p className="text-purple-300/70 text-xs mt-2">
              Supports JPG, PNG, GIF (max 5MB)
            </p>
          </div>
        )}
      </div>
      
      {error && (
        <div className="mt-2 text-red-400 text-sm">
          {error}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;

