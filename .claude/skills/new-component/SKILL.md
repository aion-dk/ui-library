---
name: new-component
description: Scaffold a new AV component in electa-ui — all co-located files, the 7 wiring touchpoints, and verification. Use when adding any component to src/components.
---

# New component procedure

Templates below are cribbed from the current-generation pattern (`AVShowMore`, `AVOption`).
When in doubt, open the newest sibling component at the same atomic level and match it.

## 0. Decide the shape first

- **Level**: atoms (no AV children), molecules (composes atoms), organisms (business
  logic, composes molecules), templates (full-page flows). Look at neighbors to calibrate.
- **Translated?** Any user-visible string → needs `.messages.ts` + the i18n block + a
  `locale` prop. Purely visual (like AVProgressBar) → skip all three.
- **Public prop types?** Unions/interfaces consumers should import → `.types.ts`.
- **Option unions?** Belong in `src/constants/components.ts` as an `as const` array, not
  in the component. Domain types (contests, options, candidates) come from
  `@assemblyvoting/types` via `@/types` — never redefine them.
- Keep props ≤ 14 (oxlint `vue/max-props` errors above that).

## 1. Create `src/components/<level>/AVFoo/`

### `index.ts` (always exactly this)

```ts
import AVFoo from "./AVFoo.vue";

export default AVFoo;
```

### `AVFoo.vue`

```vue
<script setup lang="ts">
import type { PropType, SupportedLocale } from "@/types";
import { useLocalization } from "@/composables/useLocalization";

const props = defineProps({
  someProp: {
    type: String as PropType<SomeUnion>,
    default: "value",           // runtime object form; NEVER withDefaults / defineProps<T>()
  },
  locale: {
    type: String as PropType<SupportedLocale>,
    default: null,              // only for translated components
  },
});

const emits = defineEmits(["update:someProp"]); // array form; v-model events = update:propName

// Resolves prop -> locale provided by the nearest AV ancestor -> injected i18n instance,
// and gives you a `t`/`d` pinned to that locale. `i18nLocale` is the conventional local
// name for reaching into LocalString fields, e.g. `option.title[i18nLocale]`.
const { locale: i18nLocale, t } = useLocalization(() => props.locale);
</script>

<template>
  <div class="AVFoo--container" data-test="foo">
    {{ t("js.components.AVFoo.some_key") }}
  </div>
</template>

<style scoped lang="scss" src="./AVFoo.scss" />
```

Always go through `useLocalization`; never `useI18n()`, never `inject("i18n")` directly, and
never destructure `i18n.global.t` (that binds translations to the host app's global locale
instead of the resolved one). Drop `i18nLocale` from the destructure if you don't need it.
Untranslated components omit the composable, the `locale` prop, and the messages file.

Template/style rules: Bootstrap utilities for layout; class names `AVFoo--modifier`;
`data-test="kebab-case"` on anything a test will touch; `var(--bs-*)` tokens, never color
literals (typo'd prefixes compile silently — see CLAUDE.md styling rules); RTL via logical
properties (`ms-*`, `margin-inline-start`), never `left/right`; do NOT `@import` any
bootstrap scss inside this scoped file.

### `AVFoo.messages.ts` (translated components)

All 20 locales, alphabetical: ar ca cy da de en es fi fr is it ja ko nl pl pt ro ru sv zh.
snake_case keys; `_html` suffix if the string carries markup.

```ts
import type { DefineLocaleMessage } from "@/types";

const translations: DefineLocaleMessage = {
  ar: {
    some_key: "...",
  },
  ca: {
    some_key: "...",
  },
  // ... every locale in SUPPORTED_LOCALES — no gaps
};

export default translations;
```

### `AVFoo.types.ts` (only if consumers need the types)

```ts
import type { SOME_OPTIONS } from "@/constants";

export type AVFooVariant = (typeof SOME_OPTIONS)[number];
```

### `AVFoo.stories.ts`

```ts
import type { Meta } from "@/types"; // yes, Meta comes from @/types — house style
import { AVFoo } from "@/components";
import { SUPPORTED_LOCALES } from "@/constants";
import { getOption } from "@/examples"; // fixtures ALWAYS from src/examples factories

const meta: Meta<typeof AVFoo> = {
  title: "Design System/<Atoms|Molecules|Organisms|Templates>/AVFoo",
  component: AVFoo,
  tags: ["autodocs"],
  argTypes: {
    someProp: { control: { type: "select" }, options: SOME_OPTIONS },
    locale: { control: { type: "select" }, options: SUPPORTED_LOCALES },
    "onUpdate:someProp": { action: "update:someProp" }, // kebab/colon events quoted
  },
};

export default meta;

const Template = (args: Meta) => ({
  components: { AVFoo },
  setup() {
    return { args };
  },
  template: '<AVFoo v-bind="args" />',
});

export const Default = {
  render: Template,
  args: { someProp: "value" },
};
```

Every story runs in CI as a real Chromium render with **axe checks failing on violation**
(`a11y.test: "error"`). Design for WCAG AA; if a rule genuinely can't apply, disable it
per-story with a justification comment (pattern in `AVIcon.stories.ts`).

### `AVFoo.spec.ts`

```ts
import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import localI18n from "@/i18n";
import AVFoo from "./AVFoo.vue";

describe("AVFoo", () => {
  const wrapper = mount(AVFoo, {
    props: { someProp: "value" },
    global: {
      provide: { i18n: localI18n },
      stubs: { AVIcon: { template: "<span />" } },
      directives: { tooltip: () => {} }, // FloatingVue stub, if used
    },
  });

  it("renders", async () => {
    expect(wrapper.find("[data-test=foo]").text()).to.contain("..."); // chai style
    await wrapper.setProps({ someProp: "other" });
    // ...
  });
});
```

Coverage gates: lines 90 / functions 90 / statements 80 / branches 70 over
`src/components/**`. Cover every prop-driven render state, emit flows, disabled states,
and a locale switch if translated. Skipping the spec is not an option without a
justified exclusion in `vitest.config.ts`.

## 2. Wire it up (the part everyone forgets)

| # | File | What |
|---|------|------|
| 1 | `src/components/index.ts` | `export { default as AVFoo } from "@/components/<level>/AVFoo";` in the matching `// ATOMS/...` section |
| 2 | `src/index.ts` — import list | add `AVFoo` under the right section comment |
| 3 | `src/index.ts` — `install()` | `app.component("AVFoo", AVFoo);` |
| 4 | `src/index.ts` — named exports | add `AVFoo` to the final `export { ... }` block |
| 5 | `src/i18n/LocalMessages.ts` | translated only: import messages + add to the `components` object |
| 6 | `src/types/components.ts` | only if `.types.ts` exists: re-export in the right section |
| 7 | `src/constants/components.ts` | only if new option arrays: `as const` array under `// AVFoo` |
| 8 | `.storybook/preview.ts` | only if other components' stories render AVFoo as a child |

Spots 2–4 are all in `src/index.ts`; missing any one leaves the component working in some
consumers and broken in others.

## 3. Verify

```sh
yarn lint && yarn test-coverage && yarn build && yarn test-storybook
```

Then eyeball it: `yarn storybook` → check the story in `en` and `ar` (RTL) via the locale
toolbar, light and dark backgrounds. Optionally exercise it in `yarn dev` via
`src/App.vue`'s PLAYGROUND region — but never commit `App.vue`.
