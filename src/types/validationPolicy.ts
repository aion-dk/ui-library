export type FeedbackScreen = "ballot_page" | "review_page" | "ballot_and_review_page";

export type FeedbackType = "on_screen_message" | "alert" | "on_screen_message_and_alert";

export type ValidationPolicyBehavior =
  | "allow"
  | "allow_and_warn"
  | "do_not_allow"
  | "allow_with_error"
  | "block_selection"
  | "behave_as_radio_button";

export type UndervoteBetweenBehavior = "allow" | "allow_and_warn";
export type UndervoteBelowMinBehavior = "do_not_allow";
export type OvervoteBehavior =
  | "allow"
  | "allow_and_warn"
  | "allow_with_error"
  | "block_selection"
  | "behave_as_radio_button";

export type ValidationScenario =
  | "undervote_between"
  | "undervote_below_min"
  | "blank_vote"
  | "overvote";

export interface BaseValidationPolicy {
  feedbackScreen: FeedbackScreen;
  feedbackType: FeedbackType;
}

export interface UndervoteBetweenPolicy extends BaseValidationPolicy {
  behavior: UndervoteBetweenBehavior;
}

export interface UndervoteBelowMinPolicy extends BaseValidationPolicy {
  behavior: UndervoteBelowMinBehavior;
  editable: false;
}

export interface BlankVoteFeedbackPolicy {
  enabled: boolean;
  feedbackScreen: FeedbackScreen;
  feedbackType: FeedbackType;
  message?: Record<string, string>;
}

export interface OvervotePolicy extends BaseValidationPolicy {
  behavior: OvervoteBehavior;
}

export interface ValidationPolicy {
  undervoteBetween?: UndervoteBetweenPolicy;
  undervoteBelowMin?: UndervoteBelowMinPolicy;
  blankVoteFeedback?: BlankVoteFeedbackPolicy;
  overvote?: OvervotePolicy;
}

export interface ValidationResult {
  scenario: ValidationScenario;
  allowed: boolean;
  warning: boolean;
  blocked: boolean;
  feedbackMessage: string;
  feedbackScreen: FeedbackScreen;
  feedbackType: FeedbackType;
}

declare module "@assemblyvoting/types" {
  interface ContestContent {
    validationPolicy?: ValidationPolicy;
  }
}
