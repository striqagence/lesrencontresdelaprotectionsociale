# Les Rencontres de la Protection Sociale — Landing page

Landing page événementielle mono-page pour **le Forum de la Protection Sociale**
(nouvelle identité « Les Rencontres de la Protection Sociale »), 1ʳᵉ édition le
**jeudi 1ᵉʳ octobre 2026** à la **Villa Quai Sturm, Strasbourg**.

Objectif de conversion : réservation via la billetterie **Weezevent**.
Domaine cible : **www.rencontres-ps.fr**

## Stack

- **Next.js 16** (App Router) + **TypeScript** + **Turbopack**
- **Tailwind CSS v4** (tokens de la charte dans `src/app/globals.css`)
- **next/font** (Roboto Condensed) · **Lucide** (icônes)
- Pas de CMS pour l'instant. **Payload sera branché dans un second temps**
  (voir « Migration Payload » plus bas).

## Démarrage

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de production
npm run start    # serveur de production
```

## Architecture

```
src/
  app/
    layout.tsx              Police, metadata / SEO (OG, Twitter)
    page.tsx                Assemble les sections + JSON-LD schema.org/Event
    globals.css             Tokens de la charte (couleurs, animations, utilitaires)
    mentions-legales/       Page mentions légales (LCEN)
    api/contact/route.ts    Réception du formulaire (envoi e-mail à brancher)
  components/
    sections/               Une section par fichier (Header, Hero, Countdown…)
    ui/                     Atomes réutilisables (CtaButton, Eyebrow, Diamond…)
    Reveal.tsx              Apparition au scroll (IntersectionObserver)
  content/                  ⭐ CONTENU ÉDITABLE — futures collections Payload
    event.ts                Infos événement, liens, navigation (→ global Payload)
    program.ts              14 créneaux du programme     (→ collection)
    faq.ts                  7 questions                  (→ collection)
    sections.ts             Piliers, raisons, publics     (→ collections/global)
  lib/
    accents.ts              Couleurs d'accent + helpers rgba
    icons.ts                Registre d'icônes Lucide (référencées par clé)
```

## Migration Payload (seconde étape)

Le contenu susceptible de changer est **déjà externalisé** dans `src/content/*`
sous forme d'objets typés. Les composants ne lisent que ces objets — la bascule
vers Payload se fera **sans toucher au rendu** :

| Fichier            | Devient dans Payload        |
| ------------------ | --------------------------- |
| `content/event.ts` | Global « Événement »        |
| `content/program.ts` | Collection « Créneaux »    |
| `content/faq.ts`   | Collection « FAQ »          |
| `content/sections.ts` | Collections/global éditoriaux |

Les icônes sont référencées par **clé** (`src/lib/icons.ts`) et les couleurs par
**clé d'accent** (`src/lib/accents.ts`) — donc sérialisables et stockables tels
quels côté CMS.

## ⚠️ À compléter avant mise en ligne

Points ouverts issus du handoff de design (à trancher avec le client) :

1. **Nommage** : les visuels portent « Les Rencontres », les textes disent
   encore « Forum ». Décider si l'on bascule tous les textes.
2. **Horaires** : la bannière indique « 9h00–18h00 », le site « 8h30–18h00 » —
   à harmoniser.
3. **URLs provisoires** dans `content/event.ts` : `links.tickets` (Weezevent) et
   `links.linkedin`.
4. **Formulaire de contact** : brancher un vrai envoi dans
   `app/api/contact/route.ts` (voir `.env.example` → `RESEND_API_KEY`).
5. **Mentions légales** : compléter raison sociale, SIRET, directeur de
   publication et hébergeur dans `app/mentions-legales/page.tsx`.
6. **Domaine** : configurer `www.rencontres-ps.fr`.

## Assets

Dans `public/` : `brand/` (logos) et `images/` (bannière, photos du lieu).
Anciens logos/bannière « Forum » et charte PDF non embarqués dans le repo.

---

Conception & réalisation : [StriQ](https://www.striq.fr)
