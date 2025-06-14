/**
 * @description
 * Safely parses a JSON string, returning a fallback value if parsing fails.
 *
 * @param str The JSON string to parse.
 * @param fallback The value to return if parsing fails (default: `{}`).
 * @returns The parsed value, or the fallback.
 *
 * @example
 * const user = safeJsonParse(localStorage.getItem('user'));
 * -> { name: 'John', age: 30 }
 */
export const safeJsonParse = <T = unknown>(
  str: string | null | undefined,
  fallback: T = {} as T
): T => {
  try {
    return str ? JSON.parse(str) : fallback;
  } catch {
    return fallback;
  }
};
