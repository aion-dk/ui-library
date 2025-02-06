import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import AVAnimatedTransition from "@/components/atoms/AVAnimatedTransition";

import AVCollapser from "./AVCollapser.vue";

describe("AVCollapser", () => {
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
      components: {
        AVAnimatedTransition,
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
});
