import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";

import AVTooltip from "./AVTooltip.vue";

describe("AVTooltip", () => {
  const wrapper = mount(AVTooltip, {
    props: {
      content: "Some text...",
    },
    slots: {
      text: "Text through slot",
    },
    global: {
      stubs: {
        AVIcon: {
          template: "<span />",
        },
      },
      directives: {
        tooltip: () => {},
      },
    },
  });

  it("renders correctly", async () => {
    expect(wrapper.html()).to.contain("Text through slot");

    await wrapper.setProps({
      text: "Text from props",
    });

    expect(wrapper.html()).to.not.contain("Text through slot");
    expect(wrapper.html()).to.contain("Text from props");
  });

  it("can display icon", async () => {
    expect(wrapper.html()).to.not.contain('icon="user"');

    await wrapper.setProps({
      icon: "user",
    });

    expect(wrapper.html()).to.contain('icon="user"');
  });
});
