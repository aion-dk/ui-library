# Welcome to the Assembly Voting UI Library

This library based on our Design System is meant to help you build `Vue` applications faster.

Here, you can search among our UI components, grab the ones you need, install them on your applications, customize them and you're ready to go.

## Setup

`npm i @assemblyvoting/electa-ui`

`yarn add @assemblyvoting/electa-ui`

## Importing library as a plugin (recommended)

In the main file:

```
import * as UILibrary from "@assemblyvoting/electa-ui"; // Imports components
import "@assemblyvoting/electa-ui/styles"; // Imports styles

const app = createApp(App);
app.use(UILibrary.default); // Plugin-in the library
app.mount("#app");
```

You can also provide a i18n instance from the parent application, if this is the case the library will ignore its internal i18n instance, so it is important that you provide translations for all of the components you will use.

In case you don't pass a i18n instance, you can pass the locale as a param to any component that needs to be translated.

```
app.use(UILibrary.default, i18n);
```

The provided translations need to follow this format:

```
js:
  components:
    AVComponentName:
      key_1: Translation1
      key_2: Translation2
      key_3: Translation3
```

## Importing components individually

In the file you want to use it:

```
import { ComponentName } from "@assemblyvoting/electa-ui"

<ComponentName />

```

## Project Setup

```sh
yarn --frozen-lockfile
```

### Compile and Hot-Reload for Development

```sh
yarn dev
```

### Type-Check, Compile and Minify for Production

```sh
yarn build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
yarn test
```

### Lint with [ESLint](https://eslint.org/)

```sh
yarn lint
```

### Start [Storybook](https://storybook.js.org/) for Development

```sh
yarn storybook
```

### Compile [Storybook](https://storybook.js.org/) for Production

```sh
yarn build-storybook
```
