import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { getImagePixels } from "./getImagePixels";

class MockImage {
  width = 2;
  height = 2;
  crossOrigin = "";
  onload: () => void = () => {};
  onerror: (err?: unknown) => void = () => {};
  set src(_url: string) {
    setTimeout(() => this.onload());
  }
}

describe("getImagePixels", () => {
  let originalImage: typeof window.Image;
  let originalCreateElement: typeof document.createElement;

  beforeEach(() => {
    originalImage = window.Image;
    originalCreateElement = document.createElement;
  });

  afterEach(() => {
    window.Image = originalImage;
    document.createElement = originalCreateElement;
    vi.restoreAllMocks();
  });

  it("resolves with pixel data when image loads successfully", async () => {
    window.Image = MockImage as unknown as typeof window.Image;

    const mockImageData = { data: new Uint8ClampedArray([1, 2, 3, 4]) };
    const mockCtx = {
      drawImage: vi.fn(),
      getImageData: vi.fn(() => mockImageData),
    };
    const mockCanvas = {
      width: 0,
      height: 0,
      getContext: vi.fn(() => mockCtx),
    };

    vi.spyOn(document, "createElement").mockImplementation(
      () => mockCanvas as unknown as HTMLCanvasElement
    );

    const result = await getImagePixels("dummy-url");
    expect(result).toEqual(mockImageData.data);
  });

  it("rejects if canvas context is not supported", async () => {
    window.Image = MockImage as unknown as typeof window.Image;

    const mockCanvas = {
      width: 0,
      height: 0,
      getContext: vi.fn(() => null),
    };

    vi.spyOn(document, "createElement").mockImplementation(
      () => mockCanvas as unknown as HTMLCanvasElement
    );

    await expect(getImagePixels("dummy-url")).rejects.toThrow(
      "Canvas not supported"
    );
  });

  it("rejects if image fails to load", async () => {
    class ErrorImage extends MockImage {
      set src(_url: string) {
        setTimeout(() => this.onerror("fail"));
      }
    }
    window.Image = ErrorImage as unknown as typeof window.Image;

    vi.spyOn(document, "createElement").mockImplementation(
      () => ({} as HTMLCanvasElement)
    );

    await expect(getImagePixels("dummy-url")).rejects.toThrow(
      "Image load error"
    );
  });
});
