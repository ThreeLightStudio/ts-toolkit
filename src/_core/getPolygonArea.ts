/**
 * @description
 * Calculates the area of a polygon using the Shoelace formula.
 *
 * @param points Array of vertex coordinates (clockwise or counterclockwise order, last point can be omitted)
 * @returns The area of the polygon (may be negative; the absolute value is the actual area)
 *
 * @note
 * This formula gives the correct area only for simple (non-self-intersecting) polygons.
 * For self-intersecting polygons (e.g., star shapes), the result is the algebraic (signed) area, not the actual interior area.
 *
 * @example
 * getPolygonArea([
 *   { x: 0, y: 0 },
 *   { x: 4, y: 0 },
 *   { x: 4, y: 3 }
 * ]); // 6
 */
export const getPolygonArea = (points: { x: number; y: number }[]): number => {
  const n = points.length;
  if (n < 3) return 0;
  let sum = 0;
  for (let i = 0; i < n; i++) {
    const { x: x1, y: y1 } = points[i];
    const { x: x2, y: y2 } = points[(i + 1) % n];
    sum += x1 * y2 - x2 * y1;
  }
  return Math.abs(sum) / 2;
};
