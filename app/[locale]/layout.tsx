import type { Metadata } from 'next';
import { Inter, Libre_Baskerville } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

const inter = Inter({ subsets: ['latin'] });
const libreBaskerville = Libre_Baskerville({ 
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-baskerville'
});

export const metadata: Metadata = {
  title: 'TRIPERS - Connect with Local Guides',
  description:
    'TRIPERS sélectionne des guides que notre équipe connaît personnellement. Pour que vos voyages ressemblent à des rencontres, pas à des visites guidées fades.',
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // Vérifier que la locale est valide
  if (!locales.includes(locale as any)) {
    notFound();
  }

  // Récupérer les messages de traduction pour cette locale
  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <div className={`${inter.className} ${libreBaskerville.variable}`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </div>
    </NextIntlClientProvider>
  );
}
