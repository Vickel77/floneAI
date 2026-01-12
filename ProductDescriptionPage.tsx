
import React from 'react';
import type { Product } from './types';

interface ProductDescriptionPageProps {
  product: Product;
  onGoBack: () => void;
  onTryOn: () => void;
  onAddToCart: () => void;
}

export const ProductDescriptionPage: React.FC<ProductDescriptionPageProps> = ({ product, onGoBack, onTryOn, onAddToCart }) => {
  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 pt-8">
        <button onClick={onGoBack} className="text-gray-600 hover:text-brand-primary transition-colors font-medium">
          &larr; Back to All Products
        </button>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center bg-gray-100 rounded-lg p-8">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full max-w-lg h-auto object-contain rounded-lg shadow-xl"
              />
            </div>

            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-2 text-gray-900">{product.name}</h1>
              <p className="text-3xl font-light text-gray-700 mb-4">{product.price}</p>
              <p className="text-gray-600 max-w-md mb-8 leading-relaxed">{product.description}</p>
              <div className="flex items-center justify-center md:justify-start space-x-4">
                  <button 
                    onClick={onAddToCart}
                    className="bg-gray-800 text-white font-bold py-3 px-8 rounded-full hover:bg-black transition-colors duration-300"
                  >
                      Add to Cart
                  </button>

                  <div className="relative inline-block rainbow-shadow rounded-full">
                      <button 
                          onClick={onTryOn}
                          className="relative z-10 bg-black text-white font-bold py-3 px-8 rounded-full border border-gray-700 w-full"
                      >
                          Try It On
                      </button>
                  </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
};
