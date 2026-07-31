/**
 * Partenaires — affichés dans le footer (rubrique « Partenaires »).
 *
 * ⚠️ Payload : deviendra une collection éditable (logo + nom + lien éventuel).
 * Dimensions renseignées pour next/image (ratio d'origine des fichiers).
 */
export type Partner = {
  /** Nom complet — sert de texte alternatif. */
  name: string;
  /** Chemin du logo dans public/. */
  logo: string;
  width: number;
  height: number;
};

export const partners: Partner[] = [
  {
    name: "CAAPS — Conseil Audit et Assurances en Protection Sociale",
    logo: "/brand/partners/caaps.png",
    width: 1076,
    height: 266,
  },
  {
    name: "Courtage Roy — Expert en protection sociale",
    logo: "/brand/partners/courtage-roy.png",
    width: 185,
    height: 121,
  },
  {
    name: "Roy Conseil Expertise",
    logo: "/brand/partners/roy-conseil.png",
    width: 640,
    height: 171,
  },
];
