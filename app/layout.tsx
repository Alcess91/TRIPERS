import type { Metadata } from 'next';
import { Inter, Libre_Baskerville } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './globals.css';
import 'leaflet/dist/leaflet.css';

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={`${inter.className} ${libreBaskerville.variable}`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
