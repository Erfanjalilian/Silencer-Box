// app/products/[id]/page.tsx
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { PhotoIcon, StarIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';

async function getProduct(id: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
      cache: 'force-cache',
    });
    
    if (!response.ok) {
      return null;
    }
    
    return response.json();
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);
  
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
          <StarIcon className="h-5 w-5 text-yellow-500 fill-yellow-500" />
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
    <div className="min-h-screen bg-gray-900 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <Link href="/" className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-400 mb-6">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            بازگشت به صفحه اصلی
          </Link>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="relative h-96 rounded-xl overflow-hidden bg-gray-800">
              {hasImage ? (
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover"
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
              <h1 className="text-3xl font-bold text-white mb-4">{product.name}</h1>
              
              <div className="mb-4">{renderStars()}</div>
              
              <div className="mb-6">
                {product.originalPrice > product.price ? (
                  <div className="flex items-center gap-3">
                    <span className="text-orange-500 text-3xl font-bold">
                      {formatPrice(product.price)}
                    </span>
                    <span className="text-gray-500 text-lg line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                    <span className="bg-red-500 text-white text-sm px-2 py-1 rounded">
                      {product.discount}٪ تخفیف
                    </span>
                  </div>
                ) : (
                  <span className="text-orange-500 text-3xl font-bold">
                    {formatPrice(product.price)}
                  </span>
                )}
              </div>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                {product.description}
              </p>
              
              <div className="mb-6">
                <h3 className="text-white font-semibold mb-3">ویژگی‌ها:</h3>
                <ul className="space-y-2">
                  {product.features.map((feature: string, index: number) => (
                    <li key={index} className="text-gray-400 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mb-6">
                {product.inStock ? (
                  <span className="text-green-500">✓ موجود در انبار</span>
                ) : (
                  <span className="text-red-500">✗ ناموجود</span>
                )}
              </div>
              
              <button
                disabled={!product.inStock}
                className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                  product.inStock
                    ? 'bg-orange-500 hover:bg-orange-600 text-white'
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