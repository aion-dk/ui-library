import { mount, type ComponentMountingOptions } from "@vue/test-utils";
import { expect } from "vitest";
import { configureAxe, type AxeCore } from "vitest-axe";
import { toHaveNoViolations } from "vitest-axe/dist/matchers";
import type { Component } from "vue";
import localI18n from "@/i18n";

expect.extend({ toHaveNoViolations });

// Vitest 5 types matchers as `Matchers<R, T>`, which both `Assertion` and
// `AsymmetricMatchersContaining` extend; the type parameters must match
// Vitest's declaration exactly or TS reports TS2428.
declare module "vitest" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Matchers<R extends void | Promise<void> = void | Promise<void>, T = unknown> {
    toHaveNoViolations(): R;
  }
}

const runAxe = configureAxe({
  rules: {
    region: { enabled: false },
    "landmark-one-main": { enabled: false },
    "page-has-heading-one": { enabled: false },
    bypass: { enabled: false },
    "color-contrast": { enabled: false },
  },
});

interface DefaultGlobalConfig {
  provide: Record<string, unknown>;
  stubs: Record<string, unknown>;
  directives: Record<string, unknown>;
}

const buildDefaultGlobal = (): DefaultGlobalConfig => ({
  provide: { i18n: localI18n },
  stubs: {
    AVIcon: { template: "<span />" },
  },
  directives: {
    tooltip: {},
  },
});

export async function mountForA11y<T extends Component>(
  component: T,
  options?: ComponentMountingOptions<T>,
  axeOptions?: { rules?: AxeCore.RunOptions["rules"] },
): Promise<AxeCore.AxeResults> {
  const userGlobal = options?.global;
  const defaults = buildDefaultGlobal();
  const provide = { ...defaults.provide, ...((userGlobal?.provide ?? {}) as object) };
  const stubs = { ...defaults.stubs, ...((userGlobal?.stubs ?? {}) as object) };
  const directives = { ...defaults.directives, ...((userGlobal?.directives ?? {}) as object) };

  // Mount into a dedicated container and scan that: for multi-root components
  // `wrapper.element` is only the first root node, so axe would miss the rest.
  const container = document.createElement("div");
  document.body.appendChild(container);

  const wrapper = mount(component, {
    ...(options as ComponentMountingOptions<T>),
    attachTo: container,
    global: {
      ...(userGlobal as object),
      provide,
      stubs,
      directives,
      ...(userGlobal?.components ? { components: userGlobal.components } : {}),
    } as ComponentMountingOptions<T>["global"],
  });

  try {
    return await runAxe(container, axeOptions);
  } finally {
    wrapper.unmount();
    container.remove();
  }
}

export { runAxe };
