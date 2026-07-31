import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";

import AVResultSummaryItem from "./AVResultSummaryItem.vue";

describe("AVResultSummaryItem", () => {
  const wrapper = mount(AVResultSummaryItem, {
    props: {
      title: "Some number",
      value: 50,
      reference: "test-ref",
    },
  });

  it("renders properly", async () => {
    expect(wrapper.text()).to.eq("Some number:  50");
    expect(wrapper.html()).to.contain('class="m-0 text-body-80"');
    expect(wrapper.html()).to.contain('data-test="test-ref"');
  });

  it("updates correctly", async () => {
    await wrapper.setProps({
      title: "Other stuff",
      value: "Text instead",
      reference: "test-ref2",
    });

    expect(wrapper.text()).to.eq("Other stuff:  Text instead");
    expect(wrapper.html()).to.contain('class="m-0 text-body-80"');
    expect(wrapper.html()).to.contain('data-test="test-ref2"');
  });
});
