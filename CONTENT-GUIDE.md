# 📝 Guide de contenu - TRIPERS

Ce document explique comment modifier et gérer le contenu du site TRIPERS.

## 🎯 Modifier les textes de la page d'accueil

### Hero (section d'en-tête)

**Fichier** : `components/Hero.tsx`

```tsx
// Modifier ces lignes :
<p className="...">TRIPERS · Guides de confiance</p>
<h1 className="...">Nous voyageons d'abord...</h1>
<p>TRIPERS sélectionne des guides...</p>
```

### Section Concept

**Fichier** : `components/ConceptSection.tsx`

Les 4 cartes sont définies dans le tableau `concepts` :

```tsx
const concepts = [
  {
    title: 'Guides rencontrés en vrai',
    description: 'Nous choisissons uniquement...',
    icon: <svg>...</svg>
  },
  // ...
];
```

### Section Destinations (Home)

**Fichier** : `components/DestinationsSection.tsx`

Les descriptions courtes sont dans le tableau `destinations` :

```tsx
const destinations = [
  {
    name: 'Caraïbes',
    slug: 'caraibes',
    description: 'Des plages paradisiaques...',
    image: '/destinations/caraibes-home.jpg',
  },
  // ...
];
```

## 🌍 Ajouter ou modifier une destination

**Fichier** : `lib/destinations.ts`

### Structure d'une destination

```typescript
{
  slug: 'maroc',                    // URL : /destinations/maroc
  countryName: 'Maroc',             // Nom affiché
  heroImage: '/destinations/maroc-hero.jpg',
  intro: 'Court paragraphe...',     // 2-3 phrases
  story: 'Paragraphe plus long...', // 5-8 lignes
  cities: [/* villes */]
}
```

### Structure d'une ville

```typescript
{
  slug: 'marrakech',
  name: 'Marrakech',
  image: '/destinations/maroc-marrakech.jpg',
  description: 'Paragraphe de description...',
  etymology: 'Origine du nom...',   // Optionnel
  guides: [/* guides */]
}
```

### Structure d'un guide

```typescript
{
  id: 'omar-marrakech',             // ID unique
  name: 'Omar',                     // Prénom uniquement
  city: 'Marrakech',
  country: 'Maroc',
  description: 'Description du guide...'
}
```

## 📞 Modifier le numéro WhatsApp

Recherchez et remplacez `33000000000` par votre vrai numéro dans :

1. `components/Footer.tsx`
2. `components/ContactSection.tsx`
3. `app/destinations/[slug]/page.tsx`

Format : `https://wa.me/33612345678` (sans espaces ni +)

## 🎨 Modifier les couleurs

**Fichier** : `tailwind.config.ts`

```typescript
colors: {
  sand: {
    50: '#fdf8f3',   // Plus clair
    100: '#f9ede0',
    // ...
    900: '#6e3d2a',  // Plus foncé
  },
}
```

Utilisez ensuite dans les composants :
- `bg-sand-50` pour un fond très clair
- `bg-sand-500` pour la couleur principale
- `text-sand-600` pour le texte

## 🗺️ Remplacer la carte (TripersMap)

**Fichier** : `components/TripersMap.tsx`

### Exemple avec Leaflet

1. Installez les dépendances :

```bash
npm install leaflet react-leaflet
npm install -D @types/leaflet
```

2. Créez le fichier `components/TripersMap.tsx` :

```tsx
'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function TripersMap() {
  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      className="w-full h-[500px] rounded-xl"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
      />
      {/* Ajoutez vos markers ici */}
    </MapContainer>
  );
}
```

3. Importez le CSS dans `app/layout.tsx` :

```tsx
import 'leaflet/dist/leaflet.css';
```

## 📱 Modifier les liens de navigation

**Fichiers** :
- `components/Navbar.tsx` - Navigation principale
- `components/Footer.tsx` - Navigation footer

### Ancres de la page d'accueil

- `/#concept` → Section Concept
- `/#destinations` → Section Destinations
- `/#contact` → Section Contact

### Pages destinations

- `/destinations/caraibes`
- `/destinations/cap-vert`
- `/destinations/colombie`
- `/destinations/maroc`

## 🖼️ Gérer les images

### Format recommandé

- **Format** : JPEG ou WebP
- **Hero** : 1920x1080px (ratio 16:9)
- **Villes** : 1600x900px minimum
- **Home** : 1200x800px minimum

### Optimisation

Utilisez un outil comme [TinyPNG](https://tinypng.com) pour compresser vos images avant de les ajouter.

### Convention de nommage

```
[destination]-[type].jpg

Exemples :
- maroc-hero.jpg
- maroc-marrakech.jpg
- caraibes-home.jpg
```

## 🔍 SEO et Métadonnées

### Titre et description globaux

**Fichier** : `app/layout.tsx`

```typescript
export const metadata: Metadata = {
  title: 'TRIPERS - Guides de confiance...',
  description: 'TRIPERS sélectionne...',
};
```

### Métadonnées des pages destinations

Générées automatiquement depuis `lib/destinations.ts` dans `app/destinations/[slug]/page.tsx`.

## ✅ Checklist avant publication

- [ ] Toutes les images sont ajoutées
- [ ] Numéro WhatsApp mis à jour
- [ ] Tous les liens fonctionnent
- [ ] Textes relus et corrigés
- [ ] Site testé sur mobile
- [ ] Images optimisées
- [ ] Variables d'environnement configurées (si nécessaire)

## 🆘 Problèmes courants

### Les images ne s'affichent pas

- Vérifiez que les fichiers sont dans `public/destinations/`
- Vérifiez l'orthographe des noms de fichiers
- Relancez le serveur de développement

### Erreur TypeScript

- Vérifiez que tous les champs obligatoires sont remplis
- Respectez la structure définie dans `lib/destinations.ts`

### Le site ne démarre pas

```bash
# Supprimez node_modules et réinstallez
rm -rf node_modules .next
npm install
npm run dev
```

## 📚 Ressources

- [Documentation Next.js](https://nextjs.org/docs)
- [Documentation Tailwind CSS](https://tailwindcss.com/docs)
- [Documentation TypeScript](https://www.typescriptlang.org/docs)
