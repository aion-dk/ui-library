# Electa UI — architecture and the reasoning behind it

This is the "why" companion to [CLAUDE.md](../CLAUDE.md) (rules) and
[.github/copilot-instructions.md](../.github/copilot-instructions.md) (style). Read this
before changing the build, styling, i18n, or release machinery — most of what looks odd
here is deliberate, and most of it broke something once before reaching its current shape.

## Who consumes this library, and how

Two very different consumption modes shape every design decision:

1. **npm** (`@assemblyvoting/electa-ui`): election-client (EVS), conference, and the
   verification site install a published version. They import the plugin from
   `dist/index.js`, the compiled component CSS from `dist/styles.css`, and — crucially —
   they compile `dist/src/bootstrap/bootstrap.customized.scss` **themselves** with their
   own Sass build, layering their theme on top.
2. **devbox** (local development): the `devbox` repo runs this checkout in a container
   with `yarn build-only --watch`, continuously rebuilding `dist/`, and bind-mounts
   `git-repos/ui-library/dist` directly into consuming apps'
   `node_modules/@assemblyvoting/electa-ui/dist`. The consumers' Vite HMR picks up
   rebuilds instantly. Two consequences:
   - `vite.config.ts` sets `emptyOutDir: !isWatch`: in watch mode `dist/` is never wiped,
     because the consumers' mounted `node_modules` path must never momentarily disappear
     (commit `e5ac0e9`).
   - Publishing to npm changes nothing for devbox users; conversely a broken local `dist/`
     breaks every consuming app on your machine at once.

`/Users/.../Projects/ui-library` is a symlink to the devbox checkout — same repo.

## Styling: the two-deliverable design

The unusual part of this library is that **Bootstrap is not compiled into the shipped
CSS**. There are two deliverables:

- **`dist/styles.css`** — all component `<style scoped>` blocks plus floating-vue's CSS,
  concatenated (`cssCodeSplit: false`). No Bootstrap core, no fonts, no theme values.
- **`dist/src/bootstrap/bootstrap.customized.scss`** — the raw customization layer,
  copied verbatim by `vite-plugin-static-copy`. Consumers `@use`/`@import` it in their own
  Sass build, optionally setting `!default` variables *before* it to re-theme Bootstrap.

Why: each product themes Bootstrap differently (breakpoints, dark mode, brand colors),
and SCSS variables only compose at compile time. Shipping compiled Bootstrap would freeze
those decisions. Shipping raw SCSS keeps them open — at the price of three invariants:

1. **Every override must be `!default`** or downstream theming silently stops working
   (learned via commit `6cf1b9a`, card radius).
2. **Bootstrap imports use literal `../../node_modules/bootstrap/scss/...` paths.**
   Inside a consumer, the file lives at
   `node_modules/@assemblyvoting/electa-ui/dist/src/bootstrap/`, so `../../` resolves to
   `dist/`, where the build copies a full `node_modules/bootstrap`. That copy only
   survives `npm pack` because of `"bundledDependencies": ["bootstrap"]` (npm strips
   `node_modules` dirs from tarballs otherwise — learned via commit `31091ae`, broken
   publishes). This also pins the exact Bootstrap version the SCSS was written against.
3. **No remote URLs.** Election clients must not call third-party CDNs (privacy/audit
   requirement), so fonts are self-hosted `@fontsource` packages in `dependencies` —
   resolved by the *consumer's* bundler when it compiles the raw SCSS. That's also why
   fonts are absent from `dist/styles.css`.

The runtime theming contract is the `--av-theme-*` CSS custom property family plus
classes like `.btn-theme`: **defined by host apps at runtime** (per-election theming),
only ever *consumed* here. `src/bootstrap/mock.scss` fakes that layer for Storybook and
the playground; it is dev-only by design and must never reach `dist`.

Layer order inside `bootstrap.customized.scss` is load-bearing (Sass evaluates
top-to-bottom): `$enable-*` flags and breakpoint maps → Bootstrap `functions` → brand
palette and variable overrides → Bootstrap `variables` → `$utilities` and `$theme-colors`
map-merges → custom utility loops → the full `bootstrap` import → global helpers.

## i18n: dependency injection instead of `useI18n()`

Products (electa, EVS) have their own vue-i18n instance and translation pipeline; the
library must render with *their* instance when embedded but stay self-sufficient in
Storybook, tests, and the playground. The plugin therefore `provide`s either the host's
instance or the local fallback (`src/index.ts`). `useI18n()` would bind components to
whichever i18n is *installed*, breaking the provided-instance path — so components never
call it.

Every translated component goes through `useLocalization` (`src/composables/`), which runs
in the component's own `setup()` and resolves the locale in this order:

1. the component's own `locale` prop,
2. the locale resolved by the nearest AV ancestor (handed down via `provide`),
3. the locale of the injected i18n instance.

Two things that ordering buys, both of which used to be bugs. **The prop wins.** Previously
the prop called `switchLocale()`, which mutated the library's *local* instance — a no-op
whenever a host app had provided its own, so `:locale` silently did nothing in production.
Now nothing global is mutated: the returned `t`/`d` pass the resolved locale explicitly, so
the library's own chrome ("Select one (1) option", the vote-weight line, aria labels) follows
`locale` instead of staying in the host app's language. **The prop reaches children.** Only
the component a consumer actually mounts needs `:locale`; entry points don't have to forward
it down through AVBallot → AVOption → AVCollapser, and a child nobody remembered to forward
to can't fall back to the host locale and produce a half-translated ballot.

`localI18n` is the `inject("i18n")` default, which is what keeps tests, Storybook and the
playground working with no host app present — the concern the old per-component
"DO NOT REMOVE" blocks were guarding. `switchLocale()` survives for exactly one caller,
the Storybook toolbar decorator, which drives the global locale for stories that pass no prop.

Messages are per-component `*.messages.ts` files assembled into
`js.components.<AVName>.*` by `src/i18n/LocalMessages.ts` — the same key layout products
use in their Rails-side translations, so host-provided translations and local fallbacks
are interchangeable.

## Icons: deliberately un-tree-shaken

`AVIcon` accepts icon names as **strings** at runtime (`icon="circle-check"`), which
products use for backend-configured content (election organizers choose icons). That
requires `import * as SolidIcons` + dynamic lookup, which defeats tree-shaking: the whole
FontAwesome solid+brands sets are in `dist/index.js` (~3 MB). This is a known, accepted
trade-off — do not "optimize" the imports without replacing the dynamic-name API, and
conversely, using a new icon anywhere costs nothing. `iconNames` (all valid names,
kebab-cased) is exported and provided for host-side validation and pickers.

## Testing strategy

Two Vitest projects (`vitest.config.ts`):

- **unit** — jsdom, co-located specs, istanbul coverage gated at lines 90 / functions 90 /
  statements 80 / branches 70 over `src/components/**` and `src/helpers/**`.
- **storybook** — `@storybook/addon-vitest` renders **every story** headless in Chromium
  (Playwright) with axe a11y checks at `test: "error"`. Stories are the integration and
  accessibility test suite; that's why story quality matters and why fixtures live in
  `src/examples` factories (stories, specs, and the playground share them).

A handful of animation/browser-API-heavy atoms (AVIcon, AVAnimatedTransition,
AVWaitingDots, AVFileInput, AVShowMore) are excluded from unit coverage with the note
"covered in Liminal" — Liminal is the downstream E2E suite that exercises them in real
products. Don't add exclusions without an equivalent story or downstream coverage.

Accessibility is a product requirement (public-sector elections): WCAG AA. The a11y rule
disables in `.storybook/parameters.ts` are each justified in comments; keep that bar.

## Release and branch model

Versioning is manual and PR-scoped; publishing is tag-driven. The model exists
because releases must be *deliberate* — elections pin versions, and an accidental
`latest` publish is a real incident. Hence: no auto-publish on merge, publish only from
explicit `v*` tags, gated on all CI jobs including the license check
(`doc/dependency_decisions.yml` is a license_finder decisions file; public-sector
compliance requires every dependency license to be explicitly permitted).

Customer work that can't ship to everyone lives on long-lived suffix branches —
currently `SPRINT/ontario`, versioned `-ontario`, published to the `ontario` npm
dist-tag, synced from main regularly. The generalized dist-tag routing (any `-suffix` →
that npm tag, commit `8c3e225`) started on that branch; check which script a branch has
before tagging from it.

## Known debt (documented, not fixed — needs team sign-off)

- **Scoped bootstrap-utilities duplication**: `AVOption.scss`, `AVSubmissionHelper.scss`,
  `AVSplitHelper.scss`, `AVResourceSection.scss` each `@import` Bootstrap's utilities
  inside a scoped style block, re-emitting the whole utilities layer with `[data-v-*]`
  attributes into `dist/styles.css` (~448 KB). Fix = replace the needed utilities with
  plain CSS; until then, don't add new offenders.
- **Sass `@import` deprecation**: the SCSS layer predates `@use`; deprecations are
  silenced in `vite.config.ts`. Migration must be repo-wide and coordinated with
  consumers (they compile the raw SCSS too) — never piecemeal.
- **lint-staged double config**: both `.lintstagedrc.json` and a `lint-staged` key in
  `package.json` exist; the `package.json` one wins. `.lintstagedrc.json` and the unused
  `precommit` script + `git-format-staged` devDependency are removable.
- **CI installs with `yarn install --immutable`** (a Yarn Berry flag) while the repo pins
  Yarn 1; Yarn 1 happens to tolerate it. Local docs correctly use `--frozen-lockfile`.
- **Storybook build memory**: `build-storybook` needs the 8 GB heap already baked into
  the script; a growing story count will eventually need more.
- **Locale gaps**: some older `*.messages.ts` files miss keys in some locales (e.g.
  `AVOption`'s `vote_count_singular`). Fallback is `en`; new work must cover all 20.
