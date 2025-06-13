import { describe, it, expect } from "vitest";
import { getPolygonArea } from "./getPolygonArea";

describe("getPolygonArea", () => {
  it("should return 0 for less than 3 points", () => {
    expect(getPolygonArea([])).toBe(0);
    expect(getPolygonArea([{ x: 0, y: 0 }])).toBe(0);
    expect(
      getPolygonArea([
        { x: 0, y: 0 },
        { x: 1, y: 1 },
      ])
    ).toBe(0);
  });

  it("should calculate area of a triangle", () => {
    expect(
      getPolygonArea([
        { x: 0, y: 0 },
        { x: 4, y: 0 },
        { x: 4, y: 3 },
      ])
    ).toBe(6);
  });

  it("should calculate area of a rectangle", () => {
    expect(
      getPolygonArea([
        { x: 0, y: 0 },
        { x: 4, y: 0 },
        { x: 4, y: 3 },
        { x: 0, y: 3 },
      ])
    ).toBe(12);
  });

  it("should calculate area of a regular pentagon (approximate)", () => {
    const pentagon = [
      { x: 0, y: 1 },
      { x: Math.sin((2 * Math.PI) / 5), y: Math.cos((2 * Math.PI) / 5) },
      { x: Math.sin((4 * Math.PI) / 5), y: -Math.cos(Math.PI / 5) },
      { x: -Math.sin((4 * Math.PI) / 5), y: -Math.cos(Math.PI / 5) },
      { x: -Math.sin((2 * Math.PI) / 5), y: Math.cos((2 * Math.PI) / 5) },
    ];
    const area = getPolygonArea(pentagon);
    expect(area).toBeGreaterThan(2.3);
    expect(area).toBeLessThan(2.4);
  });

  it("should calculate area of a concave polygon", () => {
    const concave = [
      { x: 0, y: 0 },
      { x: 4, y: 0 },
      { x: 4, y: 4 },
      { x: 2, y: 2 },
      { x: 0, y: 4 },
    ];
    expect(getPolygonArea(concave)).toBe(12);
  });

  it("should calculate signed area for self-intersecting polygon (star)", () => {
    const star = [
      { x: 0, y: 3 },
      { x: 1, y: 0 },
      { x: 2, y: 3 },
      { x: -1, y: 1 },
      { x: 3, y: 1 },
    ];
    expect(Math.abs(getPolygonArea(star))).toBeGreaterThan(0);
  });
});
