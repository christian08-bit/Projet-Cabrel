<div align="center">

# 📍 findMe

**Portail grand public d'adressage numérique — GeoLink Africa**

Créez une adresse numérique normalisée en moins de 2 minutes :
géolocalisation assistée, document officiel PDF et QR code.

[![Nuxt](https://img.shields.io/badge/Nuxt-4-00DC82?logo=nuxt.js&logoColor=white)](https://nuxt.com)
[![Vue](https://img.shields.io/badge/Vue-3-4FC08D?logo=vue.js&logoColor=white)](https://vuejs.org)
[![Tailwind](https://img.shields.io/badge/Tailwind-4-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)

</div>

---

## 🎯 Contexte

`findMe` est le frontend d'un service **Address-as-a-Service (AaaS)** : chaque adresse
créée devient une unité exploitable par les plateformes de livraison, les services
d'urgence et les institutions financières. Le projet répond au cahier des charges
DHI Academy — *Projet 4, Développeur Full Stack* (Mai 2026).

**Objectifs produit :** mobile-first, rapide, accessible (WCAG AA), optimisé SEO,
orienté conversion, et prêt pour une démonstration investisseur.

## 🧱 Stack technique & choix

| Domaine | Choix | Pourquoi |
| --- | --- | --- |
| Framework | **Nuxt 4 / Vue 3** | SSR natif (SEO), file-based routing, DX, code-splitting automatique |
| Styling | **Tailwind CSS v4** (config CSS-first) | Les tokens de la charte sont déclarés en `@theme` → utilitaires cohérents, zéro valeur magique |
| État | **Pinia** | Store modulaire, SSR-safe, typé |
| i18n | **@nuxtjs/i18n** | FR/EN, changement instantané, persistance cookie, hreflang SEO |
| Thème | **@nuxtjs/color-mode** | Clair / sombre via classe `.dark`, persisté, sans flash |
| Icônes | **@nuxt/icon** + Lucide (local) | Rendu SSR sans appel réseau |
| Images | **@nuxt/image** | Optimisation, lazy loading, formats modernes |
| Fonts | **@nuxt/fonts** | Auto-hébergement (Plus Jakarta Sans, Inter, JetBrains Mono) → perf |
| Utilitaires | **@vueuse/nuxt** | Géolocalisation, storage, composables réactifs |

## 📂 Structure du projet

```
findme/
├── app/
│   ├── assets/css/main.css      # Design system (tokens @theme + dark mode)
│   ├── components/
│   │   ├── ui/                   # Composants atomiques (Button, Input, Card, …)
│   │   └── layout/               # Header, Footer, ThemeToggle, LangSwitcher
│   ├── composables/             # Logique réutilisable (à venir : géoloc, validation)
│   ├── layouts/                 # default (public) · auth · admin
│   ├── middleware/              # Protection des routes (S2)
│   ├── pages/                   # Routing fichier → URL
│   ├── stores/                  # Pinia (auth, addresses…)
│   └── types/                   # Modèle de domaine TypeScript
├── i18n/locales/                # fr.json · en.json
├── public/                      # Assets statiques
└── nuxt.config.ts               # Modules, SEO, i18n, dark mode
```

## 🚀 Démarrage

Prérequis : **Node ≥ 20**, npm.

```bash
npm install      # installe les dépendances
npm run dev      # serveur de dev → http://localhost:3000
npm run build    # build de production (SSR)
npm run preview  # prévisualise le build
```

## 🎨 Design system

Le design system est porté 1:1 depuis la charte graphique
(`../03_Charte_Graphique`). Tous les tokens (couleurs WCAG, typographie, espacement,
rayons, ombres) vivent dans `app/assets/css/main.css` sous `@theme` et deviennent
des utilitaires Tailwind :

```html
<button class="bg-brand-500 text-white rounded-lg shadow-brand">…</button>
<p class="text-text-muted">…</p>      <!-- s'adapte au dark mode -->
```

## 🗺️ Roadmap (4 semaines)

- [x] **S1 — Architecture & UI Foundation** : setup Nuxt 4, design system, layouts, routing, composants de base
- [ ] **S2 — Authentification & Landing** : signup/signin/reset, validation temps réel, gestion d'état, landing conversion
- [ ] **S3 — Core Features** : CRUD adresses, carte interactive, upload image, export PDF + QR
- [ ] **S4 — Admin, Qualité & Optimisation** : dashboard admin, filtres, SEO, audit Lighthouse

## ♿ Accessibilité & performance

- Navigation clavier complète, lien d'évitement, focus visible, attributs ARIA
- Contrastes WCAG AA vérifiés (cf. charte)
- `prefers-reduced-motion` respecté
- SSR + lazy loading + code splitting + fonts auto-hébergées

---

<div align="center">
<sub>GeoLink Africa · Douala, Cameroun</sub>
</div>
