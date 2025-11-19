'use client';

import { useTranslations, useLocale } from 'next-intl';

export default function ConceptSection() {
  const t = useTranslations('concept');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const concepts = [
    {
      title: 'Comme un local',
      description:
        "Vous vivez comme un local, pas comme un touriste. Expériences authentiques garanties.",
      icon: (
        <svg
          className="w-10 h-10 text-gray-900"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      title: 'Réseau international',
      description:
        "Réseau international d'amis → expériences uniques partout dans le monde.",
      icon: (
        <svg
          className="w-10 h-10 text-gray-900"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: 'Sécurité & confiance',
      description:
        'Sécurité + vibes familiales. Nous vous mettons en lien avec des locaux de confiance.',
      icon: (
        <svg
          className="w-10 h-10 text-gray-900"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      title: 'Expériences uniques',
      description:
        "Soirées privées, immersions culturelles, excursions cachées.",
      icon: (
        <svg
          className="w-10 h-10 text-gray-900"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ),
    },
  ];

  return (
    <section id="concept" className="py-20 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className={`text-4xl md:text-5xl font-normal text-gray-900 mb-6 ${isRTL ? 'flex flex-row-reverse items-center justify-center gap-3' : ''}`}>
            {isRTL ? (
              <>
                <span>{t('title').replace('TRIPERS', '').replace('؟', '').trim()}؟</span>
                <span className="font-bold">TRIPERS</span>
              </>
            ) : (
              t('title')
            )}
          </h2>
          <p className="text-xl text-gray-600 italic font-light">
            {t('subtitle')}
          </p>
        </div>

        {/* Grille de concepts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {['local', 'network', 'safety', 'unique'].map((key, index) => (
            <div
              key={key}
              className="text-center"
            >
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 border-2 border-gray-900 flex items-center justify-center">
                  {concepts[index].icon}
                </div>
              </div>
              <h3 className="text-2xl font-normal text-gray-900 mb-4">
                {t(key)}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t(`${key}Desc`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
