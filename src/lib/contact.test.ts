import { describe, it, expect } from "vitest";
import { buildMailto, formatMessage, resolveContactEmail, PUBLIC_CONTACT_EMAIL } from "./contact";

describe("contact configuration", () => {
  it("is configured with the AiLift public contact email", () => {
    expect(PUBLIC_CONTACT_EMAIL).toBe("ailift.contact@gmail.com");
    expect(resolveContactEmail()).toBe("ailift.contact@gmail.com");
  });
  it("only accepts a valid email address", () => {
    expect(resolveContactEmail("not-an-email")).toBeNull();
    expect(resolveContactEmail(" owner@example.com ")).toBe("owner@example.com");
  });
});

describe("formatMessage", () => {
  it("keeps entered details and drops empty optional lines", () => {
    expect(formatMessage(["Tjänst: Föreläsning", "", false, "Namn: Anna", undefined])).toBe("Tjänst: Föreläsning\n\nNamn: Anna");
  });
});

describe("buildMailto", () => {
  it("prefills recipient, subject and body with proper encoding", () => {
    const url = buildMailto("owner@example.com", "Bokning: Föreläsning", "Mål: Lära & testa\nRad 2");
    expect(url.startsWith("mailto:owner@example.com?")).toBe(true);
    const params = new URLSearchParams(url.split("?")[1]);
    expect(params.get("subject")).toBe("Bokning: Föreläsning");
    expect(params.get("body")).toBe("Mål: Lära & testa\nRad 2");
    expect(url).not.toContain(" ");
  });
});

describe("mailto to AiLift", () => {
  it("addresses exactly ailift.contact@gmail.com and keeps Swedish chars, line breaks and specials", () => {
    const body = "Tjänst: Åäö-workshop\nDatum: 2026-11-03 & 2026-11-05\nDeltagare: 12 (ca 50%)?#";
    const url = buildMailto(PUBLIC_CONTACT_EMAIL, "Ny bokningsförfrågan till AiLift", body);
    expect(url.split("?")[0]).toBe("mailto:ailift.contact@gmail.com");
    const params = new URLSearchParams(url.split("?")[1]);
    expect(params.get("subject")).toBe("Ny bokningsförfrågan till AiLift");
    expect(params.get("body")).toBe(body);
    expect(url).toContain("%0A");
  });
});
