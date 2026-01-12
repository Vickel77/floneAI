
import React from 'react';
import type { Product } from '../types';
import { ProductCard } from './ProductCard';

interface ProductListProps {
  products: Product[];
  onProductClick: (product: Product) => void;
  onProductTryOn: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: number[];
}

export const ProductList: React.FC<ProductListProps> = ({ 
    products, 
    onProductClick, 
    onProductTryOn,
    onAddToCart,
    onToggleWishlist,
    wishlistIds
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onSelect={() => onProductClick(product)}
          onTryOn={() => onProductTryOn(product)}
          onAddToCart={() => onAddToCart(product)}
          onToggleWishlist={() => onToggleWishlist(product)}
          isWishlist={wishlistIds.includes(product.id)}
        />
      ))}
    </div>
  );
};
