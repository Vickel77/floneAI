
import React from 'react';
import type { Product } from './types';
import { TryOnStudio } from './components/TryOnStudio';

interface TryOnPageProps {
  product: Product;
  onGoBack: () => void;
}

export const TryOnPage: React.FC<TryOnPageProps> = ({ product, onGoBack }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <button onClick={onGoBack} className="text-gray-600 hover:text-brand-primary transition-colors font-medium">
          &larr; Back to Products
        </button>
      </div>
      
      <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-2">Virtual Try-On Studio</h2>
          <p className="text-lg text-gray-600">
              You are trying on: <span className="font-semibold text-brand-primary">{product.name}</span>
          </p>
          <p className="text-gray-500 mt-2">Upload your photo to see yourself in this outfit!</p>
      </div>

      {/* Product Context Card */}
      <div className="flex justify-center mb-10">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex items-center space-x-6 max-w-2xl w-full">
             <div className="w-24 h-32 md:w-32 md:h-40 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden border border-gray-100">
                <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
             </div>
             <div className="flex-1 text-left">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="font-bold text-xl text-gray-900">{product.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">{product.category}</p>
                    </div>
                    <span className="bg-gray-100 text-gray-800 text-sm font-bold px-3 py-1 rounded-full">
                        {product.price}
                    </span>
                </div>
                <p className="text-gray-600 text-sm mt-3 line-clamp-2">{product.description}</p>
             </div>
        </div>
      </div>

      <TryOnStudio selectedProduct={product} />
    </div>
  );
};
