# 🌍 TRIPERS - Plateforme de guides locaux

TRIPERS est une plateforme qui connecte des voyageurs avec des guides locaux que notre équipe connaît personnellement. Pour des voyages authentiques qui ressemblent à des rencontres, pas à des visites guidées fades.

## 🚀 Démarrage rapide

### Prérequis

- Node.js 18+ 
- npm ou yarn

### Installation

1. **Installer les dépendances**

```bash
npm install
```

2. **Ajouter les images**

Les images des destinations doivent être ajoutées dans `public/destinations/`.  
Consultez `public/destinations/IMAGES-README.md` pour la liste complète des images nécessaires.

3. **Lancer le serveur de développement**

```bash
npm run dev
```

4. **Ouvrir l'application**

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 📁 Structure du projet

```
TRIPER/
├── app/
│   ├── destinations/
│   │   └── [slug]/
│   │       └── page.tsx          # Pages dynamiques des destinations
│   ├── layout.tsx                # Layout principal avec Navbar et Footer
│   ├── page.tsx                  # Page d'accueil
│   └── globals.css               # Styles globaux
├── components/
│   ├── CityBlock.tsx             # Composant pour afficher une ville et ses guides
│   ├── ConceptSection.tsx        # Section "Ce qui rend TRIPERS différent"
│   ├── ContactSection.tsx        # Section contact WhatsApp
│   ├── DestinationsSection.tsx   # Section destinations sur la home
│   ├── Footer.tsx                # Footer du site
│   ├── Hero.tsx                  # Hero de la page d'accueil
│   ├── MapSection.tsx            # Section carte
│   ├── Navbar.tsx                # Barre de navigation
│   └── TripersMap.tsx            # Composant carte (placeholder)
├── lib/
│   └── destinations.ts           # Données des destinations et guides
├── public/
│   └── destinations/             # Images des destinations
└── package.json
```

## 🗺️ Destinations disponibles

### Caraïbes
- **Fort-de-France, Martinique** - Guide : Patrick

### Cap-Vert
- **Sal** - Guide : Ismael
- **Santo Antão** - À venir

### Maroc
- **Marrakech** - Guides : Omar, Tarek
- **Ouzoud** - Guide : Omar
- **Zagora** - Guide : Youssef

### Colombie
- **Cartagena** - Guides à venir
- **Medellín** - Guides à venir

## 🛠️ Technologies

- **Next.js 14** - Framework React avec App Router
- **TypeScript** - Typage statique
- **Tailwind CSS** - Framework CSS utility-first
- **Next/Image** - Optimisation des images

## 📝 Commandes disponibles

```bash
# Développement
npm run dev

# Build de production
npm run build

# Démarrer en production
npm start

# Linter
npm run lint
```

## 🎨 Personnalisation

### Couleurs

Les couleurs principales sont définies dans `tailwind.config.ts` :

```typescript
colors: {
  sand: {
    50: '#fdf8f3',
    100: '#f9ede0',
    // ...
  },
}
```

### Ajouter une destination

1. Ouvrez `lib/destinations.ts`
2. Ajoutez un nouvel objet `Destination` dans le tableau `DESTINATIONS`
3. Ajoutez les images correspondantes dans `public/destinations/`

### Ajouter un guide

1. Ouvrez `lib/destinations.ts`
2. Trouvez la destination et la ville correspondante
3. Ajoutez un objet `GuideRef` dans le tableau `guides` de la ville

## 📱 Responsive

Le site est entièrement responsive et optimisé pour :
- Mobile (320px+)
- Tablette (768px+)
- Desktop (1024px+)

## 🔗 Liens importants

- Section Concept : `/#concept`
- Section Destinations : `/#destinations`
- Section Contact : `/#contact`
- Pages destinations : `/destinations/[slug]`

## 📄 License

© 2025 TRIPERS. Tous droits réservés.

---

## 🚨 Note importante sur la carte

Le composant `TripersMap.tsx` est actuellement un placeholder. Pour intégrer une vraie carte :

1. Installez Leaflet : `npm install leaflet react-leaflet`
2. Installez les types : `npm install -D @types/leaflet`
3. Remplacez le contenu de `TripersMap.tsx` par votre implémentation Leaflet
4. **Ne modifiez pas** le nom du composant ni ses props pour préserver la compatibilité

## ⚠️ Avant de déployer

- [ ] Ajouter toutes les images (voir `public/destinations/IMAGES-README.md`)
- [ ] Remplacer le numéro WhatsApp placeholder (`33000000000`) par le vrai numéro
- [ ] Tester tous les liens de navigation
- [ ] Vérifier le responsive sur différents appareils
- [ ] Optimiser les images (compression)
- [ ] Mettre à jour les métadonnées SEO si nécessaire
