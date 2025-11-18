# Guide de placement des images TRIPERS

## Instructions
Sauvegardez les images que vous avez fournies dans les emplacements suivants :

### 1. LOGO (✓ Déjà fait)
- **Fichier** : Logo TRIPERS coloré
- **Emplacement** : `/public/logo-tripers.svg`
- **Status** : ✓ Créé automatiquement

---

### 2. MAROC 🇲🇦

#### Image d'accueil (Page principale)
- **Fichier à sauvegarder** : Photo du jardin Menara avec montagnes Atlas enneigées en arrière-plan
- **Emplacement** : `/public/destinations/maroc-home.jpg`
- **Description** : Bassin d'eau avec pavillon traditionnel, palmiers, montagnes

#### Image Hero (Page destination Maroc)
- **Fichier à sauvegarder** : Photo de la Place Jemaa el-Fna la nuit (marché illuminé)
- **Emplacement** : `/public/destinations/maroc-hero.jpg`
- **Description** : Vue panoramique de la place animée le soir avec la Koutoubia

#### Ville : Marrakech
- **Fichier à sauvegarder** : Photo de la Place Jemaa el-Fna au coucher du soleil
- **Emplacement** : `/public/destinations/maroc-marrakech.jpg`
- **Description** : Marché, foule, Koutoubia en arrière-plan

#### Ville : Cascades d'Ouzoud
- **Fichier à sauvegarder** : Photo du jardin avec piscine et arc architectural (hôtel/riad)
- **Emplacement** : `/public/destinations/maroc-ouzoud.jpg`
- **Description** : Architecture marocaine luxueuse avec reflets dans l'eau

#### Ville : Zagora
- **Fichier à sauvegarder** : Photo de la Koutoubia avec montagnes Atlas
- **Emplacement** : `/public/destinations/maroc-zagora.jpg`
- **Description** : Minaret avec chaîne de montagnes enneigées

---

### 3. CAP-VERT 🇨🇻

#### Image d'accueil (Page principale)
- **Fichier à sauvegarder** : Photo des falaises et sentier côtier de Santo Antão
- **Emplacement** : `/public/destinations/cap-vert-home.jpg`
- **Description** : Montagnes escarpées, sentier en pierre, océan turquoise

#### Image Hero (Page destination Cap-Vert)
- **Fichier à sauvegarder** : Même photo des falaises de Santo Antão (paysage dramatique)
- **Emplacement** : `/public/destinations/cap-vert-hero.jpg`
- **Description** : Vue spectaculaire des montagnes volcaniques

#### Ville : Sal
- **Fichier à sauvegarder** : Photo de plage (peut être la même que Caraïbes si pas de photo spécifique)
- **Emplacement** : `/public/destinations/cap-vert-sal.jpg`
- **Description** : Plage de sable, mer turquoise

#### Ville : Santo Antão
- **Fichier à sauvegarder** : Photo des falaises et sentier côtier
- **Emplacement** : `/public/destinations/cap-vert-santo-antao.jpg`
- **Description** : Même que home/hero

---

### 4. CARAÏBES 🏝️

#### Image d'accueil (Page principale)
- **Fichier à sauvegarder** : Photo de la plage avec palmiers et poteaux en bois
- **Emplacement** : `/public/destinations/caraibes-home.jpg`
- **Description** : Promenade côtière, cordage blanc sur poteaux, palmiers

#### Image Hero (Page destination Caraïbes)
- **Fichier à sauvegarder** : Photo de la côte de San Juan (vue aérienne avec turquoise)
- **Emplacement** : `/public/destinations/caraibes-hero.jpg`
- **Description** : Vue aérienne de la ville côtière

#### Ville : Fort-de-France
- **Fichier à sauvegarder** : Photo de la plage avec palmiers et cordage
- **Emplacement** : `/public/destinations/caraibes-fort-de-france.jpg`
- **Description** : Même que home si pas d'autre photo

#### Ville : Autres îles
- **Fichier à sauvegarder** : Photo de San Juan vue aérienne
- **Emplacement** : `/public/destinations/caraibes-autres-iles.jpg`
- **Description** : Architecture coloniale, plage, végétation

---

### 5. COLOMBIE 🇨🇴

#### Image d'accueil (Page principale)
- **Fichier à sauvegarder** : Photo des rues colorées de Carthagène (balcons verts/jaunes)
- **Emplacement** : `/public/destinations/colombie-home.jpg`
- **Description** : Façades coloniales multicolores, balcons en bois

#### Image Hero (Page destination Colombie)
- **Fichier à sauvegarder** : Photo de rue de Carthagène avec tour jaune/orange au fond
- **Emplacement** : `/public/destinations/colombie-hero.jpg`
- **Description** : Perspective de rue, architecture coloniale colorée

#### Ville : Cartagena
- **Fichier à sauvegarder** : Photo des façades colorées (turquoise, jaune, orange)
- **Emplacement** : `/public/destinations/colombie-cartagena.jpg`
- **Description** : Balcons colorés, architecture coloniale

#### Ville : Medellín
- **Fichier à sauvegarder** : Photo de rue avec tour jaune/orange
- **Emplacement** : `/public/destinations/colombie-medellin.jpg`
- **Description** : Architecture coloniale avec clocher

---

## Étapes pour remplacer les images :

1. **Sauvegarder chaque image** depuis vos fichiers locaux
2. **Renommer l'image** exactement comme indiqué ci-dessus
3. **La placer** dans `/Users/ali/TRIPER/TRIPER/public/destinations/`
4. **Format recommandé** : JPG ou PNG (JPG préférable pour le poids)
5. **Taille recommandée** : 1200-1920px de largeur pour une bonne qualité

## Note importante :
Les fichiers actuellement présents sont des SVG placeholders. Une fois que vous aurez remplacé tous les fichiers par vos vraies photos, l'optimisation d'images Next.js sera réactivée automatiquement.

## Vérification :
Après avoir placé toutes les images, lancez la commande :
```bash
ls -lh /Users/ali/TRIPER/TRIPER/public/destinations/*.jpg
```

Vous devriez voir toutes les images avec leur taille en Ko/Mo (pas en octets comme actuellement).
