'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/lib/navigation';
import { Link } from '@/lib/navigation';

const LANGUAGES = {
  fr: { name: 'Français', flag: '🇫🇷' },
  en: { name: 'English', flag: '🇬🇧' },
  ar: { name: 'العربية', flag: '🇸🇦' },
  hi: { name: 'हिन्दी', flag: '🇮🇳' },
  it: { name: 'Italiano', flag: '🇮🇹' },
  de: { name: 'Deutsch', flag: '🇩🇪' },
  ja: { name: '日本語', flag: '🇯🇵' },
  zh: { name: '中文', flag: '🇨🇳' },
  ru: { name: 'Русский', flag: '🇷🇺' },
};

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const changeLanguage = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
    setIsLangOpen(false);
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <Image 
              src="/logo-tripers.svg" 
              alt="TRIPERS" 
              width={200} 
              height={60}
              className="h-11 w-auto"
              priority
            />
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            {/* Sélecteur de langue */}
            <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center space-x-2 text-sm text-gray-900 hover:text-gray-700 transition-colors"
              >
                <span>{LANGUAGES[locale as keyof typeof LANGUAGES].flag}</span>
                <span>{LANGUAGES[locale as keyof typeof LANGUAGES].name}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isLangOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsLangOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-96 overflow-y-auto">
                    {Object.entries(LANGUAGES).map(([code, lang]) => (
                      <button
                        key={code}
                        onClick={() => changeLanguage(code)}
                        className={`w-full flex items-center space-x-3 px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                          locale === code ? 'bg-gray-100 font-medium' : ''
                        }`}
                      >
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            <a
              href="https://wa.me/212608836531"
              target="_blank"
              rel="noopener noreferrer"
              className="relative text-sm text-gray-900 pb-1 group"
            >
              {t('contact')}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-700 hover:text-gray-900"
            aria-label="Menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            {/* Sélecteur de langue mobile */}
            <div className="px-4 py-2 border-b border-gray-200">
              <p className="text-xs text-gray-500 mb-2">Language</p>
              <div className="grid grid-cols-3 gap-2">
                {Object.entries(LANGUAGES).map(([code, lang]) => (
                  <button
                    key={code}
                    onClick={() => {
                      changeLanguage(code);
                      setIsMenuOpen(false);
                    }}
                    className={`flex flex-col items-center justify-center p-2 rounded text-xs hover:bg-gray-50 transition-colors ${
                      locale === code ? 'bg-gray-100 font-medium' : ''
                    }`}
                  >
                    <span className="text-2xl mb-1">{lang.flag}</span>
                    <span className="text-[10px]">{lang.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <a
              href="https://wa.me/212608836531"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-2 text-gray-900 border-b-2 border-gray-900 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('contact')}
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
