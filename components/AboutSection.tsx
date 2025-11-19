'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function AboutSection() {
  const t = useTranslations('about');
  
  return (
    <section id="about" className="py-16 md:py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex flex-col md:flex-row items-center justify-center gap-3 mb-4">
            <h2 className="text-4xl md:text-5xl font-normal text-gray-900">
              {t('title')}
            </h2>
            <Image 
              src="/logo-tripers.svg" 
              alt="TRIPERS" 
              width={300} 
              height={90}
              className="h-16 md:h-20 w-auto"
            />
          </div>
          <p className="text-xl text-gray-600 italic font-light">
            {t('subtitle')}
          </p>
        </div>

        <div className="prose prose-lg max-w-none mb-12 space-y-6 text-gray-700">
          <p>
            {t('paragraph1')}
          </p>

          <p>
            {t('paragraph2')}
          </p>

          <p>
            <strong>{t('paragraph3')}</strong> {t('paragraph3Content')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              {t('card1Title')}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {t('card1Content')}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              {t('card2Title')}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {t('card2Content')}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              {t('card3Title')}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {t('card3Content')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
