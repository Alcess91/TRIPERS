import type { ReactNode } from 'react';
import './globals.css';
import 'leaflet/dist/leaflet.css';

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
