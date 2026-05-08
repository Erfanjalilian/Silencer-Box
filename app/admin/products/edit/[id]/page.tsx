// app/admin/products/edit/[id]/page.tsx
import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProductForm from '@/app/admin/components/ProductForm';

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
    const response = await fetch(`${baseUrl}/api/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
      cache: 'no-cache',
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

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);
  
  if (!product) {
    notFound();
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-2">
          <Link
            href="/admin/products"
            className="text-sky-400 hover:text-sky-300 transition-colors"
          >
            ← بازگشت
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-100">
            ویرایش محصول
          </h1>
        </div>
        <p className="text-gray-400">
          در حال ویرایش محصول: {product.name}
        </p>
      </div>

      {/* Form */}
      <ProductForm mode="edit" initialProduct={product} />
    </div>
  );
}