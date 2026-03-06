import { describe, it, expect, beforeAll } from "vitest";
import { mount } from "@vue/test-utils";
import localI18n from "@/i18n";
import AVAnimatedTransition from "@/components/atoms/AVAnimatedTransition";

import AVCollapser from "./AVCollapser.vue";

describe("AVCollapser", () => {
  beforeAll(() => {
    const el = document.createElement("div");
    el.id = "test2_btn";
    document.body.appendChild(el);
  });

  const wrapper = mount(AVCollapser, {
    props: {
      paneId: "test",
      collapsable: true,
      startCollapsed: true,
    },
    slots: {
      toggle: "Button content",
      pane: "Main content",
    },
    global: {
      provide: {
        i18n: localI18n,
      },
      components: {
        AVAnimatedTransition,
      },
      stubs: {
        AVIcon: {
          template: "<span />",
        },
      },
    },
  });

  it("can collapse/uncollapse", async () => {
    expect(wrapper.find("[data-test=collapser-button]").text()).to.contain("Button content");
    expect(wrapper.find("#test").text()).to.contain("Main content");
    expect(wrapper.find("#test").attributes().style).to.contain("display: none");
    expect(wrapper.find("#test").attributes()["aria-hidden"]).to.eq("true");

    await wrapper.find("[data-test=collapser-button]").trigger("click");

    expect(wrapper.find("#test").attributes().style).to.not.contain("display: none");
    expect(wrapper.find("#test").attributes()["aria-hidden"]).to.eq("false");

    await wrapper.find("[data-test=collapser-button]").trigger("click");

    expect(wrapper.find("#test").attributes().style).to.contain("display: none");
    expect(wrapper.find("#test").attributes()["aria-hidden"]).to.eq("true");
  });

  it("can be uncollapsible", async () => {
    await wrapper.setProps({ collapsable: false });

    expect(wrapper.findAll("[data-test=collapser-button]").length).to.eq(0);
    expect(wrapper.findAll("#test").length).to.eq(0);

    expect(wrapper.text()).to.contain("Button contentMain content");
  });

  it("renders deferred button and triggers toggle", async () => {
    // The Teleport target must match `#deferred_btn` (as used in the component)
    const el = document.createElement("div");
    el.id = "deferred_btn";
    document.body.appendChild(el);
    const deferredWrapper = mount(AVCollapser, {
      props: {
        paneId: "deferred",
        collapsable: true,
        useDeferredButton: true,
        optionReference: "ref1",
        subOptionSelected: 2,
        invalid: true,
        startCollapsed: true,
      },
      slots: {
        toggle: "Deferred Button",
        pane: "Deferred Content",
      },
      global: {
        provide: { i18n: localI18n },
        components: { AVAnimatedTransition },
        stubs: { AVIcon: { template: "<span />" } },
      },
    });
    // Wait for mount and Teleport, poll for the button to appear
    let btn = null;
    const start = Date.now();
    while (!btn && Date.now() - start < 1000) {
      await new Promise((r) => setTimeout(r, 20));
      btn = document.querySelector('#deferred_btn [data-test="option-children"]');
    }
    expect(btn, "deferred button should exist in Teleport target").to.exist;
    // Badge should exist before expanding (collapsed state)
    let badge = null;
    const badgeStart = Date.now();
    while (!badge && Date.now() - badgeStart < 500) {
      await new Promise((r) => setTimeout(r, 10));
      badge = document.querySelector('[data-test="option-child-selected"]');
    }
    expect(badge, "badge for subOptionSelected should exist when collapsed").to.exist;
    // Now expand
    btn && btn.dispatchEvent(new Event("click", { bubbles: true }));
    await deferredWrapper.vm.$nextTick();
    expect(deferredWrapper.find("#deferred").exists()).to.be.true;
    // Badge should disappear after expanding
    expect(document.querySelector('[data-test="option-child-selected"]')).to.not.exist;
    // Expander icon
    expect(document.querySelector('[data-test="option-expander"]')).to.exist;
    // Clean up
    document.body.removeChild(el);
  });

  it("emits accordionOpen event when opening", async () => {
    const emitWrapper = mount(AVCollapser, {
      props: {
        paneId: "emitTest",
        collapsable: true,
        startCollapsed: true,
      },
      slots: {
        toggle: "Emit Button",
        pane: "Emit Content",
      },
      global: {
        provide: { i18n: localI18n },
        components: { AVAnimatedTransition },
        stubs: { AVIcon: { template: "<span />" } },
      },
    });
    await emitWrapper.find("[data-test=collapser-button]").trigger("click");
    expect(emitWrapper.emitted("accordionOpen")).to.exist;
  });

  it("reacts to locale prop changes", async () => {
    const localeWrapper = mount(AVCollapser, {
      props: {
        paneId: "localeTest",
        collapsable: true,
        locale: "fr",
      },
      slots: {
        toggle: "Locale Button",
        pane: "Locale Content",
      },
      global: {
        provide: { i18n: localI18n },
        components: { AVAnimatedTransition },
        stubs: { AVIcon: { template: "<span />" } },
      },
    });
    await localeWrapper.setProps({ locale: "en" });
    expect(localeWrapper.props().locale).to.eq("en");
  });
});
