import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

// Les langues supportées
export const locales = ['fr', 'en', 'ar', 'hi', 'it', 'de', 'ja', 'zh', 'ru'] as const;
export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ locale }) => {
  // Si pas de locale ou locale invalide, utiliser français par défaut
  const validLocale = locale && locales.includes(locale as Locale) ? locale : 'fr';

  return {
    locale: validLocale,
    timeZone: 'Europe/Paris',
    messages: (await import(`./messages/${validLocale}.json`)).default,
  };
});
