// app/api/contact/route.ts
import { NextResponse } from 'next/server';

const contactData = {
  title: 'تماس با ما | سیلنت‌باکس',
  description: 'برای سوالات درباره محصولات سیلنت‌باکس، قیمت‌ها و پشتیبانی با ما در تماس باشید',
  
  hero: {
    title: 'ما مشتاق شنیدن صدای شما هستیم',
    subtitle: 'سوالی درباره محصولات سیلنت‌باکس دارید؟ نیاز به پشتیبانی دارید؟ تیم ما آماده کمک به شماست.',
    imageUrl: ''
  },
  
  contactInfo: {
    email: {
      primary: 'info@silentbox.com',
      support: 'support@silentbox.com',
      sales: 'sales@silentbox.com'
    },
    phone: {
      primary: '۰۲۱-۱۲۳۴۵۶۷۸',
      support: '۰۲۱-۸۷۶۵۴۳۲۱',
      mobile: '۰۹۱۲-۱۲۳-۴۵۶۷',
      whatsapp: '۰۹۱۲-۱۲۳-۴۵۶۷'
    },
    address: {
      office: 'تهران، خیابان ولیعصر، پلاک ۱۲۳',
      factory: 'شهرک صنعتی سیلنت، کیلومتر ۵ جاده مخصوص کرج، تهران',
      mapUrl: 'https://maps.google.com/?q=Tehran+Valiasr+Street'
    },
    workingHours: {
      weekdays: 'شنبه تا چهارشنبه: ۹:۰۰ - ۱۸:۰۰',
      thursday: 'پنجشنبه: ۹:۰۰ - ۱۴:۰۰',
      friday: 'جمعه: تعطیل'
    }
  },
  
  form: {
    title: 'ارسال پیام به ما',
    subtitle: 'فرم زیر را پر کنید، ما ظرف ۲۴ ساعت با شما تماس خواهیم گرفت',
    fields: {
      name: {
        label: 'نام و نام خانوادگی',
        placeholder: 'نام و نام خانوادگی خود را وارد کنید',
        required: true
      },
      email: {
        label: 'آدرس ایمیل',
        placeholder: 'ایمیل خود را وارد کنید',
        required: true
      },
      phone: {
        label: 'شماره تماس',
        placeholder: 'شماره تماس خود را وارد کنید',
        required: false
      },
      subject: {
        label: 'موضوع',
        placeholder: 'موضوع را انتخاب کنید',
        required: true,
        options: [
          'سوال عمومی',
          'اطلاعات محصول',
          'قیمت و استعلام',
          'پشتیبانی فنی',
          'سفارش عمده',
          'همکاری',
          'سایر موارد'
        ]
      },
      message: {
        label: 'پیام',
        placeholder: 'چگونه می‌توانیم به شما کمک کنیم؟...',
        required: true
      }
    },
    submitButton: 'ارسال پیام',
    successMessage: 'پیام شما با موفقیت ارسال شد! به زودی با شما تماس خواهیم گرفت.',
    errorMessage: 'خطایی رخ داد. لطفاً مجدداً تلاش کنید.'
  },
  
  socialMedia: {
    title: 'ما را دنبال کنید',
    instagram: 'https://instagram.com/silentbox',
    twitter: 'https://twitter.com/silentbox',
    linkedin: 'https://linkedin.com/company/silentbox',
    telegram: 'https://t.me/silentbox',
    whatsapp: 'https://wa.me/989121234567'
  },
  
  faq: {
    title: 'سوالات متداول',
    items: [
      {
        question: 'زمان تحویل سفارش چقدر است؟',
        answer: 'ما به تمام شهرها سفارشات را طی ۲ تا ۵ روز کاری بسته به موقعیت مکانی شما تحویل می‌دهیم.'
      },
      {
        question: 'آیا به خارج از ایران ارسال دارید؟',
        answer: 'در حال حاضر فقط داخل ایران ارسال داریم. برای استعلامات بین‌المللی لطفاً با تیم فروش ما تماس بگیرید.'
      },
      {
        question: 'گارانتی محصولات چقدر است؟',
        answer: 'همه محصولات سیلنت‌باکس دارای ۱۲ ماه گارانتی در برابر نقص ساخت هستند.'
      },
      {
        question: 'آیا امکان بازگشت کالا وجود دارد؟',
        answer: 'بله، می‌توانید محصولات را تا ۷ روز پس از تحویل، در صورت استفاده نشده و در بسته‌بندی اصلی، بازگردانید.'
      }
    ]
  }
};

export async function GET() {
  try {
    return NextResponse.json(contactData, {
      status: 200,
      headers: {
        'Cache-Control': 's-maxage=3600, stale-while-revalidate=180',
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'خطا در دریافت اطلاعات تماس' },
      { status: 500 }
    );
  }
}

// POST endpoint for form submission
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;
    
    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'لطفاً تمام فیلدهای ضروری را پر کنید' },
        { status: 400 }
      );
    }
    
    // In a real application, you would:
    // 1. Save to database
    // 2. Send email notification
    // 3. Send to CRM
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'پیام شما با موفقیت ارسال شد. به زودی با شما تماس خواهیم گرفت!'
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'خطا در ارسال پیام. لطفاً مجدداً تلاش کنید.' },
      { status: 500 }
    );
  }
}