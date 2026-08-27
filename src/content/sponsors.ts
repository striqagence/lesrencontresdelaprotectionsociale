/**
 * Sponsors de l'événement — affichés dans le footer sous « Sponsorisé par ».
 *
 * ⚠️ Payload : deviendra une collection éditable (logo + nom + lien éventuel).
 * Dimensions = ratio des logos rognés (marges retirées) pour next/image.
 */
import type { Organizer } from "@/content/organizers";

/** Même forme que les organisateurs. */
export type Sponsor = Organizer;

export const sponsors: Sponsor[] = [
  {
    name: "Groupe Sofraco",
    logo: "/brand/sponsors/sofraco.png",
    width: 158,
    height: 47,
  },
  {
    name: "Abeille Assurances",
    logo: "/brand/sponsors/abeille.png",
    width: 506,
    height: 180,
  },
  {
    name: "Swiss Life",
    logo: "/brand/sponsors/swiss-life.png",
    width: 557,
    height: 388,
  },
  {
    name: "Entoria",
    logo: "/brand/sponsors/entoria.png",
    width: 356,
    height: 95,
  },
];
