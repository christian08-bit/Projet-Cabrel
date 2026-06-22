# Rapport de Performance & SEO (L5)

## Optimisations mises en œuvre

### Chargement & rendu
- **SSR (Nuxt/Nitro)** : HTML rendu côté serveur → First Contentful Paint rapide et contenu indexable.
- **Code splitting automatique** par route (Nuxt) + **lazy loading** des dépendances lourdes :
  `jspdf`, `qrcode` et la carte **Leaflet** sont importés dynamiquement, donc absents du bundle initial.
- **Composant carte en `.client.vue`** : exclu du rendu serveur (Leaflet a besoin du DOM).
- **Polices auto-hébergées** via `@nuxt/fonts` (pas de requête vers Google Fonts au runtime).
- **Icônes locales** via `@nuxt/icon` + `@iconify-json/lucide` (pas d'appel réseau Iconify).
- **Images** servies via `@nuxt/image` (lazy loading natif, `loading="lazy"` sur les cartes).
- **Compression d'image côté client** (canvas, ~72 % qualité, max 1000 px) avant envoi.

### Données
- Faible consommation : appels API mis en cache dans les stores Pinia (`loaded` flag),
  pagination admin (10 lignes/page), filtres debouncés (300 ms).

### SEO
- Balises meta par page (`useSeoMeta`), titre templaté.
- **hreflang** `x-default / fr / en` + `canonical` générés par `@nuxtjs/i18n` (`baseUrl`).
- **Données structurées JSON-LD** (Organization) sur la landing.
- **Sitemap** dynamique (`/sitemap.xml`) + `robots.txt` (admin/app exclus de l'indexation).
- HTML sémantique (`header/main/nav/section/article/footer`), hiérarchie de titres H1→H3.

### Accessibilité (a11y)
- Navigation clavier complète, **lien d'évitement**, `:focus-visible` cohérent.
- Attributs ARIA (`aria-label`, `aria-invalid`, `aria-describedby`, `role`, `aria-pressed`).
- Contrastes **WCAG AA** vérifiés (cf. charte graphique).
- `prefers-reduced-motion` respecté.

## Générer l'audit Lighthouse

```bash
npm run build
npm run preview            # ou PORT=3100 node .output/server/index.mjs
npx lighthouse http://localhost:3100 \
  --preset=desktop --output=html --output-path=./docs/lighthouse-desktop.html
npx lighthouse http://localhost:3100 \
  --form-factor=mobile --output=html --output-path=./docs/lighthouse-mobile.html
```

> Cibles visées : Performance ≥ 90, Accessibilité ≥ 95, Bonnes pratiques ≥ 95, SEO 100
> (mobile prioritaire). Les rapports HTML sont à joindre dans ce dossier.
