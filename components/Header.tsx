
import React, { useRef, useEffect } from 'react';
import { SearchIcon, HeartIcon, CartIcon, CloseIcon } from './IconComponents';

interface HeaderProps {
  cartItemCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (isOpen: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  cartItemCount, 
  onOpenCart, 
  onOpenWishlist,
  searchQuery,
  setSearchQuery,
  isSearchOpen,
  setIsSearchOpen
}) => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
        searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  return (
    <>
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-5 flex justify-between items-center relative">
        {/* Left: Logo */}
        <div className="flex items-center">
          <a href="#" onClick={(e) => { e.preventDefault(); window.location.reload(); }} className="text-3xl font-bold text-brand-primary">Flone.</a>
        </div>
        
        {/* Center: Navigation (Hidden if search is open on small screens) */}
        <nav className={`hidden md:flex items-center space-x-8 ${isSearchOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'} transition-opacity duration-200`}>
          <a href="#" className="text-gray-700 hover:text-black font-medium">Home</a>
          <a href="#" className="text-gray-700 hover:text-black font-medium">Shop</a>
          <a href="#" className="text-gray-700 hover:text-black font-medium">Collection</a>
          <a href="#" className="text-gray-700 hover:text-black font-medium">Pages</a>
          <a href="#" className="text-gray-700 hover:text-black font-medium">Blog</a>
          <a href="#" className="text-gray-700 hover:text-black font-medium">About</a>
          <a href="#" className="text-gray-700 hover:text-black font-medium">Contact</a>
        </nav>

        {/* Right: Icons */}
        <div className="flex items-center space-x-6 z-10">
          <button 
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className={`text-gray-600 hover:text-black transition-colors ${isSearchOpen ? 'text-brand-primary' : ''}`}
          >
            {isSearchOpen ? <CloseIcon className="h-5 w-5"/> : <SearchIcon className="h-5 w-5"/>}
          </button>
          
          <button onClick={onOpenWishlist} className="text-gray-600 hover:text-black">
            <HeartIcon className="h-5 w-5"/>
          </button>
          
          <button onClick={onOpenCart} className="relative text-gray-600 hover:text-black">
            <CartIcon className="h-5 w-5"/>
            {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center animate-bounce-short">
                    {cartItemCount}
                </span>
            )}
          </button>
        </div>

        {/* Search Bar Overlay */}
        <div 
            className={`absolute top-0 left-0 w-full h-full bg-white flex items-center justify-center px-4 md:px-20 transition-all duration-300 ease-in-out transform ${
                isSearchOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
            }`}
            style={{ zIndex: 5 }} 
        >
             <div className="w-full max-w-3xl relative">
                <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search for products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full text-2xl font-light border-b-2 border-gray-200 py-2 focus:outline-none focus:border-black bg-transparent placeholder-gray-300"
                />
                <button className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400">
                    <SearchIcon className="w-6 h-6" />
                </button>
             </div>
        </div>

      </div>
    </header>
    </>
  );
};
