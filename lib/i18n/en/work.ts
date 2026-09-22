import type { WorkDict } from "../nl/work";

/** Werk-teksten per slug (Engels). Het NL-type `WorkDict` bewaakt de sleutels; lib/i18n/nl/work.ts is de bron. */
export const work: WorkDict = {
  items: {
    "volmer-techniek": { meta: "Metalworking · Puttershoek", alt: "The Volmer Techniek website on mobile" },
    "mourits-schilderwerken": { meta: "Painting company · Klaaswaal", alt: "The Mourits Schilderwerken website on mobile" },
    "monster-zorg": { meta: "Freelance care professional · Gouda", alt: "The Monster Zorg website on mobile" },
    "youniek-art": { meta: "Photography portfolio", alt: "The Youniek Art website on mobile" },
    lesbosreizen: { meta: "Travel guide to Lesbos", alt: "The LesbosReizen website on mobile" },
    "cafe-centrum": { meta: "Local café · Hoeksche Waard", alt: "Demo website for Café 't Centrum on mobile" },
    opgietingen: { meta: "Calendar of sauna aufguss (steam-infusion) events", alt: "Opgietingen.nl on mobile" },
    festivaldiscounter: { meta: "Comparing festival tickets", alt: "Festivaldiscounter on mobile" },
  },
  cases: {
    "volmer-techniek": {
      branche: "Metalworking company",
      intro: "A bilingual website for a machining company that works on-site and in its own workshop, with a quote form, project gallery and service area.",
      situatie:
        "Volmer Techniek B.V. from Puttershoek carries out machining and repairs and builds machinery, on-site at the customer's premises and in its own workshop. The old website was a standard WordPress site with an off-the-shelf theme. For a company that also works outside the Netherlands, the site had to work in two languages and present the six disciplines clearly side by side.",
      aanpak: [
        "Six services, each with its own block: on-site machining, workshop machining, industrial repairs, machine building and custom work, retrofit, preventive maintenance.",
        "Dutch and English with a language switch, so international customers get the same site.",
        "A five-step process and a quote form with request type, next to a button to call directly.",
        "Project gallery with real photos of the work and a map of the service area.",
        "Certifications (VCA, Koninklijke Metaalunie) and 24/7 availability clearly in view.",
      ],
      resultaat: [
        "One site for Dutch and international customers, on its own domain volmertechniek.com.",
        "Every enquiry arrives with the type of work and contact details, via the form or by phone.",
        "A dark, industrial look that fits the work, with photos of their own shop floor.",
      ],
      voorNaAlt: undefined,
      quote: undefined,
    },
    "mourits-schilderwerken": {
      branche: "Painting company",
      intro: "A new site for a painting company from Klaaswaal that has worked across the Hoeksche Waard since 2015: five services, a project gallery and one-tap calling from your phone.",
      situatie:
        "Mourits Schilderwerken B.V. has worked from Klaaswaal across the whole Hoeksche Waard since 2015: interior and exterior painting, wall finishing, glazing, restoration and spray work. The old website dated from the company's early days, with a photo slider and a table of contact details at the top, and was awkward to use on a phone.",
      aanpak: [
        "Five service categories with their own pages, from glass-fibre wallcovering and lime paint to HR++ glazing and wood-rot repair.",
        "A call bar at the top and a button to request no-obligation advice, both directly reachable on mobile.",
        "Project gallery with their own work, a service area listing every village in the Hoeksche Waard, and the guarantee on the work spelled out.",
        "Calm, light design with large photos of façades and window frames, so the craftsmanship tells the story itself.",
      ],
      resultaat: [
        "Site on its own domain mouritsschilderwerken.nl, with contact form, landline and mobile number in one place.",
        "On mobile you call with one tap; on desktop the advice request is always in view.",
        "Easy to find by service and by place: every service has its own page, and the service area is written out.",
      ],
      voorNaAlt: { voor: "The old website of Mourits Schilderwerken on mobile", na: "The new website of Mourits Schilderwerken on mobile" },
      quote: undefined,
    },
    "monster-zorg": {
      branche: "Freelance care professional",
      intro: "A personal site from scratch for an applied psychologist and care professional who works freelance: who he is, what he does, and how to reach him.",
      situatie:
        "Jarno Monster works as an applied psychologist and care professional with over eight years of experience in supported living, and takes on freelance assignments with care organisations. There was no website yet. Clients needed to see quickly what he does, what his background is and how to reach him.",
      aanpak: [
        "One page with a clear running order: who is Jarno, what he offers, what experience he has, why Monster Zorg, and contact.",
        "A timeline from 2016 to now that shows his career at a glance.",
        "Calling and LinkedIn directly from the navigation; no detours.",
        "Warm, light design with a real portrait instead of stock imagery.",
      ],
      resultaat: [
        "A site that explains in one scroll what a client wants to know, on its own domain monsterzorg.nl.",
        "Contact in two taps: phone or LinkedIn, also on mobile.",
        "Ready to expand with service area and rates once those are set.",
      ],
      voorNaAlt: undefined,
      quote: undefined,
    },
  },
};
