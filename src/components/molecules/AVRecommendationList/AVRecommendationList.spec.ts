import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import localI18n from "@/i18n";
import AVCollapser from "@/components/atoms/AVCollapser";
import AVAnimatedTransition from "@/components/atoms/AVAnimatedTransition";

import AVRecommendationList from "./AVRecommendationList.vue";

const hash = "www.initial.com";
vi.stubGlobal("location", { href: hash });

describe("AVRecommendationList", () => {
  const wrapper = mount(AVRecommendationList, {
    props: {
      recommendations: [],
      locale: "en",
      recommendationPhaseActive: true,
    },
    global: {
      provide: {
        i18n: localI18n,
      },
      components: {
        AVCollapser,
        AVAnimatedTransition,
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

  it("renders properly", async () => {
    expect(wrapper.text()).to.contain("Recommenders");
    expect(wrapper.text()).to.not.contain("Uncollapse the list");
    expect(wrapper.text()).to.not.contain("Collapse the list");
    expect(wrapper.findAll("[data-test=recommendation]").length).to.eq(0);
    expect(wrapper.find("[data-test=recommendation-summary]").text()).to.contain(
      "This candidate doesn\'t have any recommendations",
    );

    await wrapper.setProps({
      recommendations: [
        {
          id: 1,
          label: "R1",
          position: 1,
        },
      ],
    });

    expect(wrapper.text()).to.contain("Recommenders (1)");
    expect(wrapper.text()).to.contain("R1");
    expect(wrapper.findAll("[data-test=recommendation]").length).to.eq(0);
    expect(wrapper.find("[data-test=recommendation-summary]").text()).to.contain("R1");
  });

  it("can collapse and uncollapse", async () => {
    await wrapper.setProps({
      recommendations: [
        {
          id: 1,
          label: "R1",
          position: 1,
        },
        {
          id: 2,
          label: "R2",
          position: 2,
        },
        {
          id: 3,
          label: "R3",
          position: 3,
        },
        {
          id: 4,
          label: "R4",
          position: 4,
        },
      ],
    });

    expect(wrapper.find("[data-test=recommendation-summary]").text()).to.eq(
      "R1, R2, R3, and 1 more...",
    );

    expect(wrapper.find("#recommendation-list").attributes()["aria-hidden"]).to.eq("true");
    expect(wrapper.find("#recommendation-list").attributes().style).to.contain("display: none");
    expect(wrapper.text()).to.contain("Expand list");
    expect(wrapper.text()).to.not.contain("Collapse list");

    await wrapper.find("[data-test=collapser-button]").trigger("click");

    expect(wrapper.find("#recommendation-list").attributes()["aria-hidden"]).to.eq("false");
    expect(wrapper.find("#recommendation-list").attributes().style).to.not.contain("display: none");
    expect(wrapper.text()).to.not.contain("Expand list");
    expect(wrapper.text()).to.contain("Collapse list");

    await wrapper.find("[data-test=collapser-button]").trigger("click");

    expect(wrapper.find("#recommendation-list").attributes()["aria-hidden"]).to.eq("true");
    expect(wrapper.find("#recommendation-list").attributes().style).to.contain("display: none");
    expect(wrapper.text()).to.contain("Expand list");
    expect(wrapper.text()).to.not.contain("Collapse list");
  });

  it("can order recommendations", async () => {
    expect(wrapper.findAll("[data-test=recommendation]")[0].text()).to.eq("R1");
    expect(wrapper.findAll("[data-test=recommendation]")[1].text()).to.eq("R2");
    expect(wrapper.findAll("[data-test=recommendation]")[2].text()).to.eq("R3");
    expect(wrapper.findAll("[data-test=recommendation]")[3].text()).to.eq("R4");

    await wrapper.setProps({
      recommendations: [
        {
          id: 5,
          label: "R1",
          position: 3,
        },
        {
          id: 6,
          label: "R2",
          position: 2,
        },
        {
          id: 7,
          label: "R3",
          position: 4,
        },
        {
          id: 8,
          label: "R4",
          position: 1,
        },
      ],
    });

    expect(wrapper.findAll("[data-test=recommendation]")[0].text()).to.eq("R4");
    expect(wrapper.findAll("[data-test=recommendation]")[1].text()).to.eq("R2");
    expect(wrapper.findAll("[data-test=recommendation]")[2].text()).to.eq("R1");
    expect(wrapper.findAll("[data-test=recommendation]")[3].text()).to.eq("R3");
  });

  it("can expand summary", async () => {
    await wrapper.setProps({
      summaryRecommenders: 5,
    });

    expect(wrapper.find("[data-test=recommendation-summary]").text()).to.eq("R4, R2, R1, R3");
  });

  it("can display invite recommenders button", async () => {
    expect(wrapper.findAll(".AVRecommendationList--invite-btn").length).to.eq(0);

    await wrapper.setProps({
      inviteRecommendersPath: "www.some-url.com",
      recommendationPhaseActive: true,
    });

    expect(wrapper.find(".AVRecommendationList--invite-btn").text()).to.contain(
      "Invite recommenders",
    );

    expect(window.location.href).to.eq("www.initial.com");
    expect(window.location.href).not.to.eq("www.some-url.com");
    await wrapper.find(".AVRecommendationList--invite-btn").trigger("click");
    expect(window.location.href).to.eq("www.some-url.com");
  });

  it("can display view recommendations button", async () => {
    expect(wrapper.findAll(".AVRecommendationList--invite-btn").length).to.eq(1);

    await wrapper.setProps({
      viewRecommendationsPath: "www.other-url.com",
      recommendationPhaseActive: true,
    });

    expect(wrapper.findAll(".AVRecommendationList--invite-btn")[1].text()).to.contain(
      "View recommendations",
    );

    expect(window.location.href).to.eq("www.some-url.com");
    expect(window.location.href).not.to.eq("www.other-url.com");
    await wrapper.findAll(".AVRecommendationList--invite-btn")[1].trigger("click");
    expect(window.location.href).to.eq("www.other-url.com");
  });

  it("disables invite recommenders button", async () => {
    await wrapper.setProps({
      inviteRecommendersPath: "www.some-url.com",
      recommendationPhaseActive: false,
    });

    expect(wrapper.find(".AVRecommendationList--invite-btn").text()).to.contain(
      "Invite recommenders",
    );
    expect(wrapper.find(".AVRecommendationList--invite-btn").attributes().disabled).toBeTruthy;
  });

  it("can switch language", async () => {
    await wrapper.setProps({
      locale: "fi",
      summaryRecommenders: 3,
    });

    expect(wrapper.text()).to.contain("Suosittelijat (4)");
    expect(wrapper.find("[data-test=recommendation-summary]").text()).to.eq(
      "R4, R2, R1, ja 1 muuta...",
    );
    expect(wrapper.find("[data-test=list-collapse]").text()).to.contain("Laajenna luettelo");

    await wrapper.find("[data-test=collapser-button]").trigger("click");

    expect(wrapper.find("[data-test=list-collapse]").text()).to.contain("Tiivistä luettelo");
    expect(wrapper.find(".AVRecommendationList--invite-btn").text()).to.contain(
      "Kutsu suosittelijoita",
    );
    expect(wrapper.findAll(".AVRecommendationList--invite-btn")[1].text()).to.contain(
      "Näytä suositukset",
    );
  });
});
