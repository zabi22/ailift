/** Sample data for the public automation sandbox. Nothing here calls an AI or any external service. */
type L = { sv: string; en: string };
export type Action = { id: string; tool: string; label: L; sensitive: boolean; result: L };
export type Scenario = { id: string; title: L; task: L; plan: L[]; actions: Action[]; output: L };

export const SCENARIOS: Scenario[] = [
  {
    id: "inbox",
    title: { sv: "Sortera inkorgen", en: "Sort the inbox" },
    task: { sv: "Gå igenom dagens 6 e-postmeddelanden, sortera dem och skriv svarsutkast till kundfrågorna.", en: "Go through today's 6 emails, sort them and draft replies to the customer questions." },
    plan: [
      { sv: "Läs de 6 meddelandena (exempeldata)", en: "Read the 6 messages (sample data)" },
      { sv: "Klassificera: kundfråga, faktura, nyhetsbrev", en: "Classify: customer question, invoice, newsletter" },
      { sv: "Skriv svarsutkast till kundfrågor", en: "Draft replies to customer questions" },
      { sv: "Skicka svaren – kräver godkännande", en: "Send the replies – needs approval" },
    ],
    actions: [
      { id: "read", tool: "inbox.read", sensitive: false, label: { sv: "Läsa 6 exempelmeddelanden", en: "Read 6 sample messages" }, result: { sv: "6 meddelanden lästa", en: "6 messages read" } },
      { id: "label", tool: "inbox.label", sensitive: false, label: { sv: "Märka 3 kundfrågor, 2 fakturor, 1 nyhetsbrev", en: "Label 3 customer questions, 2 invoices, 1 newsletter" }, result: { sv: "6 etiketter satta", en: "6 labels applied" } },
      { id: "draft", tool: "inbox.draft", sensitive: false, label: { sv: "Skapa 3 svarsutkast", en: "Create 3 reply drafts" }, result: { sv: "3 utkast skapade", en: "3 drafts created" } },
      { id: "send", tool: "email.send", sensitive: true, label: { sv: "Skicka 3 svar till kunder", en: "Send 3 replies to customers" }, result: { sv: "3 svar markerade som skickade (simulerat)", en: "3 replies marked as sent (simulated)" } },
    ],
    output: { sv: "Inkorgen är sorterad. 3 svarsutkast väntar i utkastmappen.", en: "The inbox is sorted. 3 reply drafts are waiting in the drafts folder." },
  },
  {
    id: "quote",
    title: { sv: "Offert från förfrågan", en: "Quote from an enquiry" },
    task: { sv: "En kund vill ha pris på städning av 120 m² kontor varannan vecka. Ta fram ett offertutkast.", en: "A customer wants a price for cleaning a 120 m² office every other week. Prepare a draft quote." },
    plan: [
      { sv: "Hämta prislista (exempeldata)", en: "Fetch price list (sample data)" },
      { sv: "Beräkna pris utifrån yta och frekvens", en: "Calculate price from area and frequency" },
      { sv: "Skapa offertutkast", en: "Create draft quote" },
      { sv: "Skicka offerten till kunden – kräver godkännande", en: "Send the quote to the customer – needs approval" },
    ],
    actions: [
      { id: "prices", tool: "pricing.lookup", sensitive: false, label: { sv: "Läsa exempelprislista", en: "Read sample price list" }, result: { sv: "Exempelpris: 8 kr/m² per tillfälle", en: "Sample rate: SEK 8/m² per visit" } },
      { id: "calc", tool: "calculator", sensitive: false, label: { sv: "Räkna: 120 m² × 8 kr × 2 per månad", en: "Calculate: 120 m² × SEK 8 × 2 per month" }, result: { sv: "1 920 kr per månad (exempel)", en: "SEK 1,920 per month (sample)" } },
      { id: "doc", tool: "docs.create", sensitive: false, label: { sv: "Skapa offertdokument", en: "Create quote document" }, result: { sv: "Offertutkast skapat", en: "Draft quote created" } },
      { id: "send", tool: "email.send", sensitive: true, label: { sv: "Skicka offerten till kunden", en: "Send the quote to the customer" }, result: { sv: "Offert markerad som skickad (simulerat)", en: "Quote marked as sent (simulated)" } },
    ],
    output: { sv: "Offertutkast: 1 920 kr/månad för 120 m² varannan vecka (exempelpris).", en: "Draft quote: SEK 1,920/month for 120 m² every other week (sample rate)." },
  },
  {
    id: "support",
    title: { sv: "Kundsupport", en: "Customer support" },
    task: { sv: "Hantera 4 nya supportfrågor: svara på enkla frågor och eskalera det som är komplicerat.", en: "Handle 4 new support questions: answer simple ones and escalate anything complicated." },
    plan: [
      { sv: "Läs frågorna (exempeldata)", en: "Read the questions (sample data)" },
      { sv: "Matcha mot godkänd FAQ", en: "Match against approved FAQ" },
      { sv: "Skriv svarsutkast till 3 enkla frågor", en: "Draft replies to 3 simple questions" },
      { sv: "Eskalera 1 reklamation till en människa", en: "Escalate 1 complaint to a person" },
    ],
    actions: [
      { id: "read", tool: "tickets.read", sensitive: false, label: { sv: "Läsa 4 exempelärenden", en: "Read 4 sample tickets" }, result: { sv: "4 ärenden lästa", en: "4 tickets read" } },
      { id: "faq", tool: "faq.search", sensitive: false, label: { sv: "Söka i godkänd FAQ", en: "Search approved FAQ" }, result: { sv: "3 av 4 frågor har svar i FAQ", en: "3 of 4 questions are answered in the FAQ" } },
      { id: "reply", tool: "tickets.reply", sensitive: true, label: { sv: "Svara kunderna på 3 enkla frågor", en: "Reply to customers on 3 simple questions" }, result: { sv: "3 svar markerade som skickade (simulerat)", en: "3 replies marked as sent (simulated)" } },
      { id: "escalate", tool: "tickets.assign", sensitive: false, label: { sv: "Tilldela reklamationen till en medarbetare", en: "Assign the complaint to a staff member" }, result: { sv: "1 ärende eskalerat", en: "1 ticket escalated" } },
    ],
    output: { sv: "3 frågor besvarade utifrån FAQ, 1 reklamation väntar på en människa.", en: "3 questions answered from the FAQ, 1 complaint waiting for a person." },
  },
];
