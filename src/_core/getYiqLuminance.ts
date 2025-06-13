/**
 * @description
 * Calculates the brightness of an RGB color using the YIQ formula.
 *
 * @param rgb An object with [R, G, B] values (0~255)
 * @returns "light" if bright, "dark" if dark, "gray" if in the middle
 *
 * @example
 * getYiqLuminance({ r: 255, g: 255, b: 255 }); // "light" (white)
 * getYiqLuminance({ r: 0, g: 0, b: 0 });       // "dark" (black)
 * getYiqLuminance({ r: 128, g: 128, b: 128 }); // "gray"
 */
export const getYiqLuminance = ({
  r,
  g,
  b,
}: {
  r: number;
  g: number;
  b: number;
}): "light" | "dark" | "gray" => {
  if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
    throw new Error("Invalid RGB values");
  }
  const brightness = r * 0.299 + g * 0.587 + b * 0.114;
  switch (true) {
    case brightness > 128:
      return "light";
    case brightness < 127:
      return "dark";
    default:
      return "gray";
  }
};
