/**
 * @description
 * YIQ 공식으로 RGB 색상의 밝기를 계산합니다.
 *
 * @param rgb [R, G, B] 배열 (0~255)
 * @returns 밝으면 true, 어두우면 false
 *
 * @example
 * getYiqLuminance([255, 255, 255]); // true (white)
 * getYiqLuminance([0, 0, 0]);       // false (black)
 * getYiqLuminance([128, 128, 128]); // false (gray)
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
