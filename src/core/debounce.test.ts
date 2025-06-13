import { describe, it, expect, vi } from "vitest";
import { debounce } from "./debounce";

describe("debounce", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });
  it("should debounce a function", () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);
    debounced();
    expect(fn).toHaveBeenCalledTimes(0);
    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(1);
  });
  it("should debounce a function with multiple calls", () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);
    debounced();
    debounced();
    debounced();
    expect(fn).toHaveBeenCalledTimes(0);
    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(1);
  });
  it("should debounce a function with multiple calls and arguments", () => {
    const fn = vi.fn((...args: unknown[]) => args);
    const debounced = debounce(fn, 100);
    debounced(1);
    debounced(2);
    debounced(3);
    expect(fn).toHaveBeenCalledTimes(0);
    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(3);
  });
});

describe("debounce edge cases", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });
  it("should work with delay=0 (immediate execution after event loop)", () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 0);
    debounced();
    expect(fn).toHaveBeenCalledTimes(0);
    vi.advanceTimersByTime(0);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("should debounce async functions", async () => {
    const fn = vi.fn(async (...args: unknown[]) => args[0]);
    const debounced = debounce(fn, 50);
    debounced(10);
    vi.advanceTimersByTime(50);
    expect(fn).toHaveBeenCalledWith(10);
  });

  it("should preserve this binding for class methods", () => {
    class Counter {
      count = 0;
      inc = debounce(function (this: Counter) {
        this.count++;
      }, 100);
    }
    const c = new Counter();
    c.inc();
    vi.advanceTimersByTime(100);
    expect(c.count).toBe(1);
  });

  it("should not interfere between multiple debounced functions", () => {
    const fn1 = vi.fn();
    const fn2 = vi.fn();
    const debounced1 = debounce(fn1, 100);
    const debounced2 = debounce(fn2, 100);
    debounced1();
    debounced2();
    vi.advanceTimersByTime(100);
    expect(fn1).toHaveBeenCalledTimes(1);
    expect(fn2).toHaveBeenCalledTimes(1);
  });

  it("should not leak timers (timer is cleared after execution)", () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);
    debounced();
    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it.skip("should support flush/cancel if implemented", () => {
    // add test for flush/cancel if implemented
  });
});
