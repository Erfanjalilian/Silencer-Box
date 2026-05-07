// components/BestSellingProducts.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  PhotoIcon, 
  StarIcon, 
  ShoppingCartIcon,
  FireIcon 
} from '@heroicons/react/24/outline';
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
  features: string[];
  imageUrl: string;
  category: string;
  inStock: boolean;
  isBestSeller: boolean;
  badge: string | null;
}

async function getBestSellingProducts(): Promise<Product[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/products`, {
      cache: 'force-cache',
      next: {
        revalidate: 3600 // Revalidate every hour
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    
    return response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

// Product Card Component
function ProductCard({ product }: { product: Product }) {
  const hasImage = product.imageUrl && product.imageUrl.trim() !== '';
  const discountPercentage = product.discount;
  
  // Render stars based on rating
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
          <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <StarIcon key={`empty-${i}`} className="h-4 w-4 text-gray-600" />
        ))}
        <span className="text-gray-400 text-sm mr-2">({product.reviewCount})</span>
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
        <div className="absolute top-4 right-4 z-10">
          <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
            <FireIcon className="h-3 w-3" />
            {product.badge}
          </span>
        </div>
      )}
      
      {/* Discount Badge */}
      {discountPercentage > 0 && (
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            {discountPercentage}٪ تخفیف
          </span>
        </div>
      )}
      
      {/* Product Image or Icon Placeholder */}
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative h-56 w-full overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
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
              <PhotoIcon className="h-20 w-20 text-orange-500/30 mb-2" />
              <p className="text-gray-600 text-sm">تصویر محصول</p>
            </div>
          )}
        </div>
      </Link>

      {/* Product Content */}
      <div className="p-5 flex-grow flex flex-col">
        {/* Category */}
        <p className="text-orange-500 text-xs mb-2">
          {product.category === 'silentbox' ? 'سیلنت‌باکس' : 'لوازم جانبی'}
        </p>
        
        {/* Product Name */}
        <Link href={`/products/${product.id}`}>
          <h3 className="text-lg font-bold text-white mb-2 hover:text-orange-400 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>
        
        {/* Rating */}
        <div className="mb-3">
          {renderStars()}
        </div>
        
        {/* Price */}
        <div className="mb-4">
          {product.originalPrice > product.price ? (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-orange-500 text-xl font-bold">
                {formatPrice(product.price)}
              </span>
              <span className="text-gray-500 text-sm line-through">
                {formatPrice(product.originalPrice)}
              </span>
            </div>
          ) : (
            <span className="text-orange-500 text-xl font-bold">
              {formatPrice(product.price)}
            </span>
          )}
        </div>
        
        {/* Stock Status */}
        <div className="mb-4">
          {product.inStock ? (
            <span className="text-green-500 text-xs flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              موجود در انبار
            </span>
          ) : (
            <span className="text-red-500 text-xs flex items-center gap-1">
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              ناموجود
            </span>
          )}
        </div>
        
        {/* Add to Cart Button */}
        <button
          disabled={!product.inStock}
          className={`w-full py-2.5 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
            product.inStock
              ? 'bg-orange-500 hover:bg-orange-600 text-white cursor-pointer'
              : 'bg-gray-700 text-gray-400 cursor-not-allowed'
          }`}
        >
          <ShoppingCartIcon className="h-5 w-5" />
          {product.inStock ? 'افزودن به سبد خرید' : 'ناموجود'}
        </button>
      </div>
    </div>
  );
}

// Main Best Selling Products Server Component
const BestSellingProducts: React.FC = async () => {
  const products = await getBestSellingProducts();
  
  // Only show best sellers (should be 4 products based on our data)
  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 4);

  if (!bestSellers || bestSellers.length === 0) {
    return (
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-400 text-lg">محصولی یافت نشد</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <FireIcon className="h-8 w-8 text-orange-500" />
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              پرفروش‌ترین محصولات
            </h2>
          </div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            محبوب‌ترین و پرفروش‌ترین محصولات سیلنت‌باکس
          </p>
          <div className="w-20 h-1 bg-orange-500 mx-auto mt-4"></div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {/* View All Products Button */}
        <div className="text-center mt-12">
          <Link
            href="/products"
            className="inline-block bg-transparent border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300"
          >
            مشاهده همه محصولات
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BestSellingProducts;