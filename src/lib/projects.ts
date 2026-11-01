import desktopSrc from "@/assets/juristbyra-desktop.jpg";
import mobileSrc from "@/assets/juristbyra-mobile.jpg";

type L = { sv: string; en: string };
type LL = { sv: string[]; en: string[] };
export type Status = "delivered" | "live" | "working" | "prototype" | "development" | "research";

export const STATUS_LABEL: Record<Status, L> = {
  delivered: { sv: "Levererat", en: "Delivered" },
  live: { sv: "Live", en: "Live" },
  working: { sv: "Fungerande exempel", en: "Working example" },
  prototype: { sv: "Prototyp", en: "Prototype" },
  development: { sv: "Under utveckling", en: "In development" },
  research: { sv: "Forskning pågår", en: "Research in progress" },
};

export type Project = {
  slug: string;
  title: string;
  category: L;
  status: Status;
  summary: L;
  overview: L;
  problem: L;
  solution: L;
  contribution: L;
  /** What exists today vs. what is planned — kept separate on purpose. */
  existing: LL;
  planned: LL;
  tech: string[];
  screenshots?: { src: string; alt: L; kind: "desktop" | "mobile" }[];
  link?: { href: string; label: L };
  outcomes: L;
  note?: L;
  year?: string;
  industry?: L;
  tags?: string[];
  caseStudy?: "/projects/azure-analytics";
};

export const PROJECTS: Project[] = [
  {
    slug: "azure-analytics",
    title: "Azure Analytics for Public Opinion",
    category: { sv: "Webbdesign & utveckling", en: "Website design & development" },
    status: "delivered",
    year: "2026",
    industry: { sv: "Forskning, opinion & dataanalys", en: "Research, public opinion & data analytics" },
    tags: ["Web Development", "UI/UX", "Interactive Design"],
    caseStudy: "/projects/azure-analytics",
    summary: {
      sv: "En forskningsplattform med interaktiva tjänster, egna animationer, responsiv design och innehållshantering – som gör komplex forskning tillgänglig.",
      en: "A research and analytics platform with interactive service experiences, custom animations, responsive design and content management – making complex research accessible.",
    },
    overview: { sv: "", en: "" }, problem: { sv: "", en: "" }, solution: { sv: "", en: "" },
    contribution: { sv: "Design och utveckling av AiLift.", en: "Designed and developed by AiLift." },
    existing: { sv: [], en: [] }, planned: { sv: [], en: [] }, tech: [],
    outcomes: { sv: "Inga mätresultat publiceras.", en: "No measured results are published." },
  },
  {
    slug: "juristbyra-europa",
    title: "Juristbyrå Europa",
    category: { sv: "Webbutveckling", en: "Website development" },
    status: "live",
    summary: {
      sv: "Flerspråkig webbplats för en juristbyrå i Spånga som hjälper klienter med migrations-, familje-, fastighets- och socialrätt.",
      en: "Multilingual website for a law firm in Spånga, Stockholm, helping clients with migration, family, property and social law.",
    },
    overview: {
      sv: "Din Röst & Din Rätt Juristbyrå Europa AB är en mångkulturell juristbyrå med klienter i Sverige, Europa och Storbritannien. Webbplatsen presenterar byråns fyra rättsområden, teamet och hur man bokar en konsultation.",
      en: "Din Röst & Din Rätt Juristbyrå Europa AB is a multicultural law firm with clients in Sweden, Europe and the UK. The website presents the firm's four areas of law, the team and how to book a consultation.",
    },
    problem: {
      sv: "Byråns klienter talar många olika språk och möter ofta det svenska rättssystemet i en svår livssituation. Webbplatsen behöver vara tydlig, trygg och lätt att navigera – och göra det enkelt att ta kontakt.",
      en: "The firm's clients speak many languages and often meet the Swedish legal system at a difficult time. The website needs to be clear, reassuring and easy to navigate – and make it simple to get in touch.",
    },
    solution: {
      sv: "En webbplats med egna sidor för varje rättsområde, en presentation av teamet, en kontaktsida med flera kontaktvägar och ett formulär för konsultationsförfrågan, samt språkväljare.",
      en: "A website with a page for each area of law, a team presentation, a contact page with several ways to get in touch, a consultation request form, and a language switcher.",
    },
    contribution: {
      sv: "Jag har arbetat med webbplatsens webbutveckling och digitala presentation. Byråns juridiska tjänster, texter om verksamheten, teamets presentationer och porträtt är byråns eget innehåll.",
      en: "I worked on the website's web development and digital presentation. The firm's legal services, texts about the business, team biographies and portraits are the firm's own content.",
    },
    existing: {
      sv: ["Sidor för migrationsrätt, familjerätt, fastighetsrätt och socialrätt", "Om oss-sida med teamet", "Kontaktsida med telefon, WhatsApp, e-post och adress", "Formulär för konsultationsförfrågan", "Språkväljare", "Mobilanpassad layout", "Cookie-val och GDPR-sida"],
      en: ["Pages for migration, family, property and social law", "About page with the team", "Contact page with phone, WhatsApp, email and address", "Consultation request form", "Language switcher", "Mobile-friendly layout", "Cookie choices and GDPR page"],
    },
    planned: { sv: [], en: [] },
    tech: [],
    screenshots: [
      { src: desktopSrc, kind: "desktop", alt: { sv: "Startsidan för Juristbyrå Europa på dator", en: "Juristbyrå Europa home page on desktop" } },
      { src: mobileSrc, kind: "mobile", alt: { sv: "Startsidan för Juristbyrå Europa i mobilen", en: "Juristbyrå Europa home page on mobile" } },
    ],
    link: { href: "https://www.juristbyraeuropa.se/", label: { sv: "Besök webbplatsen", en: "Visit live website" } },
    outcomes: { sv: "Inga mätresultat publiceras här.", en: "No measured results are published here." },
    note: {
      sv: "Skärmbilderna är tagna från den publicerade webbplatsen i oktober 2026. Vilken teknik webbplatsen använder anges inte här, eftersom det inte har verifierats.",
      en: "Screenshots taken from the live website in October 2026. The technology the site uses is not listed here because it hasn't been verified.",
    },
  },
  {
    slug: "ailift-booking",
    title: "AiLift booking flow",
    category: { sv: "Webbplats & bokning", en: "Website & booking" },
    status: "working",
    summary: {
      sv: "Bokningsförfrågan i tre steg på den här webbplatsen – utan databas, utan inloggning, med ett färdigt e-postutkast.",
      en: "A three-step booking request on this very website – no database, no sign-in, ending in a ready-made email draft.",
    },
    overview: {
      sv: "Bokningsflödet på AiLift.se är ett fungerande exempel på hur ett tjänsteföretag kan ta emot strukturerade förfrågningar utan att lagra personuppgifter.",
      en: "The booking flow on AiLift.se is a working example of how a service business can receive structured requests without storing personal data.",
    },
    problem: {
      sv: "Förfrågningar via fritext saknar ofta viktiga detaljer, och många små företag vill inte hantera en databas med kunduppgifter.",
      en: "Free-text enquiries often miss key details, and many small businesses don't want to manage a database of customer data.",
    },
    solution: {
      sv: "Ett formulär som bara visar relevanta frågor för vald tjänst, validerar svaren, visar en sammanfattning och öppnar ett e-postutkast som besökaren själv skickar.",
      en: "A form that only shows questions relevant to the chosen service, validates answers, shows a review and opens an email draft that the visitor sends themselves.",
    },
    contribution: { sv: "Designat och byggt av AiLift.", en: "Designed and built by AiLift." },
    existing: {
      sv: ["Tre steg med anpassade frågor per tjänst", "Validering och granskning före utskick", "E-postutkast till AiLift och kopieringsalternativ", "Svenska och engelska", "Inget lagras av webbplatsen"],
      en: ["Three steps with questions tailored to each service", "Validation and review before sending", "Email draft to AiLift plus a copy option", "Swedish and English", "Nothing is stored by the website"],
    },
    planned: {
      sv: ["Automatisk bekräftelse via e-post – inte byggt", "Administrationsvy – medvetet bortvald av integritetsskäl"],
      en: ["Automatic email confirmation – not built", "Admin view – deliberately left out for privacy"],
    },
    tech: ["React", "TanStack Start", "TypeScript", "Tailwind CSS"],
    link: { href: "/book", label: { sv: "Prova bokningsflödet", en: "Try the booking flow" } },
    outcomes: { sv: "Inga mätresultat ännu.", en: "No measured results yet." },
  },
  {
    slug: "ai-business-automation",
    title: "AI Business Automation",
    category: { sv: "AI & automation", en: "AI & automation" },
    status: "development",
    summary: {
      sv: "Ett system där AI-agenter planerar uppgifter, använder tillåtna verktyg, loggar resultat och ber om godkännande för känsliga åtgärder.",
      en: "A system where AI agents plan tasks, use permitted tools, log results and ask for approval before sensitive actions.",
    },
    overview: {
      sv: "Ett pågående projekt för att automatisera repetitiva arbetsflöden i småföretag med hjälp av AI-agenter. Systemet är inte färdigt.",
      en: "An ongoing project to automate repetitive workflows in small businesses using AI agents. The system is not finished.",
    },
    problem: {
      sv: "Småföretag lägger mycket tid på återkommande administration, men vill inte släppa kontrollen över viktiga beslut till en AI.",
      en: "Small businesses spend a lot of time on recurring admin, but don't want to hand control of important decisions to an AI.",
    },
    solution: {
      sv: "Tänkt flöde: uppgiften tolkas, en plan tas fram, varje steg körs bara med godkända verktyg, känsliga steg väntar på mänskligt godkännande och allt loggas.",
      en: "Intended flow: the task is interpreted, a plan is drawn up, each step runs only with approved tools, sensitive steps wait for human approval, and everything is logged.",
    },
    contribution: { sv: "Utvecklas av AiLift.", en: "Being developed by AiLift." },
    existing: {
      sv: ["Interaktiv sandlåda på den här webbplatsen som visar flödet med exempeldata"],
      en: ["Interactive sandbox on this website showing the flow with sample data"],
    },
    planned: {
      sv: ["Koppling till riktiga verktyg och system", "Behörighetsstyrning per verktyg", "Pilot med ett riktigt företag"],
      en: ["Connections to real tools and systems", "Per-tool permissions", "Pilot with a real business"],
    },
    tech: [],
    link: { href: "/demo", label: { sv: "Öppna sandlådan", en: "Open the sandbox" } },
    outcomes: { sv: "Inga resultat ännu – projektet är under utveckling.", en: "No results yet – the project is in development." },
  },
  {
    slug: "ai-customer-support",
    title: "AI Customer Support",
    category: { sv: "AI-assistent", en: "AI assistant" },
    status: "prototype",
    summary: {
      sv: "Ett experimentellt koncept för en AI-assistent som besvarar kundfrågor utifrån godkänd information och lämnar över svåra frågor till en människa.",
      en: "An experimental concept for an AI assistant that answers customer questions from approved information and hands difficult ones to a person.",
    },
    overview: {
      sv: "En prototyp som utforskar hur en supportassistent kan klassificera frågor, skriva utkast till svar och eskalera komplexa ärenden. Den används inte av något riktigt företag.",
      en: "A prototype exploring how a support assistant can classify questions, draft replies and escalate complex cases. It is not used by any real business.",
    },
    problem: {
      sv: "Många kundfrågor är återkommande, men felaktiga AI-svar kan skada förtroendet.",
      en: "Many customer questions repeat, but wrong AI answers can damage trust.",
    },
    solution: {
      sv: "Assistenten svarar bara utifrån godkänd information, visar vad svaret bygger på och skickar vidare till en människa när den är osäker.",
      en: "The assistant only answers from approved information, shows what the answer is based on and passes the question to a person when it's unsure.",
    },
    contribution: { sv: "Koncept och prototyp av AiLift.", en: "Concept and prototype by AiLift." },
    existing: {
      sv: ["Exempelscenario för kundsupport i sandlådan på den här webbplatsen"],
      en: ["Customer-support sample scenario in this website's sandbox"],
    },
    planned: {
      sv: ["Svar från en riktig kunskapsbas", "Test med verkliga frågor"],
      en: ["Answers from a real knowledge base", "Testing with real questions"],
    },
    tech: [],
    link: { href: "/demo", label: { sv: "Se exempelflödet", en: "See the sample flow" } },
    outcomes: { sv: "Inga resultat – prototyp.", en: "No results – prototype." },
  },
  {
    slug: "geomagnetic-ai-research",
    title: "Geomagnetic AI Research",
    category: { sv: "Forskning & utveckling", en: "Research & development" },
    status: "research",
    summary: {
      sv: "Ett självständigt forskningsprojekt som utforskar maskininlärning på geomagnetiska data.",
      en: "An independent research project exploring machine learning on geomagnetic data.",
    },
    overview: {
      sv: "Projektet undersöker hur AI och vetenskapliga beräkningar kan användas för att analysera geomagnetiska data. Forskningsfråga, datakällor, metod och resultat publiceras här när de är verifierade.",
      en: "The project investigates how AI and scientific computing can be used to analyse geomagnetic data. The research question, data sources, method and results will be published here once verified.",
    },
    problem: {
      sv: "Detaljer om forskningsfrågan kommer att läggas till.",
      en: "Details of the research question will be added.",
    },
    solution: {
      sv: "Metod och modellutvärdering beskrivs när experimenten är dokumenterade.",
      en: "The method and model evaluation will be described once experiments are documented.",
    },
    contribution: { sv: "Självständigt projekt av Zabihullah Ahmadzai.", en: "Independent project by Zabihullah Ahmadzai." },
    existing: { sv: [], en: [] },
    planned: {
      sv: ["Databehandling", "Modellträning och utvärdering", "Visualiseringar"],
      en: ["Data processing", "Model training and evaluation", "Visualisations"],
    },
    tech: [],
    outcomes: { sv: "Inga resultat publiceras ännu.", en: "No results published yet." },
  },
];

export const getProject = (slug: string) => PROJECTS.find((p) => p.slug === slug);
