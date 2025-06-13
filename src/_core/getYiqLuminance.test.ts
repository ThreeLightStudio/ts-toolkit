import { describe, it, expect } from "vitest";
import { getYiqLuminance } from "./getYiqLuminance";

describe("getYiqLuminance", () => {
  it("should return 'light' for white", () => {
    expect(getYiqLuminance({ r: 255, g: 255, b: 255 })).toBe("light");
  });
  it("should return 'dark' for black", () => {
    expect(getYiqLuminance({ r: 0, g: 0, b: 0 })).toBe("dark");
  });
  it("should return 'gray' for exact threshold", () => {
    expect(getYiqLuminance({ r: 127.5, g: 127.5, b: 127.5 })).toBe("gray");
  });
  it("should throw error for invalid rgb values", () => {
    expect(() => getYiqLuminance({ r: -1, g: 0, b: 0 })).toThrow();
    expect(() => getYiqLuminance({ r: 0, g: 256, b: 0 })).toThrow();
    expect(() => getYiqLuminance({ r: 0, g: 0, b: 999 })).toThrow();
  });
});
