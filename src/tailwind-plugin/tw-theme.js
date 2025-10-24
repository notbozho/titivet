import plugin from "tailwindcss/plugin";
import siteConfig from "../config/global";

// --- Helpers ---
const findFont = (fontStr) =>
  fontStr.replace(/\+/g, " ").replace(/:[^:]+/g, "");

const buildFontFamilies = (fonts) => {
  return Object.entries(fonts.font_family)
    .filter(([key]) => !key.includes("_type"))
    .reduce((acc, [key, value]) => {
      acc[key] = `${findFont(value)}, ${
        fonts.font_family[`${key}_type`] || "sans-serif"
      }`;
      return acc;
    }, {});
};

const buildColorVars = (colors, prefix = "") =>
  Object.entries(colors).reduce((vars, [key, val]) => {
    const cssKey = key.replace(/_/g, "-");
    vars[`--color-${prefix}${cssKey}`] = val;
    return vars;
  }, {});

const buildFontSizeVars = (base, scale) => {
  const baseNum = Number(base);
  const scaleNum = Number(scale);
  const sizes = {};
  let currentSize = scaleNum;
  for (let i = 6; i >= 1; i--) {
    sizes[`h${i}`] = `${currentSize}rem`;
    sizes[`h${i}-sm`] = `${currentSize * 0.9}rem`;
    currentSize *= scaleNum;
  }
  sizes.base = `${baseNum}px`;
  sizes["base-sm"] = `${baseNum * 0.8}px`;
  return sizes;
};

// --- Extract site config ---
const fontFamilies = buildFontFamilies(siteConfig.fonts);
const fontSizes = buildFontSizeVars(
  siteConfig.fonts.font_size.base,
  siteConfig.fonts.font_size.scale,
);
const colorVars = buildColorVars(siteConfig.colors.default);

// Combine all vars for :root
const baseVars = {
  ...Object.fromEntries(
    Object.entries(fontFamilies).map(([key, val]) => [`--font-${key}`, val]),
  ),
  ...Object.fromEntries(
    Object.entries(fontSizes).map(([key, val]) => [`--text-${key}`, val]),
  ),
  ...colorVars,
};

// Create color map for Tailwind utilities
const colorsMap = Object.keys(siteConfig.colors.default).reduce((map, key) => {
  const cssKey = key.replace(/_/g, "-");
  map[cssKey] = `var(--color-${cssKey})`;
  return map;
}, {});

// --- Plugin ---
export default plugin.withOptions(() => {
  return function ({ addBase, addUtilities, matchUtilities }) {
    addBase({
      ":root": baseVars,
    });

    // font + size utils
    const fontUtils = {};
    Object.keys(fontFamilies).forEach((key) => {
      fontUtils[`.font-${key}`] = { fontFamily: `var(--font-${key})` };
    });
    Object.keys(fontSizes).forEach((key) => {
      fontUtils[`.text-${key}`] = { fontSize: `var(--text-${key})` };
    });
    addUtilities(fontUtils, {
      variants: ["responsive", "hover", "focus", "active", "disabled"],
    });

    // color utilities (bg, text, border, fill, stroke)
    matchUtilities(
      {
        bg: (value) => ({ backgroundColor: value }),
        text: (value) => ({ color: value }),
        border: (value) => ({ borderColor: value }),
        fill: (value) => ({ fill: value }),
        stroke: (value) => ({ stroke: value }),
      },
      { values: colorsMap, type: "color" },
    );

    // gradient utilities (from, via, to)
    matchUtilities(
      {
        from: (value) => ({
          "--tw-gradient-from": value,
          "--tw-gradient-to": "rgb(255 255 255 / 0)",
          "--tw-gradient-stops":
            "var(--tw-gradient-from), var(--tw-gradient-to)",
        }),
        via: (value) => ({
          "--tw-gradient-stops": `var(--tw-gradient-from), ${value}, var(--tw-gradient-to)`,
        }),
        to: (value) => ({
          "--tw-gradient-to": value,
        }),
      },
      { values: colorsMap, type: "color" },
    );
  };
});
