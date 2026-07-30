/**
 * Contenus des sections « Pourquoi participer » et « À qui s'adresse ».
 *
 * ⚠️ Payload : deviendra des collections/globals éditables. Les icônes sont
 * référencées par clé (voir src/lib/icons.ts) et les couleurs par clé d'accent
 * (voir src/lib/accents.ts) pour rester sérialisables.
 */
import type { AccentKey } from "@/lib/accents";
import type { IconKey } from "@/lib/icons";

/** 3 piliers — section « Pourquoi participer ». */
export type Pillar = {
  num: string;
  title: string;
  accent: AccentKey;
  icon: IconKey;
  text: string;
};

export const pillars: Pillar[] = [
  {
    num: "01",
    title: "Échanger",
    accent: "turquoise",
    icon: "message",
    text: "Rencontrer les principaux acteurs de la protection sociale et tisser des liens avec les professionnels du territoire.",
  },
  {
    num: "02",
    title: "Comprendre",
    accent: "violet",
    icon: "lightbulb",
    text: "Partager les expertises et mieux appréhender les enjeux de la protection sociale et de la retraite.",
  },
  {
    num: "03",
    title: "Anticiper",
    accent: "magenta",
    icon: "compass",
    text: "Construire des solutions durables pour accompagner les entreprises dans la durée.",
  },
];

/** Bloc « 4 raisons d'être au rendez-vous ». */
export type Reason = {
  title: string;
  accent: AccentKey;
  icon: IconKey;
  desc: string;
};

export const reasons: Reason[] = [
  {
    title: "Un lieu de rencontres",
    accent: "turquoise",
    icon: "users",
    desc: "Conseil, institutions et professionnels de la protection sociale réunis au même endroit.",
  },
  {
    title: "Un espace d'échanges",
    accent: "violet",
    icon: "message",
    desc: "Le partage des expertises et des bonnes pratiques.",
  },
  {
    title: "Un accélérateur de connexions",
    accent: "magenta",
    icon: "zap",
    desc: "Le développement des réseaux et des opportunités.",
  },
  {
    title: "Un rendez-vous territorial",
    accent: "brand",
    icon: "pin",
    desc: "Au service des professionnels de la protection sociale de la région, chaque année.",
  },
];

/**
 * Publics cibles — 2 cartes.
 * NB : une 3ᵉ carte « Entreprises » a été retirée volontairement par le
 * client. Ne pas la réintroduire.
 */
export type Audience = {
  title: string;
  accent: Extract<AccentKey, "turquoise" | "violet">;
  icon: IconKey;
  tags: string[];
};

export const audiences: Audience[] = [
  {
    title: "Professionnels du conseil",
    accent: "turquoise",
    icon: "layers",
    tags: [
      "Experts-comptables",
      "Avocats",
      "Notaires",
      "Courtiers",
      "Conseillers en protection sociale",
    ],
  },
  {
    title: "Institutions",
    accent: "violet",
    icon: "building",
    tags: [
      "URSSAF",
      "CCI",
      "Chambre des Métiers",
      "Organisations patronales",
      "Caisses de retraite",
      "Organismes sociaux",
    ],
  },
];
