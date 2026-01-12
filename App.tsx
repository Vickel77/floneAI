
import React, { useState } from 'react';
import { Header } from './components/Header';
import type { Product, CartItem } from './types';
import { PRODUCTS } from './constants';
import { Footer } from './components/Footer';
import { HomePage } from './HomePage';
import { TryOnPage } from './TryOnPage';
import { ProductDescriptionPage } from './ProductDescriptionPage';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'product' | 'try-on'>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // App State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistIds, setWishlistIds] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  
  // UI State
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // --- Handlers ---

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateCartQuantity = (id: number, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  const toggleWishlist = (product: Product) => {
    setWishlistIds(prev => {
        if (prev.includes(product.id)) {
            return prev.filter(id => id !== product.id);
        }
        return [...prev, product.id];
    });
  };
  
  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setView('product');
    window.scrollTo(0, 0);
  };

  const handleProductTryOn = (product: Product) => {
    setSelectedProduct(product);
    setView('try-on');
    window.scrollTo(0, 0);
  };

  const handleGoHome = () => {
    setView('home');
    setSelectedProduct(null);
  };

  // --- Derived Data ---
  const wishlistProducts = PRODUCTS.filter(p => wishlistIds.includes(p.id));

  const renderContent = () => {
    switch (view) {
      case 'product':
        return selectedProduct && (
            <ProductDescriptionPage 
                product={selectedProduct} 
                onGoBack={handleGoHome} 
                onTryOn={() => handleProductTryOn(selectedProduct)} 
                onAddToCart={() => addToCart(selectedProduct)}
            />
        );
      case 'try-on':
        return selectedProduct && <TryOnPage product={selectedProduct} onGoBack={handleGoHome} />;
      case 'home':
      default:
        return (
            <HomePage 
                onProductClick={handleProductClick} 
                onProductTryOn={handleProductTryOn} 
                searchQuery={searchQuery}
                onAddToCart={addToCart}
                onToggleWishlist={toggleWishlist}
                wishlistIds={wishlistIds}
            />
        );
    }
  };

  return (
    <div className="min-h-screen bg-white text-brand-primary font-sans">
      <Header 
        cartItemCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isSearchOpen={isSearchOpen}
        setIsSearchOpen={setIsSearchOpen}
      />
      
      <main>
        {renderContent()}
      </main>
      
      <Footer />

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems}
        onUpdateQuantity={updateCartQuantity}
        onRemove={removeFromCart}
      />

      <WishlistDrawer 
        isOpen={isWishlistOpen} 
        onClose={() => setIsWishlistOpen(false)} 
        items={wishlistProducts}
        onRemove={(id) => setWishlistIds(prev => prev.filter(pid => pid !== id))}
        onMoveToCart={(product) => {
            addToCart(product);
            setWishlistIds(prev => prev.filter(pid => pid !== product.id));
        }}
      />
    </div>
  );
};

export default App;
