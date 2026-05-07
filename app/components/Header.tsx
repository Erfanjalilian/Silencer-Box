// components/Header.tsx
import React from 'react';
import Link from 'next/link';
import { ShoppingCartIcon, UserIcon, MagnifyingGlassIcon, Bars3Icon } from '@heroicons/react/24/outline';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-black border-b border-orange-500/30 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Logo / Brand */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl md:text-3xl font-bold tracking-tight">
              <span className="text-white">نوا</span>
              <span className="text-orange-500">استور</span>
            </Link>
          </div>

          {/* Desktop Navigation Links - hidden on mobile */}
          <nav className="hidden md:flex items-center space-x-8 space-x-reverse mr-10">
            <Link href="/" className="text-white hover:text-orange-400 transition-colors duration-200 font-medium">
              صفحه اصلی
            </Link>
            <Link href="/products" className="text-white hover:text-orange-400 transition-colors duration-200 font-medium">
              محصولات
            </Link>
            <Link href="/contact" className="text-white hover:text-orange-400 transition-colors duration-200 font-medium">
              تماس با ما
            </Link>
            <Link href="/about" className="text-white hover:text-orange-400 transition-colors duration-200 font-medium">
              درباره ما
            </Link>
          </nav>

          {/* Search Bar - hidden on mobile */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="جستجوی محصولات..."
                className="w-full bg-gray-900 text-white placeholder-gray-400 rounded-full py-2 pr-10 pl-4 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              />
              <MagnifyingGlassIcon className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Right side icons: Search (mobile), Cart, User, Menu (mobile) */}
          <div className="flex items-center gap-3 sm:gap-5">
            {/* Mobile search trigger */}
            <button className="lg:hidden text-white hover:text-orange-400 transition-colors">
              <MagnifyingGlassIcon className="h-5 w-5" />
            </button>

            {/* Cart Button with badge */}
            <button className="relative text-white hover:text-orange-400 transition-colors">
              <ShoppingCartIcon className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                ۳
              </span>
            </button>

            {/* User Button */}
            <button className="hidden sm:block text-white hover:text-orange-400 transition-colors">
              <UserIcon className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-white hover:text-orange-400 transition-colors">
              <Bars3Icon className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile Search Bar - visible only on small screens (optional inline) */}
        <div className="lg:hidden pb-3 md:hidden">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="جستجوی محصولات..."
              className="w-full bg-gray-900 text-white placeholder-gray-400 rounded-full py-2 pr-10 pl-4 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
            />
            <MagnifyingGlassIcon className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;