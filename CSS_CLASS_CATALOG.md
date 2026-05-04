# UI Library CSS Class Reference Catalog

> **Audience:** Non-developer admins who need to override styles using CSS.
> **Scope:** Only externally visible classes with properties worth overriding (colors, backgrounds, borders, border-radius, fonts, spacing, sizing). Internal layout-only classes are excluded.

---

## CSS Custom Properties (Theme Variables)

These are the master controls. Changing these variables will cascade to all components that use them.

| Variable | Default Value | Effect |
|---|---|---|
| `--av-theme-background` | `#744ba3` (purple) | Primary theme color — buttons, accents, borders, links, active states |
| `--av-theme-text` | `white` | Text on primary theme backgrounds |
| `--av-theme-secondary` | `#f6edfc` (light purple) | Secondary background — badges, panels |
| `--av-theme-secondary-text` | `black` | Text on secondary backgrounds |
| `--av-theme-danger-background` | `rgb(230, 0, 118)` (magenta) | Error/danger color — validation errors, error checkboxes, error borders |
| `--av-theme-danger-text` | `white` | Text on danger backgrounds |
| `--bs-primary` | `#00203e` (midnight blue) | Bootstrap primary — hamburger menu lines, links |
| `--bs-secondary` | `#eeeeee` (mist grey) | Bootstrap secondary |
| `--bs-brand-dark` | `#061128` (oxford blue) | Step nav checkmark icon color |
| `--bs-accent` | `#f39200` (golden orange) | Accent line on contest cards |
| `--bs-ballot` | `#23292a` (charcoal) | Checked checkbox/counter fill color, add button color |
| `--bs-danger` | Bootstrap default (red) | In-progress dot on vertical steps |
| `--bs-border-color` | Bootstrap default | Borders on options, collapser, file input |
| `--bs-light` | Bootstrap default | Search option hover, collapser button bg |
| `--bs-tertiary-bg` | Bootstrap default | File input dropzone, preview card bg |
| `--bs-gray-100` thru `--bs-gray-800` | Bootstrap gray scale | Various text fills, disabled states, divider lines |

---

## 1. Ballot Options — Checkbox Style

**Source:** `src/components/atoms/AVOptionCheckbox/AVOptionCheckbox.scss`

| Class Name | Description | Overridable Properties | Example Override |
|---|---|---|---|
| `.AVOptionCheckbox` | Unchecked checkbox square — white bg, grey border | `background-color`, `border-color`, `border-width`, `border-radius`, `width`, `height` | `.AVOptionCheckbox { background-color: #f0f0f0; border-radius: 4px; }` |
| `.AVOptionCheckbox--checked` | Checked state — dark fill | `background-color`, `border-color` | `.AVOptionCheckbox--checked { background-color: var(--av-theme-background); border-color: var(--av-theme-background); }` |
| `.AVOptionCheckbox--checked.AVOptionCheckbox--error` | Error/invalid checked state | `background-color`, `border-color`, `box-shadow` | `.AVOptionCheckbox--checked.AVOptionCheckbox--error { background-color: #cc0000; }` |
| `.AVOptionCheckbox--exclusive` | Exclusive/"None of the above" badge | `border-radius`, `font-size`, `background-color` | `.AVOptionCheckbox--exclusive { border-radius: 0 0 8px 0; }` |
| `.AVOptionCheckbox:disabled` | Disabled checkbox | `background-color`, `border-color`, `cursor`, `opacity` | `.AVOptionCheckbox:disabled { opacity: 0.4; }` |
| `.AVOptionCheckbox:focus` | Focus ring | `box-shadow`, `outline` | `.AVOptionCheckbox:focus { box-shadow: 0 0 0 3px rgba(0,123,255,0.5); }` |

**DOM hierarchy:**
```
.AVOption
 └─ .AVOption--option-header
     └─ .AVOptionCheckbox
```

**Error override path (from mock.scss):** `.AVBallot--error .AVOptionCheckbox.AVOptionCheckbox--checked` — forces danger bg and black stroke.

---

## 2. Ballot Options — Counter Style

**Source:** `src/components/atoms/AVOptionCounter/AVOptionCounter.scss`

| Class Name | Description | Overridable Properties | Example Override |
|---|---|---|---|
| `.AVOptionCounter--base` | Counter number badge — bordered, dark text | `background-color`, `border-color`, `border-width`, `border-radius`, `color`, `font-size`, `font-weight`, `width`, `height` | `.AVOptionCounter--base { border-radius: 8px; font-size: 1rem; }` |
| `.AVOptionCounter--base.AVOptionCounter--checked` | Active counter — filled dark bg, white text | `background-color`, `border-color`, `color` | `.AVOptionCounter--checked { background-color: var(--av-theme-background); }` |
| `.AVOptionCounter--base.AVOptionCounter--error` | Error counter — danger fill | `background-color`, `color` | `.AVOptionCounter--error { background-color: #cc0000; }` |
| `.AVOptionCounter--add` | "+" button — dark bg, white text | `background-color`, `border-color`, `color`, `border-radius`, `font-size` | `.AVOptionCounter--add { background-color: var(--av-theme-background); border-radius: 50%; }` |
| `.AVOptionCounter--add:disabled` | Disabled add button — greyed out | `background-color`, `border-color` | `.AVOptionCounter--add:disabled { background-color: #ccc; }` |
| `.AVOptionCounter--subtract` | "−" button — white bg, grey text/border | `background-color`, `border-color`, `color`, `border-radius` | `.AVOptionCounter--subtract { border-radius: 50%; }` |
| `.AVOptionCounter--subtract:disabled` | Disabled subtract button | `background-color`, `border-color`, `color` | `.AVOptionCounter--subtract:disabled { color: #ddd; }` |

**DOM hierarchy:**
```
.AVOption
 └─ .AVOption--multivote-aside
     ├─ .AVOptionCounter--subtract
     ├─ .AVOptionCounter--base
     └─ .AVOptionCounter--add
```

---

## 3. Ballot Options — Select/Radio Style

**Source:** `src/components/atoms/AVOptionSelect/AVOptionSelect.scss`

| Class Name | Description | Overridable Properties | Example Override |
|---|---|---|---|
| `.AVOptionSelect` | Content inside checkbox (checkmark character) | `font-family`, `font-size`, `line-height`, `color` | `.AVOptionSelect { color: var(--av-theme-background); font-size: 1.2rem; }` |

---

## 4. Ballot Option Cards

**Source:** `src/components/molecules/AVOption/AVOption.scss`

| Class Name | Description | Overridable Properties | Example Override |
|---|---|---|---|
| `.AVOption` | Option card wrapper — subtle shadow | `box-shadow`, `border-radius`, `border`, `background-color` | `.AVOption { border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.12); }` |
| `.AVOption--disabled` | Disabled option card | `opacity` | `.AVOption--disabled { opacity: 0.5; }` |
| `.AVOption--highlight` | Highlight animation (e.g., after scroll-to) | `animation` (uses `grow-in-highlight` keyframe) | `.AVOption--highlight { animation: none; }` |
| `.AVOption--title` | Option title text | `font-size`, `font-weight`, `line-height`, `color` | `.AVOption--title { font-weight: 700; color: var(--bs-primary); }` |
| `.AVOption--description` | Option description/body text | `font-weight`, `font-size`, `color` | `.AVOption--description { font-size: 0.9rem; }` |
| `.AVOption--singlevote` | Single-vote layout — padding row | `padding`, `background-color` | `.AVOption--singlevote { padding: 1rem; }` |
| `.AVOption--multivote-aside` | Multivote sidebar with counter/checkbox | `border-top`, `border-left`/`border-right`, `padding`, `border-color` | `.AVOption--multivote-aside { padding: 0.75rem; }` |
| `.AVOption--multivote-footer` | Multivote bottom footer area | `padding`, `background-color` | `.AVOption--multivote-footer { padding: 0.75rem; }` |
| `.AVOption--image` | Option image (landscape) | `max-height`, `max-width`, `object-fit`, `border-radius` | `.AVOption--image { border-radius: 8px; max-height: 100px; }` |
| `.AVOption--image-square` | Square option image | `height`, `width`, `object-fit`, `border-radius` | `.AVOption--image-square { border-radius: 8px; }` |
| `.AVOption--image-passport` | Passport-ratio option image | `height`, `width`, `object-fit`, `border-radius` | `.AVOption--image-passport { border-radius: 4px; }` |

**DOM hierarchy:**
```
.AVBallot
 └─ .AVOption
     ├─ .AVOption--option-header
     │   ├─ .AVOption--image*  (optional)
     │   └─ .AVOption--title + .AVOption--description
     └─ .AVOption--singlevote  OR  .AVOption--multivote-aside
```

> **Nested options:** `.AVOption--children .AVOption` has `box-shadow: unset`.

---

## 5. Blank/None-of-the-Above Options

**Source:** `src/components/molecules/AVBlankOption/AVBlankOption.scss`

| Class Name | Description | Overridable Properties | Example Override |
|---|---|---|---|
| `.AVBlankOption` | "None of the above" card — subtle shadow | `box-shadow`, `border-radius`, `background-color` | `.AVBlankOption { border-radius: 12px; }` |
| `.AVBlankOption--disabled` | Disabled blank option | `opacity` | `.AVBlankOption--disabled { opacity: 0.5; }` |
| `.AVBlankOption--accent` | Accent stripe on left/right edge | `border-left-width`/`border-right-width`, `border-left-color`/`border-right-color` | `.AVBlankOption--accent { border-left-color: var(--av-theme-background); }` |
| `.AVBlankOption--title` | Title text | `font-size`, `font-weight`, `line-height`, `color` | `.AVBlankOption--title { font-weight: 600; }` |

---

## 6. Ballot Containers & Contest Cards

**Source:** `src/components/organisms/AVBallot/AVBallot.scss`, `src/components/molecules/AVElectaContestCard/AVElectaContestCard.scss`

| Class Name | Description | Overridable Properties | Example Override |
|---|---|---|---|
| `.AVBallot--gallery-grid` | Grid layout for gallery-style ballots | `grid-template-columns`, `grid-gap` | `.AVBallot--gallery-grid { grid-gap: 1.5rem; }` |
| `.AVElectaContestCard` | Contest/card wrapper — rounded, shadowed | `border-radius`, `box-shadow`, `border`, `background-color` | `.AVElectaContestCard { border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); }` |
| `.AVElectaContestCard--title` | Card title | `font-weight`, `font-size`, `color` | `.AVElectaContestCard--title { color: var(--bs-primary); }` |
| `.AVElectaContestCard--subtitle` | Card subtitle | `font-weight`, `font-size`, `color` | `.AVElectaContestCard--subtitle { font-size: 0.85rem; }` |
| `.AVElectaContestCard--line` | Accent color bar under title | `background-color`, `height`, `width`, `border-radius`, `margin` | `.AVElectaContestCard--line { background-color: var(--av-theme-background); width: 4rem; }` |

---

## 7. Summary / Review Elements

**Source:** `src/components/molecules/AVSummaryOption/AVSummaryOption.scss`, `src/components/organisms/AVPileSummary/AVPileSummary.scss`, `src/components/organisms/AVResourceSection/AVResourceSection.scss`

| Class Name | Description | Overridable Properties | Example Override |
|---|---|---|---|
| `.AVSummaryOption` | Review card — shadowed, min-height | `box-shadow`, `min-height`, `border-radius`, `background-color` | `.AVSummaryOption { border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.08); }` |
| `.AVSummaryOption--title` | Title text in summary | `font-size`, `font-weight`, `line-height`, `color` | `.AVSummaryOption--title { font-weight: 600; color: var(--bs-primary); }` |
| `.AVSummaryOption--ancestry` | Ancestry/path text (e.g., "Section > Question") | `color`, `font-size` | `.AVSummaryOption--ancestry { color: var(--bs-gray-500); }` |
| `.AVSummaryOption--img` | Summary image (landscape) | `max-width`, `max-height`, `border-radius` | `.AVSummaryOption--img { border-radius: 8px; }` |
| `.AVSummaryOption--img-square` | Square summary image | `height`, `width`, `object-fit`, `border-radius` | `.AVSummaryOption--img-square { border-radius: 8px; }` |
| `.AVSummaryOption--img-passport` | Passport-ratio summary image | `height`, `width`, `object-fit`, `border-radius` | `.AVSummaryOption--img-passport { border-radius: 4px; }` |
| `.AVPileSummary--summary-header` | Section header bar | `background-color`, `padding` | `.AVPileSummary--summary-header { background-color: var(--av-theme-secondary); }` |
| `.AVPileSummary--summary-header-text` | Header text | `font-weight`, `color`, `font-size` | `.AVPileSummary--summary-header-text { font-weight: 600; }` |
| `.AVResourceSection--header-text` | Section header text | `color` | `.AVResourceSection--header-text { color: var(--av-theme-background); }` |

---

## 8. Result Display Text Classes

These control text visibility on colored result bars (winners = dark bars, others = light bars).

**Source:** Multiple `src/components/organisms/AV*Summary/AV*Summary.scss`

| Class Name | Component | Description | Overridable Properties | Example Override |
|---|---|---|---|---|
| `.AVResultSummaryItem--text-dark` | Result Summary | Text on dark/winning bar | `color` | `.AVResultSummaryItem--text-dark { color: #eee; }` |
| `.AVResultSummaryItem--text-light` | Result Summary | Text on light/losing bar | `color` | `.AVResultSummaryItem--text-light { color: #333; }` |
| `.AVRankedSummary--text-bold` | Ranked Summary | Bold text (winners) | `font-weight`, `color` | `.AVRankedSummary--text-bold { font-weight: 800; }` |
| `.AVRankedSummary--text-semibold` | Ranked Summary | Semibold text | `font-weight` | `.AVRankedSummary--text-semibold { font-weight: 500; }` |
| `.AVRankedSummary--text-dark` | Ranked Summary | Text on dark bars | `color` | `.AVRankedSummary--text-dark { color: white; }` |
| `.AVRankedSummary--text-light` | Ranked Summary | Text on light bars | `color` | `.AVRankedSummary--text-light { color: #333; }` |
| `.AVInstantRunoffSummary--text-bold` | IR Summary | Bold text | `font-weight` | `.AVInstantRunoffSummary--text-bold { font-weight: 800; }` |
| `.AVInstantRunoffSummary--text-dark` | IR Summary | Text on dark bars | `color` | `.AVInstantRunoffSummary--text-dark { color: white; }` |
| `.AVInstantRunoffSummary--text-light` | IR Summary | Text on light bars | `color` | `.AVInstantRunoffSummary--text-light { color: #333; }` |
| `.AVDhondtSummary--text-bold` | D'Hondt Summary | Bold text | `font-weight` | `.AVDhondtSummary--text-bold { font-weight: 800; }` |
| `.AVDhondtSummary--text-semibold` | D'Hondt Summary | Semibold text | `font-weight` | `.AVDhondtSummary--text-semibold { font-weight: 500; }` |
| `.AVDhondtSummary--text-dark` | D'Hondt Summary | Text on dark bars | `color` | `.AVDhondtSummary--text-dark { color: white; }` |
| `.AVDhondtSummary--text-light` | D'Hondt Summary | Text on light bars | `color` | `.AVDhondtSummary--text-light { color: #333; }` |
| `.AVDhondtAPSummary--text-semibold` | D'Hondt AP Summary | Semibold text | `font-weight` | `.AVDhondtAPSummary--text-semibold { font-weight: 500; }` |
| `.AVDhondtAPSummary--text-dark` | D'Hondt AP Summary | Text on dark bars | `color` | `.AVDhondtAPSummary--text-dark { color: white; }` |
| `.AVDhondtAPSummary--text-light` | D'Hondt AP Summary | Text on light bars | `color` | `.AVDhondtAPSummary--text-light { color: #333; }` |
| `.AVCalculateResultContent--label` | Calculate Results | Status label text | `font-size`, `color`, `line-height` | `.AVCalculateResultContent--label { color: var(--bs-gray-500); }` |
| `.AVResultOption--image` | Result Option | Result option image | `max-height`, `max-width`, `border-radius` | `.AVResultOption--image { border-radius: 8px; }` |
| `.AVOptionLiveResults` | Option Live Results | Live results text | `color` | `.AVOptionLiveResults { color: var(--bs-gray-600); }` |

---

## 9. Submission Helpers & Buttons

**Source:** `src/components/molecules/AVSubmissionHelper/AVSubmissionHelper.scss`, `src/components/molecules/AVAsyncButton/AVAsyncButton.scss`, `src/bootstrap/mock.scss`

| Class Name | Description | Overridable Properties | Example Override |
|---|---|---|---|
| `.AVSubmissionHelper--quadratic` | Quadratic voting weight display | `font-size`, `line-height`, `gap`, `background-color`, `padding`, `border-radius` | `.AVSubmissionHelper--quadratic { font-size: 0.9rem; background-color: var(--av-theme-secondary); padding: 0.5rem 1rem; border-radius: 8px; }` |
| `.AVAsyncButton--waiting` | Loading/waiting state on buttons | `opacity`, `cursor` | `.AVAsyncButton--waiting { opacity: 0.6; }` |

### Theme Button Classes (from `mock.scss`)

| Class Name | Description | Overridable Properties | Example Override |
|---|---|---|---|
| `.btn-theme` | Primary themed button | `--bs-btn-bg`, `--bs-btn-color`, `--bs-btn-border-color`, `--bs-btn-hover-bg`, `--bs-btn-hover-color` | `.btn-theme { --bs-btn-bg: #003366; --bs-btn-border-radius: 8px; }` |
| `.btn-theme-danger` | Danger themed button | `background-color`, `border-color`, `color` | `.btn-theme-danger { border-radius: 8px; }` |
| `.btn-theme-outline` | Outlined theme button | `color`, `border-color`, `background-color` | `.btn-theme-outline { border-width: 2px; }` |
| `.btn-theme-danger-outline` | Outlined danger button | `color`, `border-color` | `.btn-theme-danger-outline { border-width: 2px; }` |

---

## 10. Progress Bar

**Source:** `src/components/atoms/AVProgressBar/AVProgressBar.scss`

| Class Name | Description | Overridable Properties | Example Override |
|---|---|---|---|
| `.AVProgressBar` | Bar wrapper — controls height | `height`, `border-radius`, `background-color` | `.AVProgressBar { height: 1rem !important; border-radius: 999px; }` |
| `.AVProgressBar--percentage` | Percentage label | `width`, `font-weight`, `font-size`, `color` | `.AVProgressBar--percentage { font-size: 0.8rem; }` |
| `.AVProgressBar--filling` | Animated fill bar | `background-color` (via Bootstrap `.bg-*`), `transition`, `border-radius` | `.AVProgressBar--filling { border-radius: 999px; }` |

**DOM hierarchy:**
```
.AVProgressBar
 └─ .progress
     ├─ .AVProgressBar--filling.progress-bar
     └─ .AVProgressBar--percentage
```

---

## 11. Vertical Step Navigation

**Source:** `src/components/atoms/AVVerticalStep/AVVerticalStep.scss`

| Class Name | Description | Overridable Properties | Example Override |
|---|---|---|---|
| `.AVVerticalStep--step` | Step circle — always 2rem round | `border-radius`, `min-width`, `min-height`, `max-width`, `max-height`, `border` | `.AVVerticalStep--step { min-width: 2.5rem; min-height: 2.5rem; max-width: 2.5rem; max-height: 2.5rem; }` |
| `.AVVerticalStep--step-default` | Inactive step circle bg | `background-color` | `.AVVerticalStep--step-default { background-color: var(--bs-gray-200); }` |
| `.AVVerticalStep--step-active` | Active/current step circle bg | `background-color` | `.AVVerticalStep--step-active { background-color: var(--av-theme-background); }` |
| `.AVVerticalStep--step-done` | Completed step circle bg | `background-color` | `.AVVerticalStep--step-done { background-color: var(--av-theme-background); }` |
| `.AVVerticalStep--icon` | Checkmark icon in done step | `color` | `.AVVerticalStep--icon { color: white; }` |
| `.AVVerticalStep--line` | Vertical connector line | `background-color`, `width` | `.AVVerticalStep--line { background-color: var(--av-theme-background); }` |
| `.AVVerticalStep--acronym` | Step acronym/number text | `font-weight`, `font-size`, `color` | `.AVVerticalStep--acronym { font-weight: 700; }` |
| `.AVVerticalStep--title` | Step title text | `font-weight`, `font-size`, `line-height`, `color` | `.AVVerticalStep--title { font-weight: 700; color: var(--bs-primary); }` |
| `.AVVerticalStep--subtitle` | Step subtitle text | `font-weight`, `font-size`, `line-height`, `color` | `.AVVerticalStep--subtitle { font-size: 0.7rem; }` |
| `.AVVerticalStep--text-default` | Inactive step text color | `color` | `.AVVerticalStep--text-default { color: var(--bs-gray-300); }` |
| `.AVVerticalStep--text-active` | Active step text color | `color` | `.AVVerticalStep--text-active { color: var(--av-theme-background); }` |
| `.AVVerticalStep--text-done` | Completed step text color | `color` | `.AVVerticalStep--text-done { color: var(--bs-gray-600); }` |
| `.AVVerticalStep--in-progress` | Small red dot indicator for in-progress | `background-color`, `width`, `height`, `border-radius` | `.AVVerticalStep--in-progress { background-color: var(--av-theme-background); }` |

**DOM hierarchy:**
```
.AVVerticalStep
 └─ .AVVerticalStep--link-container
     ├─ .AVVerticalStep--container
     │   ├─ .AVVerticalStep--step
     │   │   └─ .AVVerticalStep--acronym  OR  .AVVerticalStep--icon
     │   └─ .AVVerticalStep--text
     │       ├─ .AVVerticalStep--title
     │       └─ .AVVerticalStep--subtitle
     └─ .AVVerticalStep--line
```

---

## 12. Utility & Helper Components

**Source:** Multiple atom/molecule SCSS files

| Class Name | Component | Description | Overridable Properties | Example Override |
|---|---|---|---|---|
| `.AVCollapser` | Collapser | Expandable/collapsible container with hover ring | `box-shadow`, `border-radius`, `cursor` | `.AVCollapser { border-radius: 12px; }` |
| `.AVCollapser-collapse-btn` | Collapser | Toggle button | `background-color`, `border-radius` | `.AVCollapser-collapse-btn { background-color: var(--av-theme-secondary); }` |
| `.AVShowMore--overlay` | Show More | Gradient fade overlay at bottom of truncated text | `background` (gradient), `height` | `.AVShowMore--overlay { background: linear-gradient(0deg, #f8f8f8 0%, transparent 100%); }` |
| `.AVShowMore--overlay-closed` | Show More | Height when content is collapsed | `height` | `.AVShowMore--overlay-closed { height: 4rem; }` |
| `.AVTooltip--icon` | Tooltip | Tooltip trigger icon | `color` | `.AVTooltip--icon { color: var(--av-theme-background) !important; }` |
| `.AVFileInput--dropzone-container` | File Input | Drag-and-drop zone | `background-color`, `border`, `padding`, `border-radius` | `.AVFileInput--dropzone-container { border-radius: 12px; border-style: solid; }` |
| `.AVFileInput--preview-card` | File Input | Preview thumbnail card | `background-color`, `max-height`, `border-radius` | `.AVFileInput--preview-card { border-radius: 8px; }` |
| `.AVFileInput--error` | File Input | Error message text | `color` | `.AVFileInput--error { color: #cc0000; }` |
| `.AVWaitingDots` | Waiting Dots | Animated loading dots | `border-radius`, `background-color`, `width`, `height` | `.AVWaitingDots { background-color: var(--av-theme-background); }` |
| `.AVSearchBallot--option` | Search Ballot | Search result option row | `padding`, `box-shadow`, `background-color` (hover) | `.AVSearchBallot--option:hover { background-color: var(--av-theme-secondary); }` |
| `.AVSeachOptionBallot--ancestry` | Search Ballot | Path breadcrumb in search results | `color`, `padding`, `font-size` | `.AVSeachOptionBallot--ancestry { color: var(--bs-gray-500); }` |

---

## 13. Theme Utility Classes (from `mock.scss`)

| Class Name | Description | What It Overrides | Example Override |
|---|---|---|---|
| `.bg-theme` | Theme-colored background | `background-color` -> `--av-theme-background`, `color` -> `--av-theme-text` | `.bg-theme { border-radius: 8px; }` |
| `.bg-theme-danger` | Danger-colored background | `background-color` -> `--av-theme-danger-background` | `.bg-theme-danger { border-radius: 4px; }` |
| `.bg-theme-secondary` | Secondary themed bg | `background-color` -> `--av-theme-secondary`, `color` -> `--av-theme-secondary-text` | `.bg-theme-secondary { padding: 1rem; }` |
| `.text-theme` | Theme-colored text | `color` -> `--av-theme-background` | `.text-theme { font-weight: 600; }` |
| `.text-theme-danger` | Danger-colored text | `color` -> `--av-theme-danger-background` | |
| `.border-theme` | Theme-colored border | `border-color` -> `--av-theme-background` | `.border-theme { border-width: 2px; }` |
| `.border-theme-danger` | Danger-colored border | `border-color` -> `--av-theme-danger-background` | |

---

## Quick Theming Cheat Sheet

### Change the primary theme color across the entire voting UI

```css
:root {
  --av-theme-background: #1a5276;        /* Your brand primary */
  --av-theme-danger-background: #c0392b;  /* Your error color */
  --av-theme-text: white;
  --av-theme-secondary: #eaf2f8;
  --av-theme-secondary-text: #1a5276;
}
```

### Change checked checkbox/counter fill color (independent of theme)

```css
:root {
  --bs-ballot: #1a5276;
}
```

### Change the contest card accent bar

```css
:root {
  --bs-accent: #e67e22;
}
```

### Change step navigation colors

```css
.AVVerticalStep--step-active { background-color: var(--av-theme-background); }
.AVVerticalStep--step-done { background-color: var(--av-theme-background); }
.AVVerticalStep--line { background-color: var(--av-theme-background); }
.AVVerticalStep--text-active { color: var(--av-theme-background); }
```

### Override ballot error styling

The error state is triggered by adding `.AVBallot--error` to the ballot container. It forces all checked checkboxes/counters to use the danger color. To customize:

```css
.AVBallot--error .AVOptionCheckbox.AVOptionCheckbox--checked {
  background-color: your-error-color !important;
  border-color: your-error-border !important;
}

.AVBallot--error .AVOptionCheckbox--exclusive {
  background-color: your-error-color !important;
  color: your-error-text !important;
}
```
