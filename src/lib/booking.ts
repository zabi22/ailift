/** Pure booking-request logic: which questions apply, validation, and the email text. Nothing is stored. */
export type Lang = "sv" | "en";
export type Group = "corporate" | "talk" | "coaching" | "custom";

export type BookingForm = {
  service: string;
  language: string;
  format: string;
  duration: string;
  participants: string;
  date: string;
  alt1: string;
  alt2: string;
  flexible: string;
  goals: string;
  notes: string;
  // corporate / schools / implementation
  industry: string;
  aiLevel: string;
  challenges: string;
  outcomes: string;
  // talks
  occasion: string;
  audienceType: string;
  topics: string;
  qa: string;
  // coaching
  experience: string;
  // custom
  requirements: string;
  // contact
  name: string;
  email: string;
  organization: string;
  phone: string;
};

export const emptyBooking = (service = ""): BookingForm => ({
  service, language: "", format: "", duration: "", participants: "", date: "", alt1: "", alt2: "", flexible: "",
  goals: "", notes: "", industry: "", aiLevel: "", challenges: "", outcomes: "", occasion: "", audienceType: "",
  topics: "", qa: "", experience: "", requirements: "", name: "", email: "", organization: "", phone: "",
});

export function groupFor(slug: string): Group {
  if (slug === "talks") return "talk";
  if (slug === "coaching") return "coaching";
  if (slug === "custom") return "custom";
  return "corporate";
}

type Opt = [string, string, string]; // value, sv, en
export const OPTIONS: Record<string, Opt[]> = {
  language: [["sv", "Svenska", "Swedish"], ["en", "Engelska", "English"], ["either", "Spelar ingen roll", "Either"]],
  format: [["online", "Online", "Online"], ["onsite", "På plats", "On site"], ["undecided", "Inte bestämt än", "Undecided"]],
  duration: [["1h", "Cirka 1 timme", "About 1 hour"], ["2h", "Cirka 2 timmar", "About 2 hours"], ["half", "Halvdag", "Half day"], ["full", "Heldag", "Full day"], ["unsure", "Vet inte än", "Not sure yet"]],
  flexible: [["yes", "Ja, datumen är flexibla", "Yes, the dates are flexible"], ["no", "Nej, helst de angivna datumen", "No, preferably the dates given"]],
  aiLevel: [["none", "Nybörjare", "Beginners"], ["some", "Har provat lite", "Tried a little"], ["regular", "Använder AI regelbundet", "Use AI regularly"], ["mixed", "Blandad nivå", "Mixed levels"]],
  qa: [["yes", "Ja", "Yes"], ["no", "Nej", "No"], ["unsure", "Vet inte än", "Not sure yet"]],
  experience: [["none", "Har inte använt AI", "Haven't used AI"], ["some", "Har provat lite", "Tried a little"], ["regular", "Använder AI regelbundet", "Use AI regularly"]],
};

export const optLabel = (key: string, v: string, lang: Lang) => {
  const o = OPTIONS[key]?.find((x) => x[0] === v);
  return o ? (lang === "sv" ? o[1] : o[2]) : v;
};

export const usesParticipants = (g: Group) => g !== "coaching";

export type Errors = Partial<Record<keyof BookingForm, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateStep(f: BookingForm, step: number, lang: Lang, today = new Date().toISOString().slice(0, 10)): Errors {
  const t = (sv: string, en: string) => (lang === "sv" ? sv : en);
  const e: Errors = {};
  const g = groupFor(f.service);
  if (step === 0 && !f.service) e.service = t("Välj en tjänst", "Choose a service");
  if (step === 1) {
    if (!f.language) e.language = t("Välj språk", "Choose a language");
    if (!f.format) e.format = t("Välj format", "Choose a format");
    if (!f.duration) e.duration = t("Välj ungefärlig längd", "Choose an approximate length");
    if (usesParticipants(g) && f.participants && (!/^\d+$/.test(f.participants) || +f.participants < 1 || +f.participants > 5000))
      e.participants = t("Ange ett antal mellan 1 och 5000", "Enter a number between 1 and 5000");
    if (!f.date) e.date = t("Välj ett önskat datum", "Choose a preferred date");
    else if (f.date <= today) e.date = t("Välj ett datum efter idag", "Choose a date after today");
    for (const k of ["alt1", "alt2"] as const) if (f[k] && f[k] <= today) e[k] = t("Välj ett datum efter idag", "Choose a date after today");
    if (!f.flexible) e.flexible = t("Ange om datumen är flexibla", "Say whether the dates are flexible");
    if (f.goals.trim().length < 10) e.goals = t("Beskriv målen med minst 10 tecken", "Describe the goals in at least 10 characters");
    if (g === "talk" && !f.occasion.trim()) e.occasion = t("Beskriv evenemanget", "Describe the event");
    if (g === "custom" && f.requirements.trim().length < 10) e.requirements = t("Beskriv era behov med minst 10 tecken", "Describe your needs in at least 10 characters");
  }
  if (step === 2) {
    if (f.name.trim().length < 2) e.name = t("Ange ditt fullständiga namn", "Enter your full name");
    if (!EMAIL_RE.test(f.email.trim())) e.email = t("Ange en giltig e-postadress, t.ex. namn@exempel.se", "Enter a valid email address, e.g. name@example.com");
    if (f.phone.trim() && !/^[+\d\s()-]{6,40}$/.test(f.phone.trim())) e.phone = t("Ange ett giltigt telefonnummer", "Enter a valid phone number");
  }
  return e;
}

/** Ordered review rows for the selected service only; blank optional fields are left out. */
export function reviewRows(f: BookingForm, lang: Lang, serviceTitle: string): { step: number; label: string; value: string }[] {
  const t = (sv: string, en: string) => (lang === "sv" ? sv : en);
  const g = groupFor(f.service);
  const o = (k: string) => optLabel(k, f[k as keyof BookingForm], lang);
  const dates = [f.date, f.alt1, f.alt2].filter(Boolean);
  const rows: [number, string, string | false][] = [
    [0, t("Tjänst", "Service"), serviceTitle],
    [1, t("Språk", "Language"), f.language && o("language")],
    [1, t("Format", "Format"), f.format && o("format")],
    [1, g === "talk" ? t("Föreläsningens längd", "Presentation length") : t("Längd", "Duration"), f.duration && o("duration")],
    [1, g === "talk" ? t("Publikens storlek (ca)", "Audience size (approx.)") : t("Antal deltagare (ca)", "Participants (approx.)"), usesParticipants(g) && f.participants],
    [1, t("Önskat datum", "Preferred date"), f.date],
    [1, t("Alternativa datum", "Alternative dates"), dates.length > 1 && dates.slice(1).join(", ")],
    [1, t("Flexibla datum", "Flexible dates"), f.flexible && o("flexible")],
  ];
  if (g === "corporate") rows.push(
    [1, t("Organisationstyp / bransch", "Organisation type / industry"), f.industry.trim()],
    [1, t("Deltagarnas AI-kunskap", "Participants' AI knowledge"), f.aiLevel && o("aiLevel")],
    [1, t("Uppgifter / utmaningar", "Tasks / challenges"), f.challenges.trim()],
    [1, t("Önskat praktiskt resultat", "Desired practical outcomes"), f.outcomes.trim()],
  );
  if (g === "talk") rows.push(
    [1, t("Evenemang / tillfälle", "Event / occasion"), f.occasion.trim()],
    [1, t("Typ av publik", "Audience type"), f.audienceType.trim()],
    [1, t("Tema / ämnen", "Theme / topics"), f.topics.trim()],
    [1, t("Frågestund önskas", "Q&A session wanted"), f.qa && o("qa")],
  );
  if (g === "coaching") rows.push(
    [1, t("Nuvarande AI-erfarenhet", "Current AI experience"), f.experience && o("experience")],
    [1, t("Ämnen jag vill ha hjälp med", "Topics I want help with"), f.topics.trim()],
  );
  if (g === "custom") rows.push([1, t("Behov och krav", "Needs and requirements"), f.requirements.trim()]);
  rows.push(
    [1, g === "coaching" ? t("Lärandemål", "Learning goals") : t("Huvudsakliga mål", "Main goals"), f.goals.trim()],
    [1, t("Övrigt", "Additional information"), f.notes.trim()],
    [2, t("Namn", "Name"), f.name.trim()],
    [2, t("E-post", "Email"), f.email.trim()],
    [2, t("Organisation", "Organisation"), f.organization.trim()],
    [2, t("Telefon", "Phone"), f.phone.trim()],
  );
  return rows.filter((r): r is [number, string, string] => typeof r[2] === "string" && r[2] !== "").map(([step, label, value]) => ({ step, label, value }));
}

export function bookingSubject(lang: Lang, serviceTitle: string) {
  return `${lang === "sv" ? "Bokningsförfrågan" : "Booking request"}: ${serviceTitle}`;
}

export function bookingMessage(f: BookingForm, lang: Lang, serviceTitle: string) {
  const head = lang === "sv" ? "Hej AiLift! Här är min bokningsförfrågan:" : "Hi AiLift! Here is my booking request:";
  const body = reviewRows(f, lang, serviceTitle)
    .map((r) => (r.value.includes("\n") || r.value.length > 60 ? `${r.label}:\n${r.value}` : `${r.label}: ${r.value}`))
    .join("\n\n");
  return `${head}\n\n${body}`;
}

/** Session types offered under "AI Consulting & Workshops"; used only by the booking form. */
export const SESSION_TYPES: { slug: string; title: { sv: string; en: string } }[] = [
  { slug: "company-workshops", title: { sv: "AI-workshop för företag", en: "AI workshop for companies" } },
  { slug: "talks", title: { sv: "Föreläsning eller presentation", en: "Talk or presentation" } },
  { slug: "implementation", title: { sv: "AI-implementeringsworkshop", en: "AI implementation workshop" } },
  { slug: "schools", title: { sv: "Workshop för skola eller organisation", en: "Workshop for a school or organisation" } },
  { slug: "coaching", title: { sv: "Personlig AI-coachning", en: "Personal AI coaching" } },
  { slug: "custom", title: { sv: "Skräddarsydd workshop", en: "Custom workshop" } },
];
