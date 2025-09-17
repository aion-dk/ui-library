// https://www.w3.org/TR/WCAG20/#relativeluminancedef

const RED = 0.2126;
const GREEN = 0.7152;
const BLUE = 0.0722;
const GAMMA = 2.4;

const getLuminance = (r: number, g: number, b: number) => {
  const result: number[] = [r, g, b].map((value) => {
    value /= 255;
    return value <= 0.03928 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, GAMMA);
  });
  return result[0] * RED + result[1] * GREEN + result[2] * BLUE;
};

const getContrast = (color1: [number, number, number], color2: [number, number, number]) => {
  const lum1 = getLuminance(...color1);
  const lum2 = getLuminance(...color2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
};

const hexToRgb = (hexColor: `#${string}`) => {
  return /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexColor);
};

const getTextContrastColor = (backgroundColorHex: string) => {
  const result = hexToRgb(backgroundColorHex as `#${string}`);

  if (result) {
    const rgbColor = [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)];
    const blackContrast = getContrast([rgbColor[0], rgbColor[1], rgbColor[2]], [0, 0, 0]);
    const whiteContrast = getContrast([rgbColor[0], rgbColor[1], rgbColor[2]], [255, 255, 255]);
    return blackContrast > whiteContrast ? "black" : "white";
  }

  return "black";
};

export { hexToRgb, getTextContrastColor };
