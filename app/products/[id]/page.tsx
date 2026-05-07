// app/products/[id]/page.tsx
import { notFound } from 'next/navigation';
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
  features: string[];
  imageUrl: string;
  category: string;
  inStock: boolean;
  isBestSeller: boolean;
  badge: string | null;
}

async function getProduct(id: string): Promise<Product | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    
    // اضافه کردن timeout و revalidate
    const response = await fetch(`${baseUrl}/api/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
      next: {
        revalidate: 60 // بازvalidation هر 60 ثانیه
      }
    });
    
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

// ✅ تعریف صحیح interface با Promise
interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: PageProps) {
  // ✅ حتما await کنید
  const { id: productId } = await params;
  
  if (!productId) {
    notFound();
  }
  
  const product = await getProduct(productId);
  
  if (!product) {
    notFound();
  }
  
  const hasImage = product.imageUrl && product.imageUrl.trim() !== '';
  
  const renderStars = () => {
    const fullStars = Math.floor(product.rating);
    const hasHalfStar = product.rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return (
      <div className="flex items-center gap-1">
        {[...Array(fullStars)].map((_, i) => (
          <StarSolidIcon key={`full-${i}`} className="h-5 w-5 text-yellow-500" />
        ))}
        {hasHalfStar && (
          <StarIcon className="h-5 w-5 text-yellow-500" />
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <StarIcon key={`empty-${i}`} className="h-5 w-5 text-gray-600" />
        ))}
        <span className="text-gray-400 text-sm mr-2">({product.reviewCount} نظر)</span>
      </div>
    );
  };
  
  const formatPrice = (price: number) => {
    return price.toLocaleString('fa-IR') + ' تومان';
  };
  
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header Spacer */}
      <div className="h-16 md:h-20"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <Link 
            href="/products" 
            className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-400 mb-6 transition-colors"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            بازگشت به محصولات
          </Link>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Product Image */}
            <div className="relative h-80 md:h-96 rounded-xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
              {hasImage ? (
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full">
                  <PhotoIcon className="h-24 w-24 text-orange-500/30 mb-4" />
                  <p className="text-gray-500">تصویر محصول</p>
                </div>
              )}
            </div>
            
            {/* Product Info */}
            <div>
              {/* Category Badge */}
              <div className="mb-3">
                <span className="inline-block bg-orange-500/10 text-orange-500 text-sm px-3 py-1 rounded-full">
                  {product.category === 'silentbox' ? 'سیلنت‌باکس' : 'لوازم جانبی'}
                </span>
              </div>
              
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
                {product.name}
              </h1>
              
              <div className="mb-4">{renderStars()}</div>
              
              <div className="mb-6">
                {product.originalPrice > product.price ? (
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-orange-500 text-2xl md:text-3xl font-bold">
                      {formatPrice(product.price)}
                    </span>
                    <span className="text-gray-500 text-sm md:text-lg line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                    <span className="bg-red-500 text-white text-xs md:text-sm px-2 py-1 rounded">
                      {product.discount}٪ تخفیف
                    </span>
                  </div>
                ) : (
                  <span className="text-orange-500 text-2xl md:text-3xl font-bold">
                    {formatPrice(product.price)}
                  </span>
                )}
              </div>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                {product.description}
              </p>
              
              {product.features && product.features.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-white font-semibold mb-3 text-lg">ویژگی‌ها:</h3>
                  <ul className="space-y-2">
                    {product.features.map((feature: string, index: number) => (
                      <li key={index} className="text-gray-400 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="mb-6">
                {product.inStock ? (
                  <div className="flex items-center gap-2 text-green-500">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span>موجود در انبار</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-red-500">
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                    <span>ناموجود</span>
                  </div>
                )}
              </div>
              
              <button
                disabled={!product.inStock}
                className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                  product.inStock
                    ? 'bg-orange-500 hover:bg-orange-600 text-white cursor-pointer transform hover:scale-105'
                    : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                }`}
              >
                <ShoppingCartIcon className="h-5 w-5" />
                {product.inStock ? 'افزودن به سبد خرید' : 'ناموجود'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}