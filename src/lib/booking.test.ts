import { describe, it, expect } from "vitest";
import { bookingMessage, bookingSubject, emptyBooking, validateStep, groupFor } from "./booking";
import { buildMailto, PUBLIC_CONTACT_EMAIL } from "./contact";

const base = () => ({
  ...emptyBooking("talks"), language: "sv", format: "onsite", duration: "1h", participants: "120",
  date: "2030-05-02", alt1: "2030-05-09", flexible: "yes", goals: "Inspirera om AI i vardagen", occasion: "Kickoff",
  qa: "yes", industry: "Bank", name: "Åsa Öberg", email: "asa@example.se",
});

describe("booking questions per service", () => {
  it("maps services to question groups", () => {
    expect(groupFor("talks")).toBe("talk");
    expect(groupFor("coaching")).toBe("coaching");
    expect(groupFor("custom")).toBe("custom");
    expect(groupFor("company-workshops")).toBe("corporate");
    expect(groupFor("schools")).toBe("corporate");
  });
  it("talk email includes talk details and omits corporate fields and blank optionals", () => {
    const m = bookingMessage(base(), "sv", "Föreläsning");
    expect(m).toContain("Evenemang / tillfälle: Kickoff");
    expect(m).toContain("Publikens storlek (ca): 120");
    expect(m).toContain("Alternativa datum: 2030-05-09");
    expect(m).toContain("Frågestund önskas: Ja");
    expect(m).not.toContain("Bank");
    expect(m).not.toContain("Telefon");
  });
  it("coaching email leaves out participant count", () => {
    const m = bookingMessage({ ...base(), service: "coaching" }, "en", "Coaching");
    expect(m).not.toContain("Participants");
  });
});

describe("booking validation", () => {
  it("requires a service, dates after today, and a valid email", () => {
    expect(validateStep(emptyBooking(), 0, "en").service).toBeDefined();
    expect(validateStep({ ...base(), date: "2020-01-01" }, 1, "en", "2026-10-12").date).toBeDefined();
    expect(validateStep(base(), 1, "en", "2026-10-12")).toEqual({});
    expect(validateStep({ ...base(), email: "nope" }, 2, "en").email).toBeDefined();
  });
  it("custom service requires a requirements description", () => {
    expect(validateStep({ ...base(), service: "custom" }, 1, "en", "2026-10-12").requirements).toBeDefined();
  });
});

describe("booking email draft", () => {
  it("goes to ailift.contact@gmail.com with service in subject and intact Swedish text", () => {
    const subject = bookingSubject("sv", "Föreläsning");
    const body = bookingMessage(base(), "sv", "Föreläsning");
    const url = buildMailto(PUBLIC_CONTACT_EMAIL, subject, body);
    expect(url.split("?")[0]).toBe("mailto:ailift.contact@gmail.com");
    const p = new URLSearchParams(url.split("?")[1]);
    expect(p.get("subject")).toBe("Bokningsförfrågan: Föreläsning");
    expect(p.get("body")).toBe(body);
    expect(p.get("body")).toContain("Namn: Åsa Öberg");
  });
});
