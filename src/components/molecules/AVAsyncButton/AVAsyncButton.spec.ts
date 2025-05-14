import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";

import AVAsyncButton from "./AVAsyncButton.vue";

describe("AVAsyncButton", () => {
  it("renders properly in basic configuration", async () => {
    const wrapper = mount(AVAsyncButton, {
      props: {},
      slots: {
        label: "Save",
        waitingLabel: "Saving...",
      },
      global: {
        stubs: {
          AVSpinner: {
            template: "<span />",
          },
        },
      },
    });
    expect(wrapper.text()).toEqual("Save");
    expect(wrapper.classes()).to.contain("btn-md");
    expect(wrapper.findAll("[data-test=btn-spinner]").length).toEqual(0);

    await wrapper.setProps({
      async onClick() {
        await wrapper.vm.$nextTick();
        expect(wrapper.classes()).to.contain("AVAsyncButton--waiting");
        expect(wrapper.findAll("[data-test=btn-spinner]").length).toEqual(1);
      },
    });

    await wrapper.trigger("click");

    await wrapper.setProps({ variant: "success" });

    expect(wrapper.classes()).to.contain("btn-success");
    expect(wrapper.findAll("[data-test=btn-spinner]").length).toEqual(0);

    await wrapper.setProps({ variant: "danger" });

    expect(wrapper.classes()).to.contain("btn-danger");
    expect(wrapper.findAll("[data-test=btn-spinner]").length).toEqual(0);
  });

  it("renders properly in custom configuration", async () => {
    const wrapper = mount(AVAsyncButton, {
      props: {
        size: "lg",
      },
      slots: {
        label: "Not saved!",
        waitingLabel: "Saving...",
      },
      global: {
        stubs: {
          AVSpinner: {
            template: "<span />",
          },
        },
      },
    });
    expect(wrapper.text()).toEqual("Not saved!");
    expect(wrapper.classes()).to.contain("btn-lg");

    await wrapper.setProps({ size: "sm" });

    expect(wrapper.classes()).to.contain("btn-sm");
  });
});
