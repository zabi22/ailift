type L = { sv: string; en: string };
type LL = { sv: string[]; en: string[] };

export type ServiceContent = {
  slug: string;
  title: L;
  short: L;
  intro: L;
  seo: L;
  forWho: L;
  problems: LL;
  deliverables: LL;
  examples: LL;
};

export const SERVICES: ServiceContent[] = [
  {
    slug: "ai-automation",
    title: { sv: "AI & automation", en: "AI & Automation" },
    short: {
      sv: "AI-agenter och automatiserade flöden som tar hand om repetitivt arbete – med människan kvar vid viktiga beslut.",
      en: "AI agents and automated workflows that handle repetitive work – with a person still in charge of important decisions.",
    },
    intro: {
      sv: "Vi kartlägger var tiden går åt och bygger automatiseringar som passar era system: från enkla flöden mellan verktyg till AI-agenter som planerar uppgifter, använder tillåtna verktyg och ber om godkännande innan något känsligt görs.",
      en: "We map where time is lost and build automations that fit your systems: from simple flows between tools to AI agents that plan tasks, use permitted tools and ask for approval before doing anything sensitive.",
    },
    seo: { sv: "AI-automation och AI-agenter för småföretag", en: "AI automation and AI agents for small businesses" },
    forWho: {
      sv: "Små och medelstora företag med återkommande manuellt arbete – administration, e-post, rapporter, dataöverföring.",
      en: "Small and medium-sized businesses with recurring manual work – admin, email, reports, moving data between systems.",
    },
    problems: {
      sv: ["Samma uppgifter görs för hand varje vecka", "Information kopieras mellan system", "Förfrågningar blir liggande", "Svårt att veta var AI faktiskt gör nytta"],
      en: ["The same tasks are done by hand every week", "Information is copied between systems", "Requests sit waiting", "Hard to know where AI actually helps"],
    },
    deliverables: {
      sv: ["Kartläggning av processer och prioritering", "Automatiserade flöden eller AI-agent", "Godkännandesteg och logg för känsliga åtgärder", "Dokumentation och överlämning"],
      en: ["Process mapping and prioritisation", "Automated workflows or an AI agent", "Approval steps and logs for sensitive actions", "Documentation and handover"],
    },
    examples: {
      sv: ["Sortera och sammanfatta inkommande e-post", "Skapa utkast till offerter från en förfrågan", "Veckorapporter som sammanställs automatiskt"],
      en: ["Sort and summarise incoming email", "Draft quotes from an incoming request", "Weekly reports compiled automatically"],
    },
  },
  {
    slug: "ai-consulting",
    title: { sv: "AI-rådgivning & workshops", en: "AI Consulting & Workshops" },
    short: {
      sv: "Workshops, föreläsningar och rådgivning som hjälper team att förstå AI och använda det på riktigt.",
      en: "Workshops, talks and advice that help teams understand AI and use it for real.",
    },
    intro: {
      sv: "Praktiska workshops med era egna arbetsuppgifter, föreläsningar för konferenser och personaldagar, samt rådgivning kring var och hur AI bör införas. På svenska eller engelska, på plats eller online.",
      en: "Hands-on workshops using your own tasks, talks for conferences and staff days, and advice on where and how to introduce AI. In Swedish or English, on site or online.",
    },
    seo: { sv: "AI-rådgivning och AI-workshops i Sverige", en: "AI consulting and workshops in Sweden" },
    forWho: {
      sv: "Företag, ledningsgrupper, skolor, organisationer och privatpersoner som vill komma igång med AI tryggt.",
      en: "Companies, leadership teams, schools, organisations and individuals who want to get started with AI safely.",
    },
    problems: {
      sv: ["Medarbetare är nyfikna men osäkra", "Ingen gemensam syn på hur AI får användas", "Verktyg köps in men används inte", "Oro kring säkerhet och integritet"],
      en: ["Staff are curious but unsure", "No shared view of how AI may be used", "Tools are bought but not used", "Concerns about security and privacy"],
    },
    deliverables: {
      sv: ["Workshop med praktiska övningar", "Föreläsning anpassad efter publiken", "Personlig AI-coachning", "Riktlinjer för ansvarsfull användning"],
      en: ["Workshop with practical exercises", "Talk adapted to the audience", "Personal AI coaching", "Guidelines for responsible use"],
    },
    examples: {
      sv: ["Halvdagsworkshop för ett säljteam", "Föreläsning på en kickoff", "Coachning för en egenföretagare"],
      en: ["Half-day workshop for a sales team", "Talk at a kick-off", "Coaching for a sole trader"],
    },
  },
  {
    slug: "websites",
    title: { sv: "Webbplatser & webbappar", en: "Websites & Web Applications" },
    short: {
      sv: "Snabba, tillgängliga och flerspråkiga webbplatser och webbappar som gör det lätt för kunder att ta kontakt.",
      en: "Fast, accessible, multilingual websites and web apps that make it easy for customers to get in touch.",
    },
    intro: {
      sv: "Från en tydlig företagswebb till en webbapp med inloggning och bokning. Vi fokuserar på struktur, tydliga budskap, mobilanpassning, tillgänglighet och sökbarhet.",
      en: "From a clear company website to a web app with sign-in and booking. We focus on structure, clear messaging, mobile layouts, accessibility and search visibility.",
    },
    seo: { sv: "Webbutveckling för företag", en: "Website development for businesses" },
    forWho: {
      sv: "Företag och organisationer som behöver en ny webbplats, en flerspråkig webb eller en enklare webbapp.",
      en: "Businesses and organisations that need a new website, a multilingual site or a simple web app.",
    },
    problems: {
      sv: ["Webbplatsen är föråldrad eller svår att uppdatera", "Fungerar dåligt i mobilen", "Kunder hittar inte hur de kontaktar er", "Behov av flera språk"],
      en: ["The website is outdated or hard to update", "Works poorly on mobile", "Customers can't find how to contact you", "Need for several languages"],
    },
    deliverables: {
      sv: ["Struktur och design", "Responsiv, tillgänglig webbplats", "Flerspråkigt stöd", "Grundläggande sökmotoroptimering"],
      en: ["Structure and design", "Responsive, accessible website", "Multilingual support", "Basic search engine optimisation"],
    },
    examples: {
      sv: ["Flerspråkig webbplats för en juristbyrå", "Bokningsförfrågan via e-postutkast"],
      en: ["Multilingual website for a law firm", "Booking requests via email draft"],
    },
  },
  {
    slug: "custom-software",
    title: { sv: "Skräddarsydd affärsmjukvara", en: "Custom Business Software" },
    short: {
      sv: "Interna verktyg och system byggda kring hur ni faktiskt arbetar – i stället för kalkylark och manuella steg.",
      en: "Internal tools and systems built around how you actually work – instead of spreadsheets and manual steps.",
    },
    intro: {
      sv: "När standardverktyg inte räcker bygger vi enkla, robusta interna verktyg: översikter, ärendehantering, kundregister eller integrationer mellan befintliga system, med AI där det gör verklig nytta.",
      en: "When off-the-shelf tools aren't enough, we build simple, robust internal tools: dashboards, case handling, customer records or integrations between existing systems, with AI where it genuinely helps.",
    },
    seo: { sv: "Skräddarsydd affärsmjukvara och interna verktyg", en: "Custom business software and internal tools" },
    forWho: {
      sv: "Verksamheter som har vuxit ur kalkylark eller behöver koppla ihop sina system.",
      en: "Organisations that have outgrown spreadsheets or need to connect their systems.",
    },
    problems: {
      sv: ["Arbetet styrs av kalkylark och e-post", "System pratar inte med varandra", "Ingen överblick över ärenden", "Standardprogram passar inte arbetssättet"],
      en: ["Work runs on spreadsheets and email", "Systems don't talk to each other", "No overview of cases", "Off-the-shelf software doesn't fit the way you work"],
    },
    deliverables: {
      sv: ["Behovsanalys och prototyp", "Webbaserat internt verktyg", "Integrationer med befintliga system", "Behörigheter, test och driftsättning"],
      en: ["Needs analysis and prototype", "Web-based internal tool", "Integrations with existing systems", "Permissions, testing and deployment"],
    },
    examples: {
      sv: ["Ärendeöversikt för ett litet team", "Koppling mellan bokning och kalender"],
      en: ["Case overview for a small team", "Connection between booking and calendar"],
    },
  },
  {
    slug: "ui-ux-design",
    title: { sv: "UI/UX & visuell design", en: "UI/UX & Visual Design" },
    short: {
      sv: "Gränssnitt, designsystem, illustrationer och rörelse som gör komplicerat innehåll lätt att förstå.",
      en: "Interfaces, design systems, illustrations and motion that make complicated content easy to understand.",
    },
    intro: {
      sv: "Vi skissar, testar och ritar gränssnitt som känns genomtänkta – från typografi och färg till egna illustrationer och diskreta animationer som förklarar i stället för att imponera.",
      en: "We sketch, test and draw interfaces that feel considered – from type and colour to custom illustrations and quiet animations that explain rather than show off.",
    },
    seo: { sv: "UI/UX-design och designsystem för företag", en: "UI/UX design and design systems for businesses" },
    forWho: {
      sv: "Organisationer med mycket eller komplext innehåll – forskning, tjänster, data – som behöver presenteras tydligt.",
      en: "Organisations with a lot of, or complex, content – research, services, data – that needs presenting clearly.",
    },
    problems: {
      sv: ["Innehållet är rätt men svårt att ta till sig", "Webben ser ut som alla andra", "Ingen enhetlig visuell stil", "Besökare hittar inte rätt"],
      en: ["The content is right but hard to take in", "The site looks like everyone else's", "No consistent visual style", "Visitors can't find their way"],
    },
    deliverables: {
      sv: ["Informationsarkitektur och skisser", "Designsystem med typografi och färg", "Egna illustrationer och animationer", "Klickbar prototyp"],
      en: ["Information architecture and wireframes", "Design system with type and colour", "Custom illustrations and animations", "Clickable prototype"],
    },
    examples: {
      sv: ["Interaktiv tjänsteutforskare för en forskningsorganisation", "Metodhjul som förklarar en arbetsprocess"],
      en: ["Interactive service explorer for a research organisation", "A method wheel explaining a work process"],
    },
  },
  {
    slug: "content-platforms",
    title: { sv: "Publicering & innehållsplattformar", en: "Publishing & Content Platforms" },
    short: {
      sv: "Webbplatser där ni själva lägger upp rapporter, nyheter, kurser och artiklar – utan att röra koden.",
      en: "Websites where you publish reports, news, courses and articles yourselves – without touching code.",
    },
    intro: {
      sv: "Vi bygger kunskapsbanker, nyhetsflöden och utbildningssidor med ett enkelt publiceringsgränssnitt, filter och sök – så att innehållet kan växa efter lansering.",
      en: "We build knowledge hubs, news feeds and course pages with a simple publishing interface, filters and search – so the content can keep growing after launch.",
    },
    seo: { sv: "Publiceringsplattform och kunskapsbank för organisationer", en: "Publishing platform and knowledge hub for organisations" },
    forWho: {
      sv: "Forskningsorganisationer, ideella föreningar, skolor och företag som publicerar regelbundet.",
      en: "Research organisations, non-profits, schools and companies that publish regularly.",
    },
    problems: {
      sv: ["Varje ny rapport kräver en utvecklare", "Publikationer är svåra att hitta", "Nyheter och kurser ligger utspridda", "Ingen struktur för arkivet"],
      en: ["Every new report needs a developer", "Publications are hard to find", "News and courses are scattered", "No structure for the archive"],
    },
    deliverables: {
      sv: ["Publiceringsgränssnitt", "Kategorier, filter och sök", "Sidor för kurser eller akademi", "Utbildning i hur ni publicerar"],
      en: ["Publishing interface", "Categories, filters and search", "Course or academy pages", "Training on how to publish"],
    },
    examples: {
      sv: ["Kunskapsbank för forskning, insikter och nyheter", "Akademisektion för utbildningsprogram"],
      en: ["Knowledge hub for research, insights and news", "Academy section for training programmes"],
    },
  },
];

export const getService = (slug: string) => SERVICES.find((s) => s.slug === slug);
