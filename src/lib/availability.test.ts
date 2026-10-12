import { describe, it, expect } from "vitest";
import { isDateAvailable } from "./availability";

const today = new Date(2026, 9, 12); // Mon 12 Oct 2026
const base = { weekdays: [1, 2, 3, 4, 5], blocked: [] as string[], taken: [] as string[], today };

describe("isDateAvailable", () => {
  it("rejects today and past dates", () => {
    expect(isDateAvailable(new Date(2026, 9, 12), base)).toBe(false);
    expect(isDateAvailable(new Date(2026, 9, 1), base)).toBe(false);
  });
  it("accepts a future open weekday", () => {
    expect(isDateAvailable(new Date(2026, 9, 13), base)).toBe(true);
  });
  it("rejects closed weekdays", () => {
    expect(isDateAvailable(new Date(2026, 9, 17), base)).toBe(false); // Saturday
  });
  it("rejects blocked dates", () => {
    expect(isDateAvailable(new Date(2026, 9, 14), { ...base, blocked: ["2026-10-14"] })).toBe(false);
  });
  it("rejects dates already confirmed for another booking", () => {
    expect(isDateAvailable(new Date(2026, 9, 15), { ...base, taken: ["2026-10-15"] })).toBe(false);
  });
});
