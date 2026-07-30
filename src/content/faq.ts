/**
 * FAQ — 7 questions.
 *
 * ⚠️ Payload : deviendra une collection « FAQ » (ordonnée).
 * Contenu susceptible d'évoluer — le garder éditable.
 */
export type FaqItem = { q: string; a: string };

export const faq: FaqItem[] = [
  {
    q: "À qui s'adresse le Forum ?",
    a: "Aux professionnels du conseil (experts-comptables, avocats, notaires, courtiers, conseillers en protection sociale), aux institutions (URSSAF, CCI, Chambre des Métiers, caisses de retraite, organismes sociaux, organisations patronales).",
  },
  {
    q: "Comment s'inscrire ?",
    a: "L'inscription se fait en ligne via notre billetterie sécurisée Weezevent, en cliquant sur le bouton « Réserver ma place ». Vous recevrez votre confirmation par e-mail.",
  },
  {
    q: "Où se déroule l'événement ?",
    a: "À la Villa Quai Sturm, 67000 Strasbourg. Des possibilités de stationnement sont disponibles à proximité du lieu.",
  },
  {
    q: "Où puis-je me garer ?",
    a: "Nous vous recommandons le parking Broglie, à proximité de la Villa Quai Sturm. Attention : ce parking est à réserver à l'avance sur le site de Parcus (www.parcus.com/parkings/opera-broglie). Pensez à anticiper votre réservation pour garantir votre place le jour du Forum.",
  },
  {
    q: "Quels sont les horaires ?",
    a: "Le Forum se tient le jeudi 1ᵉʳ octobre 2026, de 8h30 à 18h00. L'accueil des participants débute dès 8h00.",
  },
  {
    q: "Le déjeuner est-il prévu ?",
    a: "Oui. Un temps de déjeuner et de networking est intégré au programme pour favoriser les échanges entre participants.",
  },
  {
    q: "Le Forum sera-t-il reconduit ?",
    a: "Oui, le Forum sera reconduit. Cette première édition constitue le point de départ d'un rendez-vous appelé à devenir annuel, ancré dans le territoire alsacien.",
  },
];
