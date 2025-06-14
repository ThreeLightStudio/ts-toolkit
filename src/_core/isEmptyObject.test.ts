import { describe, it, expect } from "vitest";
import { isEmptyObject } from "./isEmptyObject";

describe("isEmptyObject", () => {
  it("returns true for an empty object", () => {
    expect(isEmptyObject({})).toBe(true);
  });

  it("returns false for an object with properties", () => {
    expect(isEmptyObject({ a: 1 })).toBe(false);
  });

  it("returns false for null", () => {
    expect(isEmptyObject(null as unknown as Record<string, unknown>)).toBe(
      false
    );
  });

  it("returns false for undefined", () => {
    expect(isEmptyObject(undefined as unknown as Record<string, unknown>)).toBe(
      false
    );
  });

  it("returns false for a number", () => {
    expect(isEmptyObject(1 as unknown as Record<string, unknown>)).toBe(false);
  });

  it("returns false for a string", () => {
    expect(isEmptyObject("string" as unknown as Record<string, unknown>)).toBe(
      false
    );
  });

  it("returns false for true", () => {
    expect(isEmptyObject(true as unknown as Record<string, unknown>)).toBe(
      false
    );
  });

  it("returns false for false", () => {
    expect(isEmptyObject(false as unknown as Record<string, unknown>)).toBe(
      false
    );
  });

  it("returns false for an array", () => {
    expect(isEmptyObject([] as unknown as Record<string, unknown>)).toBe(false);
  });

  it("returns false for a function", () => {
    expect(
      isEmptyObject((() => {}) as unknown as Record<string, unknown>)
    ).toBe(false);
  });

  it("returns false for an object created with a custom constructor", () => {
    class Custom {}
    expect(
      isEmptyObject(new Custom() as unknown as Record<string, unknown>)
    ).toBe(false);
  });
});
