
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
    image: '/h1.png',
    subtitle: 'Timeless Style',
    title: 'Modern Wardrobe',
    description: 'Discover our curated new collection.',
    alignment: 'right',
    buttonText: 'SHOP NOW',
    textColor: 'text-brand-primary'
  },
  {
    id: 2,
    image: '/h2.png',
    subtitle: 'Summer 2024',
    title: 'Fresh Arrivals',
    description: 'Explore the latest trends for the upcoming season.',
    alignment: 'left',
    buttonText: 'VIEW LOOKBOOK',
    textColor: 'text-brand-primary'
  },
  {
    id: 3,
    image: '/h3.png',
    subtitle: 'Exclusive Deals',
    title: 'Smart Fashion',
    description: 'Limited time offers on our premium selection.',
    alignment: 'center',
    buttonText: 'GRAB THE DEAL',
    textColor: 'text-brand-primary'
  },
  {
    id: 4,
    image: '/h4.png',
    subtitle: 'Luxury Living',
    title: 'Premium Quality',
    description: 'Elevate your lifestyle with our premium picks.',
    alignment: 'right',
    buttonText: 'EXPLORE',
    textColor: 'text-brand-primary'
  },
  {
    id: 5,
    image: '/h5.png',
    subtitle: 'New Season',
    title: 'Avant Garde',
    description: 'Pushing the boundaries of fashion and art.',
    alignment: 'left',
    buttonText: 'SEE MORE',
    textColor: 'text-brand-primary'
  },
  {
    id: 6,
    image: '/h6.png',
    subtitle: 'Classic Style',
    title: 'Urban Chic',
    description: 'Modern vibes for the urban explorer.',
    alignment: 'center',
    buttonText: 'SHOP NOW',
    textColor: 'text-brand-primary'
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
  const [delayedSlide, setDelayedSlide] = useState(0);

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setDelayedSlide(currentSlide);
    }, 500);
    return () => clearTimeout(timer);
  }, [currentSlide]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));

  return (
    <>
      {/* Hero Carousel Section - Only show if not searching or if search is empty */}
      {searchQuery.trim() === "" && (
        <section className="relative h-[70vh] md:h-[calc(100vh-80px)] overflow-hidden group flex">
          {/* Left Column (70%) - Horizontal Carousel */}
          <div className="relative w-[75%] h-full overflow-hidden border-r border-white/5">
            {/* Content Overlay */}
            <div className="absolute inset-0 flex items-center pointer-events-none z-20">
              <div className="container mx-auto px-8 md:px-16 flex justify-start items-center h-full">
                <div className={`max-w-xl transition-all duration-700 ${SLIDES[currentSlide].textColor}`}>
                  <span className="block text-xl md:text-2xl font-medium mb-4 tracking-wider animate-fadeInUp">
                    {SLIDES[currentSlide].subtitle}
                  </span>
                  <h1 className="text-5xl md:text-8xl font-bold mb-6 leading-tight animate-fadeInUp delay-200">
                    {SLIDES[currentSlide].title}
                  </h1>
                  <p className="text-lg md:text-xl mb-8 animate-fadeInUp delay-400 opacity-90">
                    {SLIDES[currentSlide].description}
                  </p>
                  <button className={`pointer-events-auto bg-transparent border-2 ${SLIDES[currentSlide].id === 1 ? 'border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white' : 'border-white text-white hover:bg-white hover:text-black'} font-bold py-4 px-10 transition-all duration-300 animate-fadeInUp`} style={{ animationDelay: '0.6s' }}>
                    {SLIDES[currentSlide].buttonText}
                  </button>
                </div>
              </div>
            </div>

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {SLIDES.map((slide, index) => {
                let diff = (index - currentSlide + SLIDES.length) % SLIDES.length;

                let zIndex = 0;
                let scale = 0.4;
                let opacity = 0;
                let left = '50%';
                let translateX = '-50%';
                let blurValue = 0

                if (diff === 0) {
                  // Rightmost (Largest)
                  zIndex = 30;
                  scale = 0.8;
                  opacity = 1;
                  left = '80%';
                  blurValue = 0
                } else if (diff === 1) {
                  // Middle
                  zIndex = 20;
                  scale = 0.65;
                  opacity = 0.8;
                  left = '40%';
                  blurValue = 5
                } else if (diff === 2) {
                  // Leftmost (Smallest)
                  zIndex = 10;
                  scale = 0.45;
                  opacity = 0.5;
                  left = '10%';
                  blurValue = 10
                } else if (diff === SLIDES.length - 1) {
                  // Moving out to the right
                  zIndex = 5;
                  scale = 0.8;
                  opacity = 0;
                  left = '130%';
                  blurValue = 20
                } else if (diff === 3) {
                  // Entering from left
                  zIndex = 0;
                  scale = 0.2;
                  opacity = 0;
                  left = '-20%';
                  blurValue = 10
                }

                return (
                  <div
                    key={slide.id}
                    className="absolute top-0 bottom-0 transition-all duration-1000 ease-in-out"
                    style={{
                      zIndex,
                      opacity,
                      left,
                      transform: `translateX(${translateX}) scale(${scale})`,
                      width: '30vw',
                      height: '100%',
                      filter: `blur(${blurValue}px)`,
                    }}
                  >
                    <div
                      className="w-full h-full bg-cover bg-center"
                      style={{ backgroundImage: `url('${slide.image}')`, backgroundSize: "contain", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column (30%) - Vertical Delayed Carousel */}
          <div className="z-0 relative w-[25%] h-full overflow-hidden  bg-white">
            {SLIDES.map((slide, index) => {
              let diff = (index - delayedSlide + SLIDES.length) % SLIDES.length;

              let zIndex = 0;
              let opacity = 0;
              let translateY = '-100%';
              let scale = 1;

              if (diff === 0) {
                // Current active (In focus)
                zIndex = 1;
                opacity = 1;
                translateY = '0%';
              } else if (diff === SLIDES.length - 1) {
                // Moving out to bottom
                zIndex = 1;
                opacity = 0;
                translateY = '100%';
              } else if (diff === 1) {
                // Incoming from top
                zIndex = 1;
                opacity = 0;
                translateY = '-100%';
              }

              return (
                <div
                  key={`right-${slide.id}`}
                  className="absolute inset-0 transition-all duration-1000 cubic-bezier(0.4, 0, 0.2, 1)"
                  style={{
                    zIndex: 0,
                    opacity,
                    transform: `translateY(${translateY}) scale(${scale})`,
                  }}
                >
                  <div
                    className="w-full h-full bg-containt bg-no-repeat bg-center"
                    style={{ backgroundImage: `url('/ha${index + 1}.png')` }}
                  />
                  <div className="absolute inset-0 bg-black/20"></div>
                </div>
              );
            })}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-8 top-1/2 -translate-y-1/2 z-50 bg-black/40 hover:bg-black/60 text-white p-4 rounded-full backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 border border-white/20 shadow-2xl"
          >
            <ChevronLeftIcon className="w-8 h-8" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-8 top-1/2 -translate-y-1/2 z-50 bg-black/40 hover:bg-black/60 text-white p-4 rounded-full backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 border border-white/20 shadow-2xl"
          >
            <ChevronRightIcon className="w-8 h-8" />
          </button>

          {/* Pagination Dots */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
            {SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-3 rounded-full transition-all duration-300 ${idx === currentSlide ? 'bg-white w-8' : 'bg-white/50 w-3 hover:bg-white/80'
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
