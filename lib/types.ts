/**
 * Types réutilisables pour l'application TRIPERS
 */

// Re-export des types de destinations
export type { GuideRef, City, Destination } from './destinations';

// Types pour les composants
export type DestinationCard = {
  slug: string;
  image: string;
  imageAlt: string;
};

export type NavLink = {
  id: string;
  labelKey: string;
};

export type Locale = 'fr' | 'en' | 'ar' | 'de' | 'it' | 'es' | 'ru' | 'zh' | 'ja' | 'hi';
