import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";

import AVTweenedCount from "./AVTweenedCount.vue";

describe("AVTweenedCount", () => {
  const wrapper = mount(AVTweenedCount, {
    props: {
      id: "test",
      count: 5,
      duration: 0.5,
      decimals: 0,
    },
  });

  it("renders correctly", async () => {
    let isReady = false;
    setTimeout(() => (isReady = true), 600);
    await vi.waitFor(
      () => {
        if (!isReady) throw new Error("Animation failed");
        expect(wrapper.text()).to.eq("5");
        isReady = false;
      },
      {
        timeout: 2000,
        interval: 500,
      },
    );

    await wrapper.setProps({
      duration: 2,
      count: 10,
    });

    setTimeout(() => (isReady = true), 600);

    expect(wrapper.text()).to.eq("5");

    let firstTry = true;

    await vi.waitFor(
      () => {
        if (!isReady) throw new Error("Animation failed");
        if (firstTry) {
          expect(wrapper.text()).to.not.eq("5");
          expect(wrapper.text()).to.not.eq("10");
          firstTry = false;
        } else {
          expect(wrapper.text()).to.not.eq("5");
          expect(wrapper.text()).to.not.eq("6");
          expect(wrapper.text()).to.not.eq("7");
          expect(wrapper.text()).to.not.eq("8");
          expect(wrapper.text()).to.not.eq("9");
          expect(wrapper.text()).to.eq("10");
        }
        isReady = false;
      },
      {
        timeout: 2000,
        interval: 500,
      },
    );
  });

  it("can display decimals", async () => {
    await wrapper.setProps({
      duration: 1,
      count: 3.14159265,
    });

    let isReady = false;
    setTimeout(() => (isReady = true), 600);

    await vi.waitFor(
      () => {
        if (!isReady) throw new Error("Animation failed");
        expect(wrapper.text()).to.eq("3");
        isReady = false;
      },
      {
        timeout: 2000,
        interval: 500,
      },
    );

    await wrapper.setProps({
      decimals: 5,
    });

    setTimeout(() => (isReady = true), 600);
    await vi.waitFor(
      () => {
        if (!isReady) throw new Error("Animation failed");
        expect(wrapper.text()).to.eq("3.14159");
        isReady = false;
      },
      {
        timeout: 2000,
        interval: 500,
      },
    );
  });
});
