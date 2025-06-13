type DebounceFunction<T extends (...args: unknown[]) => unknown> = (
  ...args: Parameters<T>
) => void;

/**
 *
 * @param func
 * @param delay
 * @returns
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

// example
// const args = [1, 2, 3];
// const debouncedFn = debounce((...args: number[]) => {
//   console.log(args);
// }, 1000);

// debouncedFn(1, 2, 3);
// debouncedFn(4, 5, 6);
// debouncedFn(7, 8, 9);
// >>> output: 7, 8, 9 after 1000ms
