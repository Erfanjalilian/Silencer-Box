// components/Footer.tsx
import React from 'react';
import Link from 'next/link';
import { 
  HomeIcon, 
  ShoppingBagIcon, 
  PhoneIcon, 
  InformationCircleIcon,
  EnvelopeIcon,
  MapPinIcon,
  PhoneArrowDownLeftIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-black border-t border-orange-500/30 mt-auto">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 gap-y-12">
          
          {/* Company Info Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 space-x-reverse">
              <ShoppingBagIcon className="h-8 w-8 text-orange-500" />
              <Link href="/" className="text-2xl font-bold">
                <span className="text-white">Silent</span>
                <span className="text-orange-500">Box</span>
              </Link>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              فروشگاهی مدرن برای ارائه بهترین محصولات با کیفیت و قیمت مناسب. مشتری مداری و رضایت شما اولویت ماست.
            </p>
            <div className="flex space-x-4 space-x-reverse pt-2">
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879v-6.99h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.99C18.343 21.128 22 16.991 22 12z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0021.722-11.72c0-.213-.004-.425-.015-.636A10.005 10.005 0 0024 4.59z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="space-y-4">
            <h3 className="text-white text-lg font-semibold border-r-2 border-orange-500 pr-3">
              دسترسی سریع
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-orange-400 transition-colors flex items-center gap-2">
                  <HomeIcon className="h-4 w-4" />
                  صفحه اصلی
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-400 hover:text-orange-400 transition-colors flex items-center gap-2">
                  <ShoppingBagIcon className="h-4 w-4" />
                  محصولات
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-orange-400 transition-colors flex items-center gap-2">
                  <PhoneIcon className="h-4 w-4" />
                  تماس با ما
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-orange-400 transition-colors flex items-center gap-2">
                  <InformationCircleIcon className="h-4 w-4" />
                  درباره ما
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info Section */}
          <div className="space-y-4">
            <h3 className="text-white text-lg font-semibold border-r-2 border-orange-500 pr-3">
              اطلاعات تماس
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-gray-400">
                <MapPinIcon className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm">شاداباد کوی ۱۷ شهریور خ سرحدی جنوبی کوچه چوپان پ۱۹ واحد ۷</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <PhoneArrowDownLeftIcon className="h-5 w-5 text-orange-500 flex-shrink-0" />
                <span className="text-sm">۰۲۱۶۶۷۹۴۵۵۸</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <EnvelopeIcon className="h-5 w-5 text-orange-500 flex-shrink-0" />
                <span className="text-sm">info@silentbox.com</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <ClockIcon className="h-5 w-5 text-orange-500 flex-shrink-0" />
                <span className="text-sm">شنبه تا پنجشنبه: ۹ - ۱۸</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="space-y-4">
            <h3 className="text-white text-lg font-semibold border-r-2 border-orange-500 pr-3">
              خبرنامه
            </h3>
            <p className="text-gray-400 text-sm">
              برای دریافت آخرین تخفیف‌ها و اخبار، ایمیل خود را وارد کنید.
            </p>
            <div className="space-y-3">
              <input
                type="email"
                placeholder="ایمیل شما"
                className="w-full bg-gray-900 text-white placeholder-gray-400 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
              />
              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                عضویت
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar with Persian Credit Text */}
      <div className="border-t border-orange-500/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-gray-500 text-sm">
              © ۱۴۰۳ تمامی حقوق برای SilentBox محفوظ است.
            </p>
            
            {/* Centered Persian Text */}
            <p className="text-gray-400 text-sm text-center">
              طراحی شده توسط <span className="text-orange-500 hover:text-orange-400 transition-colors">عرفان جلیلیان</span>
            </p>
            
            <div className="flex gap-3">
              <span className="text-gray-600 text-xs">شرایط استفاده</span>
              <span className="text-gray-600 text-xs">حریم خصوصی</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;