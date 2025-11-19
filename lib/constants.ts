/**
 * Configuration et constantes globales de l'application TRIPERS
 */

// Contact
export const WHATSAPP_NUMBER = '212608836531'; // Format international sans +
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

// Site
export const SITE_NAME = 'TRIPERS';
export const SITE_URL = 'https://tripers.com'; // À mettre à jour avec l'URL de production

// Réseaux sociaux
export const SOCIAL_LINKS = {
  whatsapp: WHATSAPP_URL,
  instagram: '', // À ajouter si nécessaire
  facebook: '', // À ajouter si nécessaire
} as const;

// Messages WhatsApp par défaut
export const DEFAULT_WHATSAPP_MESSAGE = (locale: string) => {
  const messages: Record<string, string> = {
    fr: 'Bonjour, je souhaite en savoir plus sur vos voyages',
    en: 'Hello, I would like to know more about your trips',
    ar: 'مرحبا، أود معرفة المزيد عن رحلاتك',
    de: 'Hallo, ich möchte mehr über Ihre Reisen erfahren',
    it: 'Ciao, vorrei sapere di più sui vostri viaggi',
    es: 'Hola, me gustaría saber más sobre sus viajes',
    ru: 'Здравствуйте, я хотел бы узнать больше о ваших поездках',
    zh: '你好，我想了解更多关于你们旅行的信息',
    ja: 'こんにちは、旅行について詳しく知りたいです',
    hi: 'नमस्ते, मैं आपकी यात्राओं के बारे में अधिक जानना चाहूंगा',
  };
  return encodeURIComponent(messages[locale] || messages.fr);
};

// Navigation
export const NAV_LINKS = [
  { id: 'concept', labelKey: 'concept' },
  { id: 'destinations', labelKey: 'destinations' },
  { id: 'about', labelKey: 'about' },
  { id: 'map', labelKey: 'map' },
  { id: 'contact', labelKey: 'contact' },
] as const;
