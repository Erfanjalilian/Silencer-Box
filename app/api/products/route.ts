// app/api/products/route.ts
import { NextResponse } from 'next/server';

const productsData = [
  {
    id: '1',
    name: 'SilentBox آپارتمانی',
    price: 12500000,
    originalPrice: 15800000,
    discount: 21,
    rating: 4.8,
    reviewCount: 124,
    description: 'جعبه صدای ضد صدا مخصوص ماینرهای آپارتمانی با عایق‌بندی پیشرفته و سیستم خنک‌کننده هوشمند',
    features: [
      'عایق‌بندی صدای ۹۵٪',
      'سیستم خنک‌کننده اتوماتیک',
      'قابلیت نصب ۲ دستگاه ماینر',
      'ابعاد: ۸۰×۶۰×۷۰ سانتی‌متر'
    ],
    imageUrl: '',
    category: 'silentbox',
    inStock: true,
    isBestSeller: true,
    badge: 'پرفروش‌ترین'
  },
  {
    id: '2',
    name: 'SilentBox مخصوص ماینر M30',
    price: 18900000,
    originalPrice: 23500000,
    discount: 20,
    rating: 4.9,
    reviewCount: 89,
    description: 'جعبه صدای اختصاصی برای ماینرهای M30 با طراحی ارگونومیک و صدابرداری فوق‌العاده',
    features: [
      'مناسب برای ماینر M30',
      'کاهش صدا تا ۹۸٪',
      'سیستم تهویه پیشرفته',
      'نصب آسان و سریع'
    ],
    imageUrl: '',
    category: 'silentbox',
    inStock: true,
    isBestSeller: true,
    badge: 'پرفروش‌ترین'
  },
  {
    id: '3',
    name: 'شیر قطع کن هوا',
    price: 2850000,
    originalPrice: 3500000,
    discount: 18,
    rating: 4.6,
    reviewCount: 56,
    description: 'شیر قطع کن هوا با کیفیت بالا برای سیستم‌های تهویه ماینرها، ساخت آلمان',
    features: [
      'جنس باکیفیت و ضد زنگ',
      'اتصال آسان',
      'طول عمر بالا',
      'ساخت آلمان'
    ],
    imageUrl: '',
    category: 'accessory',
    inStock: true,
    isBestSeller: false,
    badge: null
  },
  {
    id: '4',
    name: 'فن حلزونی (سانتریفیوژ)',
    price: 4250000,
    originalPrice: 5500000,
    discount: 22,
    rating: 4.7,
    reviewCount: 78,
    description: 'فن سانتریفیوژ قدرتمند برای خنک‌سازی بهینه ماینرها با مصرف انرژی پایین',
    features: [
      'سرعت قابل تنظیم',
      'مصرف انرژی ۴۵ وات',
      'جریان هوای ۲۵۰ CFM',
      'صدای بسیار کم'
    ],
    imageUrl: '',
    category: 'accessory',
    inStock: true,
    isBestSeller: true,
    badge: 'ویژه'
  },
  {
    id: '5',
    name: 'SilentBox صنعتی',
    price: 26500000,
    originalPrice: 32000000,
    discount: 17,
    rating: 4.9,
    reviewCount: 45,
    description: 'جعبه صدای صنعتی مناسب برای مزارع استخراج با ظرفیت ۴ دستگاه ماینر',
    features: [
      'ظرفیت ۴ ماینر',
      'سیستم خنک‌سازی حرفه‌ای',
      'عایق ۹۹٪ صدا',
      'قابلیت اتصال به داکت مرکزی'
    ],
    imageUrl: '',
    category: 'silentbox',
    inStock: false,
    isBestSeller: false,
    badge: null
  }
];

export async function GET() {
  try {
    // Filter best selling products (isBestSeller = true)
    const bestSellers = productsData.filter(product => product.isBestSeller === true);
    
    return NextResponse.json(bestSellers, {
      status: 200,
      headers: {
        'Cache-Control': 's-maxage=60, stale-while-revalidate=30',
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// Get all products (for other pages)
export async function POST(request: Request) {
  try {
    const { id } = await request.json();
    const product = productsData.find(product => product.id === id);
    
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}