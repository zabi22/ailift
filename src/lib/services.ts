import heroWorkshop from "@/assets/hero-workshop.jpg";
import talk from "@/assets/talk.jpg";
import coaching from "@/assets/coaching.jpg";

type L = { sv: string; en: string };

export type ServiceContent = {
  slug: string;
  image: string;
  title: L;
  short: L;
  intro: L;
  forWho: L;
  outcomes: { sv: string[]; en: string[] };
  includes: { sv: string[]; en: string[] };
  formats: L;
};

export const SERVICES: ServiceContent[] = [
  {
    slug: "company-workshops",
    image: heroWorkshop,
    title: { sv: "AI-workshops för företag", en: "AI workshops for companies" },
    short: {
      sv: "Praktiska workshops där ert team lär sig använda AI i sitt eget arbete.",
      en: "Hands-on workshops where your team learns to use AI in its own daily work.",
    },
    intro: {
      sv: "En interaktiv workshop anpassad efter er verksamhet. Vi utgår från era verkliga arbetsuppgifter och övar på dem tillsammans, så att deltagarna går därifrån med metoder de kan använda direkt.",
      en: "An interactive workshop tailored to your organisation. We start from your real tasks and practise on them together, so participants leave with methods they can use straight away.",
    },
    forWho: {
      sv: "Ledningsgrupper, team och avdelningar som vill komma igång med AI på ett tryggt och strukturerat sätt.",
      en: "Leadership groups, teams and departments that want to get started with AI in a safe, structured way.",
    },
    outcomes: {
      sv: ["Förståelse för vad generativ AI kan och inte kan", "Konkreta arbetsflöden för era vanligaste uppgifter", "Riktlinjer för ansvarsfull och säker användning", "Bättre promptar och kvalitetsgranskning av svar"],
      en: ["Understanding of what generative AI can and cannot do", "Concrete workflows for your most common tasks", "Guidelines for responsible and secure use", "Better prompts and quality checking of answers"],
    },
    includes: {
      sv: ["Förberedande samtal om era mål", "Workshop med praktiska övningar", "Övningsmaterial och sammanfattning efteråt"],
      en: ["Preparatory call about your goals", "Workshop with practical exercises", "Exercise material and a summary afterwards"],
    },
    formats: { sv: "På plats eller online", en: "On site or online" },
  },
  {
    slug: "talks",
    image: talk,
    title: { sv: "Föreläsningar och presentationer", en: "Talks and presentations" },
    short: {
      sv: "Inspirerande och jordnära föreläsningar om AI för konferenser, kickoffs och event.",
      en: "Inspiring, down-to-earth talks about AI for conferences, kick-offs and events.",
    },
    intro: {
      sv: "En föreläsning som gör AI begripligt för alla i publiken — utan hype och utan teknisk jargong. Innehållet anpassas efter publik, bransch och tema.",
      en: "A talk that makes AI understandable for everyone in the audience — without hype or technical jargon. Content is adapted to the audience, industry and theme.",
    },
    forWho: {
      sv: "Konferenser, personaldagar, branschträffar, nätverk och föreningar.",
      en: "Conferences, staff days, industry meetups, networks and associations.",
    },
    outcomes: {
      sv: ["En gemensam och realistisk bild av AI", "Konkreta exempel från vardag och arbetsliv", "Inspiration att själv börja testa"],
      en: ["A shared, realistic picture of AI", "Concrete examples from everyday life and work", "Inspiration to start experimenting"],
    },
    includes: {
      sv: ["Avstämning av tema och publik", "Föreläsning med live-demonstrationer", "Möjlighet till frågestund"],
      en: ["Alignment on theme and audience", "Talk with live demonstrations", "Optional Q&A session"],
    },
    formats: { sv: "På plats eller digitalt", en: "On site or digital" },
  },
  {
    slug: "implementation",
    image: heroWorkshop,
    title: { sv: "AI-implementeringsworkshop", en: "AI implementation workshop" },
    short: {
      sv: "Kartlägg var AI gör mest nytta i er verksamhet och ta fram en konkret plan.",
      en: "Map where AI adds the most value in your organisation and create a concrete plan.",
    },
    intro: {
      sv: "En fördjupande workshop där vi tillsammans identifierar processer som kan förbättras med AI, prioriterar dem och tar fram nästa steg — realistiskt och anpassat efter era resurser.",
      en: "An in-depth workshop where we identify processes that can be improved with AI, prioritise them and define next steps — realistically and adapted to your resources.",
    },
    forWho: {
      sv: "Organisationer som redan testat AI och vill gå från enstaka försök till ett strukturerat arbetssätt.",
      en: "Organisations that have tried AI and want to move from one-off experiments to a structured approach.",
    },
    outcomes: {
      sv: ["Kartläggning av möjliga användningsområden", "Prioriterad lista utifrån nytta och insats", "Handlingsplan med tydliga nästa steg"],
      en: ["Map of possible use cases", "Prioritised list based on value and effort", "Action plan with clear next steps"],
    },
    includes: {
      sv: ["Intervju eller enkät före workshopen", "Facilitering av workshop", "Skriftlig sammanställning och plan"],
      en: ["Interview or survey before the workshop", "Workshop facilitation", "Written summary and plan"],
    },
    formats: { sv: "Helst på plats", en: "Preferably on site" },
  },
  {
    slug: "schools",
    image: talk,
    title: { sv: "AI för skolor och organisationer", en: "AI for schools and organisations" },
    short: {
      sv: "Workshops för lärare, elever, föreningar och ideella organisationer.",
      en: "Workshops for teachers, students, associations and non-profits.",
    },
    intro: {
      sv: "Pedagogiska workshops som hjälper lärare och elever att förstå AI, använda det klokt och diskutera frågor om källkritik, etik och fusk.",
      en: "Educational workshops that help teachers and students understand AI, use it wisely and discuss source criticism, ethics and cheating.",
    },
    forWho: {
      sv: "Grundskolor, gymnasier, vuxenutbildning, studieförbund, föreningar och ideella organisationer.",
      en: "Schools, upper secondary schools, adult education, study associations, clubs and non-profits.",
    },
    outcomes: {
      sv: ["Trygghet i att använda AI i undervisning och planering", "Gemensamma förhållningssätt kring AI", "Övningar som går att använda i klassrummet"],
      en: ["Confidence using AI in teaching and planning", "Shared principles for AI use", "Exercises that work in the classroom"],
    },
    includes: {
      sv: ["Anpassning efter åldersgrupp", "Workshop med diskussion och övningar", "Material att använda efteråt"],
      en: ["Adapted to the age group", "Workshop with discussion and exercises", "Material to use afterwards"],
    },
    formats: { sv: "På plats eller online", en: "On site or online" },
  },
  {
    slug: "coaching",
    image: coaching,
    title: { sv: "Personlig AI-coachning", en: "Personal AI coaching" },
    short: {
      sv: "Individuell vägledning för dig som vill lära dig AI i din egen takt.",
      en: "One-to-one guidance for anyone who wants to learn AI at their own pace.",
    },
    intro: {
      sv: "Personliga sessioner där vi utgår från dina behov — i jobbet, studierna eller vardagen. Du får hjälp att komma igång, ställa rätt frågor och bygga egna rutiner.",
      en: "Personal sessions based on your needs — at work, in studies or everyday life. You get help getting started, asking the right questions and building your own routines.",
    },
    forWho: {
      sv: "Privatpersoner, egenföretagare, chefer och alla som vill ha personlig hjälp.",
      en: "Individuals, freelancers, managers and anyone who wants personal help.",
    },
    outcomes: {
      sv: ["Ett personligt upplägg för dina mål", "Praktisk träning på dina egna uppgifter", "Självförtroende att fortsätta på egen hand"],
      en: ["A personal plan for your goals", "Practical training on your own tasks", "Confidence to continue on your own"],
    },
    includes: {
      sv: ["Inledande behovssamtal", "En eller flera sessioner", "Tips och resurser att fortsätta med"],
      en: ["Initial needs conversation", "One or more sessions", "Tips and resources to continue with"],
    },
    formats: { sv: "Online eller på plats", en: "Online or on site" },
  },
  {
    slug: "custom",
    image: coaching,
    title: { sv: "Skräddarsydd AI-workshop", en: "Custom AI workshop" },
    short: {
      sv: "Har ni en särskild idé eller ett behov? Vi tar fram ett upplägg tillsammans.",
      en: "Have a specific idea or need? We design a format together.",
    },
    intro: {
      sv: "Ibland passar inget standardupplägg. Berätta vad ni vill uppnå, så föreslår vi ett innehåll och format som passar er grupp, tidsram och nivå.",
      en: "Sometimes no standard format fits. Tell us what you want to achieve and we will propose content and a format that fits your group, timeframe and level.",
    },
    forWho: {
      sv: "Alla som har ett specifikt behov — från ett kort lunchpass till en serie träffar.",
      en: "Anyone with a specific need — from a short lunch session to a series of meetings.",
    },
    outcomes: {
      sv: ["Innehåll som matchar exakt era mål", "Format anpassat efter er vardag", "Tydlig överenskommelse innan start"],
      en: ["Content that matches your exact goals", "Format adapted to your reality", "A clear agreement before starting"],
    },
    includes: {
      sv: ["Behovsanalys", "Förslag på upplägg", "Genomförande enligt överenskommelse"],
      en: ["Needs analysis", "Proposed format", "Delivery as agreed"],
    },
    formats: { sv: "Enligt överenskommelse", en: "As agreed" },
  },
];

export const getService = (slug: string) => SERVICES.find((s) => s.slug === slug);
