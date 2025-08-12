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

// AVSplitHelper
const SPLIT_HELPER_STATE = ["ballot", "assign", "overview"] as const;

// AVRecommendationList
const RECOMMENDATION_PUBLIC_TYPES = ["public", "private", "public_count"] as const;
const CANDIDACY_RESOURCES = ["candidate", "party", "resource", "recommender", "group"] as const;

// AVAnimatedMenuButton
const ANIMATED_MENU_BUTTON_VARIANTS = ["cross", "arrow-down"] as const;

// AVCalculateResultContent
const CALCULATE_RESULT_ROLE = ["mixer", "decrypter", "all", "observer"] as const;
const CALCULATE_RESULT_STATUS = [
  "initial",
  "mixing",
  "decrypting",
  "aggregating",
  "finished",
] as const;

export {
  IMAGE_OPTIONS,
  LOOKUP_DEFAULT_FALLBACKS,
  SPINNER_VARIANTS,
  LINK_VISUALIZER_KEYS,
  LIVE_RESULT_MODES,
  SPLIT_HELPER_STATE,
  RECOMMENDATION_PUBLIC_TYPES,
  CANDIDACY_RESOURCES,
  ANIMATED_MENU_BUTTON_VARIANTS,
  CALCULATE_RESULT_ROLE,
  CALCULATE_RESULT_STATUS,
};
