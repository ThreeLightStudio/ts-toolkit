/**
 * @description
 * Loads an image from a URL and returns its pixel data as a Uint8ClampedArray (RGBA).
 *
 * **Note:** This function only works in browser environments, as it relies on the DOM APIs (`Image`, `canvas`).
 *
 * @param url Image URL
 * @returns Promise<Uint8ClampedArray>
 *
 * @example
 * const pixels = await getImagePixels('https://example.com/image.png');
 * -> Uint8ClampedArray(RGBA)
 */
export const getImagePixels = async (
  url: string
): Promise<Uint8ClampedArray> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject(new Error("Canvas not supported"));
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, img.width, img.height);
      resolve(imageData.data);
    };
    img.onerror = (error: unknown) =>
      reject(Object.assign(new Error("Image load error"), { cause: error }));
    img.src = url;
  });
};
