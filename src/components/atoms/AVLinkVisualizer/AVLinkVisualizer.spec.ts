import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { getUrl } from "@/examples";

import AVLinkVisualizer from "./AVLinkVisualizer.vue";

describe("AVLinkVisualizer", () => {
  const wrapper = mount(AVLinkVisualizer, {
    props: {
      link: getUrl("website"),
    },
    global: {
      stubs: {
        AVIcon: {
          template: "<span />",
        },
      },
    },
  });

  it("renders correctly", async () => {
    expect(wrapper.find("[data-test=button]").classes()).to.not.contain("btn-lg");
    expect(wrapper.find("[data-test=name]").text()).to.contain("My website");
    expect(wrapper.find("[data-test=icon]").attributes().icon).to.eq("link");

    await wrapper.setProps({
      link: getUrl("github"),
      large: true,
    });

    expect(wrapper.find("[data-test=button]").classes()).to.contain("btn-lg");
    expect(wrapper.find("[data-test=name]").text()).to.contain("My github");
    expect(wrapper.find("[data-test=icon]").attributes().icon).to.eq("github");

    await wrapper.setProps({
      link: getUrl("instagram"),
      large: true,
    });

    expect(wrapper.find("[data-test=name]").text()).to.contain("My instagram");
    expect(wrapper.find("[data-test=icon]").attributes().icon).to.eq("instagram");

    await wrapper.setProps({
      link: getUrl("facebook"),
      large: true,
    });

    expect(wrapper.find("[data-test=name]").text()).to.contain("My facebook");
    expect(wrapper.find("[data-test=icon]").attributes().icon).to.eq("facebook");

    await wrapper.setProps({
      link: getUrl("twitter"),
      large: true,
    });

    expect(wrapper.find("[data-test=name]").text()).to.contain("My twitter");
    expect(wrapper.find("[data-test=icon]").attributes().icon).to.eq("twitter");
  });
});
