/**
 * @description
 * Checks if an object is empty (has no own properties).
 *
 * @param obj The object to check
 * @returns true if the object is empty, false otherwise
 *
 * @example
 * isEmptyObject({}); // true
 * isEmptyObject({ a: 1 }); // false
 * isEmptyObject(null); // false
 * isEmptyObject(undefined); // false
 * isEmptyObject(1); // false
 * isEmptyObject("string"); // false
 * isEmptyObject(true); // false
 * isEmptyObject(false); // false
 */
export const isEmptyObject = (obj: Record<string, unknown>): boolean => {
  if (obj === null || obj === undefined) return false;
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};
