import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import Countdown from "@/components/sections/Countdown";
import Pourquoi from "@/components/sections/Pourquoi";
import Publics from "@/components/sections/Publics";
import Programme from "@/components/sections/Programme";
import InfosPratiques from "@/components/sections/InfosPratiques";
import Faq from "@/components/sections/Faq";
import CtaBanner from "@/components/sections/CtaBanner";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import { event } from "@/content/event";

/** Données structurées Event (schema.org) — SEO événementiel. */
const eventJsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: event.name,
  description:
    "Le rendez-vous alsacien de la protection sociale et de la retraite. 1ʳᵉ édition à Strasbourg.",
  startDate: "2026-10-01T08:30:00+02:00",
  endDate: "2026-10-01T18:00:00+02:00",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  image: [`https://${event.domain}/images/banniere-rencontres.png`],
  location: {
    "@type": "Place",
    name: event.venue,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Strasbourg",
      postalCode: "67000",
      addressCountry: "FR",
    },
  },
  organizer: {
    "@type": "Organization",
    name: "Alsace Protection Sociale",
    url: `https://${event.domain}`,
  },
  offers: {
    "@type": "Offer",
    url: event.links.tickets,
    availability: "https://schema.org/InStock",
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
      />
      <Header />
      <main>
        <Hero />
        <Countdown />
        <Pourquoi />
        <Publics />
        <Programme />
        <InfosPratiques />
        <Faq />
        <CtaBanner />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
