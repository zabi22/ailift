type L = { sv: string; en: string };
export type Entry = { keys: string[]; a: L; source: L };

/** Small fixed knowledge base for the sandbox assistant. Facts only from the site itself. */
export const KNOWLEDGE: Entry[] = [
  { keys: ["pris", "kostar", "kostnad", "price", "cost", "offert", "quote", "budget"], a: { sv: "AiLift har inga fasta paket. Du beskriver behovet och får ett förslag med omfattning och pris innan du bestämmer dig.", en: "AiLift has no fixed packages. You describe the need and get a proposal with scope and price before you decide." }, source: { sv: "Tjänstesidorna", en: "Service pages" } },
  { keys: ["spara", "sparar", "lagra", "data", "uppgifter", "store", "privacy", "integritet", "gdpr"], a: { sv: "Webbplatsen sparar inga formulärsvar. Förfrågningar skickas som e-post direkt till AiLift och lagras inte på webbplatsen.", en: "The website stores no form answers. Requests are sent as email straight to AiLift and are not stored on the website." }, source: { sv: "Integritetssidan", en: "Privacy page" } },
  { keys: ["svar", "svarar", "snabbt", "reply", "fast", "answer", "24"], a: { sv: "AiLift svarar inom 24 timmar. En bokning är bekräftad först när AiLift har svarat.", en: "AiLift replies within 24 hours. A booking is only confirmed once AiLift has replied." }, source: { sv: "Bokningssidan", en: "Booking page" } },
  { keys: ["workshop", "föreläsning", "talk", "utbildning", "training", "boka", "book"], a: { sv: "Workshops, föreläsningar och rådgivning bokas via bokningsformuläret i tre steg.", en: "Workshops, talks and consultations are booked through the three-step booking form." }, source: { sv: "Boka", en: "Book" } },
  { keys: ["språk", "engelska", "svenska", "language", "english", "swedish"], a: { sv: "AiLift arbetar på svenska och engelska.", en: "AiLift works in Swedish and English." }, source: { sv: "Om AiLift", en: "About" } },
  { keys: ["test", "testning", "tillgänglighet", "testing", "accessibility", "seo", "hastighet", "speed"], a: { sv: "Tjänsten Webbtestning & optimering går igenom länkar, formulär, mobil, tillgänglighet, hastighet och SEO.", en: "The Website Testing & Optimization service covers links, forms, mobile, accessibility, speed and SEO." }, source: { sv: "Tjänster", en: "Services" } },
];

export function searchKnowledge(q: string, _lang: "sv" | "en"): Entry[] {
  const words = q.toLowerCase().split(/[^\p{L}\d]+/u).filter((w) => w.length > 1);
  return KNOWLEDGE.map((e) => ({ e, score: words.filter((w) => e.keys.some((k) => w.startsWith(k) || k.startsWith(w) && w.length > 3)).length }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.e);
}

const M: [string, string][] = [["jan", "Jan"], ["feb", "Feb"], ["mar", "Mar"], ["apr", "Apr"], ["maj", "May"], ["jun", "Jun"], ["jul", "Jul"], ["aug", "Aug"], ["sep", "Sep"], ["okt", "Oct"], ["nov", "Nov"], ["dec", "Dec"]];
const E = [18, 22, 19, 27, 31, 24, 15, 20, 33, 36, 30, 38];
const H = [15, 19, 17, 24, 29, 22, 13, 19, 31, 34, 29, 37];
/** Fictional sample data – deterministic, labelled as sample in the UI. */
export const DASHBOARD = M.map(([sv, en], i) => ({ m: { sv, en }, enquiries: E[i]!, handled: H[i]! }));
