import { describe, it, expect } from "vitest";
import { ref } from "vue";
import {
  useValidationPolicy,
  getDefaultPolicy,
  getPendingAlerts,
  getInlineResults,
} from "@/composables/useValidationPolicy";
import { getContest, getSelectionPile } from "@/examples";
import type { ContestContent, ValidationPolicy, ValidationResult } from "@/types";

function makeContest(overrides: Partial<ContestContent> = {}): ContestContent {
  const base = getContest(["blank", "multi"]);
  return { ...base, ...overrides };
}

function makePolicy(overrides: Partial<ValidationPolicy> = {}): ValidationPolicy {
  return { ...getDefaultPolicy(), ...overrides };
}

describe("useValidationPolicy", () => {
  describe("getDefaultPolicy", () => {
    it("returns policy matching current behavior", () => {
      const policy = getDefaultPolicy();
      expect(policy.undervoteBetween?.behavior).toBe("allow");
      expect(policy.undervoteBelowMin?.behavior).toBe("do_not_allow");
      expect(policy.blankVoteFeedback?.enabled).toBe(false);
      expect(policy.overvote?.behavior).toBe("allow");
    });
  });

  describe("scenario detection", () => {
    it("detects undervote between min and max", () => {
      const contest = makeContest();
      const pile = getSelectionPile(["single"]);
      const { scenario } = useValidationPolicy(ref(contest), ref(pile), ref("ballot_page"));
      expect(scenario.value).toBe("undervote_between");
    });

    it("detects undervote below minimum", () => {
      const contest = makeContest({
        markingType: { ...getContest(["multi"]).markingType, minMarks: 2, maxMarks: 5 },
      });
      const pile = getSelectionPile(["single"]);
      const { scenario } = useValidationPolicy(ref(contest), ref(pile), ref("ballot_page"));
      expect(scenario.value).toBe("undervote_below_min");
    });

    it("detects blank vote (zero selections, minMarks > 0)", () => {
      const contest = makeContest();
      const pile = getSelectionPile([]);
      const { scenario } = useValidationPolicy(ref(contest), ref(pile), ref("ballot_page"));
      expect(scenario.value).toBe("blank_vote");
    });

    it("detects overvote", () => {
      const contest = makeContest();
      const pile = {
        multiplier: 1,
        optionSelections: [
          { reference: "exampleOption1" },
          { reference: "exampleOption2" },
          { reference: "exampleOption3" },
          { reference: "exampleOption4" },
        ],
        explicitBlank: false,
      };
      const { scenario } = useValidationPolicy(ref(contest), ref(pile), ref("ballot_page"));
      expect(scenario.value).toBe("overvote");
    });

    it("detects valid selection (no scenario)", () => {
      const contest = makeContest({
        markingType: { ...getContest(["multi"]).markingType, minMarks: 1, maxMarks: 3 },
      });
      const pile = {
        multiplier: 1,
        optionSelections: [
          { reference: "exampleOption1" },
          { reference: "exampleOption2" },
          { reference: "exampleOption3" },
        ],
        explicitBlank: false,
      };
      const { scenario } = useValidationPolicy(ref(contest), ref(pile), ref("ballot_page"));
      expect(scenario.value).toBeNull();
    });

    it("detects no scenario when minMarks=0 and no selections", () => {
      const contest = makeContest({
        markingType: { ...getContest(["multi"]).markingType, minMarks: 0, maxMarks: 3 },
      });
      const pile = getSelectionPile([]);
      const { scenario } = useValidationPolicy(ref(contest), ref(pile), ref("ballot_page"));
      expect(scenario.value).toBeNull();
    });
  });

  describe("undervote between policy", () => {
    it("returns null when behavior is allow (default)", () => {
      const contest = makeContest();
      const pile = getSelectionPile(["single"]);
      const { validationResults } = useValidationPolicy(
        ref(contest),
        ref(pile),
        ref("ballot_page"),
      );
      expect(validationResults.value).toEqual([]);
    });

    it("returns warning when behavior is allow_and_warn", () => {
      const policy = makePolicy({
        undervoteBetween: {
          behavior: "allow_and_warn",
          feedbackScreen: "ballot_page",
          feedbackType: "on_screen_message",
        },
      });
      const contest = makeContest({ validationPolicy: policy });
      const pile = getSelectionPile(["single"]);
      const { validationResults, isComplete } = useValidationPolicy(
        ref(contest),
        ref(pile),
        ref("ballot_page"),
      );

      expect(validationResults.value).toHaveLength(1);
      expect(validationResults.value[0].warning).toBe(true);
      expect(validationResults.value[0].blocked).toBe(false);
      expect(validationResults.value[0].allowed).toBe(true);
      expect(isComplete.value).toBe(true);
    });
  });

  describe("undervote below min policy", () => {
    it("returns blocked result (default behavior)", () => {
      const contest = makeContest({
        markingType: { ...getContest(["multi"]).markingType, minMarks: 2, maxMarks: 5 },
      });
      const pile = getSelectionPile(["single"]);
      const { validationResults, isComplete } = useValidationPolicy(
        ref(contest),
        ref(pile),
        ref("ballot_page"),
      );

      expect(validationResults.value).toHaveLength(1);
      expect(validationResults.value[0].blocked).toBe(true);
      expect(validationResults.value[0].allowed).toBe(false);
      expect(isComplete.value).toBe(false);
    });
  });

  describe("blank vote feedback", () => {
    it("falls through to undervote_below_min when disabled", () => {
      const contest = makeContest();
      const pile = getSelectionPile([]);
      const { validationResults } = useValidationPolicy(
        ref(contest),
        ref(pile),
        ref("ballot_page"),
      );

      expect(validationResults.value).toHaveLength(1);
      expect(validationResults.value[0].scenario).toBe("undervote_below_min");
      expect(validationResults.value[0].blocked).toBe(true);
    });

    it("shows blank_vote result when enabled", () => {
      const policy = makePolicy({
        blankVoteFeedback: {
          enabled: true,
          feedbackScreen: "ballot_page",
          feedbackType: "on_screen_message",
        },
      });
      const contest = makeContest({ validationPolicy: policy });
      const pile = getSelectionPile([]);
      const { validationResults } = useValidationPolicy(
        ref(contest),
        ref(pile),
        ref("ballot_page"),
      );

      expect(validationResults.value).toHaveLength(1);
      expect(validationResults.value[0].scenario).toBe("blank_vote");
    });

    it("uses custom message when provided (on_screen_message falls back to message)", () => {
      const policy = makePolicy({
        blankVoteFeedback: {
          enabled: true,
          feedbackScreen: "ballot_page",
          feedbackType: "on_screen_message",
          message: { en: "Custom blank message" },
        },
      });
      const contest = makeContest({ validationPolicy: policy });
      const pile = getSelectionPile([]);
      const { validationResults } = useValidationPolicy(
        ref(contest),
        ref(pile),
        ref("ballot_page"),
      );

      expect(validationResults.value[0].feedbackMessage).toContain("Custom blank message");
    });

    it("uses inlineMessage for on_screen_message when provided", () => {
      const policy = makePolicy({
        blankVoteFeedback: {
          enabled: true,
          feedbackScreen: "ballot_page",
          feedbackType: "on_screen_message",
          message: { en: "Alert message" },
          inlineMessage: { en: "Inline message" },
        },
      });
      const contest = makeContest({ validationPolicy: policy });
      const pile = getSelectionPile([]);
      const { validationResults } = useValidationPolicy(
        ref(contest),
        ref(pile),
        ref("ballot_page"),
      );

      expect(validationResults.value).toHaveLength(1);
      expect(validationResults.value[0].feedbackType).toBe("on_screen_message");
      expect(validationResults.value[0].feedbackMessage).toContain("Inline message");
    });

    it("splits into inline and alert results when feedbackType is on_screen_message_and_alert", () => {
      const policy = makePolicy({
        blankVoteFeedback: {
          enabled: true,
          feedbackScreen: "ballot_page",
          feedbackType: "on_screen_message_and_alert",
          message: { en: "Alert blank message" },
          inlineMessage: { en: "Inline blank message" },
        },
      });
      const contest = makeContest({ validationPolicy: policy });
      const pile = getSelectionPile([]);
      const { validationResults, pendingAlerts, inlineResults } = useValidationPolicy(
        ref(contest),
        ref(pile),
        ref("ballot_page"),
      );

      expect(validationResults.value).toHaveLength(2);

      const inline = validationResults.value.find((r) => r.feedbackType === "on_screen_message");
      const alert = validationResults.value.find((r) => r.feedbackType === "alert");

      expect(inline).toBeDefined();
      expect(inline!.feedbackMessage).toContain("Inline blank message");
      expect(inline!.isRawMessage).toBe(true);

      expect(alert).toBeDefined();
      expect(alert!.feedbackMessage).toContain("Alert blank message");
      expect(alert!.isRawMessage).toBe(true);

      expect(pendingAlerts.value).toHaveLength(1);
      expect(pendingAlerts.value[0].feedbackMessage).toContain("Alert blank message");

      expect(inlineResults.value).toHaveLength(1);
      expect(inlineResults.value[0].feedbackMessage).toContain("Inline blank message");
    });

    it("splits with i18n key defaults when no custom messages provided", () => {
      const policy = makePolicy({
        blankVoteFeedback: {
          enabled: true,
          feedbackScreen: "ballot_page",
          feedbackType: "on_screen_message_and_alert",
        },
      });
      const contest = makeContest({ validationPolicy: policy });
      const pile = getSelectionPile([]);
      const { validationResults, pendingAlerts, inlineResults } = useValidationPolicy(
        ref(contest),
        ref(pile),
        ref("ballot_page"),
      );

      expect(validationResults.value).toHaveLength(2);
      expect(pendingAlerts.value).toHaveLength(1);
      expect(inlineResults.value).toHaveLength(1);

      expect(validationResults.value[0].feedbackMessage).toBe("warnings.blank_vote");
      expect(validationResults.value[1].feedbackMessage).toBe("warnings.blank_vote");
      expect(validationResults.value[0].isRawMessage).toBeUndefined();
      expect(validationResults.value[1].isRawMessage).toBeUndefined();
    });

    it("uses message for alert only when feedbackType is alert", () => {
      const policy = makePolicy({
        blankVoteFeedback: {
          enabled: true,
          feedbackScreen: "ballot_page",
          feedbackType: "alert",
          message: { en: "Alert only message" },
          inlineMessage: { en: "Should not appear" },
        },
      });
      const contest = makeContest({ validationPolicy: policy });
      const pile = getSelectionPile([]);
      const { validationResults, pendingAlerts, inlineResults } = useValidationPolicy(
        ref(contest),
        ref(pile),
        ref("ballot_page"),
      );

      expect(validationResults.value).toHaveLength(1);
      expect(validationResults.value[0].feedbackType).toBe("alert");
      expect(validationResults.value[0].feedbackMessage).toContain("Alert only message");
      expect(pendingAlerts.value).toHaveLength(1);
      expect(inlineResults.value).toHaveLength(0);
    });

    it("allows proceeding when minMarks=0 and blank vote enabled", () => {
      const policy = makePolicy({
        blankVoteFeedback: {
          enabled: true,
          feedbackScreen: "ballot_page",
          feedbackType: "on_screen_message",
        },
      });
      const contest = makeContest({
        validationPolicy: policy,
        markingType: { ...getContest(["multi"]).markingType, minMarks: 0, maxMarks: 3 },
      });
      const pile = getSelectionPile([]);
      const { validationResults, isComplete, scenario } = useValidationPolicy(
        ref(contest),
        ref(pile),
        ref("ballot_page"),
      );

      expect(scenario.value).toBeNull();
      expect(isComplete.value).toBe(true);
      expect(validationResults.value).toEqual([]);
    });

    it("blocks when minMarks=1 and blank vote feedback enabled", () => {
      const policy = makePolicy({
        blankVoteFeedback: {
          enabled: true,
          feedbackScreen: "ballot_page",
          feedbackType: "on_screen_message",
        },
      });
      const contest = makeContest({ validationPolicy: policy });
      const pile = getSelectionPile([]);
      const { isComplete } = useValidationPolicy(ref(contest), ref(pile), ref("ballot_page"));
      expect(isComplete.value).toBe(false);
    });
  });

  describe("overvote policy", () => {
    it("returns error when behavior is allow_with_error", () => {
      const policy = makePolicy({
        overvote: {
          behavior: "allow_with_error",
          feedbackScreen: "ballot_page",
          feedbackType: "on_screen_message",
        },
      });
      const contest = makeContest({ validationPolicy: policy });
      const pile = {
        multiplier: 1,
        optionSelections: [
          { reference: "exampleOption1" },
          { reference: "exampleOption2" },
          { reference: "exampleOption3" },
          { reference: "exampleOption4" },
        ],
        explicitBlank: false,
      };
      const { validationResults, isComplete } = useValidationPolicy(
        ref(contest),
        ref(pile),
        ref("ballot_page"),
      );

      expect(validationResults.value).toHaveLength(1);
      expect(validationResults.value[0].blocked).toBe(true);
      expect(isComplete.value).toBe(false);
    });

    it("returns null when behavior is allow", () => {
      const policy = makePolicy({
        overvote: {
          behavior: "allow",
          feedbackScreen: "ballot_page",
          feedbackType: "on_screen_message",
        },
      });
      const contest = makeContest({ validationPolicy: policy });
      const pile = {
        multiplier: 1,
        optionSelections: [
          { reference: "exampleOption1" },
          { reference: "exampleOption2" },
          { reference: "exampleOption3" },
          { reference: "exampleOption4" },
        ],
        explicitBlank: false,
      };
      const { validationResults } = useValidationPolicy(
        ref(contest),
        ref(pile),
        ref("ballot_page"),
      );
      expect(validationResults.value).toEqual([]);
    });

    it("returns blocked for block_selection", () => {
      const policy = makePolicy({
        overvote: {
          behavior: "block_selection",
          feedbackScreen: "ballot_page",
          feedbackType: "on_screen_message",
        },
      });
      const contest = makeContest({ validationPolicy: policy });
      const pile = {
        multiplier: 1,
        optionSelections: [
          { reference: "exampleOption1" },
          { reference: "exampleOption2" },
          { reference: "exampleOption3" },
          { reference: "exampleOption4" },
        ],
        explicitBlank: false,
      };
      const { validationResults } = useValidationPolicy(
        ref(contest),
        ref(pile),
        ref("ballot_page"),
      );
      expect(validationResults.value[0].blocked).toBe(true);
    });

    it("returns blocked for behave_as_radio_button", () => {
      const base = getContest(["blank"]);
      const policy = makePolicy({
        overvote: {
          behavior: "behave_as_radio_button",
          feedbackScreen: "ballot_page",
          feedbackType: "on_screen_message",
        },
      });
      const contest = { ...base, validationPolicy: policy };
      const pile = {
        multiplier: 1,
        optionSelections: [{ reference: "exampleOption1" }, { reference: "exampleOption2" }],
        explicitBlank: false,
      };
      const { validationResults, selectionMode } = useValidationPolicy(
        ref(contest),
        ref(pile),
        ref("ballot_page"),
      );
      expect(selectionMode.value).toBe("radio");
      expect(validationResults.value[0].blocked).toBe(true);
    });
  });

  describe("completeness", () => {
    it("contest with warning only is complete", () => {
      const policy = makePolicy({
        undervoteBetween: {
          behavior: "allow_and_warn",
          feedbackScreen: "ballot_page",
          feedbackType: "on_screen_message",
        },
      });
      const contest = makeContest({ validationPolicy: policy });
      const pile = getSelectionPile(["single"]);
      const { isComplete } = useValidationPolicy(ref(contest), ref(pile), ref("ballot_page"));
      expect(isComplete.value).toBe(true);
    });

    it("contest with blocked result is not complete", () => {
      const contest = makeContest({
        markingType: { ...getContest(["multi"]).markingType, minMarks: 2, maxMarks: 5 },
      });
      const pile = getSelectionPile(["single"]);
      const { isComplete } = useValidationPolicy(ref(contest), ref(pile), ref("ballot_page"));
      expect(isComplete.value).toBe(false);
    });
  });

  describe("selectionMode", () => {
    it("returns radio when overvote is behave_as_radio_button and maxMarks=1", () => {
      const base = getContest(["blank"]);
      const policy = makePolicy({
        overvote: {
          behavior: "behave_as_radio_button",
          feedbackScreen: "ballot_page",
          feedbackType: "on_screen_message",
        },
      });
      const contest = { ...base, validationPolicy: policy };
      const pile = getSelectionPile([]);
      const { selectionMode } = useValidationPolicy(ref(contest), ref(pile), ref("ballot_page"));
      expect(selectionMode.value).toBe("radio");
    });

    it("returns checkbox by default", () => {
      const contest = makeContest();
      const pile = getSelectionPile([]);
      const { selectionMode } = useValidationPolicy(ref(contest), ref(pile), ref("ballot_page"));
      expect(selectionMode.value).toBe("checkbox");
    });
  });

  describe("blockSelectionEnabled", () => {
    it("is true when block_selection and max reached", () => {
      const policy = makePolicy({
        overvote: {
          behavior: "block_selection",
          feedbackScreen: "ballot_page",
          feedbackType: "on_screen_message",
        },
      });
      const contest = makeContest({ validationPolicy: policy });
      const pile = {
        multiplier: 1,
        optionSelections: [
          { reference: "exampleOption1" },
          { reference: "exampleOption2" },
          { reference: "exampleOption3" },
        ],
        explicitBlank: false,
      };
      const { blockSelectionEnabled } = useValidationPolicy(
        ref(contest),
        ref(pile),
        ref("ballot_page"),
      );
      expect(blockSelectionEnabled.value).toBe(true);
    });

    it("is false when below max", () => {
      const policy = makePolicy({
        overvote: {
          behavior: "block_selection",
          feedbackScreen: "ballot_page",
          feedbackType: "on_screen_message",
        },
      });
      const contest = makeContest({ validationPolicy: policy });
      const pile = getSelectionPile(["single"]);
      const { blockSelectionEnabled } = useValidationPolicy(
        ref(contest),
        ref(pile),
        ref("ballot_page"),
      );
      expect(blockSelectionEnabled.value).toBe(false);
    });
  });

  describe("overvoteAlertBased", () => {
    it("is true when block_selection and alert feedbackType", () => {
      const policy = makePolicy({
        overvote: {
          behavior: "block_selection",
          feedbackScreen: "ballot_page",
          feedbackType: "alert",
        },
      });
      const contest = makeContest({ validationPolicy: policy });
      const pile = getSelectionPile(["multi"]);
      const { overvoteAlertBased } = useValidationPolicy(
        ref(contest),
        ref(pile),
        ref("ballot_page"),
      );
      expect(overvoteAlertBased.value).toBe(true);
    });

    it("is true when block_selection and on_screen_message_and_alert feedbackType", () => {
      const policy = makePolicy({
        overvote: {
          behavior: "block_selection",
          feedbackScreen: "ballot_page",
          feedbackType: "on_screen_message_and_alert",
        },
      });
      const contest = makeContest({ validationPolicy: policy });
      const pile = getSelectionPile(["multi"]);
      const { overvoteAlertBased } = useValidationPolicy(
        ref(contest),
        ref(pile),
        ref("ballot_page"),
      );
      expect(overvoteAlertBased.value).toBe(true);
    });

    it("is false when block_selection and on_screen_message feedbackType", () => {
      const policy = makePolicy({
        overvote: {
          behavior: "block_selection",
          feedbackScreen: "ballot_page",
          feedbackType: "on_screen_message",
        },
      });
      const contest = makeContest({ validationPolicy: policy });
      const pile = getSelectionPile(["multi"]);
      const { overvoteAlertBased } = useValidationPolicy(
        ref(contest),
        ref(pile),
        ref("ballot_page"),
      );
      expect(overvoteAlertBased.value).toBe(false);
    });

    it("is false when allow behavior and alert feedbackType", () => {
      const policy = makePolicy({
        overvote: {
          behavior: "allow",
          feedbackScreen: "ballot_page",
          feedbackType: "alert",
        },
      });
      const contest = makeContest({ validationPolicy: policy });
      const pile = getSelectionPile(["multi"]);
      const { overvoteAlertBased } = useValidationPolicy(
        ref(contest),
        ref(pile),
        ref("ballot_page"),
      );
      expect(overvoteAlertBased.value).toBe(false);
    });
  });
});

describe("getPendingAlerts", () => {
  it("filters to alert-type results only", () => {
    const results: ValidationResult[] = [
      {
        scenario: "undervote_between",
        allowed: true,
        warning: true,
        blocked: false,
        feedbackMessage: "test",
        feedbackScreen: "ballot_page",
        feedbackType: "alert",
      },
      {
        scenario: "overvote",
        allowed: false,
        warning: false,
        blocked: true,
        feedbackMessage: "test",
        feedbackScreen: "ballot_page",
        feedbackType: "on_screen_message",
      },
      {
        scenario: "blank_vote",
        allowed: true,
        warning: true,
        blocked: false,
        feedbackMessage: "test",
        feedbackScreen: "ballot_and_review_page",
        feedbackType: "on_screen_message_and_alert",
      },
    ];
    const alerts = getPendingAlerts(results);
    expect(alerts).toHaveLength(2);
    expect(alerts[0].scenario).toBe("undervote_between");
    expect(alerts[1].scenario).toBe("blank_vote");
  });

  it("returns empty array when no alerts", () => {
    const results: ValidationResult[] = [
      {
        scenario: "overvote",
        allowed: false,
        warning: false,
        blocked: true,
        feedbackMessage: "test",
        feedbackScreen: "ballot_page",
        feedbackType: "on_screen_message",
      },
    ];
    expect(getPendingAlerts(results)).toEqual([]);
  });
});

describe("getInlineResults", () => {
  it("filters by screen match and inline type", () => {
    const results: ValidationResult[] = [
      {
        scenario: "undervote_between",
        allowed: true,
        warning: true,
        blocked: false,
        feedbackMessage: "test",
        feedbackScreen: "ballot_page",
        feedbackType: "on_screen_message",
      },
      {
        scenario: "overvote",
        allowed: false,
        warning: false,
        blocked: true,
        feedbackMessage: "test",
        feedbackScreen: "review_page",
        feedbackType: "on_screen_message",
      },
      {
        scenario: "blank_vote",
        allowed: true,
        warning: true,
        blocked: false,
        feedbackMessage: "test",
        feedbackScreen: "ballot_and_review_page",
        feedbackType: "on_screen_message",
      },
    ];
    const inline = getInlineResults(results, "ballot_page");
    expect(inline).toHaveLength(2);
    expect(inline[0].scenario).toBe("undervote_between");
    expect(inline[1].scenario).toBe("blank_vote");
  });

  it("returns empty when screen does not match", () => {
    const results: ValidationResult[] = [
      {
        scenario: "undervote_between",
        allowed: true,
        warning: true,
        blocked: false,
        feedbackMessage: "test",
        feedbackScreen: "review_page",
        feedbackType: "on_screen_message",
      },
    ];
    expect(getInlineResults(results, "ballot_page")).toEqual([]);
  });

  it("excludes alert-only results", () => {
    const results: ValidationResult[] = [
      {
        scenario: "undervote_between",
        allowed: true,
        warning: true,
        blocked: false,
        feedbackMessage: "test",
        feedbackScreen: "ballot_page",
        feedbackType: "alert",
      },
    ];
    expect(getInlineResults(results, "ballot_page")).toEqual([]);
  });
});
