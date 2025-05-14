import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";

import AVElectaContestCard from "./AVElectaContestCard.vue";

describe("AVElectaContestCard", () => {
  it("renders properly", async () => {
    const wrapper = mount(AVElectaContestCard, {
      props: {
        contestTitle: "I'm a Title",
        votingRoundTitle: "I'm also a title",
      },
    });

    expect(wrapper.text()).to.contain("I'm a Title");
    expect(wrapper.text()).to.contain("I'm also a title");

    await wrapper.setProps({
      contestTitle: "I changed",
      votingRoundTitle: "Me too!",
    });

    expect(wrapper.text()).to.not.contain("I'm a Title");
    expect(wrapper.text()).to.not.contain("I'm also a title");
    expect(wrapper.text()).to.contain("I changed");
    expect(wrapper.text()).to.contain("Me too!");
  });
});
