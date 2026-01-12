
import React from 'react';
import { SideDrawer } from './SideDrawer';
import type { CartItem } from '../types';
import { TrashIcon, PlusIcon, MinusIcon } from './IconComponents';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, onUpdateQuantity, onRemove }) => {
  const subtotal = items.reduce((acc, item) => {
    const price = parseFloat(item.price.replace('$', '').replace(',', ''));
    return acc + price * item.quantity;
  }, 0);

  return (
    <SideDrawer isOpen={isOpen} onClose={onClose} title="Shopping Cart">
      {items.length === 0 ? (
        <div className="h-full flex flex-col items-center justify-center text-gray-500">
          <p className="text-lg font-medium mb-2">Your cart is empty</p>
          <button onClick={onClose} className="text-brand-accent hover:underline">Start Shopping</button>
        </div>
      ) : (
        <div className="flex flex-col h-full">
          <div className="flex-1 space-y-6">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4">
                <div className="w-20 h-24 bg-gray-50 rounded-md overflow-hidden flex-shrink-0 border border-gray-100">
                  <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-gray-900 line-clamp-1">{item.name}</h3>
                      <button onClick={() => onRemove(item.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-sm text-gray-500">{item.price}</p>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center border rounded-full">
                      <button 
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="p-1.5 text-gray-500 hover:text-black"
                        disabled={item.quantity <= 1}
                      >
                        <MinusIcon className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-semibold w-4 text-center">{item.quantity}</span>
                      <button 
                         onClick={() => onUpdateQuantity(item.id, 1)}
                         className="p-1.5 text-gray-500 hover:text-black"
                      >
                        <PlusIcon className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="border-t pt-4 mt-4">
             <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600 font-medium">Subtotal</span>
                <span className="text-xl font-bold text-gray-900">${subtotal.toFixed(2)}</span>
             </div>
             <p className="text-xs text-gray-500 mb-4 text-center">Shipping and taxes calculated at checkout.</p>
             <button className="w-full bg-black text-white font-bold py-3 rounded-full hover:bg-gray-800 transition-colors">
                Checkout
             </button>
          </div>
        </div>
      )}
    </SideDrawer>
  );
};
