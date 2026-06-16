import { mount, type ComponentMountingOptions } from "@vue/test-utils";
import { expect } from "vitest";
import { configureAxe, type AxeCore } from "vitest-axe";
import { toHaveNoViolations } from "vitest-axe/dist/matchers";
import type { Component } from "vue";
import localI18n from "@/i18n";

expect.extend({ toHaveNoViolations });

declare module "vitest" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Assertion<T> {
    toHaveNoViolations(): void;
  }
  interface AsymmetricMatchersContaining {
    toHaveNoViolations(): void;
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
): Promise<AxeCore.AxeResults> {
  const userGlobal = options?.global;
  const defaults = buildDefaultGlobal();
  const provide = { ...defaults.provide, ...((userGlobal?.provide ?? {}) as object) };
  const stubs = { ...defaults.stubs, ...((userGlobal?.stubs ?? {}) as object) };
  const directives = { ...defaults.directives, ...((userGlobal?.directives ?? {}) as object) };

  const wrapper = mount(component, {
    ...(options as ComponentMountingOptions<T>),
    attachTo: document.body,
    global: {
      ...(userGlobal as object),
      provide,
      stubs,
      directives,
      ...(userGlobal?.components ? { components: userGlobal.components } : {}),
    } as ComponentMountingOptions<T>["global"],
  });

  const result = await runAxe(wrapper.element as HTMLElement);
  wrapper.unmount();
  return result;
}

export { runAxe };
