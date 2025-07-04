import type { Meta, LocalString } from "@/types";
import { AVDhondtAPSummary } from "@/components";
import { SUPPORTED_LOCALES } from "@/constants";
import { getOption, getVoteCounts } from "@/examples";

const meta: Meta<typeof AVDhondtAPSummary> = {
  title: "Design System/Organisms/AVDhondtAPSummary",
  component: AVDhondtAPSummary,
  tags: ["autodocs"],
  argTypes: {
    result: {
      control: { type: "object" },
    },
    totalCount: {
      control: { type: "number", min: 0, max: 9999, step: 1 },
    },
    distributionNumber: {
      control: { type: "number", min: 0, max: 9999, step: 1 },
    },
    seats: {
      control: { type: "number", min: 0, max: 9999, step: 1 },
    },
    hideElected: {
      control: { type: "boolean" },
    },
    hideTied: {
      control: { type: "boolean" },
    },
    voteCounts: {
      control: { type: "object" },
    },
    theme: {
      control: { type: "select" },
      options: ["light", "dark"],
    },
    locale: {
      control: { type: "select" },
      options: SUPPORTED_LOCALES,
    },
  },
};

export default meta;

const Template = (args: Meta) => ({
  components: { AVDhondtAPSummary },
  setup() {
    return { args };
  },
  template: '<AVDhondtAPSummary v-bind="args" />',
});

export const Elected = {
  render: Template,

  args: {
    distributionNumber: 5,
    totalCount: 10,
    seats: 2,
    result: [
      {
        reference: getOption(["selectable", "children"], 2).children?.[1].reference as string,
        title: getOption(["selectable", "children"], 2).children?.[1].title as LocalString,
        count: 4,
        elected: true,
        tied: false,
        group: getOption(["selectable", "children"], 2).title,
        comparativeFigure: 6,
      },
      {
        reference: getOption(["selectable", "children"], 1).children?.[0].reference as string,
        title: getOption(["selectable", "children"], 1).children?.[0].title as LocalString,
        count: 3,
        elected: true,
        tied: false,
        group: getOption(["selectable", "children"], 1).title,
        comparativeFigure: 4,
      },
      {
        reference: getOption(["selectable", "children"], 1).children?.[1].reference as string,
        title: getOption(["selectable", "children"], 1).children?.[1].title as LocalString,
        count: 2,
        elected: false,
        tied: false,
        group: getOption(["selectable", "children"], 1).title,
        comparativeFigure: 3,
      },
      {
        reference: getOption(["selectable", "children"], 2).children?.[0].reference as string,
        title: getOption(["selectable", "children"], 2).children?.[0].title as LocalString,
        count: 2,
        elected: false,
        tied: false,
        group: getOption(["selectable", "children"], 2).title,
        comparativeFigure: 2,
      },
      {
        reference: getOption(["selectable", "children"], 2).reference,
        title: getOption(["selectable", "children"], 2).title,
        count: 6,
        elected: false,
        tied: false,
        group: null,
        comparativeFigure: null,
      },
      {
        reference: getOption(["selectable", "children"], 1).reference,
        title: getOption(["selectable", "children"], 1).title,
        count: 4,
        elected: false,
        tied: false,
        group: null,
        comparativeFigure: null,
      },
      {
        reference: "blank",
        title: {
          en: "Blank vote",
          da: "Blank stemme",
          de: "Enthaltung",
          es: "Voto en blanco",
        },
        count: 0,
        elected: false,
        tied: false,
      },
    ],
    voteCounts: getVoteCounts(),
  },
};

export const Tied = {
  render: Template,

  args: {
    distributionNumber: 5,
    totalCount: 11,
    seats: 1,
    result: [
      {
        reference: getOption(["selectable", "children"], 2).children?.[1].reference as string,
        title: getOption(["selectable", "children"], 2).children?.[1].title as LocalString,
        count: 4,
        elected: false,
        tied: true,
        group: getOption(["selectable", "children"], 2).title,
        comparativeFigure: 5,
      },
      {
        reference: getOption(["selectable", "children"], 1).children?.[0].reference as string,
        title: getOption(["selectable", "children"], 1).children?.[0].title as LocalString,
        count: 4,
        elected: false,
        tied: true,
        group: getOption(["selectable", "children"], 1).title,
        comparativeFigure: 5,
      },
      {
        reference: getOption(["selectable", "children"], 1).children?.[1].reference as string,
        title: getOption(["selectable", "children"], 1).children?.[1].title as LocalString,
        count: 2,
        elected: false,
        tied: false,
        group: getOption(["selectable", "children"], 1).title,
        comparativeFigure: 3,
      },
      {
        reference: getOption(["selectable", "children"], 2).children?.[0].reference as string,
        title: getOption(["selectable", "children"], 2).children?.[0].title as LocalString,
        count: 2,
        elected: false,
        tied: false,
        group: getOption(["selectable", "children"], 2).title,
        comparativeFigure: 2,
      },
      {
        reference: getOption(["selectable", "children"], 2).reference,
        title: getOption(["selectable", "children"], 2).title,
        count: 6,
        elected: false,
        tied: false,
        group: null,
        comparativeFigure: null,
      },
      {
        reference: getOption(["selectable", "children"], 1).reference,
        title: getOption(["selectable", "children"], 1).title,
        count: 5,
        elected: false,
        tied: false,
        group: null,
        comparativeFigure: null,
      },
      {
        reference: "blank",
        title: {
          en: "Blank vote",
          da: "Blank stemme",
          de: "Enthaltung",
          es: "Voto en blanco",
        },
        count: 0,
        elected: false,
        tied: false,
      },
    ],
    voteCounts: getVoteCounts(),
  },
};

export const ElectedDark = {
  render: Template,

  globals: {
    backgrounds: { value: "dark" },
  },
  args: {
    distributionNumber: 5,
    totalCount: 10,
    seats: 2,
    theme: "dark",
    result: [
      {
        reference: getOption(["selectable", "children"], 2).children?.[1].reference as string,
        title: getOption(["selectable", "children"], 2).children?.[1].title as LocalString,
        count: 4,
        elected: true,
        tied: false,
        group: getOption(["selectable", "children"], 2).title,
        comparativeFigure: 6,
      },
      {
        reference: getOption(["selectable", "children"], 1).children?.[0].reference as string,
        title: getOption(["selectable", "children"], 1).children?.[0].title as LocalString,
        count: 3,
        elected: true,
        tied: false,
        group: getOption(["selectable", "children"], 1).title,
        comparativeFigure: 4,
      },
      {
        reference: getOption(["selectable", "children"], 1).children?.[1].reference as string,
        title: getOption(["selectable", "children"], 1).children?.[1].title as LocalString,
        count: 2,
        elected: false,
        tied: false,
        group: getOption(["selectable", "children"], 1).title,
        comparativeFigure: 3,
      },
      {
        reference: getOption(["selectable", "children"], 2).children?.[0].reference as string,
        title: getOption(["selectable", "children"], 2).children?.[0].title as LocalString,
        count: 2,
        elected: false,
        tied: false,
        group: getOption(["selectable", "children"], 2).title,
        comparativeFigure: 2,
      },
      {
        reference: getOption(["selectable", "children"], 2).reference,
        title: getOption(["selectable", "children"], 2).title,
        count: 6,
        elected: false,
        tied: false,
        group: null,
        comparativeFigure: null,
      },
      {
        reference: getOption(["selectable", "children"], 1).reference,
        title: getOption(["selectable", "children"], 1).title,
        count: 4,
        elected: false,
        tied: false,
        group: null,
        comparativeFigure: null,
      },
      {
        reference: "blank",
        title: {
          en: "Blank vote",
          da: "Blank stemme",
          de: "Enthaltung",
          es: "Voto en blanco",
        },
        count: 0,
        elected: false,
        tied: false,
      },
    ],
    voteCounts: getVoteCounts(),
  },
};

export const TiedDark = {
  render: Template,

  globals: {
    backgrounds: { value: "dark" },
  },
  args: {
    distributionNumber: 5,
    totalCount: 11,
    seats: 1,
    theme: "dark",
    result: [
      {
        reference: getOption(["selectable", "children"], 2).children?.[1].reference as string,
        title: getOption(["selectable", "children"], 2).children?.[1].title as LocalString,
        count: 4,
        elected: false,
        tied: true,
        group: getOption(["selectable", "children"], 2).title,
        comparativeFigure: 5,
      },
      {
        reference: getOption(["selectable", "children"], 1).children?.[0].reference as string,
        title: getOption(["selectable", "children"], 1).children?.[0].title as LocalString,
        count: 4,
        elected: false,
        tied: true,
        group: getOption(["selectable", "children"], 1).title,
        comparativeFigure: 5,
      },
      {
        reference: getOption(["selectable", "children"], 1).children?.[1].reference as string,
        title: getOption(["selectable", "children"], 1).children?.[1].title as LocalString,
        count: 2,
        elected: false,
        tied: false,
        group: getOption(["selectable", "children"], 1).title,
        comparativeFigure: 3,
      },
      {
        reference: getOption(["selectable", "children"], 2).children?.[0].reference as string,
        title: getOption(["selectable", "children"], 2).children?.[0].title as LocalString,
        count: 2,
        elected: false,
        tied: false,
        group: getOption(["selectable", "children"], 2).title,
        comparativeFigure: 2,
      },
      {
        reference: getOption(["selectable", "children"], 2).reference,
        title: getOption(["selectable", "children"], 2).title,
        count: 6,
        elected: false,
        tied: false,
        group: null,
        comparativeFigure: null,
      },
      {
        reference: getOption(["selectable", "children"], 1).reference,
        title: getOption(["selectable", "children"], 1).title,
        count: 5,
        elected: false,
        tied: false,
        group: null,
        comparativeFigure: null,
      },
      {
        reference: "blank",
        title: {
          en: "Blank vote",
          da: "Blank stemme",
          de: "Enthaltung",
          es: "Voto en blanco",
        },
        count: 0,
        elected: false,
        tied: false,
      },
    ],
    voteCounts: getVoteCounts(),
  },
};
