# Projet findMe — GeoLink Africa

Portail grand public de gestion des adressages urbain et périurbain.
Réponse au cahier des charges DHI Academy — **Projet 4, Développeur Full Stack** (Mai 2026).

Application **Nuxt 4 / Vue 3** : authentification, gestion d'adresses numériques
(carte interactive, photo, export PDF + QR), landing page, dashboard administrateur,
multilingue FR/EN, thème clair/sombre, le tout mobile-first, accessible (WCAG AA) et
optimisé SEO. Le backend est simulé par un **mock server Nitro** (aucune base externe requise).

## 🔑 Identifiants de test

Comptes seedés automatiquement au démarrage du serveur :

| Rôle | Email | Mot de passe |
| --- | --- | --- |
| 👤 Utilisateur | `demo@findme.africa` | `Demo1234` |
| 🛠️ Administrateur | `admin@findme.africa` | `Admin123` |

> L'utilisateur donne accès au dashboard et à la gestion d'adresses ;
> l'administrateur ajoute l'accès au back-office (`/admin`).
> Tu peux aussi créer un compte via la page d'inscription.

## Contenu du dépôt

| Dossier | Livrable | Description |
| --- | --- | --- |
| [`findme/`](./findme) | **L1 — Code source** | Application Nuxt 4 (voir son [README](./findme/README.md)) |
| [`01_Mood_Board/`](./01_Mood_Board) | L2 — UI/UX | Direction artistique |
| [`02_Brand_Board/`](./02_Brand_Board) | L2 — UI/UX | Identité de marque |
| [`03_Charte_Graphique/`](./03_Charte_Graphique) | L2 — UI/UX | Design system (tokens, composants, accessibilité) |
| `PROJET_4_*.pdf` | — | Cahier des charges |

## Démarrage rapide

```bash
cd findme
npm install
npm run dev   # http://localhost:3000
```

## Avancement — ✅ application complète et fonctionnelle

- ✅ **Semaine 1 — Architecture & UI Foundation**
- ✅ **Semaine 2 — Authentification & Landing**
- ✅ **Semaine 3 — Core Features** (CRUD, carte Leaflet, upload + compression, PDF + QR)
- ✅ **Semaine 4 — Admin, Qualité & Optimisation** (dashboard, filtres, SEO)

Comptes de démo : `demo@findme.africa / Demo1234` · `admin@findme.africa / Admin123`.

Détails techniques, fonctionnalités et API dans [`findme/README.md`](./findme/README.md)
et [`findme/docs/API.md`](./findme/docs/API.md).
