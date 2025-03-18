const IMAGE_OPTIONS = ["square", "passport"] as const;

const LOOKUP_DEFAULT_FALLBACKS: Array<string> = [
  "title",
  "label",
  "group",
  "first_available_locale",
  "reference",
  "internal_name",
  "attribute_name",
  "id",
] as const;

// AVSpinner
const SPINNER_VARIANTS = ["spinner-border", "spinner-grow"] as const;

// AVLinkVisualizer
const LINK_VISUALIZER_KEYS = [
  "github",
  "instagram",
  "linkedin",
  "twitter",
  "envelope",
  "facebook",
  "vimeo",
  "youtube",
  "tiktok",
] as const;

// AVOptionLiveResults
const LIVE_RESULT_MODES = ["internal", "external"] as const;

const SPLIT_HELPER_STATE = ["ballot", "assign", "overview"] as const;

const RECOMMENDATION_PUBLIC_TYPES = ["public", "private", "public_count"] as const;

// AVAnimatedMenuButton
const ANIMATED_MENU_BUTTON_VARIANTS = ["cross", "arrow-down"] as const;

export {
  IMAGE_OPTIONS,
  LOOKUP_DEFAULT_FALLBACKS,
  SPINNER_VARIANTS,
  LINK_VISUALIZER_KEYS,
  LIVE_RESULT_MODES,
  SPLIT_HELPER_STATE,
  RECOMMENDATION_PUBLIC_TYPES,
  ANIMATED_MENU_BUTTON_VARIANTS,
};
