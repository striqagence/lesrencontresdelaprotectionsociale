/**
 * Programme prévisionnel de la journée — 14 créneaux.
 *
 * ⚠️ Payload : deviendra une collection « Créneaux » (ordonnée).
 * Le handoff insiste : ce contenu a déjà changé plusieurs fois et évoluera
 * encore d'ici octobre 2026 — le garder éditable.
 *
 * Champs optionnels (`range`, `speaker`, `detail`) : affichés seulement si
 * renseignés (rendu conditionnel côté composant).
 */
export type ProgramSlot = {
  /** Heure de début, ex. « 8h30 ». */
  start: string;
  /** Plage horaire complète, ex. « 9h00 – 9h45 ». */
  range?: string;
  /** Intervenant / organisme. */
  speaker?: string;
  /** Sujet du créneau. */
  title: string;
  /** Précisions éventuelles. */
  detail?: string;
};

export const program: ProgramSlot[] = [
  { start: "8h30", title: "Accueil des participants" },
  { start: "8h50", title: "Discours de démarrage", speaker: "Sébastien Vonesch" },
  {
    start: "9h00",
    range: "9h00 – 9h45",
    title: "L'histoire de la protection sociale",
    speaker: "Thomas Schaetzel",
  },
  {
    start: "9h50",
    range: "9h50 – 10h35",
    title: "Actualité de la protection sociale et de la retraite",
    speaker: "Factorielles",
  },
  { start: "10h35", title: "Pause" },
  {
    start: "10h55",
    range: "10h55 – 11h40",
    title: "Actualité de la protection sociale et de la retraite",
  },
  {
    start: "11h45",
    range: "11h45 – 12h20",
    title: "Présentation des services URSSAF – TNS",
    speaker: "URSSAF",
  },
  {
    start: "12h20",
    range: "12h20 – 13h30",
    title: "Pause déjeuner",
    detail: "Cocktail déjeunatoire — échanges",
  },
  {
    start: "13h30",
    range: "13h30 – 14h15",
    title: "Statut du dirigeant",
    speaker: "Laurent Roy / Nicolas Roy",
  },
  {
    start: "14h20",
    range: "14h20 – 15h20",
    title: "Présentation des services CARSAT",
    speaker: "CARSAT",
    detail: "Branche ATMP (30 min) · Branche retraite (30 min)",
  },
  { start: "15h20", title: "Pause" },
  { start: "15h40", range: "15h40 – 16h15", title: "CPAM", speaker: "CPAM" },
  {
    start: "16h20",
    range: "16h20 – 17h50",
    title: "Actualité sociale, santé et AT",
    speaker: "Abeille",
  },
  { start: "17h50", title: "Discours de clôture", speaker: "Sébastien Vonesch" },
];
