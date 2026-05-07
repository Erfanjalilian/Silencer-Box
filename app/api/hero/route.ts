// app/api/hero/route.ts
import { NextResponse } from 'next/server';

// Default empty structure - image will be provided by you
const heroData = {
  imageUrl: '', // Empty by default - you'll provide the image
  title: 'به SilentBox خوش آمدید',
  subtitle: 'جدیدترین محصولات مد و استایل را با بهترین قیمت تجربه کنید',
  buttonText: 'مشاهده محصولات',
  buttonLink: '/products'
};

export async function GET() {
  try {
    return NextResponse.json(heroData, {
      status: 200,
      headers: {
        'Cache-Control': 's-maxage=60, stale-while-revalidate=30',
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch hero data' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { imageUrl, title, subtitle, buttonText, buttonLink } = body;
    
    const updatedHeroData = {
      imageUrl: imageUrl || '',
      title: title || 'به SilentBox خوش آمدید',
      subtitle: subtitle || '',
      buttonText: buttonText || 'مشاهده محصولات',
      buttonLink: buttonLink || '/products'
    };
    
    return NextResponse.json(updatedHeroData, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update hero data' },
      { status: 500 }
    );
  }
}