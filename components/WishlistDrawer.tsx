
import React from 'react';
import { SideDrawer } from './SideDrawer';
import type { Product } from '../types';
import { TrashIcon, CartIcon } from './IconComponents';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: Product[];
  onRemove: (id: number) => void;
  onMoveToCart: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({ isOpen, onClose, items, onRemove, onMoveToCart }) => {
  return (
    <SideDrawer isOpen={isOpen} onClose={onClose} title="My Wishlist">
      {items.length === 0 ? (
        <div className="h-full flex flex-col items-center justify-center text-gray-500">
          <p className="text-lg font-medium mb-2">No favorites yet</p>
          <p className="text-sm">Heart items to save them for later!</p>
        </div>
      ) : (
        <div className="flex flex-col space-y-6">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="w-20 h-24 bg-gray-50 rounded-md overflow-hidden flex-shrink-0 border border-gray-100">
                  <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900 line-clamp-1">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.price}</p>
                  </div>
                  
                  <div className="flex items-center gap-2 mt-2">
                    <button 
                        onClick={() => onMoveToCart(item)}
                        className="flex-1 flex items-center justify-center space-x-1 text-xs font-bold bg-black text-white py-2 rounded-full hover:bg-gray-800"
                    >
                        <CartIcon className="w-3 h-3" />
                        <span>Add to Cart</span>
                    </button>
                    <button 
                        onClick={() => onRemove(item.id)} 
                        className="p-2 text-gray-400 hover:text-red-500 border border-gray-200 rounded-full hover:border-red-200 transition-colors"
                    >
                        <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </SideDrawer>
  );
};
