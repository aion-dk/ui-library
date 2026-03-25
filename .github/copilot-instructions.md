# Project Guidelines

## Code Style
- Use Vue 3 SFCs with `<script setup lang="ts">` and Composition API patterns used under `src/components/**`. NEVER use Options API or class-based components.
- Keep component assets co-located in the component directory:
  - `.vue`, `.types.ts`, `.messages.ts`, `.scss`, `.spec.ts`, `.stories.ts`, and `index.ts`.
- Prefer shared types and constants from `src/types/**` and `src/constants/**` instead of redefining local enums/unions.
- Use `@` imports for project source paths (alias to `src/`).
- Use always yarn for package management and scripts; avoid npm, pnpm or similar if possible.

## Architecture
- This is a component library organized by design-system levels in `src/components/`:
  - `atoms/`, `molecules/`, `organisms/`, `templates/`.
- Register and export components through the central barrels:
  - `src/components/index.ts`
  - `src/index.ts`
- The library is installed as a Vue plugin and provides shared dependencies through DI; preserve this contract when changing component initialization.

## i18n And Dependency Injection
- Components are expected to support provided i18n from host apps and local fallback i18n.
- Preserve the `inject("i18n")` + locale switching pattern used in existing components (for example `src/components/atoms/AVSpinner/AVSpinner.vue`).
- Do not remove i18n fallback behavior; it is required for tests, Storybook, and playground usage.
- Make sure to add any new i18n keys to all languages (`SUPPORTED_LOCALES` on `src/constants/i18n.ts`) in the appropriate `*.messages.ts` file.

## Build And Test
- Install: `yarn --frozen-lockfile`
- Dev server: `yarn dev`
- Build library: `yarn build` (runs type-check + build)
- Type-check only: `yarn type-check`
- Unit tests: `yarn test`
- Coverage: `yarn test-coverage`
- Lint/fix: `yarn lint`
- Storybook dev: `yarn storybook`
- Storybook build: `yarn build-storybook` (can require high memory)

Before finalizing non-trivial changes, run the most relevant checks (usually `yarn test-coverage`, `yarn build` and `yarn build-storybook`).

## Testing And Coverage Conventions
- Vitest coverage targets `src/components/**` with thresholds configured in `vitest.config.ts`.
- Avoid adding coverage exclusions without clear rationale.
- Storybook docs and some support files are intentionally excluded from coverage (`*.stories.ts`, `*.mdx`, `*.messages.ts`, `*.types.ts`).

## Repo-Specific Pitfalls
- `storybook-static/`, `coverage/`, and `dist/` are generated outputs; avoid manual edits.
- In SCSS files, do not introduce bootstrap path aliases; follow the note in `vite.config.ts`.
- Keep exports and plugin registration synchronized when adding/removing components so both named imports and plugin usage remain correct.
