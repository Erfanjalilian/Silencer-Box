// app/api/articles/route.ts
import { NextResponse } from 'next/server';

// Mining articles data - 6 articles about mining
const articlesData = [
  {
    id: '1',
    title: 'آشنایی با استخراج ارزهای دیجیتال',
    summary: 'راهنمای کامل برای شروع استخراج ارزهای دیجیتال، تجهیزات مورد نیاز و سودآوری',
    content: 'متن کامل مقاله...',
    imageUrl: '',
    category: 'آموزشی',
    readTime: '۵ دقیقه',
    date: '۱۴۰۳/۰۸/۱۵',
    author: 'عرفان جلیلیان'
  },
  {
    id: '2',
    title: 'بهترین تجهیزات استخراج در سال ۲۰۲۴',
    summary: 'بررسی تخصصی بهترین دستگاه‌های استخراج و مقایسه بازدهی آنها',
    content: 'متن کامل مقاله...',
    imageUrl: '',
    category: 'تجهیزات',
    readTime: '۸ دقیقه',
    date: '۱۴۰۳/۰۸/۱۰',
    author: 'عرفان جلیلیان'
  },
  {
    id: '3',
    title: 'تاثیر استخراج بر محیط زیست و راهکارهای سبز',
    summary: 'بررسی اثرات زیست‌محیطی استخراج و روش‌های کاهش مصرف انرژی',
    content: 'متن کامل مقاله...',
    imageUrl: '',
    category: 'محیط زیست',
    readTime: '۶ دقیقه',
    date: '۱۴۰۳/۰۸/۰۵',
    author: 'عرفان جلیلیان'
  },
  {
    id: '4',
    title: 'آینده استخراج پس از هاوینگ بیت‌کوین',
    summary: 'تحلیل تغییرات بازار استخراج بعد از نصف شدن پاداش بلاک',
    content: 'متن کامل مقاله...',
    imageUrl: '',
    category: 'تحلیل',
    readTime: '۷ دقیقه',
    date: '۱۴۰۳/۰۷/۲۸',
    author: 'عرفان جلیلیان'
  },
  {
    id: '5',
    title: 'استخراج ابری: مزایا و معایب',
    summary: 'آیا استخراج ابری ارزش سرمایه‌گذاری دارد؟ بررسی کامل روش‌های کلود ماینینگ',
    content: 'متن کامل مقاله...',
    imageUrl: '',
    category: 'بررسی',
    readTime: '۴ دقیقه',
    date: '۱۴۰۳/۰۷/۲۰',
    author: 'عرفان جلیلیان'
  },
  {
    id: '6',
    title: 'راهنمای انتخاب استخر استخراج مناسب',
    summary: 'معیارهای مهم برای انتخاب بهترین استخر استخراج و افزایش درآمد',
    content: 'متن کامل مقاله...',
    imageUrl: '',
    category: 'راهنما',
    readTime: '۶ دقیقه',
    date: '۱۴۰۳/۰۷/۱۵',
    author: 'عرفان جلیلیان'
  }
];

export async function GET() {
  try {
    return NextResponse.json(articlesData, {
      status: 200,
      headers: {
        'Cache-Control': 's-maxage=60, stale-while-revalidate=30',
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch articles' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { id } = await request.json();
    const article = articlesData.find(article => article.id === id);
    
    if (!article) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(article, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch article' },
      { status: 500 }
    );
  }
}