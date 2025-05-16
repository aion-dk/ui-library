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

  const wrapper2 = mount(AVAsyncButton, {
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

  it("renders properly in custom configuration", async () => {
    expect(wrapper2.text()).toEqual("Not saved!");
    expect(wrapper2.classes()).to.contain("btn-lg");

    await wrapper2.setProps({ size: "sm" });

    expect(wrapper2.classes()).to.contain("btn-sm");
  });

  it("supports extra padding", async () => {
    expect(wrapper2.classes()).to.not.contain("py-1");
    expect(wrapper2.classes()).to.not.contain("px-3");

    await wrapper2.setProps({ extraPadding: true });

    expect(wrapper2.classes()).to.contain("py-1");
    expect(wrapper2.classes()).to.contain("px-3");

    await wrapper2.setProps({ size: "md" });

    expect(wrapper2.classes()).to.not.contain("py-1");
    expect(wrapper2.classes()).to.not.contain("px-3");
    expect(wrapper2.classes()).to.contain("py-2");
    expect(wrapper2.classes()).to.contain("px-4");

    await wrapper2.setProps({ size: "lg" });

    expect(wrapper2.classes()).to.not.contain("px-4");
    expect(wrapper2.classes()).to.contain("py-2");
    expect(wrapper2.classes()).to.contain("px-5");
  });
});
