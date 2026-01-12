
import React from 'react';
import type { Product } from '../types';
import { NikeIcon, ArrowRightIcon, SparklesIcon, HeartIcon } from './IconComponents';

interface ProductCardProps {
  product: Product;
  onSelect: () => void;
  onTryOn: () => void;
  onAddToCart: () => void;
  onToggleWishlist: () => void;
  isWishlist: boolean;
}

const CarouselDots: React.FC = () => (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center space-x-1.5 pointer-events-none">
      <div className="w-5 h-[6px] bg-white rounded-full"></div>
      <div className="w-[6px] h-[6px] bg-white/50 rounded-full"></div>
      <div className="w-[6px] h-[6px] bg-white/50 rounded-full"></div>
      <div className="w-[6px] h-[6px] bg-white/50 rounded-full"></div>
    </div>
);


export const ProductCard: React.FC<ProductCardProps> = ({ 
    product, 
    onSelect, 
    onTryOn, 
    onAddToCart,
    onToggleWishlist,
    isWishlist
}) => {
  return (
    <div
      onClick={onSelect}
      className="bg-white rounded-3xl shadow-lg overflow-hidden cursor-pointer transform hover:-translate-y-1 transition-all duration-300 group"
    >
      <div className="relative">
        <div className="aspect-[6/7] w-full overflow-hidden">
            <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
        </div>

        {/* Hover Overlay for Try On */}
        <div className="absolute inset-0 bg-black/50 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <div className="relative inline-block rainbow-shadow rounded-full">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onTryOn();
              }}
              className="relative z-10 bg-black/80 text-white font-bold py-3 px-8 rounded-full border border-gray-700 flex items-center space-x-2 backdrop-blur-sm"
            >
              <SparklesIcon className="w-5 h-5" />
              <span>Try It On</span>
            </button>
          </div>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none"></div>

        {/* Top Left Badges */}
        <div className="absolute top-4 left-4 flex flex-col space-y-2 z-20">
            {product.brand === 'nike' ? (
                 <div className="bg-black rounded-full p-2 w-9 h-9 flex items-center justify-center">
                    <NikeIcon className="w-7 text-white"/>
                </div>
            ) : product.isBestSeller && (
                <div className="bg-black/60 text-white text-[10px] font-bold tracking-wider px-3 py-1.5 rounded-full backdrop-blur-sm uppercase">
                    Best Seller
                </div>
            )}
        </div>

        {/* Top Right Wishlist */}
        <button 
            onClick={(e) => {
                e.stopPropagation();
                onToggleWishlist();
            }}
            className="absolute top-4 right-4 bg-white/90 p-2 rounded-full z-20 hover:bg-white transition-colors shadow-sm"
        >
            <HeartIcon 
                className={`w-5 h-5 transition-colors ${isWishlist ? 'text-red-500' : 'text-gray-600'}`} 
                fill={isWishlist ? 'currentColor' : 'none'}
            />
        </button>

        <CarouselDots />
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900">{product.name}</h3>
        {product.subtitle && (
            <p className="text-sm text-gray-600">{product.subtitle}</p>
        )}
        <p className="text-xs text-gray-400 mt-2 h-8 overflow-hidden">{product.description}</p>
        
        <div className="flex justify-between items-center mt-4">
            <span className="bg-gray-100 text-gray-800 text-lg font-bold px-4 py-1.5 rounded-full">
                {product.price}
            </span>
            <button 
              className="bg-black text-white font-semibold text-xs px-4 py-2 rounded-full flex items-center space-x-2 hover:bg-gray-800 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart();
              }}
            >
                <span>Buy Now</span>
                <div className="bg-white/20 rounded-full p-0.5">
                    <ArrowRightIcon className="w-3 h-3 text-white" />
                </div>
            </button>
        </div>
      </div>
    </div>
  );
};
