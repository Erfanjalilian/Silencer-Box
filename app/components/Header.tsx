// components/Header.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingCartIcon, UserIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-black border-b border-orange-500/30 shadow-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            
            {/* Logo / Brand */}
            <div className="flex-shrink-0">
              <Link href="/" className="text-2xl md:text-3xl font-bold tracking-tight">
                <span className="text-white">Silent</span>
                <span className="text-orange-500">Box</span>
              </Link>
            </div>

            {/* Desktop Navigation Links - hidden on mobile */}
            <nav className="hidden md:flex items-center gap-12 mr-10">
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

            {/* Right side icons: Cart, User, Menu (mobile) */}
            <div className="flex items-center gap-3 sm:gap-5">
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
              <button 
                onClick={toggleMobileMenu}
                className="md:hidden text-white hover:text-orange-400 transition-colors"
              >
                {isMobileMenuOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={toggleMobileMenu}
          />
          
          {/* Mobile Menu Panel */}
          <div className="absolute top-16 right-0 bottom-0 w-64 bg-black border-l border-orange-500/30 shadow-xl animate-slide-in">
            <nav className="flex flex-col py-8 px-6 space-y-6">
              <Link 
                href="/" 
                onClick={toggleMobileMenu}
                className="text-white hover:text-orange-400 transition-colors duration-200 font-medium text-lg"
              >
                صفحه اصلی
              </Link>
              <Link 
                href="/products" 
                onClick={toggleMobileMenu}
                className="text-white hover:text-orange-400 transition-colors duration-200 font-medium text-lg"
              >
                محصولات
              </Link>
              <Link 
                href="/contact" 
                onClick={toggleMobileMenu}
                className="text-white hover:text-orange-400 transition-colors duration-200 font-medium text-lg"
              >
                تماس با ما
              </Link>
              <Link 
                href="/about" 
                onClick={toggleMobileMenu}
                className="text-white hover:text-orange-400 transition-colors duration-200 font-medium text-lg"
              >
                درباره ما
              </Link>
              
              <div className="pt-6 border-t border-orange-500/30">
                <button className="w-full flex items-center justify-between text-white hover:text-orange-400 transition-colors">
                  <span>حساب کاربری</span>
                  <UserIcon className="h-5 w-5" />
                </button>
              </div>
            </nav>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        
        .animate-slide-in {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default Header;