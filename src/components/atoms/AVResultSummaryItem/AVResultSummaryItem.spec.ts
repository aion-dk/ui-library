import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";

import AVResultSummaryItem from "./AVResultSummaryItem.vue";

describe("AVResultSummaryItem", () => {
  const wrapper = mount(AVResultSummaryItem, {
    props: {
      title: "Some number",
      value: 50,
      reference: "test-ref",
      theme: "light",
    },
  });

  it("renders properly", async () => {
    expect(wrapper.text()).to.eq("Some number:  50");
    expect(wrapper.html()).to.contain('class="m-0 AVResultSummaryItem--text-light"');
    expect(wrapper.html()).to.contain('data-test="test-ref"');
  });

  it("updates correctly", async () => {
    await wrapper.setProps({
      title: "Other stuff",
      value: "Text instead",
      reference: "test-ref2",
      theme: "dark",
    });

    expect(wrapper.text()).to.eq("Other stuff:  Text instead");
    expect(wrapper.html()).to.contain('class="m-0 AVResultSummaryItem--text-dark"');
    expect(wrapper.html()).to.contain('data-test="test-ref2"');
  });
});
