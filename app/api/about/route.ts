// app/api/about/route.ts
import { NextResponse } from 'next/server';

const aboutData = {
  title: 'درباره سیلنت‌باکس | SilentBox',
  description: 'خرید مستقیم از کارخانه سیلنت‌باکس بدون واسطه',
  sections: [
    {
      type: 'hero',
      content: 'سلام. مستقیم از کارخانه سیلنت‌باکس بدون واسطه خرید کنید. سیلنت‌باکس فوق‌العاده با طراحی مدرن و شیک، خنک‌کنندگی استثنایی و قیمتی شگفت‌انگیز.'
    },
    {
      type: 'subtitle',
      content: 'یک سیلنت‌باکس حرفه‌ای برای تمام ماینرها، هم معمولی و هم حرفه‌ای. اول کیفیت و جنس، بعد قیمت عالی.'
    }
  ],
  features: [
    {
      title: 'سیستم قطع کن هوشمند هوا',
      description: 'مجهز به سیستم قطع کن هوشمند هوا با ضمانت ۶ ماهه',
      icon: 'smartphone'
    },
    {
      title: 'فن حلزونی بلبرینگی',
      description: 'مجهز به فن حلزونی (سانتریفیوژ) از نوع بلبرینگی با قابلیت تمام مس و ۴ سرعته، مناسب کار مداوم در تمام آب و هواها با ضمانت ۶ ماهه',
      icon: 'fan'
    },
    {
      title: 'کلید خاموش و روشن ماینر',
      description: 'مجهز به کلید خاموش و روشن ماینر با استفاده از کنتاکتور A1',
      icon: 'power'
    },
    {
      title: 'کلید کنترل سرعت موتور',
      description: 'مجهز به کلید کنترل سرعت موتور (حالت آهسته/سریع)',
      icon: 'speed'
    },
    {
      title: 'کنترل از راه دور',
      description: 'مجهز به کنترل از راه دور قابل دسترسی از هر جای جهان از طریق اپلیکیشن اختصاصی',
      icon: 'remote'
    },
    {
      title: 'آمپرمتر دیجیتال حرفه‌ای',
      description: 'مجهز به آمپرمتر دیجیتال حرفه‌ای',
      icon: 'meter'
    },
    {
      title: 'ولت‌متر دیجیتال حرفه‌ای',
      description: 'مجهز به ولت‌متر دیجیتال حرفه‌ای',
      icon: 'voltmeter'
    }
  ],
  additionalFeatures: 'سایر قابلیت‌ها نیز قابل اضافه شدن هستند.',
  closingMessage: 'با بالاترین راندمان، کمترین صدا و بهترین خنک‌کنندگی. فقط کافی است یکبار از ما خرید کنید.',
  offerMessage: 'انواع ماینرهای نو و کارکرده زیر قیمت بازار موجود می‌باشد.',
  deliveryMessage: 'ارسال سریع به تمام شهرها',
  images: {
    hero: '',
    factory: '',
    product: '',
    feature: ''
  }
};

export async function GET() {
  try {
    return NextResponse.json(aboutData, {
      status: 200,
      headers: {
        'Cache-Control': 's-maxage=3600, stale-while-revalidate=180',
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch about page data' },
      { status: 500 }
    );
  }
}

// Optional: PUT endpoint for admin to update about page content
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    // In a real app, you would save this to a database
    const updatedData = { ...aboutData, ...body };
    
    return NextResponse.json(updatedData, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update about page data' },
      { status: 500 }
    );
  }
}