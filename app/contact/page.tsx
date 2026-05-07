// app/contact/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  PhotoIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
  GlobeAltIcon,
  ChatBubbleLeftRightIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from '@heroicons/react/24/outline';

interface ContactData {
  title: string;
  description: string;
  hero: {
    title: string;
    subtitle: string;
    imageUrl: string;
  };
  contactInfo: {
    email: {
      primary: string;
      support: string;
      sales: string;
    };
    phone: {
      primary: string;
      support: string;
      mobile: string;
      whatsapp: string;
    };
    address: {
      office: string;
      factory: string;
      mapUrl: string;
    };
    workingHours: {
      weekdays: string;
      thursday: string;
      friday: string;
    };
  };
  form: {
    title: string;
    subtitle: string;
    fields: {
      name: { label: string; placeholder: string; required: boolean };
      email: { label: string; placeholder: string; required: boolean };
      phone: { label: string; placeholder: string; required: boolean };
      subject: { label: string; placeholder: string; required: boolean; options: string[] };
      message: { label: string; placeholder: string; required: boolean };
    };
    submitButton: string;
    successMessage: string;
    errorMessage: string;
  };
  socialMedia: {
    title: string;
    instagram: string;
    twitter: string;
    linkedin: string;
    telegram: string;
    whatsapp: string;
  };
  faq: {
    title: string;
    items: Array<{ question: string; answer: string }>;
  };
}

export default function ContactPage() {
  const [contactData, setContactData] = useState<ContactData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({
    type: null,
    message: ''
  });
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/contact');
        
        if (!response.ok) {
          throw new Error('Failed to fetch contact data');
        }
        
        const data = await response.json();
        setContactData(data);
        setError(null);
      } catch (err) {
        setError('خطا در بارگذاری اطلاعات تماس');
        console.error('Error fetching contact data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchContactData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setFormStatus({ type: 'success', message: data.message || contactData?.form.successMessage || 'پیام با موفقیت ارسال شد!' });
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      } else {
        setFormStatus({ type: 'error', message: data.error || contactData?.form.errorMessage || 'خطایی رخ داد' });
      }
    } catch (err) {
      setFormStatus({ type: 'error', message: 'خطا در شبکه. لطفاً مجدداً تلاش کنید.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-orange-500 border-t-transparent"></div>
          <p className="text-white mt-4">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  if (error || !contactData) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg">{error || 'خطا در بارگذاری صفحه تماس با ما'}</p>
          <Link href="/" className="inline-block mt-4 text-orange-500 hover:text-orange-400">
            بازگشت به صفحه اصلی
          </Link>
        </div>
      </div>
    );
  }

  const hasHeroImage = contactData.hero.imageUrl && contactData.hero.imageUrl.trim() !== '';

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header Spacer */}
      <div className="h-16 md:h-20"></div>

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-black to-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {contactData.hero.title}
            </h1>
            <p className="text-gray-300 text-lg">
              {contactData.hero.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Email Card */}
            <div className="bg-black rounded-xl p-6 border border-gray-800 hover:border-orange-500/50 transition-all duration-300 text-center">
              <div className="w-14 h-14 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <EnvelopeIcon className="h-7 w-7 text-orange-500" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-3">ایمیل</h3>
              <div className="space-y-2">
                <p className="text-gray-400 text-sm">فروش: {contactData.contactInfo.email.sales}</p>
                <p className="text-gray-400 text-sm">پشتیبانی: {contactData.contactInfo.email.support}</p>
                <p className="text-gray-400 text-sm">اطلاعات: {contactData.contactInfo.email.primary}</p>
              </div>
            </div>

            {/* Phone Card */}
            <div className="bg-black rounded-xl p-6 border border-gray-800 hover:border-orange-500/50 transition-all duration-300 text-center">
              <div className="w-14 h-14 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <PhoneIcon className="h-7 w-7 text-orange-500" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-3">تلفن</h3>
              <div className="space-y-2">
                <p className="text-gray-400 text-sm">دفتر: {contactData.contactInfo.phone.primary}</p>
                <p className="text-gray-400 text-sm">پشتیبانی: {contactData.contactInfo.phone.support}</p>
                <p className="text-gray-400 text-sm">همراه: {contactData.contactInfo.phone.mobile}</p>
              </div>
            </div>

            {/* Address Card */}
            <div className="bg-black rounded-xl p-6 border border-gray-800 hover:border-orange-500/50 transition-all duration-300 text-center">
              <div className="w-14 h-14 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPinIcon className="h-7 w-7 text-orange-500" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-3">آدرس</h3>
              <div className="space-y-2">
                <p className="text-gray-400 text-sm">{contactData.contactInfo.address.office}</p>
                <p className="text-gray-400 text-sm text-xs mt-2">{contactData.contactInfo.address.factory}</p>
              </div>
            </div>

            {/* Hours Card */}
            <div className="bg-black rounded-xl p-6 border border-gray-800 hover:border-orange-500/50 transition-all duration-300 text-center">
              <div className="w-14 h-14 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <ClockIcon className="h-7 w-7 text-orange-500" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-3">ساعات کاری</h3>
              <div className="space-y-2">
                <p className="text-gray-400 text-sm">{contactData.contactInfo.workingHours.weekdays}</p>
                <p className="text-gray-400 text-sm">{contactData.contactInfo.workingHours.thursday}</p>
                <p className="text-gray-400 text-sm">{contactData.contactInfo.workingHours.friday}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form and Map Section */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                {contactData.form.title}
              </h2>
              <p className="text-gray-400 mb-6">
                {contactData.form.subtitle}
              </p>

              {formStatus.type && (
                <div className={`mb-6 p-4 rounded-lg ${
                  formStatus.type === 'success' ? 'bg-green-500/20 text-green-400 border border-green-500/50' : 'bg-red-500/20 text-red-400 border border-red-500/50'
                }`}>
                  {formStatus.message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-white mb-2 text-sm">
                    {contactData.form.fields.name.label} {contactData.form.fields.name.required && <span className="text-orange-500">*</span>}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder={contactData.form.fields.name.placeholder}
                    required={contactData.form.fields.name.required}
                    className="w-full bg-gray-900 text-white rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-orange-500 border border-gray-700"
                  />
                </div>

                <div>
                  <label className="block text-white mb-2 text-sm">
                    {contactData.form.fields.email.label} {contactData.form.fields.email.required && <span className="text-orange-500">*</span>}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={contactData.form.fields.email.placeholder}
                    required={contactData.form.fields.email.required}
                    className="w-full bg-gray-900 text-white rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-orange-500 border border-gray-700"
                  />
                </div>

                <div>
                  <label className="block text-white mb-2 text-sm">
                    {contactData.form.fields.phone.label}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder={contactData.form.fields.phone.placeholder}
                    className="w-full bg-gray-900 text-white rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-orange-500 border border-gray-700"
                  />
                </div>

                <div>
                  <label className="block text-white mb-2 text-sm">
                    {contactData.form.fields.subject.label} {contactData.form.fields.subject.required && <span className="text-orange-500">*</span>}
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required={contactData.form.fields.subject.required}
                    className="w-full bg-gray-900 text-white rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-orange-500 border border-gray-700"
                  >
                    <option value="">{contactData.form.fields.subject.placeholder}</option>
                    {contactData.form.fields.subject.options.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-white mb-2 text-sm">
                    {contactData.form.fields.message.label} {contactData.form.fields.message.required && <span className="text-orange-500">*</span>}
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder={contactData.form.fields.message.placeholder}
                    required={contactData.form.fields.message.required}
                    rows={5}
                    className="w-full bg-gray-900 text-white rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-orange-500 border border-gray-700 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'در حال ارسال...' : contactData.form.submitButton}
                </button>
              </form>
            </div>

            {/* Map and Social */}
            <div>
              {/* Map Placeholder */}
              <div className="bg-gray-800 rounded-xl overflow-hidden mb-6 h-64">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12959.247458126543!2d51.3890!3d35.6892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8e00491b1c5e1d%3A0x2f1c8e4f1e5c8e1f!2sTehran!5e0!3m2!1sen!2s!4v1699999999999!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="SilentBox Location"
                ></iframe>
              </div>

              {/* Social Media */}
              <div className="bg-black rounded-xl p-6 border border-gray-800">
                <h3 className="text-white font-semibold text-lg mb-4 text-center">
                  {contactData.socialMedia.title}
                </h3>
                <div className="flex justify-center gap-4">
                  <a href={contactData.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors">
                    <span className="text-white">📷</span>
                  </a>
                  <a href={contactData.socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors">
                    <span className="text-white">🐦</span>
                  </a>
                  <a href={contactData.socialMedia.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors">
                    <span className="text-white">🔗</span>
                  </a>
                  <a href={contactData.socialMedia.telegram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors">
                    <span className="text-white">✈️</span>
                  </a>
                  <a href={contactData.socialMedia.whatsapp} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors">
                    <span className="text-white">💬</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-4">
              {contactData.faq.title}
            </h2>
            <div className="w-20 h-1 bg-orange-500 mx-auto mb-10"></div>

            <div className="space-y-4">
              {contactData.faq.items.map((faq, index) => (
                <div key={index} className="bg-black rounded-xl border border-gray-800 overflow-hidden">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between p-5 text-right hover:bg-gray-900 transition-colors"
                  >
                    <span className="text-white font-medium">{faq.question}</span>
                    {openFaqIndex === index ? (
                      <ChevronUpIcon className="h-5 w-5 text-orange-500" />
                    ) : (
                      <ChevronDownIcon className="h-5 w-5 text-orange-500" />
                    )}
                  </button>
                  {openFaqIndex === index && (
                    <div className="px-5 pb-5">
                      <p className="text-gray-400 text-sm">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            نیاز به کمک فوری دارید؟
          </h2>
          <p className="text-gray-400 mb-6">
            تیم پشتیبانی ما ۲۴ ساعته آماده کمک به شماست
          </p>
          <a
            href={`https://wa.me/${contactData.contactInfo.phone.whatsapp.replace(/\D/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300"
          >
            <ChatBubbleLeftRightIcon className="h-5 w-5" />
            گفتگو در واتساپ
          </a>
        </div>
      </section>
    </div>
  );
}