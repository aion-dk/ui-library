import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";

import AVAnimatedMenuButton from "./AVAnimatedMenuButton.vue";
import type { VitestEmitted } from "@/types";

describe("AVAnimatedMenuButton", () => {
  const wrapper = mount(AVAnimatedMenuButton, {
    props: {
      isOpened: false,
      variant: "cross",
      theme: "dark",
    },
  });

  it("renders correctly", async () => {
    expect(wrapper.findAll("span.AVAnimatedMenuButton--line").length).to.eq(3);
    expect(wrapper.find("button.AVAnimatedMenuButton").classes()).to.contain(
      "AVAnimatedMenuButton--dark",
    );
    expect(wrapper.find("span.AVAnimatedMenuButton--icon").classes()).to.contain(
      "AVAnimatedMenuButton--icon-dark",
    );
  });

  it("can switch to light mode", async () => {
    await wrapper.setProps({
      theme: "light",
    });

    expect(wrapper.find("button.AVAnimatedMenuButton").classes()).to.contain(
      "AVAnimatedMenuButton--light",
    );
    expect(wrapper.find("span.AVAnimatedMenuButton--icon").classes()).to.contain(
      "AVAnimatedMenuButton--icon-light",
    );
    expect(wrapper.find("button.AVAnimatedMenuButton").classes()).to.not.contain(
      "AVAnimatedMenuButton--dark",
    );
    expect(wrapper.find("span.AVAnimatedMenuButton--icon").classes()).to.not.contain(
      "AVAnimatedMenuButton--icon-dark",
    );
  });

  it("emits open on click", async () => {
    expect(wrapper.emitted().click).to.not.exist;

    await wrapper.trigger("click");

    expect(wrapper.emitted().click).to.exist;
    expect((wrapper.emitted()["update:isOpened"] as VitestEmitted)[0][0]).to.eq(true);

    expect(wrapper.find("button.AVAnimatedMenuButton").classes()).to.not.contain(
      "AVAnimatedMenuButton--opened",
    );
    expect(wrapper.find("span.AVAnimatedMenuButton--icon").classes()).to.not.contain(
      "AVAnimatedMenuButton--cross-opened",
    );

    await wrapper.setProps({
      isOpened: true,
    });

    expect(wrapper.find("button.AVAnimatedMenuButton").classes()).to.contain(
      "AVAnimatedMenuButton--opened",
    );
    expect(wrapper.find("span.AVAnimatedMenuButton--icon").classes()).to.contain(
      "AVAnimatedMenuButton--cross-opened",
    );
  });

  it("can switch variant", async () => {
    expect(wrapper.find("span.AVAnimatedMenuButton--icon").classes()).to.not.contain(
      "AVAnimatedMenuButton--arrow-down-opened",
    );

    await wrapper.setProps({
      variant: "arrow-down",
    });

    expect(wrapper.find("span.AVAnimatedMenuButton--icon").classes()).to.contain(
      "AVAnimatedMenuButton--arrow-down-opened",
    );
    expect(wrapper.find("span.AVAnimatedMenuButton--icon").classes()).to.not.contain(
      "AVAnimatedMenuButton--cross-opened",
    );
  });

  it("emits close on click", async () => {
    expect(wrapper.emitted().click.length).to.eq(1);

    await wrapper.trigger("click");

    expect(wrapper.emitted().click.length).to.eq(2);
    expect((wrapper.emitted()["update:isOpened"] as VitestEmitted)[1][0]).to.eq(false);

    await wrapper.setProps({
      isOpened: false,
    });

    expect(wrapper.find("button.AVAnimatedMenuButton").classes()).to.not.contain(
      "AVAnimatedMenuButton--opened",
    );
    expect(wrapper.find("span.AVAnimatedMenuButton--icon").classes()).to.not.contain(
      "AVAnimatedMenuButton--arrow-down-opened",
    );
  });
});
