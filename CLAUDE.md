# CLAUDE.md — @assemblyvoting/electa-ui

Vue 3 + Bootstrap 5.3 component library ("Electa UI") for Assembly Voting / Lumi election
products. Published to npm; consumed by election-client, conference,
verification site and rustee app — both as an npm dependency and live via devbox `dist/` bind-mounts.

Also read: [.github/copilot-instructions.md](.github/copilot-instructions.md) (team style
rules) and [doc/architecture.md](doc/architecture.md) (the "why" behind the design).
Repeatable procedures: `.claude/skills/new-component/`.

## Commands (Yarn 1 only — never npm/pnpm; `packageManager: yarn@1.22.22`)

```sh
yarn --frozen-lockfile      # install
yarn dev                    # playground (src/App.vue) — hack freely, NEVER commit App.vue changes
yarn storybook              # Storybook dev on :6006
yarn test                   # unit tests, watch mode (jsdom, root src/)
yarn test-coverage          # unit tests + coverage — CI gate
yarn test-storybook         # every story rendered in headless Chromium + axe a11y — CI gate
yarn lint                   # oxlint then eslint, both --fix
yarn build                  # type-check (vue-tsc) + vite lib build → dist/
yarn build-storybook        # already sets NODE_OPTIONS=--max_old_space_size=8096; raw `storybook build` OOMs
```

CI (CircleCI) runs on every branch: `yarn lint` → `yarn test-coverage` → `yarn build` →
`yarn build-storybook`, plus a license check and the storybook/Playwright test job.
Before finishing non-trivial work run: `yarn lint && yarn test-coverage && yarn build`.

## Architecture in one paragraph

Components live in `src/components/{atoms,molecules,organisms,templates}/AVName/` with all
assets co-located. Everything public flows through two barrels — `src/components/index.ts`
and `src/index.ts` — and the package installs as a Vue plugin whose `install()` globally
registers every component and `provide`s the i18n instance and `iconNames` (DI contract —
do not break it). Domain types come from `@assemblyvoting/types`, always imported via
`@/types`. Story/spec fixtures come from factories in `src/examples` (`getOption`,
`getContest`, ...) — never inline domain objects.

## Adding a component — definition of done

Full procedure + file templates: `.claude/skills/new-component/SKILL.md`. The 7 touchpoints:

1. `src/components/<level>/AVFoo/` — `AVFoo.vue`, `AVFoo.scss`, `AVFoo.stories.ts`,
   `AVFoo.spec.ts`, `index.ts` (3-line default export); plus `AVFoo.messages.ts` if it has
   text and `AVFoo.types.ts` if it has public prop types.
2. `src/components/index.ts` — export in the correct `// ATOMS/MOLECULES/...` section.
3. `src/index.ts` — **three** spots: the import list, `app.component("AVFoo", AVFoo)` in
   `install()`, and the named-export block. Missing one leaves the component half-wired.
4. Translated? Register the messages file in `src/i18n/LocalMessages.ts`.
5. Has `.types.ts`? Re-export from `src/types/components.ts`.
6. New option unions? `as const` array in `src/constants/components.ts` (SCREAMING_SNAKE,
   grouped under a `// AVFoo` comment) + derived type; reuse the array as Storybook options.
7. Rendered inside other components' stories? Also register in `.storybook/preview.ts`.

Missing `.spec.ts` will sink the coverage gate: thresholds are lines 90 / functions 90 /
statements 80 / branches 70 over `src/components/**` + `src/helpers/**` (exclusions in
`vitest.config.ts` need written rationale).

## House patterns (follow the majority, not the exceptions)

- `<script setup lang="ts">` + Composition API. `AVIcon`'s render-function style is a
  legacy special case — don't copy it.
- Props: runtime object form, `type: String as PropType<X>`. **Zero** components use
  `withDefaults` or `defineProps<T>()` — don't introduce them.
- Emits: array-form `defineEmits([...])`; `v-model` events are `update:propName`.
- i18n: components **never** call `useI18n()` or `inject("i18n")` directly. They take a
  `locale: PropType<SupportedLocale>` prop and one line —
  `const { locale: i18nLocale, t } = useLocalization(() => props.locale)`
  (`src/composables/useLocalization.ts`). Precedence is prop → locale provided by the
  nearest AV ancestor → injected i18n instance; `localI18n` is the inject default, which
  is what keeps tests, Storybook and the playground working. Never destructure
  `i18n.global.t` — it binds to the host app's global locale, so the library's chrome
  would stay in the admin language while content translated. Only entry-point components
  need `:locale`; it reaches children via `provide`, so don't hand-forward it.
- Translation keys: `t("js.components.AVFoo.snake_case_key")`; HTML-bearing strings get
  an `_html` suffix. Messages files must cover **all 20 locales** in `SUPPORTED_LOCALES`
  (ar ca cy da de en es fi fr is it ja ko nl pl pt ro ru sv zh).
- Styles: external file linked as `<style scoped lang="scss" src="./AVFoo.scss" />`;
  class names `AVFoo--modifier`; layout via Bootstrap utilities in the template, SCSS only
  for what utilities can't express.
- Test hooks: `data-test="kebab-case"` attributes, used by both specs and stories.
- Stories: CSF3 with `render: Template` functions, `tags: ["autodocs"]`,
  `title: "Design System/<Level>/AVFoo"`, `Meta` imported from `@/types`.

## Styling rules — each one broke production before being written down

The library ships **two** style deliverables (see doc/architecture.md §styling):
compiled `dist/styles.css` (component styles only, no Bootstrap core) and the **raw**
`src/bootstrap/bootstrap.customized.scss`, which consumer apps compile themselves.

1. Every Bootstrap variable override in `bootstrap.customized.scss` must be `!default`
   unless it's non-negotiable brand styling — the file ships raw, and a hard-set value
   silently blocks downstream overrides (commit `6cf1b9a`).
2. Bootstrap SCSS imports use the full relative `../../node_modules/bootstrap/scss/...`
   path — never an alias. The path must resolve from `dist/src/bootstrap/` inside a
   consumer's `node_modules` (warning comment in `vite.config.ts`; this is why
   `bundledDependencies: ["bootstrap"]` exists).
3. Use `var(--bs-*)` tokens, not literal colors, and check the prefix character by
   character: `var(bg-gray-300)` compiles fine and renders nothing (commit `1760437`).
4. `--av-theme-*` variables are the host app's contract — the library only consumes them.
   `src/bootstrap/mock.scss` mocks them for Storybook/dev and must never ship.
5. Fonts are self-hosted `@fontsource` only — election clients must not call third-party
   CDNs (commit `85945d5`). A bare `@fontsource/<font>` import gives only weight 400;
   import every weight you use (commit `260d5c7`).
6. Never `@import` Bootstrap SCSS inside a scoped `<style>` — it re-emits the whole
   utilities layer per component into `styles.css`. Four legacy offenders exist
   (AVOption, AVSubmissionHelper, AVSplitHelper, AVResourceSection); don't add a fifth.
7. RTL: logical properties/utilities only (`ms-*/pe-*`, `margin-inline-start`); for
   inline styles use the `isRtl` MutationObserver pattern (see `AVOption.vue`).
   Arabic auto-flips in Storybook via `storybook-addon-rtl`.
8. Order inside `bootstrap.customized.scss` is load-bearing: flags/maps → `functions` →
   palette/overrides → `variables` → `$utilities`/`$theme-colors` merges → `bootstrap`.
   Insert changes at the correct layer.
9. Dark mode is Bootstrap-native (`$enable-dark-mode`, `$color-mode-type: data`): the host
   app sets `data-bs-theme="dark"` on an ancestor and components inherit it. Components
   **never** take a `theme` prop and never branch on one in the template — paint with
   body tokens (`text-body`, `text-body-70`, `bg-body-80`, from `_body_opacity.scss`) and
   put anything that needs a real dark-mode override behind a `[data-bs-theme="dark"]`
   selector in the component's SCSS or in `_dark_mode.scss`. `AVVerticalStep` and
   `AVAnimatedMenuButton` still carry the legacy `theme` prop (`Theme` from
   `@assemblyvoting/types`); migrate them when touched, don't copy them.
   Any new partial `bootstrap.customized.scss` `@import`s must also be added to the
   `viteStaticCopy` targets in `vite.config.ts` — the raw SCSS ships and a missing
   partial breaks the consumer's Sass build, not ours.
10. **Always prefer the body-opacity utilities for neutrals**, in this order:
    1. `text-body-{10..90}` / `bg-body-{10..90}` (and the `-alt-*` counterparts for
       inverted surfaces) from `_body_opacity.scss` — derived from `--bs-body-color-rgb`,
       so they follow `data-bs-theme` *and* give 10% emphasis steps.
    2. Plain Bootstrap body tokens (`text-body`, `bg-body`, `bg-body-tertiary`) when a
       coarse step is genuinely all you need.
    3. Never `text-muted` (deprecated in Bootstrap 5.3 — it's now just an alias for
       `var(--bs-secondary-color)` — and a single fixed muting level): use `text-body-70`
       or whichever step reads right.
    4. Never `--bs-gray-*` / `text-gray-*` / `bg-gray-*`, and not the `secondary`
       utilities either. `bg-secondary`/`text-secondary` resolve to the brand `$secondary`
       (`#eeeeee`), a fixed light grey that stays light in dark mode; `--bs-gray-*` is a
       frozen palette. `text-body-secondary` does adapt, but it's one coarse step with no
       emphasis control, so reach for `text-body-70` instead. Replacing exactly these
       (`text-gray-800` → `text-body`, `bg-secondary` → `bg-body-80`) is what the dark-mode
       migration consisted of — don't reintroduce them. `text-muted` still survives in
       `AVOption`, `AVSummaryOption` and `AVPileSummary`; migrate when touched.

## Testing

- **Unit** (`yarn test-coverage`): jsdom, chai-style assertions, co-located
  `AVFoo.spec.ts`. Standard mount options: `global.provide: { i18n: localI18n }`
  (import from `@/i18n`), real children in `global.components`, stub `AVIcon` as
  `{ template: "<span />" }` and the FloatingVue directive as `tooltip: () => {}`.
- **Storybook** (`yarn test-storybook`): every story is smoke-rendered in Chromium with
  axe checks at `test: "error"` — an a11y violation fails CI. Components must meet
  WCAG AA. Exceptions require a justified rule-disable in `.storybook/parameters.ts`
  or story-level `parameters` (see `AVIcon.stories.ts` for the pattern).

## Release & branches (tribal knowledge — nothing automated)

- **Versioning is manual**: bump `package.json` version inside the feature PR.
- **Publishing is tag-driven**: after merge, push a `vX.Y.Z` git tag that exactly matches
  `package.json`. The tag triggers the CircleCI `publish` job (only after lint/test/build,
  license check, and Playwright all pass). `prepublishOnly` rebuilds, so the publish is
  always from a fresh build.
- **Dist-tag routing**: on `main`, a version containing `alpha`/`beta` publishes to that
  npm dist-tag; plain versions go to `latest`. The `SPRINT/ontario` branch carries a
  generalized script (commit `8c3e225`) that routes **any** `-suffix` (e.g.
  `5.7.2-ontario` → `--tag ontario`) — expect it on main after the next sync.
- **Branch strategy**: `main` = stable line. `SPRINT/ontario` = long-lived customer branch,
  version-suffixed `-ontario`, periodically synced **from** main ("Sync ontario with main"
  PRs) — never the other direction without review. `v*-hotfix*` branches patch old lines.
- **License gate**: any new dependency with a license not already permitted in
  `doc/dependency_decisions.yml` fails the `docker/license-checker` job. Add a decision
  entry (license_finder format) in the same PR.

## Pitfalls

- `src/App.vue` is a playground. Use it, never commit changes to it.
- In devbox, consuming apps bind-mount this repo's `dist/` directly into their
  `node_modules`. `vite build --watch` deliberately does NOT empty `dist/`
  (`emptyOutDir: !isWatch` in `vite.config.ts`) — keep it that way.
- Playwright is pinned in three places that must move together: `package.json`
  `resolutions`, and the CircleCI `mcr.microsoft.com/playwright:v<X>-noble` executor image.
- Pre-commit (husky) runs `yarn format` over all of `src/` then lint-staged eslint.
  oxlint runs only via `yarn lint`/CI — a clean commit can still fail CI lint.
- Two lint-staged configs exist; the `package.json` one wins, `.lintstagedrc.json` is dead.
- The SCSS layer still uses `@import` (deprecated by Sass; deprecations silenced in
  `vite.config.ts`). A `@use` migration is pending — don't half-migrate single files.
- `vue/max-props` is capped at 14 (oxlint). If a component needs more, its API is wrong —
  group props into an object type in `.types.ts` instead.
