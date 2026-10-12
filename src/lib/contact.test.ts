import { describe, it, expect } from "vitest";
import { buildMailto } from "./contact";

describe("buildMailto", () => {
  it("addresses the draft to the configured owner and encodes subject and body", () => {
    const url = buildMailto("owner@example.com", "Bokning: Föreläsning", ["Namn: Anna", false, "Mål: Lära & testa"]);
    expect(url.startsWith("mailto:owner@example.com?")).toBe(true);
    const params = new URLSearchParams(url.split("?")[1]);
    expect(params.get("subject")).toBe("Bokning: Föreläsning");
    expect(params.get("body")).toBe("Namn: Anna\nMål: Lära & testa");
  });
});
