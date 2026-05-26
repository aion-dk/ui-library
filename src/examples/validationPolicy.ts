import type { ValidationPolicy } from "@/types";

type ValidationPolicyPreset =
  | "undervote_warn"
  | "overvote_block"
  | "radio_button"
  | "blank_vote_feedback"
  | "full";

const undervoteWarn: ValidationPolicy = {
  undervoteBetween: {
    behavior: "allow_and_warn",
    feedbackScreen: "ballot_and_review_page",
    feedbackType: "on_screen_message",
  },
};

const overvoteBlock: ValidationPolicy = {
  overvote: {
    behavior: "block_selection",
    feedbackScreen: "ballot_page",
    feedbackType: "on_screen_message",
  },
};

const radioButton: ValidationPolicy = {
  overvote: {
    behavior: "behave_as_radio_button",
    feedbackScreen: "ballot_page",
    feedbackType: "on_screen_message",
  },
};

const blankVoteFeedbackPolicy: ValidationPolicy = {
  blankVoteFeedback: {
    enabled: true,
    feedbackScreen: "ballot_and_review_page",
    feedbackType: "on_screen_message_and_alert",
    message: {
      en: "You are about to cast a blank vote. Are you sure you want to continue?",
    },
  },
};

const fullPolicy: ValidationPolicy = {
  undervoteBetween: {
    behavior: "allow_and_warn",
    feedbackScreen: "ballot_and_review_page",
    feedbackType: "on_screen_message",
  },
  overvote: {
    behavior: "block_selection",
    feedbackScreen: "ballot_and_review_page",
    feedbackType: "on_screen_message",
  },
  blankVoteFeedback: {
    enabled: true,
    feedbackScreen: "ballot_and_review_page",
    feedbackType: "on_screen_message_and_alert",
    message: {
      en: "You are about to cast a blank vote. Are you sure you want to continue?",
    },
  },
};

const getValidationPolicy = (preset: ValidationPolicyPreset): ValidationPolicy => {
  const presets: Record<ValidationPolicyPreset, ValidationPolicy> = {
    undervote_warn: undervoteWarn,
    overvote_block: overvoteBlock,
    radio_button: radioButton,
    blank_vote_feedback: blankVoteFeedbackPolicy,
    full: fullPolicy,
  };

  return presets[preset];
};

export { getValidationPolicy };
export type { ValidationPolicyPreset };
