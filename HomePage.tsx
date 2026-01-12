
import React, { useState, useEffect } from 'react';
import type { Product } from './types';
import { ProductList } from './components/ProductList';
import { PRODUCTS } from './constants';
import { ChevronLeftIcon, ChevronRightIcon } from './components/IconComponents';

interface HomePageProps {
  onProductClick: (product: Product) => void;
  onProductTryOn: (product: Product) => void;
  searchQuery: string;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: number[];
}

const Feature: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="flex flex-col md:flex-row items-center text-center md:text-left space-y-4 md:space-y-0 md:space-x-4">
    <div className="text-3xl">{icon}</div>
    <div>
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-gray-500">{description}</p>
    </div>
  </div>
);

const SLIDES = [
  {
    id: 1,
    image: 'https://i.pinimg.com/1200x/8f/aa/05/8faa05656a454aedf0980fcbb25f3fe1.jpg',
    subtitle: 'Timeless Style',
    title: 'Modern Wardrobe',
    description: 'Discover our curated new collection.',
    alignment: 'right',
    buttonText: 'SHOP NOW',
    textColor: 'text-brand-primary'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=2274&auto=format&fit=crop',
    subtitle: 'Summer 2024',
    title: 'Fresh Arrivals',
    description: 'Explore the latest trends for the upcoming season.',
    alignment: 'left',
    buttonText: 'VIEW LOOKBOOK',
    textColor: 'text-white'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1617120799675-1445c84e95b9?q=80&w=2187&auto=format&fit=crop',
    subtitle: 'Exclusive Deals',
    title: 'Smart Fashion',
    description: 'Limited time offers on our premium selection.',
    alignment: 'center',
    buttonText: 'GRAB THE DEAL',
    textColor: 'text-white'
  }
];

export const HomePage: React.FC<HomePageProps> = ({ 
    onProductClick, 
    onProductTryOn, 
    searchQuery,
    onAddToCart,
    onToggleWishlist,
    wishlistIds
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Filter products based on search query
  const filteredProducts = PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const englishWears = filteredProducts.filter(p => p.category === 'English Wears');
  const africanNativeWears = filteredProducts.filter(p => p.category === 'African Native Wears');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));

  return (
    <>
      {/* Hero Carousel Section - Only show if not searching or if search is empty */}
      {searchQuery.trim() === "" && (
      <section className="relative h-[60vh] md:h-[calc(100vh-80px)] bg-gray-900 overflow-hidden group">
        {SLIDES.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {/* Background Image */}
            <div
              className={`absolute inset-0 bg-cover bg-center transition-transform duration-[6000ms] ease-out ${
                index === currentSlide ? 'scale-105' : 'scale-100'
              }`}
              style={{ backgroundImage: `url('${slide.image}')` }}
            />
            
            {/* Dark Overlay for better text readability */}
            <div className={`absolute inset-0 ${slide.id === 1 ? 'bg-black/5' : 'bg-black/30'}`}></div>

            {/* Content */}
            <div
              className={`relative h-full container mx-auto px-4 flex items-center ${
                slide.alignment === 'left' ? 'justify-start' :
                slide.alignment === 'right' ? 'justify-end' : 'justify-center'
              }`}
            >
              <div
                className={`max-w-xl p-6 md:p-12 ${
                  slide.alignment === 'left' ? 'text-left' :
                  slide.alignment === 'right' ? 'text-right' : 'text-center'
                } ${slide.textColor}`}
              >
                 <span
                    className={`block text-xl md:text-2xl font-medium mb-4 tracking-wider opacity-0 transition-all duration-700 delay-300 transform translate-y-4 ${
                      index === currentSlide ? '!opacity-100 !translate-y-0' : ''
                    }`}
                  >
                    {slide.subtitle}
                  </span>
                 <h1
                    className={`text-5xl md:text-7xl font-bold mb-6 leading-tight opacity-0 transition-all duration-700 delay-500 transform translate-y-4 ${
                      index === currentSlide ? '!opacity-100 !translate-y-0' : ''
                    }`}
                  >
                    {slide.title}
                 </h1>
                 <p
                    className={`text-lg md:text-xl mb-8 opacity-0 transition-all duration-700 delay-700 transform translate-y-4 ${
                      index === currentSlide ? '!opacity-100 !translate-y-0' : ''
                    }`}
                  >
                    {slide.description}
                 </p>
                 <button
                    className={`bg-transparent border-2 ${slide.id === 1 ? 'border-black text-black hover:bg-black hover:text-white' : 'border-white text-white hover:bg-white hover:text-black'} font-bold py-3 px-8 transition-all duration-300 opacity-0 transform translate-y-4 ${
                      index === currentSlide ? '!opacity-100 !translate-y-0 transition-delay-900' : ''
                    }`}
                  >
                    {slide.buttonText}
                 </button>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
        >
          <ChevronRightIcon className="w-6 h-6" />
        </button>

        {/* Pagination Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-3 rounded-full transition-all duration-300 ${
                idx === currentSlide ? 'bg-white w-8' : 'bg-white/50 w-3 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      </section>
      )}

      {/* Features Section */}
      {searchQuery.trim() === "" && (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <Feature
              icon={<span>🚚</span>}
              title="Free Shipping"
              description="Lorem ipsum dolor sit amet, consectetu adipicising elit sed do."
            />
            <Feature
              icon={<span>🎧</span>}
              title="Support 24/7"
              description="Lorem ipsum dolor sit amet, consectetu adipicising elit sed do."
            />
            <Feature
              icon={<span>💰</span>}
              title="Money Return"
              description="Lorem ipsum dolor sit amet, consectetu adipicising elit sed do."
            />
          </div>
        </div>
      </section>
      )}

      {/* Products Section */}
      <section className="py-16 bg-brand-secondary min-h-[50vh]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            {searchQuery ? (
                <h2 className="text-3xl font-bold">Search Results for "{searchQuery}"</h2>
            ) : (
                <>
                <h2 className="text-3xl font-bold">Our Collections</h2>
                <p className="text-gray-600">Click any product to go to the Virtual Try-On Studio</p>
                </>
            )}
          </div>

          {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                  <p className="text-xl text-gray-500">No products found matching your search.</p>
              </div>
          ) : (
             <>
                {africanNativeWears.length > 0 && (
                <div>
                    <h3 className="text-2xl font-semibold mb-8 border-b pb-4 text-gray-800">African Native Wears</h3>
                    <ProductList
                    products={africanNativeWears}
                    onProductClick={onProductClick}
                    onProductTryOn={onProductTryOn}
                    onAddToCart={onAddToCart}
                    onToggleWishlist={onToggleWishlist}
                    wishlistIds={wishlistIds}
                    />
                </div>
                )}

                {englishWears.length > 0 && (
                <div className="mt-16 mb-16">
                    <h3 className="text-2xl font-semibold mb-8 border-b pb-4 text-gray-800">English Wears</h3>
                    <ProductList
                    products={englishWears}
                    onProductClick={onProductClick}
                    onProductTryOn={onProductTryOn}
                    onAddToCart={onAddToCart}
                    onToggleWishlist={onToggleWishlist}
                    wishlistIds={wishlistIds}
                    />
                </div>
                )}
             </>
          )}

       
        </div>
      </section>
    </>
  );
};
