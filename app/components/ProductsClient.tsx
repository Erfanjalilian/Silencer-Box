// components/ProductsClient.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline';
import ProductCard from './ProductCard';

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

interface ProductsClientProps {
  initialProducts: Product[];
  total: number;
  filters: {
    categories: string[];
    priceRange: { min: number; max: number };
  };
}

const ProductsClient: React.FC<ProductsClientProps> = ({ initialProducts, total, filters }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [products, setProducts] = useState(initialProducts);
  const [loading, setLoading] = useState(false);
  
  const [currentFilters, setCurrentFilters] = useState({
    category: searchParams.get('category') || 'all',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    inStock: searchParams.get('inStock') || '',
    sortBy: searchParams.get('sortBy') || 'newest',
    search: searchParams.get('search') || ''
  });

  const categoryNames: Record<string, string> = {
    all: 'همه محصولات',
    silentbox: 'سیلنت‌باکس',
    accessory: 'لوازم جانبی'
  };

  const sortOptions = [
    { value: 'newest', label: 'جدیدترین' },
    { value: 'price_asc', label: 'ارزان‌ترین' },
    { value: 'price_desc', label: 'گران‌ترین' },
    { value: 'discount_desc', label: 'بیشترین تخفیف' },
    { value: 'rating_desc', label: 'بالاترین امتیاز' }
  ];

  const updateFilters = (newFilters: Partial<typeof currentFilters>) => {
    const updatedFilters = { ...currentFilters, ...newFilters };
    setCurrentFilters(updatedFilters);
    setLoading(true);

    // Build URL with filters
    const params = new URLSearchParams();
    if (updatedFilters.category && updatedFilters.category !== 'all') params.set('category', updatedFilters.category);
    if (updatedFilters.minPrice) params.set('minPrice', updatedFilters.minPrice);
    if (updatedFilters.maxPrice) params.set('maxPrice', updatedFilters.maxPrice);
    if (updatedFilters.inStock) params.set('inStock', updatedFilters.inStock);
    if (updatedFilters.sortBy && updatedFilters.sortBy !== 'newest') params.set('sortBy', updatedFilters.sortBy);
    if (updatedFilters.search) params.set('search', updatedFilters.search);

    router.push(`/products?${params.toString()}`);
    
    // Simulate loading
    setTimeout(() => setLoading(false), 300);
  };

  const clearFilters = () => {
    setCurrentFilters({
      category: 'all',
      minPrice: '',
      maxPrice: '',
      inStock: '',
      sortBy: 'newest',
      search: ''
    });
    router.push('/products');
  };

  const hasActiveFilters = () => {
    return currentFilters.category !== 'all' || 
           currentFilters.minPrice || 
           currentFilters.maxPrice || 
           currentFilters.inStock || 
           currentFilters.sortBy !== 'newest' ||
           currentFilters.search;
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('fa-IR') + ' تومان';
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar - Desktop */}
        <div className="hidden lg:block w-80 flex-shrink-0">
          <div className="bg-black rounded-xl border border-gray-800 p-6 sticky top-24">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-white font-bold text-lg">فیلترها</h3>
              {hasActiveFilters() && (
                <button onClick={clearFilters} className="text-orange-500 text-sm hover:underline">
                  حذف همه
                </button>
              )}
            </div>

            {/* Search */}
            <div className="mb-6">
              <label className="block text-white text-sm font-semibold mb-3">جستجو</label>
              <input
                type="text"
                value={currentFilters.search}
                onChange={(e) => updateFilters({ search: e.target.value })}
                placeholder="جستجوی محصول..."
                className="w-full bg-gray-900 text-white rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-orange-500 border border-gray-700 text-sm"
              />
            </div>

            {/* Category */}
            <div className="mb-6">
              <label className="block text-white text-sm font-semibold mb-3">دسته‌بندی</label>
              <div className="space-y-2">
                {filters.categories.map((cat) => (
                  <label key={cat} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      value={cat}
                      checked={currentFilters.category === cat}
                      onChange={(e) => updateFilters({ category: e.target.value })}
                      className="w-4 h-4 text-orange-500 focus:ring-orange-500"
                    />
                    <span className="text-gray-300 text-sm">{categoryNames[cat]}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <label className="block text-white text-sm font-semibold mb-3">محدوده قیمت (تومان)</label>
              <div className="space-y-3">
                <input
                  type="number"
                  value={currentFilters.minPrice}
                  onChange={(e) => updateFilters({ minPrice: e.target.value })}
                  placeholder={`حداقل ${formatPrice(filters.priceRange.min)}`}
                  className="w-full bg-gray-900 text-white rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-orange-500 border border-gray-700 text-sm"
                />
                <input
                  type="number"
                  value={currentFilters.maxPrice}
                  onChange={(e) => updateFilters({ maxPrice: e.target.value })}
                  placeholder={`حداکثر ${formatPrice(filters.priceRange.max)}`}
                  className="w-full bg-gray-900 text-white rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-orange-500 border border-gray-700 text-sm"
                />
              </div>
            </div>

            {/* In Stock */}
            <div className="mb-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={currentFilters.inStock === 'true'}
                  onChange={(e) => updateFilters({ inStock: e.target.checked ? 'true' : '' })}
                  className="w-4 h-4 text-orange-500 focus:ring-orange-500 rounded"
                />
                <span className="text-gray-300 text-sm">فقط محصولات موجود</span>
              </label>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-white text-sm font-semibold mb-3">مرتب‌سازی</label>
              <select
                value={currentFilters.sortBy}
                onChange={(e) => updateFilters({ sortBy: e.target.value })}
                className="w-full bg-gray-900 text-white rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-orange-500 border border-gray-700 text-sm"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="w-full bg-black border border-gray-800 text-white py-3 rounded-lg flex items-center justify-center gap-2"
          >
            <FunnelIcon className="h-5 w-5" />
            فیلترها
            {hasActiveFilters() && (
              <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">
                فعال
              </span>
            )}
          </button>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          {/* Sort Bar - Mobile friendly */}
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-800">
            <p className="text-gray-400 text-sm">
              {total} محصول
            </p>
            <div className="lg:hidden">
              <select
                value={currentFilters.sortBy}
                onChange={(e) => updateFilters({ sortBy: e.target.value })}
                className="bg-gray-900 text-white rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-orange-500 border border-gray-700 text-sm"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Products Loading State */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-black rounded-xl overflow-hidden border border-gray-800 animate-pulse">
                  <div className="h-48 bg-gray-800"></div>
                  <div className="p-4">
                    <div className="h-4 bg-gray-800 rounded w-20 mb-2"></div>
                    <div className="h-5 bg-gray-800 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-800 rounded w-full mb-2"></div>
                    <div className="h-6 bg-gray-800 rounded w-1/2 mb-3"></div>
                    <div className="h-10 bg-gray-800 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">محصولی یافت نشد</p>
              <button onClick={clearFilters} className="mt-4 text-orange-500 hover:underline">
                حذف فیلترها
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Modal */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/80" onClick={() => setIsMobileFilterOpen(false)} />
          <div className="absolute inset-y-0 right-0 w-full max-w-sm bg-black shadow-xl overflow-y-auto">
            <div className="p-4 border-b border-gray-800 flex justify-between items-center sticky top-0 bg-black">
              <h3 className="text-white text-lg font-bold">فیلترها</h3>
              <button onClick={() => setIsMobileFilterOpen(false)} className="text-gray-400 hover:text-white">
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="p-4">
              {/* Search */}
              <div className="mb-6">
                <label className="block text-white text-sm font-semibold mb-3">جستجو</label>
                <input
                  type="text"
                  value={currentFilters.search}
                  onChange={(e) => updateFilters({ search: e.target.value })}
                  placeholder="جستجوی محصول..."
                  className="w-full bg-gray-900 text-white rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-orange-500 border border-gray-700 text-sm"
                />
              </div>

              {/* Category */}
              <div className="mb-6">
                <label className="block text-white text-sm font-semibold mb-3">دسته‌بندی</label>
                <div className="space-y-2">
                  {filters.categories.map((cat) => (
                    <label key={cat} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="category-mobile"
                        value={cat}
                        checked={currentFilters.category === cat}
                        onChange={(e) => {
                          updateFilters({ category: e.target.value });
                          setIsMobileFilterOpen(false);
                        }}
                        className="w-4 h-4 text-orange-500 focus:ring-orange-500"
                      />
                      <span className="text-gray-300 text-sm">{categoryNames[cat]}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-white text-sm font-semibold mb-3">محدوده قیمت (تومان)</label>
                <div className="space-y-3">
                  <input
                    type="number"
                    value={currentFilters.minPrice}
                    onChange={(e) => updateFilters({ minPrice: e.target.value })}
                    placeholder={`حداقل ${formatPrice(filters.priceRange.min)}`}
                    className="w-full bg-gray-900 text-white rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-orange-500 border border-gray-700 text-sm"
                  />
                  <input
                    type="number"
                    value={currentFilters.maxPrice}
                    onChange={(e) => updateFilters({ maxPrice: e.target.value })}
                    placeholder={`حداکثر ${formatPrice(filters.priceRange.max)}`}
                    className="w-full bg-gray-900 text-white rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-orange-500 border border-gray-700 text-sm"
                  />
                </div>
              </div>

              {/* In Stock */}
              <div className="mb-6">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={currentFilters.inStock === 'true'}
                    onChange={(e) => updateFilters({ inStock: e.target.checked ? 'true' : '' })}
                    className="w-4 h-4 text-orange-500 focus:ring-orange-500 rounded"
                  />
                  <span className="text-gray-300 text-sm">فقط محصولات موجود</span>
                </label>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 mt-8">
                <button
                  onClick={clearFilters}
                  className="flex-1 bg-gray-800 text-white py-2 rounded-lg text-sm"
                >
                  حذف همه
                </button>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="flex-1 bg-orange-500 text-white py-2 rounded-lg text-sm"
                >
                  اعمال
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsClient;