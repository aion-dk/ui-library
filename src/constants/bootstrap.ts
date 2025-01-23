const BOOTSTRAP_COLORS = [
  "primary",
  "secondary",
  "success",
  "danger",
  "warning",
  "info",
  "light",
  "dark",
  "accent",
  "brand-dark",
] as const;

const BOOTSTRAP_BASIC_SIZES = ["sm", "md", "lg"] as const;

const BOOTSTRAP_EXPANDED_SIZES = ["xs", "sm", "md", "lg", "xl", "xxl", "qhd", "uhd"] as const;

// AVSpinner
const SPINNER_VARIANTS = ["spinner-border", "spinner-grow"] as const;

export {
  BOOTSTRAP_COLORS,
  BOOTSTRAP_BASIC_SIZES,
  BOOTSTRAP_EXPANDED_SIZES,

  // Components
  SPINNER_VARIANTS,
};
