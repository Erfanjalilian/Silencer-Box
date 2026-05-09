// app/components/ProductCard.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PhotoIcon, StarIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';

interface Product {
  id: string;
  name: string;
  price: number | null; // ✅ اضافه کردن null به type
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
  
  // ✅ اصلاح شده: اعتبارسنجی discount
  const discountPercentage = product.discount && !isNaN(product.discount) && product.discount > 0 
    ? product.discount 
    : 0;

  // ✅ اصلاح شده: تابع رندر ستاره با اعتبارسنجی
  const renderStars = () => {
    let rating = product.rating;
    
    // اعتبارسنجی rating
    if (rating === null || rating === undefined || isNaN(rating)) {
      rating = 0;
    }
    if (rating < 0) rating = 0;
    if (rating > 5) rating = 5;
    
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = Math.max(0, 5 - fullStars - (hasHalfStar ? 1 : 0));
    
    // اعتبارسنجی reviewCount
    const reviewCount = product.reviewCount && !isNaN(product.reviewCount) 
      ? product.reviewCount 
      : 0;

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
        <span className="text-gray-400 text-xs mr-2">({reviewCount})</span>
      </div>
    );
  };

  // ✅ اصلاح شده: تابع formatPrice با اعتبارسنجی
  const formatPrice = (price: number | null | undefined): string => {
    if (price === null || price === undefined || isNaN(price)) {
      return 'تماس بگیرید';
    }
    return price.toLocaleString('fa-IR') + ' تومان';
  };

  // ✅ بررسی برای مقایسه قیمت‌ها با مقادیر معتبر
  const hasDiscount = () => {
    const price = product.price;
    const originalPrice = product.originalPrice;
    
    if (price === null || price === undefined || isNaN(price)) return false;
    if (originalPrice === null || originalPrice === undefined || isNaN(originalPrice)) return false;
    
    return originalPrice > price;
  };

  // ✅ دریافت قیمت معتبر برای نمایش
  const getValidPrice = (): number => {
    if (product.price === null || product.price === undefined || isNaN(product.price)) {
      return 0;
    }
    return product.price;
  };

  const getValidOriginalPrice = (): number => {
    if (product.originalPrice === null || product.originalPrice === undefined || isNaN(product.originalPrice)) {
      return 0;
    }
    return product.originalPrice;
  };

  const validPrice = getValidPrice();
  const validOriginalPrice = getValidOriginalPrice();
  const showDiscount = hasDiscount();

  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-sky-500/50 transition-all duration-300 hover:transform hover:scale-105 group h-full flex flex-col relative">
      {/* Badge */}
      {product.badge && product.badge.trim() !== '' && (
        <div className="absolute top-3 right-3 z-10">
          <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            {product.badge}
          </span>
        </div>
      )}

      {/* Discount Badge */}
      {discountPercentage > 0 && (
        <div className="absolute top-3 left-3 z-10">
          <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            {discountPercentage}٪
          </span>
        </div>
      )}

      {/* Product Image */}
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-gray-700 to-gray-800">
          {hasImage ? (
            <Image
              src={product.imageUrl}
              alt={product.name || 'محصول'}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              onError={(e) => {
                // اگر عکس لود نشد، آیکون نشان بده
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) {
                  const fallback = document.createElement('div');
                  fallback.className = 'flex flex-col items-center justify-center h-full';
                  fallback.innerHTML = `
                    <svg class="h-12 w-12 text-sky-500/30 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p class="text-gray-500 text-xs">تصویر محصول</p>
                  `;
                  parent.appendChild(fallback);
                }
              }}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <PhotoIcon className="h-12 w-12 text-sky-500/30 mb-2" />
              <p className="text-gray-500 text-xs">تصویر محصول</p>
            </div>
          )}
        </div>
      </Link>

      {/* Product Content */}
      <div className="p-4 flex-grow flex flex-col">
        <p className="text-sky-400 text-xs mb-1">
          {product.category === 'silentbox' ? 'سیلنت‌باکس' : 'لوازم جانبی'}
        </p>

        <Link href={`/products/${product.id}`}>
          <h3 className="text-base font-bold text-gray-100 mb-2 hover:text-sky-400 transition-colors line-clamp-2 min-h-[50px]">
            {product.name || 'بدون نام'}
          </h3>
        </Link>

        <div className="mb-2">
          {renderStars()}
        </div>

        <div className="mb-3">
          {showDiscount && validOriginalPrice > validPrice ? (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sky-400 text-lg font-bold">
                {formatPrice(validPrice)}
              </span>
              <span className="text-gray-500 text-xs line-through">
                {formatPrice(validOriginalPrice)}
              </span>
            </div>
          ) : (
            <span className="text-sky-400 text-lg font-bold">
              {formatPrice(validPrice)}
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
              ? 'bg-green-500 hover:bg-green-600 text-white cursor-pointer'
              : 'bg-gray-700 text-gray-500 cursor-not-allowed'
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