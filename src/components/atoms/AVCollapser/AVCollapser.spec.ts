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

  it.skip("can teleport button", async () => {
    expect(document.body.innerHTML).to.eq(`<div id="test2_btn"></div>`);

    await wrapper.setProps({
      paneId: "test2",
      collapsable: true,
      useDeferredButton: true,
      optionReference: "option1",
    });

    expect(document.body.innerHTML).to.contain("AVCollapser-collapse-btn");
    expect(document.body.innerHTML).to.contain("Click to expand");
    expect(document.body.innerHTML).to.contain(`id="option_option1_dropdown"`);
  });

  it.skip("can switch languages", async () => {
    expect(document.body.innerHTML).to.contain("Click to expand");
    await wrapper.setProps({ locale: "es" });
    expect(document.body.innerHTML).to.contain("Click para expandir");
  });
});
