import { describe, it, expect } from "vitest";
import { safeJsonParse } from "./safeJsonParse";

describe("safeJsonParse", () => {
  it("parses valid JSON string", () => {
    expect(safeJsonParse('{"a":1,"b":2}')).toEqual({ a: 1, b: 2 });
  });

  it("returns fallback for invalid JSON string", () => {
    expect(safeJsonParse("{a:1,}", { foo: "bar" })).toEqual({ foo: "bar" });
  });

  it("returns fallback for null input", () => {
    expect(safeJsonParse(null, { x: 1 })).toEqual({ x: 1 });
  });

  it("returns fallback for undefined input", () => {
    expect(safeJsonParse(undefined, { y: 2 })).toEqual({ y: 2 });
  });

  it("returns empty object as default fallback", () => {
    expect(safeJsonParse(undefined)).toEqual({});
    expect(safeJsonParse(null)).toEqual({});
    expect(safeJsonParse("")).toEqual({});
  });

  it("parses JSON array", () => {
    expect(safeJsonParse("[1,2,3]")).toEqual([1, 2, 3]);
  });

  it("returns fallback for empty string", () => {
    expect(safeJsonParse("", [42])).toEqual([42]);
  });

  it("infers type from fallback", () => {
    const fallback = { foo: 123 };
    const result = safeJsonParse<{ foo: number }>(null, fallback);
    expect(result.foo).toBe(123);
  });
});
