
import React, { useState, useRef, useCallback } from 'react';
import type { Product } from '../types';
import { virtualTryOn } from '../services/geminiService';
import { Loader } from './Loader';
import { UploadIcon, SparklesIcon, PersonIcon } from './IconComponents';

interface TryOnStudioProps {
  selectedProduct: Product | null;
}

// Updated, more descriptive placeholder with drag-and-drop visual feedback
const ImagePlaceholder: React.FC<{ icon: React.ReactNode; title: string; description: string; isDragging?: boolean }> = ({ icon, title, description, isDragging }) => (
    <div className={`w-full h-full bg-gray-50 rounded-lg flex flex-col justify-center items-center text-center text-gray-500 border-2 border-dashed p-6 transition-all duration-300 ${isDragging ? 'border-brand-accent bg-blue-50 scale-105' : 'border-gray-300'}`}>
        <div className={`transition-transform duration-300 ${isDragging ? 'scale-110' : ''}`}>
            {icon}
        </div>
        <span className="mt-4 text-base font-semibold text-gray-700">{title}</span>
        <p className="mt-1 text-xs text-gray-500 max-w-xs">{description}</p>
    </div>
);


export const TryOnStudio: React.FC<TryOnStudioProps> = ({ selectedProduct }) => {
  const [userImageFile, setUserImageFile] = useState<File | null>(null);
  const [userImageUrl, setUserImageUrl] = useState<string | null>(null);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = (file: File) => {
    // Basic validation for file type
    if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
        setUserImageFile(file);
        setUserImageUrl(URL.createObjectURL(file));
        setGeneratedImageUrl(null);
        setError(null);
    } else {
        setError('Invalid file type. Please upload a PNG or JPEG image.');
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
        processFile(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };
  
  const handleTryOn = useCallback(async () => {
    if (!userImageFile || !selectedProduct) {
      setError("Please upload your image first.");
      return;
    }

    setIsLoading(true);
    setGeneratedImageUrl(null);
    setError(null);

    try {
      const resultBase64 = await virtualTryOn(userImageFile, selectedProduct);
      setGeneratedImageUrl(`data:image/png;base64,${resultBase64}`);
    } catch (err) {
      console.error(err);
      setError("Sorry, we couldn't generate the image. Please try again. " + err);
    } finally {
      setIsLoading(false);
    }
  }, [userImageFile, selectedProduct]);

  const canTryOn = userImageFile && selectedProduct && !isLoading;

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Input Section */}
        <div className="flex flex-col items-center">
          <h3 className="text-xl font-bold mb-4">1. Upload Your Photo</h3>
          <div 
            className="w-full aspect-[3/4] cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
              accept="image/png, image/jpeg"
            />
            {userImageUrl ? (
              <div className="w-full h-full relative group">
                <img src={userImageUrl} alt="User" className="w-full h-full object-cover rounded-lg" />
                <div className="absolute inset-0 bg-black/50 rounded-lg flex flex-col justify-center items-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <UploadIcon className="w-8 h-8 mb-2" />
                  <p className="font-semibold">Change Photo</p>
                </div>
              </div>
            ) : (
                <ImagePlaceholder 
                    icon={<PersonIcon className="h-12 w-12 text-gray-400"/>} 
                    title="Upload Your Photo"
                    description="Click or drag & drop a clear, full-body photo to see this item on you."
                    isDragging={isDragging} 
                />
            )}
          </div>
        </div>

        {/* Output Section */}
        <div className="flex flex-col items-center">
          <h3 className="text-xl font-bold mb-4">2. AI Generated Result</h3>
          <div className="relative w-full aspect-[3/4] bg-gray-100 rounded-lg flex justify-center items-center border-2 border-dashed">
            {isLoading && <Loader />}
            {!isLoading && error && <p className="text-red-500 p-4 text-center">{error}</p>}
            {!isLoading && !error && generatedImageUrl && (
              <img src={generatedImageUrl} alt="Generated try-on" className="w-full h-full object-cover rounded-lg" />
            )}
            {!isLoading && !error && !generatedImageUrl && (
                <ImagePlaceholder 
                    icon={<SparklesIcon className="h-12 w-12 text-gray-400"/>} 
                    title="Your Result Appears Here"
                    description="After uploading a photo, click 'Try It On!' to see the magic happen."
                />
            )}
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="mt-8 pt-6 border-t">
        <button
          onClick={handleTryOn}
          disabled={!canTryOn}
          className="w-full max-w-md mx-auto bg-brand-accent hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-4 px-4 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-105 text-lg"
        >
          <SparklesIcon className="w-6 h-6 mr-3" />
          <span>{isLoading ? "Generating..." : "Try It On!"}</span>
        </button>
      </div>
    </div>
  );
};
