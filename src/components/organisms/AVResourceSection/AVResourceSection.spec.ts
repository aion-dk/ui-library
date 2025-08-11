import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { getCandidate } from "@/examples";
import localI18n from "@/i18n";

import AVResourceSection from "./AVResourceSection.vue";
import AVTooltip from "@/components/atoms/AVTooltip";

describe("AVResourceSection", () => {
  const wrapper = mount(AVResourceSection, {
    props: {
      candidate: getCandidate(),
      summary: true,
      card: true,
      locale: "en",
    },
    global: {
      components: { AVTooltip },
      provide: {
        i18n: localI18n,
      },
      directives: {
        tooltip: () => {},
      },
      stubs: {
        AVIcon: {
          template: "<span />",
        },
        AVLinkVisualizer: {
          template: "<span />",
        },
      },
    },
  });

  it("renders properly as card", async () => {
    expect(wrapper.find("[data-test=resource-image]").attributes().src).to.contain(
      "https://electa.staging-1.assemblyvoting.net/uploads_proxy/option/image/657750",
    );
    expect(wrapper.find("[data-test=resource-image]").attributes().alt).to.contain(
      "Portrait of the candidate",
    );
    expect(wrapper.find("[data-test=heading-title]").text()).to.contain("Jhon Doe");
    expect(wrapper.find("[data-test=heading-subtitle]").text()).to.contain("Developer");
    expect(wrapper.findAll("[data-test=heading-group]").length).to.eq(0);
    expect(wrapper.findAll("[data-test=resource-content]").length).to.eq(0);
  });

  it("renders properly as summary", async () => {
    await wrapper.setProps({
      card: false,
    });

    expect(wrapper.find("[data-test=resource-image]").attributes().src).to.contain(
      "https://electa.staging-1.assemblyvoting.net/uploads_proxy/option/image/657750",
    );
    expect(wrapper.find("[data-test=resource-image]").attributes().alt).to.contain(
      "Portrait of the candidate",
    );
    expect(wrapper.find("[data-test=heading-title]").text()).to.contain("Jhon Doe");
    expect(wrapper.find("[data-test=heading-subtitle]").text()).to.contain("Developer");
    expect(wrapper.find("[data-test=heading-group]").text()).to.contain("Zealand& 1 more");

    expect(wrapper.findAll("[data-test=resource-content]").length).to.eq(2);
    expect(wrapper.find("[data-test=resource-link-list]").findAll("span")[0].text()).to.contain(
      "Field label:",
    );
    expect(wrapper.find("[data-test=resource-link-list]").findAll("span").length).to.eq(4);
    expect(
      wrapper.find("[data-test=resource-link-list]").findAll("span")[1].attributes().large,
    ).to.eq("false");

    expect(wrapper.findAll("[data-test=resource-regular-content]").length).to.eq(1);
    expect(wrapper.find("[data-test=resource-regular-content]").text()).to.contain(
      "Field label: Some text",
    );
  });

  it("can highlight specific group", async () => {
    await wrapper.setProps({
      currentCandidateGroup: 2,
    });

    expect(wrapper.find("[data-test=heading-group]").text()).to.not.contain("Zealand& 1 more");
    expect(wrapper.find("[data-test=heading-group]").text()).to.contain("Jutland& 1 more");
  });

  it("can be party leader", async () => {
    expect(wrapper.findAll("[data-test=party-leader-tag]").length).to.eq(0);

    await wrapper.setProps({
      isPartyLeader: true,
    });

    expect(wrapper.find("[data-test=party-leader-tag]").text()).to.contain("Party leader");
    expect(wrapper.find("[data-test=party-leader-tag]").html()).to.contain('icon="certificate"');
  });

  it("party can display party leader", async () => {
    expect(wrapper.findAll("[data-test=party-leader-btn]").length).to.eq(0);

    await wrapper.setProps({
      partyLeaderData: {
        label: { en: "Someone Important" },
        url: "https://www.link.com",
      },
    });

    expect(wrapper.find("[data-test=party-leader-btn]").text()).to.contain("Someone Important");
    expect(wrapper.find("[data-test=party-leader-btn]").html()).to.contain('icon="certificate"');
    expect(wrapper.find("[data-test=party-leader-btn]").html()).to.contain(
      'href="https://www.link.com"',
    );
  });

  it("renders properly as content", async () => {
    await wrapper.setProps({
      summary: false,
    });

    expect(wrapper.findAll("[data-test=resource-image]").length).to.eq(0);
    expect(wrapper.findAll("[data-test=heading-title]").length).to.eq(0);
    expect(wrapper.findAll("[data-test=heading-subtitle]").length).to.eq(0);
    expect(wrapper.findAll("[data-test=heading-group]").length).to.eq(0);
    expect(wrapper.findAll("[data-test=resource-content]").length).to.eq(5);

    wrapper
      .findAll("[data-test=resource-title]")
      .forEach((r) => expect(r.text()).to.contain("Field label"));
    expect(wrapper.find("[data-test=resource-rich-text]").text()).to.contain(
      "This is a very long text. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae justo eget magna fermentum. In vitae turpis massa sed elementum. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed.",
    );
    expect(wrapper.find("[data-test=resource-link-list]").findAll("span").length).to.eq(6);
    wrapper
      .find("[data-test=resource-link-list]")
      .findAll("span")
      .forEach((r) => expect(r.attributes().large).to.eq("true"));
    expect(wrapper.find("[data-test=resource-regular-content]").text()).to.contain("1/1/2000");

    expect(wrapper.find("[data-test=resource-video]").html()).to.contain(
      "width: 100%; height: 100%; min-height: 400px",
    );
    expect(wrapper.find("[data-test=resource-video]").html()).to.contain(
      "https://www.youtube.com/watch?v=P_qnA3jdLno",
    );
  });

  it("can switch language", async () => {
    await wrapper.setProps({
      locale: "es",
    });

    wrapper
      .findAll("[data-test=resource-title]")
      .forEach((r) => expect(r.text()).to.contain("Etiqueta del campo"));
    expect(wrapper.find("[data-test=resource-rich-text]").text()).to.contain(
      "Este es un texto muy largo. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae justo eget magna fermentum. In vitae turpis masa sed elementum. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed.",
    );

    await wrapper.setProps({
      summary: true,
    });

    expect(wrapper.find("[data-test=heading-group]").text()).to.contain("Jutlandiay 1 más");
    expect(wrapper.find("[data-test=resource-regular-content]").text()).to.contain(
      "Etiqueta del campo: Some text",
    );
  });
});
