// components/ProductCard.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PhotoIcon, StarIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviewCount: number;
  description: string;
  imageUrl: string;
  category: string;
  inStock: boolean;
  isBestSeller: boolean;
  badge: string | null;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const hasImage = product.imageUrl && product.imageUrl.trim() !== '';
  const discountPercentage = product.discount;

  const renderStars = () => {
    const fullStars = Math.floor(product.rating);
    const hasHalfStar = product.rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center gap-1">
        {[...Array(fullStars)].map((_, i) => (
          <StarSolidIcon key={`full-${i}`} className="h-4 w-4 text-yellow-500" />
        ))}
        {hasHalfStar && (
          <StarIcon className="h-4 w-4 text-yellow-500" />
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <StarIcon key={`empty-${i}`} className="h-4 w-4 text-gray-600" />
        ))}
        <span className="text-gray-400 text-xs mr-2">({product.reviewCount})</span>
      </div>
    );
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('fa-IR') + ' تومان';
  };

  return (
    <div className="bg-black rounded-xl overflow-hidden border border-gray-800 hover:border-orange-500/50 transition-all duration-300 hover:transform hover:scale-105 group h-full flex flex-col relative">
      {/* Badge */}
      {product.badge && (
        <div className="absolute top-3 right-3 z-10">
          <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            {product.badge}
          </span>
        </div>
      )}

      {/* Discount Badge */}
      {discountPercentage > 0 && (
        <div className="absolute top-3 left-3 z-10">
          <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            {discountPercentage}٪
          </span>
        </div>
      )}

      {/* Product Image */}
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
          {hasImage ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <PhotoIcon className="h-12 w-12 text-orange-500/30 mb-2" />
              <p className="text-gray-600 text-xs">تصویر محصول</p>
            </div>
          )}
        </div>
      </Link>

      {/* Product Content */}
      <div className="p-4 flex-grow flex flex-col">
        <p className="text-orange-500 text-xs mb-1">
          {product.category === 'silentbox' ? 'سیلنت‌باکس' : 'لوازم جانبی'}
        </p>

        <Link href={`/products/${product.id}`}>
          <h3 className="text-base font-bold text-white mb-2 hover:text-orange-400 transition-colors line-clamp-2 min-h-[50px]">
            {product.name}
          </h3>
        </Link>

        <div className="mb-2">
          {renderStars()}
        </div>

        <div className="mb-3">
          {product.originalPrice > product.price ? (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-orange-500 text-lg font-bold">
                {formatPrice(product.price)}
              </span>
              <span className="text-gray-500 text-xs line-through">
                {formatPrice(product.originalPrice)}
              </span>
            </div>
          ) : (
            <span className="text-orange-500 text-lg font-bold">
              {formatPrice(product.price)}
            </span>
          )}
        </div>

        <div className="mb-3">
          {product.inStock ? (
            <span className="text-green-500 text-xs flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
              موجود
            </span>
          ) : (
            <span className="text-red-500 text-xs flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
              ناموجود
            </span>
          )}
        </div>

        <button
          disabled={!product.inStock}
          className={`w-full py-2 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
            product.inStock
              ? 'bg-orange-500 hover:bg-orange-600 text-white cursor-pointer'
              : 'bg-gray-700 text-gray-400 cursor-not-allowed'
          }`}
        >
          <ShoppingCartIcon className="h-4 w-4" />
          {product.inStock ? 'افزودن به سبد' : 'ناموجود'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;