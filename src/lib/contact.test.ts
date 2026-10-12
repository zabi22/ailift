import { describe, it, expect } from "vitest";
import { buildMailto, formatMessage, resolveContactEmail, PUBLIC_CONTACT_EMAIL } from "./contact";

describe("contact configuration", () => {
  it("ships with an empty public contact email", () => {
    expect(PUBLIC_CONTACT_EMAIL).toBe("");
    expect(resolveContactEmail()).toBeNull();
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
