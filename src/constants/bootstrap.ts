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
  "theme",
  "theme-danger",
  "ballot",
  "primary-10",
  "primary-30",
  "primary-50",
  "primary-70",
  "primary-90",
  "secondary-10",
  "secondary-30",
  "secondary-50",
  "secondary-70",
  "secondary-90",
] as const;

const BOOTSTRAP_BASIC_SIZES = ["sm", "md", "lg"] as const;

const BOOTSTRAP_EXPANDED_SIZES = ["xs", "sm", "md", "lg", "xl", "xxl", "qhd", "uhd"] as const;

const FLOATING_VUE_TOOLTIP_POSITION = [
  "auto",
  "auto-start",
  "auto-end",
  "top",
  "top-start",
  "top-end",
  "right",
  "right-start",
  "right-end",
  "bottom",
  "bottom-start",
  "bottom-end",
  "left",
  "left-start",
  "left-end",
];

export {
  BOOTSTRAP_COLORS,
  BOOTSTRAP_BASIC_SIZES,
  BOOTSTRAP_EXPANDED_SIZES,
  FLOATING_VUE_TOOLTIP_POSITION,
};
