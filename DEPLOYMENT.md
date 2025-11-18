# 🚀 Guide de déploiement TRIPERS

## Options de déploiement

### 1. Vercel (Recommandé)

Vercel est créé par l'équipe Next.js et offre le meilleur support.

#### Étapes :

1. Créez un compte sur [vercel.com](https://vercel.com)
2. Connectez votre repository GitHub/GitLab/Bitbucket
3. Importez le projet TRIPERS
4. Vercel détectera automatiquement Next.js
5. Cliquez sur "Deploy"

**Configuration automatique** : Aucune configuration nécessaire !

#### Variables d'environnement (optionnelles)

Si vous avez des clés API :

```
NEXT_PUBLIC_API_KEY=votre_clé
```

### 2. Netlify

1. Créez un compte sur [netlify.com](https://netlify.com)
2. Connectez votre repository
3. Configuration build :
   - **Build command** : `npm run build`
   - **Publish directory** : `.next`
4. Cliquez sur "Deploy"

### 3. Serveur VPS (DigitalOcean, OVH, etc.)

#### Prérequis

- Node.js 18+
- Nginx (pour le reverse proxy)
- PM2 (pour gérer le processus)

#### Installation

```bash
# Sur le serveur
git clone [votre-repo]
cd TRIPER

# Installation
npm install
npm run build

# Installation de PM2
npm install -g pm2

# Démarrage avec PM2
pm2 start npm --name "tripers" -- start
pm2 save
pm2 startup
```

#### Configuration Nginx

```nginx
server {
    listen 80;
    server_name tripers.com www.tripers.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 4. Docker

#### Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

#### docker-compose.yml

```yaml
version: '3.8'
services:
  tripers:
    build: .
    ports:
      - "3000:3000"
    restart: unless-stopped
```

#### Déploiement

```bash
docker-compose up -d
```

## ✅ Checklist avant déploiement

### Contenu

- [ ] Toutes les images sont ajoutées dans `public/destinations/`
- [ ] Images optimisées (compression)
- [ ] Numéro WhatsApp mis à jour (remplacer `33000000000`)
- [ ] Tous les textes relus et validés
- [ ] Liens testés (navigation interne et externe)

### Technique

- [ ] `npm run build` fonctionne sans erreur
- [ ] Tests sur différents navigateurs (Chrome, Firefox, Safari)
- [ ] Tests responsive (mobile, tablette, desktop)
- [ ] Temps de chargement acceptables
- [ ] Pas d'erreurs console

### SEO

- [ ] Métadonnées configurées (`app/layout.tsx`)
- [ ] Images ont des attributs `alt` descriptifs
- [ ] URLs propres et lisibles
- [ ] Sitemap généré (optionnel)

### Sécurité

- [ ] Variables sensibles dans `.env.local` (pas commitées)
- [ ] HTTPS configuré (via Vercel/Netlify ou Let's Encrypt)
- [ ] Headers de sécurité configurés

## 🌐 Configuration du domaine

### Avec Vercel/Netlify

1. Allez dans les paramètres du projet
2. Section "Domains"
3. Ajoutez votre domaine
4. Suivez les instructions pour configurer les DNS

### Configuration DNS

#### Chez votre registrar (OVH, Gandi, etc.)

Pour Vercel :
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

```
Type: A
Name: @
Value: 76.76.21.21
```

Pour Netlify :
```
Type: CNAME
Name: www
Value: [votre-site].netlify.app
```

## 📊 Monitoring

### Google Analytics (optionnel)

1. Créez une propriété GA4
2. Obtenez votre ID de mesure (G-XXXXXXXXXX)
3. Ajoutez dans `app/layout.tsx` :

```tsx
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  `}
</Script>
```

## 🔄 Mises à jour

### Déploiement continu

Avec Vercel/Netlify :
- Chaque push sur `main` déclenche un déploiement automatique
- Preview deployments pour les branches de développement

### Mise à jour manuelle (VPS)

```bash
cd /path/to/TRIPER
git pull
npm install
npm run build
pm2 restart tripers
```

## 🆘 Dépannage

### Erreur de build

```bash
# Nettoyer et rebuilder
rm -rf .next node_modules
npm install
npm run build
```

### Images ne s'affichent pas

- Vérifiez les chemins : `/destinations/image.jpg`
- Vérifiez que les fichiers sont bien dans `public/destinations/`

### Erreur 404 sur les routes

- Vérifiez la configuration du serveur (fallback vers index.html)
- Pour Nginx, ajoutez `try_files $uri $uri/ /index.html;`

## 📞 Support

Pour tout problème technique, consultez :
- [Documentation Next.js](https://nextjs.org/docs)
- [Forum Vercel](https://github.com/vercel/next.js/discussions)

---

**Dernière mise à jour** : 18 novembre 2025
