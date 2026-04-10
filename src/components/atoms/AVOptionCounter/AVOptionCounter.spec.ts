import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import localI18n from "@/i18n";

import AVOptionCounter from "./AVOptionCounter.vue";

describe("AVOptionCounter", () => {
  const wrapper = mount(AVOptionCounter, {
    props: {
      amount: 0,
      maxAmount: 1,
      locale: "en",
    },
    global: {
      provide: {
        i18n: localI18n,
      },
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
    expect(
      wrapper.find("[data-test=option-counter-subtract]").attributes()["aria-label"],
    ).to.contain("Subtract one vote");
    expect(wrapper.find("[data-test=option-counter-subtract]").attributes()["disabled"]).to.exist;
    expect(wrapper.find("[data-test=option-counter-subtract]").html()).to.contain('icon="minus"');
    expect(wrapper.find("[data-test=option-counter-add]").attributes()["aria-label"]).to.contain(
      "Add one vote",
    );
    expect(wrapper.find("[data-test=option-counter-add]").html()).to.contain('icon="plus"');
    expect(wrapper.find("[data-test=option-counter-votes]").attributes()["aria-label"]).to.contain(
      "no votes",
    );
    expect(wrapper.find("[data-test=option-counter-votes]").text()).to.eq("0");
  });

  it("can increment votes", async () => {
    await wrapper.find("[data-test=option-counter-add]").trigger("click");

    expect(wrapper.emitted("updateCrosses")).to.deep.equal([[1]]);
    expect(wrapper.find("[data-test=option-counter-votes]").text()).to.eq("1");
    expect(wrapper.find("[data-test=option-counter-votes]").attributes()["aria-label"]).to.contain(
      "1 vote",
    );
    expect(wrapper.find("[data-test=option-counter-add]").attributes()["disabled"]).to.exist;
    expect(wrapper.find("[data-test=option-counter-subtract]").attributes()["disabled"]).to.not
      .exist;
  });

  it("can accept more votes", async () => {
    await wrapper.setProps({ maxAmount: 2 });

    expect(wrapper.find("[data-test=option-counter-add]").attributes()["disabled"]).to.not.exist;
    expect(wrapper.find("[data-test=option-counter-subtract]").attributes()["disabled"]).to.not
      .exist;
  });

  it("can accept an external value", async () => {
    await wrapper.setProps({ amount: 5, maxAmount: 10 });

    expect(wrapper.find("[data-test=option-counter-votes]").text()).to.eq("5");
    expect(wrapper.find("[data-test=option-counter-votes]").attributes()["aria-label"]).to.contain(
      "5 votes",
    );
    expect(wrapper.find("[data-test=option-counter-add]").attributes()["disabled"]).to.not.exist;
    expect(wrapper.find("[data-test=option-counter-subtract]").attributes()["disabled"]).to.not
      .exist;
  });

  it("can be invalid", async () => {
    await wrapper.setProps({ invalid: true });

    expect(wrapper.find("[data-test=option-counter-votes]").classes()).to.include(
      "AVOptionCounter--error",
    );
  });

  it("shows correct credits used for quadratic voting", () => {
    const tooltipBindings: string[] = [];
    const quadraticWrapper = mount(AVOptionCounter, {
      props: { amount: 3, maxAmount: 10, isQuadratic: true, locale: "en" },
      global: {
        provide: { i18n: localI18n },
        stubs: { AVIcon: { template: "<span />" } },
        directives: {
          tooltip: (_el: Element, binding: { value: string }) =>
            tooltipBindings.push(binding.value),
        },
      },
    });

    // amount=3: usedCredits = 1^2 + 2^2 + 3^2 = 14
    expect(tooltipBindings[tooltipBindings.length - 1]).to.contain("14 voice credits used");
    expect(quadraticWrapper.find("[data-test=option-counter-votes]").classes()).to.include(
      "cursor-help",
    );
  });

  it("emits correct value on each add click", async () => {
    await wrapper.setProps({ amount: 0, maxAmount: 3, isQuadratic: false });
    const emitsBefore = wrapper.emitted("updateCrosses")?.length ?? 0;

    await wrapper.find("[data-test=option-counter-add]").trigger("click");
    await wrapper.find("[data-test=option-counter-add]").trigger("click");
    await wrapper.find("[data-test=option-counter-add]").trigger("click");

    const allEmits = wrapper.emitted("updateCrosses") as number[][];
    expect(allEmits.slice(emitsBefore)).to.deep.equal([[1], [2], [3]]);
    expect(wrapper.find("[data-test=option-counter-votes]").text()).to.eq("3");
  });

  it("can decrement votes with subtract button", async () => {
    await wrapper.setProps({ amount: 3, maxAmount: 10 });
    const emitsBefore = wrapper.emitted("updateCrosses")?.length ?? 0;

    await wrapper.find("[data-test=option-counter-subtract]").trigger("click");

    const allEmits = wrapper.emitted("updateCrosses") as number[][];
    expect(allEmits.slice(emitsBefore)).to.deep.equal([[2]]);
    expect(wrapper.find("[data-test=option-counter-votes]").text()).to.eq("2");
    expect(wrapper.find("[data-test=option-counter-votes]").attributes()["aria-label"]).to.contain(
      "2 votes",
    );
  });

  it("can switch locale", async () => {
    await wrapper.setProps({ locale: "ko" });

    expect(
      wrapper.find("[data-test=option-counter-subtract]").attributes()["aria-label"],
    ).to.contain("한 표 빼기");
    expect(wrapper.find("[data-test=option-counter-add]").attributes()["aria-label"]).to.contain(
      "한 표 추가",
    );
    expect(wrapper.find("[data-test=option-counter-votes]").attributes()["aria-label"]).to.contain(
      "2 표",
    );
  });
});
