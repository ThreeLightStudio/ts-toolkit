type DebounceFunction<T extends (...args: unknown[]) => unknown> = (
  ...args: Parameters<T>
) => void;

/**
 * @description
 * Debounce a function to prevent it from being called too often.
 *
 * @param func - The function to debounce.
 * @param delay - The delay in milliseconds before the function is called.
 * @returns A debounced function.
 *
 * @example
 * const debouncedFn = debounce((...args: number[]) => {
 *   console.log(args);
 * }, 1000);
 *
 * debouncedFn(1, 2, 3);
 * debouncedFn(4, 5, 6);
 * debouncedFn(7, 8, 9);
 * >>> output: 7, 8, 9 after 1000ms
 */
export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  delay = 300
): DebounceFunction<T> => {
  let timeout: ReturnType<typeof setTimeout>;
  return function (this: ThisType<T>, ...args: Parameters<T>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  } as DebounceFunction<T>;
};
