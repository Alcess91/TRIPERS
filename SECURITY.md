# Sécurité TRIPERS

Ce document décrit les mesures de sécurité implémentées dans l'application TRIPERS.

## 🔒 Mesures de sécurité implémentées

### 1. Variables d'environnement

Les données sensibles sont stockées dans des variables d'environnement :

- `NEXT_PUBLIC_WHATSAPP_NUMBER` : Numéro WhatsApp de contact
- `NEXT_PUBLIC_SITE_URL` : URL du site en production
- `NEXT_PUBLIC_SITE_NAME` : Nom du site

**Fichiers :**
- `.env.local` : Variables locales (ignoré par Git)
- `.env.example` : Template des variables (versionné)

### 2. Headers de sécurité HTTP

Configurés dans `next.config.js` :

#### X-Frame-Options: SAMEORIGIN
Protège contre les attaques de clickjacking en empêchant l'intégration du site dans des iframes externes.

#### X-Content-Type-Options: nosniff
Empêche le navigateur de "deviner" le type MIME des fichiers, protégeant contre les attaques XSS basées sur le MIME sniffing.

#### X-XSS-Protection: 1; mode=block
Active la protection XSS intégrée des navigateurs legacy.

#### Referrer-Policy: strict-origin-when-cross-origin
Contrôle les informations envoyées via l'en-tête Referer :
- Même origine : URL complète
- Cross-origin HTTPS→HTTPS : origine seulement
- HTTPS→HTTP : aucune information

#### Permissions-Policy
Désactive les APIs sensibles non utilisées :
- `camera=()` : Pas d'accès caméra
- `microphone=()` : Pas d'accès micro
- `geolocation=()` : Pas de géolocalisation
- `interest-cohort=()` : Désactive FLoC de Google

#### Content-Security-Policy (CSP)
Définit les sources autorisées pour chaque type de contenu :
- **default-src**: 'self' uniquement
- **script-src**: 'self' + unsafe-eval/inline (requis par Next.js)
- **style-src**: 'self' + unsafe-inline (requis par Tailwind)
- **img-src**: 'self' + data/blob + HTTPS
- **connect-src**: 'self' + WhatsApp (wa.me)
- **media-src**: 'self' + blob (vidéos)

#### Strict-Transport-Security (HSTS)
À activer en production :
```javascript
{
  key: 'Strict-Transport-Security',
  value: 'max-age=63072000; includeSubDomains; preload',
}
```
Force HTTPS pendant 2 ans après la première visite.

### 3. Next.js Image Optimization

- Formats modernes : AVIF, WebP
- Lazy loading par défaut
- Optimisation automatique des tailles
- Validation des sources d'images

### 4. Liens externes sécurisés

Tous les liens vers WhatsApp incluent :
```tsx
rel="noopener noreferrer"
```
- `noopener` : Empêche `window.opener` malveillant
- `noreferrer` : Ne transmet pas l'URL source

### 5. Accessibilité et sécurité

- `aria-label` sur tous les liens interactifs
- Navigation au clavier fonctionnelle
- Pas de contenu injecté dynamiquement dangereux
- Pas d'usage de `dangerouslySetInnerHTML`

## 🚨 Ce qui N'est PAS implémenté

### Rate Limiting
Pas de protection contre les bots ou les requêtes excessives. À implémenter si nécessaire :
- Middleware Next.js avec rate limiting
- Cloudflare Rate Limiting (si hébergé sur Vercel/Cloudflare)

### Protection CSRF
Non nécessaire pour un site statique sans formulaires sensibles. À ajouter si vous ajoutez :
- Authentification utilisateur
- Paiements en ligne
- Soumission de données sensibles

### Monitoring de sécurité
Pas de monitoring actif. Considérer :
- Sentry pour les erreurs
- Vercel Analytics pour les performances
- Uptime monitoring

### Validation côté serveur
Pour le moment, toutes les données sont statiques. Si vous ajoutez des API routes :
- Valider toutes les entrées utilisateur
- Utiliser Zod ou Yup pour la validation
- Sanitiser les données avant stockage

## 📋 Checklist de déploiement sécurisé

Avant le déploiement en production :

- [ ] Vérifier que `.env.local` n'est PAS committé
- [ ] Configurer les variables d'environnement sur Vercel/plateforme d'hébergement
- [ ] Activer HSTS (Strict-Transport-Security) en production
- [ ] Configurer un domaine avec HTTPS (Let's Encrypt)
- [ ] Tester les headers de sécurité avec [securityheaders.com](https://securityheaders.com)
- [ ] Vérifier la CSP avec les outils de dev Chrome/Firefox
- [ ] Scanner les dépendances npm avec `npm audit`
- [ ] Mettre à jour Next.js et les dépendances régulièrement

## 🔍 Outils de test

### Tester les headers de sécurité
```bash
curl -I https://votre-domaine.com
```

### Scanner les vulnérabilités npm
```bash
npm audit
npm audit fix
```

### Tester la CSP
Ouvrez la console du navigateur et vérifiez les erreurs CSP.

### Outils en ligne
- [securityheaders.com](https://securityheaders.com) : Analyse des headers
- [observatory.mozilla.org](https://observatory.mozilla.org) : Audit complet
- [ssllabs.com](https://www.ssllabs.com/ssltest/) : Test SSL/TLS

## 📚 Ressources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security](https://nextjs.org/docs/app/building-your-application/configuring/security-headers)
- [Content Security Policy](https://content-security-policy.com/)
- [MDN Web Security](https://developer.mozilla.org/en-US/docs/Web/Security)

## 🐛 Signaler une vulnérabilité

Si vous découvrez une vulnérabilité de sécurité, contactez-nous directement via WhatsApp plutôt que de créer une issue publique.

---

**Dernière mise à jour** : 19 novembre 2025
