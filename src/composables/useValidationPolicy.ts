import { computed, isRef, type Ref, type ComputedRef } from "vue";
import type {
  ContestContent,
  SelectionPile,
  ValidationPolicy,
  ValidationResult,
  ValidationScenario,
  UndervoteBetweenPolicy,
  UndervoteBelowMinPolicy,
  BlankVoteFeedbackPolicy,
  OvervotePolicy,
  FeedbackScreen,
} from "@/types";

export function getDefaultPolicy(): ValidationPolicy {
  return {
    undervoteBetween: {
      behavior: "allow",
      feedbackScreen: "ballot_page",
      feedbackType: "on_screen_message",
    },
    undervoteBelowMin: {
      behavior: "do_not_allow",
      feedbackScreen: "ballot_page",
      feedbackType: "on_screen_message",
      editable: false,
    },
    blankVoteFeedback: {
      enabled: false,
      feedbackScreen: "ballot_page",
      feedbackType: "on_screen_message",
    },
    overvote: {
      behavior: "allow",
      feedbackScreen: "ballot_page",
      feedbackType: "on_screen_message",
    },
  };
}

function detectScenario(
  selectedCount: number,
  minMarks: number,
  maxMarks: number,
): ValidationScenario | null {
  if (selectedCount === 0 && minMarks > 0) return "blank_vote";
  if (selectedCount > maxMarks) return "overvote";
  if (selectedCount > 0 && selectedCount < minMarks) return "undervote_below_min";
  if (selectedCount >= minMarks && selectedCount < maxMarks && selectedCount > 0)
    return "undervote_between";
  return null;
}

function handleBlankVote(policy: ValidationPolicy, minMarks: number): ValidationResult | null {
  const blankPolicy: BlankVoteFeedbackPolicy = policy.blankVoteFeedback ?? {
    enabled: false,
    feedbackScreen: "ballot_page",
    feedbackType: "on_screen_message",
  };

  if (blankPolicy.enabled) {
    return {
      scenario: "blank_vote",
      allowed: false,
      warning: false,
      blocked: true,
      feedbackMessage: "warnings.blank_vote",
      feedbackScreen: blankPolicy.feedbackScreen,
      feedbackType: blankPolicy.feedbackType,
    };
  }

  const belowMinPolicy: UndervoteBelowMinPolicy = policy.undervoteBelowMin ?? {
    behavior: "do_not_allow",
    feedbackScreen: "ballot_page",
    feedbackType: "on_screen_message",
    editable: false,
  };
  return {
    scenario: "undervote_below_min",
    allowed: false,
    warning: false,
    blocked: true,
    feedbackMessage: "errors.undervote_below_min",
    feedbackScreen: belowMinPolicy.feedbackScreen,
    feedbackType: belowMinPolicy.feedbackType,
    feedbackParams: { min_marks: minMarks },
  };
}

export function handleOvervote(policy: ValidationPolicy): ValidationResult | null {
  const p: OvervotePolicy = policy.overvote ?? {
    behavior: "allow",
    feedbackScreen: "ballot_page",
    feedbackType: "on_screen_message",
  };

  if (p.behavior === "allow") return null;

  const isBlocked =
    p.behavior === "allow_with_error" ||
    p.behavior === "block_selection" ||
    p.behavior === "behave_as_radio_button";

  const alertBased = p.feedbackType === "alert" || p.feedbackType === "on_screen_message_and_alert";

  return {
    scenario: "overvote",
    allowed: !isBlocked || alertBased,
    warning: p.behavior === "allow_and_warn" || alertBased,
    blocked: isBlocked && !alertBased,
    feedbackMessage: isBlocked && !alertBased ? "errors.overvote" : "warnings.overvote",
    feedbackScreen: p.feedbackScreen,
    feedbackType: p.feedbackType,
  };
}

function evaluateScenario(
  scenario: ValidationScenario,
  policy: ValidationPolicy,
  selectedCount: number,
  minMarks: number,
): ValidationResult | null {
  switch (scenario) {
    case "undervote_between": {
      const p: UndervoteBetweenPolicy = policy.undervoteBetween ?? {
        behavior: "allow",
        feedbackScreen: "ballot_page",
        feedbackType: "on_screen_message",
      };
      if (p.behavior === "allow") return null;
      return {
        scenario,
        allowed: true,
        warning: true,
        blocked: false,
        feedbackMessage: "warnings.undervote_between",
        feedbackScreen: p.feedbackScreen,
        feedbackType: p.feedbackType,
      };
    }

    case "undervote_below_min": {
      const p: UndervoteBelowMinPolicy = policy.undervoteBelowMin ?? {
        behavior: "do_not_allow",
        feedbackScreen: "ballot_page",
        feedbackType: "on_screen_message",
        editable: false,
      };
      return {
        scenario,
        allowed: false,
        warning: false,
        blocked: true,
        feedbackMessage: "errors.undervote_below_min",
        feedbackScreen: p.feedbackScreen,
        feedbackType: p.feedbackType,
        feedbackParams: { min_marks: minMarks },
      };
    }

    case "blank_vote":
      return handleBlankVote(policy, minMarks);

    case "overvote":
      return handleOvervote(policy);

    default:
      return null;
  }
}

export function getPendingAlerts(results: ValidationResult[]): ValidationResult[] {
  return results.filter(
    (r) => r.feedbackType === "alert" || r.feedbackType === "on_screen_message_and_alert",
  );
}

export function getInlineResults(
  results: ValidationResult[],
  activeScreen: FeedbackScreen,
): ValidationResult[] {
  return results.filter((r) => {
    const screenMatch =
      r.feedbackScreen === activeScreen || r.feedbackScreen === "ballot_and_review_page";
    const typeMatch =
      r.feedbackType === "on_screen_message" || r.feedbackType === "on_screen_message_and_alert";
    return screenMatch && typeMatch;
  });
}

function resolveLocalizedMessage(
  message: Record<string, string> | undefined,
  locale: string,
): string | null {
  if (!message) return null;
  return (message[locale] || message["en"] || Object.values(message)[0]) ?? null;
}

export interface UseValidationPolicyReturn {
  policy: ComputedRef<ValidationPolicy>;
  validationResults: ComputedRef<ValidationResult[]>;
  isComplete: ComputedRef<boolean>;
  pendingAlerts: ComputedRef<ValidationResult[]>;
  inlineResults: ComputedRef<ValidationResult[]>;
  selectionMode: ComputedRef<"checkbox" | "radio">;
  blockSelectionEnabled: ComputedRef<boolean>;
  overvoteAlertBased: ComputedRef<boolean>;
  selectedCount: ComputedRef<number>;
  explicitBlank: ComputedRef<boolean>;
  scenario: ComputedRef<ValidationScenario | null>;
}

export function useValidationPolicy(
  contest: Ref<ContestContent> | ContestContent,
  selectionPile: Ref<SelectionPile> | SelectionPile,
  activeScreen: Ref<FeedbackScreen> | FeedbackScreen,
  locale?: Ref<string> | string,
): UseValidationPolicyReturn {
  const resolveLocale = computed(() => {
    if (!locale) return "en";
    return isRef(locale) ? locale.value : locale;
  });
  const resolveContest = computed(() => (isRef(contest) ? contest.value : contest));
  const resolvePile = computed(() => (isRef(selectionPile) ? selectionPile.value : selectionPile));
  const resolveScreen = computed(() => (isRef(activeScreen) ? activeScreen.value : activeScreen));

  const policy = computed<ValidationPolicy>(() => {
    const defaults = getDefaultPolicy();
    const custom = resolveContest.value.validationPolicy;
    if (!custom) return defaults;
    return {
      undervoteBetween: custom.undervoteBetween ?? defaults.undervoteBetween,
      undervoteBelowMin: custom.undervoteBelowMin ?? defaults.undervoteBelowMin,
      blankVoteFeedback: custom.blankVoteFeedback ?? defaults.blankVoteFeedback,
      overvote: custom.overvote ?? defaults.overvote,
    };
  });

  const selectedCount = computed(() => resolvePile.value.optionSelections.length);

  const explicitBlank = computed(() => resolvePile.value.explicitBlank === true);

  const minMarks = computed(() => resolveContest.value.markingType.minMarks);

  const maxMarks = computed(() => resolveContest.value.markingType.maxMarks);

  const blankPolicy = computed(() => policy.value.blankVoteFeedback);

  const scenario = computed(() =>
    explicitBlank.value
      ? null
      : detectScenario(selectedCount.value, minMarks.value, maxMarks.value),
  );

  const validationResults = computed<ValidationResult[]>(() => {
    const s = scenario.value;
    if (s === null) return [];
    const result = evaluateScenario(s, policy.value, selectedCount.value, minMarks.value);
    if (!result) return [];

    if (result.scenario === "blank_vote" && blankPolicy.value) {
      const bp = blankPolicy.value;

      if (bp.feedbackType === "on_screen_message_and_alert") {
        const inlineResult: ValidationResult = {
          ...result,
          feedbackType: "on_screen_message",
        };
        const alertResult: ValidationResult = {
          ...result,
          feedbackType: "alert",
        };

        const inlineMsg = bp.inlineMessage ?? bp.message;
        if (inlineMsg) {
          const resolved = resolveLocalizedMessage(inlineMsg, resolveLocale.value);
          if (resolved) {
            inlineResult.feedbackMessage = resolved;
            inlineResult.isRawMessage = true;
          }
        }

        if (bp.message) {
          const resolved = resolveLocalizedMessage(bp.message, resolveLocale.value);
          if (resolved) {
            alertResult.feedbackMessage = resolved;
            alertResult.isRawMessage = true;
          }
        }

        return [inlineResult, alertResult];
      }

      const msg =
        bp.feedbackType === "on_screen_message" ? (bp.inlineMessage ?? bp.message) : bp.message;
      if (msg) {
        const resolved = resolveLocalizedMessage(msg, resolveLocale.value);
        if (resolved) {
          return [{ ...result, feedbackMessage: resolved, isRawMessage: true }];
        }
      }
    }

    return [result];
  });

  const isComplete = computed(() => !validationResults.value.some((r) => r.blocked));

  const pendingAlerts = computed(() => getPendingAlerts(validationResults.value));

  const inlineResults = computed(() =>
    getInlineResults(validationResults.value, resolveScreen.value),
  );

  const selectionMode = computed<"checkbox" | "radio">(() => {
    const overvotePolicy = policy.value.overvote;
    if (overvotePolicy?.behavior === "behave_as_radio_button" && maxMarks.value === 1) {
      return "radio";
    }
    return "checkbox";
  });

  const blockSelectionEnabled = computed(() => {
    const overvotePolicy = policy.value.overvote;
    return (
      (overvotePolicy?.behavior === "block_selection" ||
        overvotePolicy?.behavior === "behave_as_radio_button") &&
      selectedCount.value >= maxMarks.value
    );
  });

  const overvoteAlertBased = computed(() => {
    const overvotePolicy = policy.value.overvote;
    const blockingBehavior =
      overvotePolicy?.behavior === "block_selection" ||
      overvotePolicy?.behavior === "behave_as_radio_button";
    const alertFeedback =
      overvotePolicy?.feedbackType === "alert" ||
      overvotePolicy?.feedbackType === "on_screen_message_and_alert";
    return blockingBehavior && alertFeedback;
  });

  return {
    policy,
    validationResults,
    isComplete,
    pendingAlerts,
    inlineResults,
    selectionMode,
    blockSelectionEnabled,
    overvoteAlertBased,
    selectedCount,
    explicitBlank,
    scenario,
  };
}
