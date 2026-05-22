    # Contest Validation Policies

This document describes the validation policy system implemented across four repositories: **ui-library**, **election-client**, **DBB**, and **Conference**. The system enables per-contest configuration of undervote, overvote, and blank vote feedback behavior on both the ballot page and the review page.

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Type System (ui-library)](#type-system-ui-library)
- [Composable: useValidationPolicy (ui-library)](#composable-usevalidationpolicy-ui-library)
- [Component Integration (ui-library)](#component-integration-ui-library)
  - [AVBallot](#avballot)
  - [AVOption](#avoption)
  - [AVBlankOption](#avblankoption)
  - [AVSubmissionHelper](#avsubmissionhelper)
  - [AVSplitHelper](#avsplithelper)
  - [AVPileSummary](#avpilesummary)
- [Election-Client Integration](#election-client-integration)
  - [ViewBallot](#viewballot)
  - [BallotSummary](#ballotsummary)
  - [ViewSummary](#viewsummary)
- [Conference Admin Integration](#conference-admin-integration)
  - [Database Migration](#database-migration)
  - [Admin Form](#admin-form)
  - [Config Converter](#config-converter)
- [DBB Schema Validation](#dbb-schema-validation)
- [i18n](#i18n)
- [Data Flow](#data-flow)
- [Backward Compatibility](#backward-compatibility)
- [Storybook Stories](#storybook-stories)
- [Presets / Examples](#presets--examples)

## Overview

Validation policies are a **presentation and behavior layer** that sits on top of the existing `SelectionPileValidator` from `@assemblyvoting/js-client`. The base validator is **not modified** — policies configure how feedback is shown to the voter and whether certain vote states are allowed, blocked, or trigger warnings.

Each contest can optionally define a `validationPolicy` object with four sub-policies:

| Sub-policy | Scenario | Default behavior |
|---|---|---|
| `undervoteBetween` | Voter selected between `minMarks` and `maxMarks` (not at max) | `allow` (no feedback) |
| `undervoteBelowMin` | Voter selected fewer than `minMarks` | `do_not_allow` (blocked) |
| `overvote` | Voter selected more than `maxMarks` | `allow` (no feedback) |
| `blankVoteFeedback` | Voter selected nothing (blank vote) | `enabled: false` (no feedback) |

## Architecture

The system follows a clear separation of concerns across repos:

```
Conference (admin)  -->  DBB (storage/signing)  -->  election-client (voting UI)
     |                        |                           |
  Admin form              Schema validation         Vue composables
  DB migration            camelCase schema           Component integration
  Config converter        Signature verify           Alert modals
```

Two distinct feedback triggers exist:

1. **Real-time inline feedback** — shown immediately via `AVSubmissionHelper` on the ballot page or inside `AVPileSummary` on the review page. Triggered by `feedbackType: "on_screen_message"` or `"on_screen_message_and_alert"`.
2. **Navigation alert** — shown only when the voter clicks Continue/Submit. Rendered as a modal in the parent (election-client). Triggered by `feedbackType: "alert"` or `"on_screen_message_and_alert"`.

## Type System (ui-library)

All types are defined in `src/types/validationPolicy.ts` and re-exported from `src/types/index.ts`.

### Core Enums

```typescript
type FeedbackScreen = "ballot_page" | "review_page" | "ballot_and_review_page";
type FeedbackType = "on_screen_message" | "alert" | "on_screen_message_and_alert";
type ValidationPolicyBehavior =
  | "allow" | "allow_and_warn" | "do_not_allow"
  | "allow_with_error" | "block_selection" | "behave_as_radio_button";
type ValidationScenario =
  | "undervote_between" | "undervote_below_min" | "blank_vote" | "overvote";
```

### Policy Interfaces

```typescript
interface BaseValidationPolicy {
  feedbackScreen: FeedbackScreen;
  feedbackType: FeedbackType;
}

interface UndervoteBetweenPolicy extends BaseValidationPolicy {
  behavior: "allow" | "allow_and_warn";
}

interface UndervoteBelowMinPolicy extends BaseValidationPolicy {
  behavior: "do_not_allow";
  editable: false;
}

interface OvervotePolicy extends BaseValidationPolicy {
  behavior:
    | "allow" | "allow_and_warn" | "allow_with_error"
    | "block_selection" | "behave_as_radio_button";
}

interface BlankVoteFeedbackPolicy {
  enabled: boolean;
  feedbackScreen: FeedbackScreen;
  feedbackType: FeedbackType;
  message?: Record<string, string>;  // locale -> message
}

interface ValidationPolicy {
  undervoteBetween?: UndervoteBetweenPolicy;
  undervoteBelowMin?: UndervoteBelowMinPolicy;
  overvote?: OvervotePolicy;
  blankVoteFeedback?: BlankVoteFeedbackPolicy;
}
```

### Validation Result

```typescript
interface ValidationResult {
  scenario: ValidationScenario;
  allowed: boolean;
  warning: boolean;
  blocked: boolean;
  feedbackMessage: string;  // i18n key suffix
  feedbackScreen: FeedbackScreen;
  feedbackType: FeedbackType;
}
```

### Module Augmentation

The `ContestContent` type from `@assemblyvoting/types` is augmented (not modified) to include the optional policy:

```typescript
declare module "@assemblyvoting/types" {
  interface ContestContent {
    validationPolicy?: ValidationPolicy;
  }
}
```

## Composable: useValidationPolicy (ui-library)

File: `src/composables/useValidationPolicy.ts`

The composable is the core engine. It takes a contest, selection pile, and active screen, and returns reactive validation state.

### Signature

```typescript
function useValidationPolicy(
  contest: Ref<ContestContent> | ContestContent,
  selectionPile: Ref<SelectionPile> | SelectionPile,
  activeScreen: Ref<FeedbackScreen> | FeedbackScreen
)
```

### Scenario Detection

The `detectScenario` function determines the current state based on selection count vs min/max marks:

| Condition | Scenario |
|---|---|
| 0 selections + `minMarks > 0` | `"blank_vote"` |
| `selectedCount > maxMarks` | `"overvote"` |
| `0 < selectedCount < minMarks` | `"undervote_below_min"` |
| `minMarks <= selectedCount < maxMarks` and `selectedCount > 0` | `"undervote_between"` |

### Policy Evaluation

The `evaluateScenario` function maps a scenario + policy to a `ValidationResult`:

| Scenario | Behavior | Result |
|---|---|---|
| `undervote_between` | `allow` | `null` (no feedback) |
| `undervote_between` | `allow_and_warn` | Warning (allowed, not blocked) |
| `undervote_below_min` | `do_not_allow` | Blocked |
| `overvote` | `allow` | `null` (no feedback) |
| `overvote` | `allow_and_warn` | Warning |
| `overvote` | `allow_with_error` + `on_screen_message` | Blocked |
| `overvote` | `allow_with_error` + `alert` | Allowed (voter can proceed after acknowledging) |
| `overvote` | `block_selection` | Blocked |
| `overvote` | `behave_as_radio_button` | Blocked |
| `blank_vote` | `blankVoteFeedback.enabled: true` | Warning or blocked based on `minMarks` |

### Helper Functions

```typescript
function getDefaultPolicy(): ValidationPolicy;
function getPendingAlerts(results: ValidationResult[]): ValidationResult[];
function getInlineResults(results: ValidationResult[], activeScreen: FeedbackScreen): ValidationResult[];
```

### Composable Return Values

| Property | Type | Description |
|---|---|---|
| `policy` | `ComputedRef<ValidationPolicy>` | Resolved policy (from contest or defaults) |
| `validationResults` | `ComputedRef<ValidationResult[]>` | Evaluated results for current scenario |
| `isComplete` | `ComputedRef<boolean>` | `true` if no results are blocked |
| `pendingAlerts` | `ComputedRef<ValidationResult[]>` | Alert-type results |
| `inlineResults` | `ComputedRef<ValidationResult[]>` | Inline results filtered by active screen |
| `selectionMode` | `ComputedRef<"checkbox" | "radio">` | `"radio"` if overvote is `behave_as_radio_button` and `maxMarks === 1` |
| `blockSelectionEnabled` | `ComputedRef<boolean>` | `true` if selection should be blocked at max |
| `selectedCount` | `ComputedRef<number>` | Number of option selections |
| `explicitBlank` | `ComputedRef<boolean>` | Whether blank option is toggled |
| `scenario` | `ComputedRef<ValidationScenario | null>` | Current scenario |

## Component Integration (ui-library)

### AVBallot

File: `src/components/organisms/AVBallot/AVBallot.vue`

The ballot page component instantiates the composable with `activeScreen = "ballot_page"`:

```typescript
const {
  validationResults: policyResults,
  pendingAlerts,
  inlineResults: policyInlineResults,
  selectionMode,
  blockSelectionEnabled,
} = useValidationPolicy(
  computed(() => props.contest),
  computed(() => props.selectionPile),
  "ballot_page",
);
```

**Key behaviors:**

- **Emits `update:pendingAlerts`** via `watchEffect` whenever `pendingAlerts` changes, propagating alerts to the parent.
- **Suppresses base validator `"too_many"` error** when the policy covers the overvote scenario — the policy takes full ownership of overvote feedback.
- **Passes `selectionMode` and `maxSelectionsReached`** (from `blockSelectionEnabled`) to each `AVOption` and `AVBlankOption`.
- **Passes `policyInlineResults` and `activeScreen`** to `AVSubmissionHelper`.
- **Radio behavior**: When `selectionMode === "radio"`, clicking a new option clears all existing selections first.
- **Block behavior**: When `blockSelectionEnabled` is true and the voter hasn't selected this option yet, `toggleOption` rejects the click.

### AVOption

File: `src/components/molecules/AVOption/AVOption.vue`

New props for validation policy:

| Prop | Type | Default | Description |
|---|---|---|---|
| `selectionMode` | `"checkbox" \| "radio"` | `"checkbox"` | Determines checkbox vs radio behavior |
| `maxSelectionsReached` | `Boolean` | `false` | Whether max selections are reached |

**Key behaviors:**

- **`AVOption--blocked` CSS class** applied when `maxSelectionsReached && checkedCount === 0 && !disabled && selectionMode !== "radio"` — adds `pointer-events: none` and visual grayed-out style.
- **`handleOptionClick` guard** — returns early when `maxSelectionsReached && checkedCount === 0 && selectionMode !== "radio"`.
- **ARIA radio attributes** — when `selectionMode === "radio"`, the section element gets `role="radio"` and `aria-checked`.
- Both props are **recursively propagated** to child `AVOption` components.

### AVBlankOption

File: `src/components/molecules/AVBlankOption/AVBlankOption.vue`

Receives `selectionMode` prop and applies `role="radio"` ARIA attribute when in radio mode.

### AVSubmissionHelper

File: `src/components/molecules/AVSubmissionHelper/AVSubmissionHelper.vue`

New props:

| Prop | Type | Default | Description |
|---|---|---|---|
| `policyInlineResults` | `ValidationResult[]` | `() => []` | Inline validation results to display |
| `activeScreen` | `FeedbackScreen` | `"ballot_page"` | Which screen is active |

**Key behaviors:**

- **Red background** — the helper bar turns red (`bg-theme-danger`) when `errors.length > 0 || policyInlineResults.length > 0` **AND** `chosenCount > 0` (user has made at least one selection). Without selections, no red background is shown.
- **Policy feedback rendering** — iterates over `policyInlineResults`, rendering each with:
  - `text-warning` class for warnings
  - `text-white` class for blocked states
  - Translated via `$t('js.components.AVSubmissionHelper.${result.feedbackMessage}')`
  - `role="alert"` for accessibility

### AVSplitHelper

File: `src/components/templates/AVSplitHelper/AVSplitHelper.vue`

Instantiates the composable to compute `hasPendingAlerts`:

```typescript
const { pendingAlerts: policyAlerts } = useValidationPolicy(
  computed(() => props.contest),
  activePile,
  "ballot_page",
);

const hasPendingAlerts = computed(
  () => getPendingAlerts(policyAlerts.value).length > 0
);
```

**Impact on submission readiness:**

```typescript
const readyForSubmission = computed(() => {
  const baseComplete = /* ... standard checks ... */;
  return baseComplete || hasPendingAlerts.value;
});
```

When there are pending alerts, `readyForSubmission` becomes `true` even if `baseComplete` is `false`. This enables the Continue/Submit buttons so the voter can click them and trigger the alert modal.

**Forwards `update:pendingAlerts`** from child `AVBallot` components up to the parent.

### AVPileSummary

File: `src/components/organisms/AVPileSummary/AVPileSummary.vue`

Used on the **review page**. Instantiates the composable with `activeScreen = "review_page"`:

```typescript
const { inlineResults: policyInlineResults, pendingAlerts } = useValidationPolicy(
  computed(() => props.contest),
  computed(() => props.selectionPile),
  "review_page",
);
```

**Key behaviors:**

- **Emits `update:pendingAlerts`** when `pendingAlerts` changes AND `activeState === "summary"`.
- **Inline feedback rendering** — renders a feedback panel when `policyInlineResults.length > 0` with the same styling pattern as `AVSubmissionHelper` (warning/blocked classes, translated messages, `role="alert"`).

## Election-Client Integration

### ViewBallot

File: `election-client/src/pages/ViewBallot.vue`

The per-contest ballot page handles alert modals and button state.

**Alert flow:**

1. `AVSplitHelper` emits `update:pending-alerts` → stored in `pendingAlerts` ref.
2. When voter clicks **Continue** (`next()`): if `pendingAlerts.length > 0`, the alert modal opens and navigation is blocked.
3. When voter clicks **Submit** (`finishSubmission()`): same modal check, using a two-call pattern — first call shows the modal, second call (after "Proceed Anyway") proceeds.
4. `proceedAnyway()`: closes modal, clears `pendingAlerts`, resets lazy validation, navigates.

**Button disable logic:**

```
:disabled="!isComplete && pendingAlerts.length === 0"
```

| `isComplete` | `pendingAlerts.length` | Button |
|---|---|---|
| `true` | any | **Enabled** |
| `false` | `> 0` | **Enabled** (user must click to see modal) |
| `false` | `0` | **Disabled** |

### BallotSummary

File: `election-client/src/components/BallotSummary.vue`

A **pure pass-through** for alerts:

```
AVPileSummary --(update:pending-alerts)--> BallotSummary --(update:pendingAlerts)--> ViewSummary
```

No processing, filtering, or aggregation — just re-emits.

### ViewSummary

File: `election-client/src/pages/ViewSummary.vue`

The review/summary page aggregates alerts from **all** contest summaries.

**Alert flow:**

1. Each `BallotSummary` emits alerts keyed by contest reference into `alertMap: Record<string, any[]>`.
2. `allPendingAlerts` computed flattens all alerts.
3. When voter clicks **Submit** (`preparingVote()`): if `allPendingAlerts.length > 0 && !showAlertModal`, modal opens.
4. "Proceed Anyway" calls `preparingVote()` again — on second call `showAlertModal` is already `true`, guard passes, vote is submitted.

The submit button is **always enabled** — the guard is internal to the handler, not via `:disabled`.

## Conference Admin Integration

### Database Migration

File: `conference/db/migrate/20260415083000_add_validation_policy_to_contests.rb`

```ruby
add_column :contests, :validation_policy, :json, if_not_exists: true
```

Stores the entire policy as a single JSON column with **snake_case flat keys** (e.g., `undervote_between_behavior`, `blank_vote_feedback_enabled`).

### Admin Form

File: `conference/app/views/backend/contests/_form.html.erb`

The form renders inside a `content_for :validation_policy` block as four grouped sections. It uses **plain HTML `<select>` and `<input>` elements** (not `bootstrap_form` helpers) because `OpenStruct` doesn't implement `human_attribute_name`.

The form is rendered inside `_advanced_settings.html.erb` as an accordion section wrapped in a **nested `<fieldset>`** (without `disabled`). This inner fieldset overrides the parent `field_set_tag(disabled: board_locked_by_ceremony?)`, making validation policy fields **always editable** — even when the contest is locked by an active voting round. All other contest fields remain locked via `disabled: @contest.locked?`.

**Form sections:**

1. **Undervote Between** — behavior (`allow` | `allow_and_warn`), feedback screen, feedback type
2. **Undervote Below Min** — behavior (`do_not_allow`), feedback screen, feedback type
3. **Overvote** — behavior (`allow` | `allow_and_warn` | `allow_with_error` | `block_selection` | `behave_as_radio_button`), feedback screen, feedback type
4. **Blank Vote Feedback** — enabled toggle, per-locale custom messages, feedback screen, feedback type

The `behave_as_radio_button` option is dynamically shown/hidden via JS based on `maximum_votes === 1`.

**Controller** (`contests_controller.rb`):

```ruby
if params.dig(:contest, :validation_policy).present?
  _params[:validation_policy] = params[:contest][:validation_policy].permit!
end
```

Uses `permit!` for the entire policy hash because it contains dynamic locale keys.

### Config Converter

File: `conference/app/lib/e2e/dbb/config_converters/contest_config_converter.rb`

Transforms the flat snake_case database format to nested camelCase for the DBB API:

```
DB: { "undervote_between_behavior": "allow_and_warn", ... }
     ↓ transform_validation_policy()
API: { "undervoteBetween": { "behavior": "allow_and_warn", ... } }
```

Four builder methods handle the conversion:

| Method | Output key |
|---|---|
| `build_undervote_between` | `"undervoteBetween"` |
| `build_undervote_below_min` | `"undervoteBelowMin"` |
| `build_overvote` | `"overvote"` |
| `build_blank_vote_feedback` | `"blankVoteFeedback"` |

Each applies defaults (`"ballot_page"` / `"on_screen_message"`) for missing feedback fields. The blank vote builder also extracts locale-keyed messages from the raw hash.

## DBB Schema Validation

File: `dbb/app/params/configuration/contest_params.rb`

Uses Dry-Schema to validate the transformed camelCase policy at the DBB boundary:

```ruby
optional(:validationPolicy).hash do
  optional(:undervoteBetween).hash do
    required(:behavior).value(:string, included_in?: %w[allow allow_and_warn])
    required(:feedbackScreen).value(:string, included_in?: %w[ballot_page review_page ballot_and_review_page])
    required(:feedbackType).value(:string, included_in?: %w[on_screen_message alert on_screen_message_and_alert])
  end

  optional(:undervoteBelowMin).hash do
    required(:behavior).value(:string, included_in?: %w[do_not_allow])
    required(:feedbackScreen).value(...)
    required(:feedbackType).value(...)
    optional(:editable).filled(:bool)
  end

  optional(:blankVoteFeedback).hash do
    required(:enabled).filled(:bool)
    required(:feedbackScreen).value(...)
    required(:feedbackType).value(...)
    optional(:message).filled(:hash)
  end

  optional(:overvote).hash do
    required(:behavior).value(:string, included_in?: %w[
      allow allow_and_warn allow_with_error block_selection behave_as_radio_button
    ])
    required(:feedbackScreen).value(...)
    required(:feedbackType).value(...)
  end
end
```

All sub-policies are optional. The entire `validationPolicy` key is optional. Contests without a policy use the default behavior.

## i18n

### ui-library

Added translation keys to all 20 locale files in `src/components/molecules/AVSubmissionHelper/AVSubmissionHelper.messages.ts`:

- `warnings.*` — warning-level messages
- `alert.*` — alert-level messages
- `errors.undervote_below_min` — undervote below minimum error
- `errors.overvote` — overvote error

### Conference

- `config/locales/frontend/js.en.yml` — frontend AVSubmissionHelper policy keys
- `config/locales/backend/backend.en.yml` — admin form labels under `backend.contests.validation_policy.*`
- `config/locales/backend/backend.es.yml` — Spanish translations for admin form

## Data Flow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ Conference Admin                                                            │
│                                                                             │
│  _form.html.erb                                                             │
│    ├── undervote_between_behavior (select)                                  │
│    ├── undervote_between_feedback_screen (select)                           │
│    ├── undervote_between_feedback_type (select)                             │
│    ├── ... (same pattern for below_min, overvote, blank_vote)               │
│    └── blank_vote_feedback_message[en] (input, per locale)                  │
│                                                                             │
│  contests_controller.rb → permit! → save to DB as JSON                     │
│                                                                             │
│  contest_config_converter.rb                                                │
│    └── transform_validation_policy() → flat → nested camelCase             │
└───────────────────────────┬─────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ DBB                                                                         │
│                                                                             │
│  contest_params.rb → Dry-Schema validation                                  │
│  Stores signed contest config including validationPolicy                   │
└───────────────────────────┬─────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ election-client                                                             │
│                                                                             │
│  contest.validationPolicy (camelCase, nested)                               │
│         │                                                                   │
│         ▼                                                                   │
│  ViewBallot.vue                                                             │
│    └── AVSplitHelper                                                        │
│          ├── AVBallot                                                       │
│          │     ├── useValidationPolicy(contest, pile, "ballot_page")        │
│          │     ├── AVOption (selectionMode, maxSelectionsReached)           │
│          │     └── AVSubmissionHelper (policyInlineResults)                 │
│          └── emits update:pendingAlerts                                     │
│    └── pendingAlerts → modal on Continue/Submit                             │
│                                                                             │
│  ViewSummary.vue                                                            │
│    └── BallotSummary                                                        │
│          └── AVPileSummary                                                  │
│                ├── useValidationPolicy(contest, pile, "review_page")        │
│                └── renders inline feedback + emits alerts                   │
│    └── allPendingAlerts → modal on Submit                                   │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Backward Compatibility

- Contests **without** `validationPolicy` use the default policy: all behaviors are `allow` (no feedback), which is identical to the pre-policy behavior.
- The `SelectionPileValidator` from `@assemblyvoting/js-client` is **not modified** — policies layer on top.
- The base validator's `"too_many"` error is suppressed when the policy covers overvote, avoiding duplicate messaging.
- Multi-pile (split-voting) contests use defaults in this iteration.

## Storybook Stories

New stories added to existing component story files:

| Component | Stories added | Description |
|---|---|---|
| AVBallot | +5 | With undervote warning, overvote error, radio mode, block selection, blank vote feedback |
| AVSubmissionHelper | +3 | With warning results, blocked results, mixed results |
| AVOption | +2 | Radio mode, blocked state |
| AVPileSummary | +2 | With warning feedback, with blocked feedback |
| AVSplitHelper | +5 | Various policy configurations |

## Presets / Examples

File: `src/examples/validationPolicy.ts`

Five presets for quick Storybook/demo usage:

| Preset | Description |
|---|---|
| `undervote_warn` | Warns on undervote between min and max, shown on both pages |
| `overvote_block` | Blocks selection at max, shown on ballot page |
| `radio_button` | Radio button mode (maxVotes = 1), shown on ballot page |
| `blank_vote_feedback` | Alert + inline feedback for blank votes with custom message |
| `full` | All four policies combined with comprehensive settings |

Usage:

```typescript
import { getValidationPolicy } from "@/examples/validationPolicy";

const policy = getValidationPolicy("full");
```
