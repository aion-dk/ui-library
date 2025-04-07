import type { Meta } from "@/types";
import { AVDhondtSummary } from "@/components";
import { SUPPORTED_LOCALES } from "@/constants";
import { getOption } from "@/examples";

const meta: Meta<typeof AVDhondtSummary> = {
  title: "Design System/Organisms/AVDhondtSummary",
  component: AVDhondtSummary,
  tags: ["autodocs"],
  argTypes: {
    result: {
      control: { type: "object" },
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
  components: { AVDhondtSummary },
  setup() {
    return { args };
  },
  template: '<AVDhondtSummary v-bind="args" />',
});

export const Elected = {
  render: Template,

  args: {
    distributionNumber: 5,
    seats: 4,
    result: [
      [
        {
          reference: getOption(["selectable"], 1).reference,
          title: getOption(["selectable"], 1).title,
          elected: true,
          tied: false,
          raffled: false,
          comparativeFigure: 6,
        },
        {
          reference: getOption(["selectable"], 2).reference,
          title: getOption(["selectable"], 2).title,
          elected: true,
          tied: false,
          raffled: false,
          comparativeFigure: 3,
        },
      ],
      [
        {
          reference: getOption(["selectable"], 1).reference,
          title: getOption(["selectable"], 1).title,
          elected: true,
          tied: false,
          raffled: false,
          comparativeFigure: 3,
        },
        {
          reference: getOption(["selectable"], 2).reference,
          title: getOption(["selectable"], 2).title,
          elected: false,
          tied: false,
          raffled: false,
          comparativeFigure: 1.5,
        },
      ],
      [
        {
          reference: getOption(["selectable"], 1).reference,
          title: getOption(["selectable"], 1).title,
          elected: true,
          tied: false,
          raffled: false,
          comparativeFigure: 2,
        },
        {
          reference: getOption(["selectable"], 2).reference,
          title: getOption(["selectable"], 2).title,
          elected: false,
          tied: false,
          raffled: false,
          comparativeFigure: 1,
        },
      ],
      [
        {
          reference: getOption(["selectable"], 1).reference,
          title: getOption(["selectable"], 1).title,
          elected: false,
          tied: false,
          raffled: false,
          comparativeFigure: 1.5,
        },
        {
          reference: getOption(["selectable"], 2).reference,
          title: getOption(["selectable"], 2).title,
          elected: false,
          tied: false,
          raffled: false,
          comparativeFigure: 0.75,
        },
      ],
      {
        reference: "blank",
        title: { da: "Blank stemme", en: "Blank vote" },
        count: 1,
        elected: false,
        tied: false,
      },
    ],
  },
};

export const Tied = {
  render: Template,

  args: {
    distributionNumber: 5,
    seats: 4,
    result: [
      [
        {
          reference: getOption(["selectable"], 1).reference,
          title: getOption(["selectable"], 1).title,
          elected: true,
          tied: false,
          raffled: false,
          comparativeFigure: 6,
        },
        {
          reference: getOption(["selectable"], 2).reference,
          title: getOption(["selectable"], 2).title,
          elected: true,
          tied: false,
          raffled: false,
          comparativeFigure: 3,
        },
      ],
      [
        {
          reference: getOption(["selectable"], 1).reference,
          title: getOption(["selectable"], 1).title,
          elected: true,
          tied: false,
          raffled: false,
          comparativeFigure: 3,
        },
        {
          reference: getOption(["selectable"], 2).reference,
          title: getOption(["selectable"], 2).title,
          elected: false,
          tied: true,
          raffled: false,
          comparativeFigure: 2,
        },
      ],
      [
        {
          reference: getOption(["selectable"], 1).reference,
          title: getOption(["selectable"], 1).title,
          elected: false,
          tied: true,
          raffled: false,
          comparativeFigure: 2,
        },
        {
          reference: getOption(["selectable"], 2).reference,
          title: getOption(["selectable"], 2).title,
          elected: false,
          tied: false,
          raffled: false,
          comparativeFigure: 1,
        },
      ],
      [
        {
          reference: getOption(["selectable"], 1).reference,
          title: getOption(["selectable"], 1).title,
          elected: false,
          tied: false,
          raffled: false,
          comparativeFigure: 1.5,
        },
        {
          reference: getOption(["selectable"], 2).reference,
          title: getOption(["selectable"], 2).title,
          elected: false,
          tied: false,
          raffled: false,
          comparativeFigure: 0.75,
        },
      ],
      {
        reference: "blank",
        title: { da: "Blank stemme", en: "Blank vote" },
        count: 1,
        elected: false,
        tied: false,
      },
    ],
  },
};

export const TiedAndElected = {
  render: Template,

  args: {
    distributionNumber: 5,
    seats: 4,
    result: [
      [
        {
          reference: getOption(["selectable"], 1).reference,
          title: getOption(["selectable"], 1).title,
          elected: true,
          tied: false,
          raffled: false,
          comparativeFigure: 6,
        },
        {
          reference: getOption(["selectable"], 2).reference,
          title: getOption(["selectable"], 2).title,
          elected: true,
          tied: false,
          raffled: false,
          comparativeFigure: 3,
        },
      ],
      [
        {
          reference: getOption(["selectable"], 1).reference,
          title: getOption(["selectable"], 1).title,
          elected: true,
          tied: false,
          raffled: false,
          comparativeFigure: 3,
        },
        {
          reference: getOption(["selectable"], 2).reference,
          title: getOption(["selectable"], 2).title,
          elected: true,
          tied: true,
          raffled: false,
          comparativeFigure: 2,
        },
      ],
      [
        {
          reference: getOption(["selectable"], 1).reference,
          title: getOption(["selectable"], 1).title,
          elected: false,
          tied: true,
          raffled: false,
          comparativeFigure: 2,
        },
        {
          reference: getOption(["selectable"], 2).reference,
          title: getOption(["selectable"], 2).title,
          elected: false,
          tied: false,
          raffled: false,
          comparativeFigure: 1,
        },
      ],
      [
        {
          reference: getOption(["selectable"], 1).reference,
          title: getOption(["selectable"], 1).title,
          elected: false,
          tied: false,
          raffled: false,
          comparativeFigure: 1.5,
        },
        {
          reference: getOption(["selectable"], 2).reference,
          title: getOption(["selectable"], 2).title,
          elected: false,
          tied: false,
          raffled: false,
          comparativeFigure: 0.75,
        },
      ],
      {
        reference: "blank",
        title: { da: "Blank stemme", en: "Blank vote" },
        count: 1,
        elected: false,
        tied: false,
      },
    ],
  },
};

export const ElectedDark = {
  render: Template,

  parameters: {
    backgrounds: { default: "dark" },
  },
  args: {
    theme: "dark",
    distributionNumber: 5,
    seats: 4,
    result: [
      [
        {
          reference: getOption(["selectable"], 1).reference,
          title: getOption(["selectable"], 1).title,
          elected: true,
          tied: false,
          raffled: false,
          comparativeFigure: 6,
        },
        {
          reference: getOption(["selectable"], 2).reference,
          title: getOption(["selectable"], 2).title,
          elected: true,
          tied: false,
          raffled: false,
          comparativeFigure: 3,
        },
      ],
      [
        {
          reference: getOption(["selectable"], 1).reference,
          title: getOption(["selectable"], 1).title,
          elected: true,
          tied: false,
          raffled: false,
          comparativeFigure: 3,
        },
        {
          reference: getOption(["selectable"], 2).reference,
          title: getOption(["selectable"], 2).title,
          elected: false,
          tied: false,
          raffled: false,
          comparativeFigure: 1.5,
        },
      ],
      [
        {
          reference: getOption(["selectable"], 1).reference,
          title: getOption(["selectable"], 1).title,
          elected: true,
          tied: false,
          raffled: false,
          comparativeFigure: 2,
        },
        {
          reference: getOption(["selectable"], 2).reference,
          title: getOption(["selectable"], 2).title,
          elected: false,
          tied: false,
          raffled: false,
          comparativeFigure: 1,
        },
      ],
      [
        {
          reference: getOption(["selectable"], 1).reference,
          title: getOption(["selectable"], 1).title,
          elected: false,
          tied: false,
          raffled: false,
          comparativeFigure: 1.5,
        },
        {
          reference: getOption(["selectable"], 2).reference,
          title: getOption(["selectable"], 2).title,
          elected: false,
          tied: false,
          raffled: false,
          comparativeFigure: 0.75,
        },
      ],
      {
        reference: "blank",
        title: { da: "Blank stemme", en: "Blank vote" },
        count: 1,
        elected: false,
        tied: false,
      },
    ],
  },
};

export const TiedDark = {
  render: Template,

  parameters: {
    backgrounds: { default: "dark" },
  },
  args: {
    theme: "dark",
    distributionNumber: 5,
    seats: 4,
    result: [
      [
        {
          reference: getOption(["selectable"], 1).reference,
          title: getOption(["selectable"], 1).title,
          elected: true,
          tied: false,
          raffled: false,
          comparativeFigure: 6,
        },
        {
          reference: getOption(["selectable"], 2).reference,
          title: getOption(["selectable"], 2).title,
          elected: true,
          tied: false,
          raffled: false,
          comparativeFigure: 3,
        },
      ],
      [
        {
          reference: getOption(["selectable"], 1).reference,
          title: getOption(["selectable"], 1).title,
          elected: true,
          tied: false,
          raffled: false,
          comparativeFigure: 3,
        },
        {
          reference: getOption(["selectable"], 2).reference,
          title: getOption(["selectable"], 2).title,
          elected: false,
          tied: true,
          raffled: false,
          comparativeFigure: 2,
        },
      ],
      [
        {
          reference: getOption(["selectable"], 1).reference,
          title: getOption(["selectable"], 1).title,
          elected: false,
          tied: true,
          raffled: false,
          comparativeFigure: 2,
        },
        {
          reference: getOption(["selectable"], 2).reference,
          title: getOption(["selectable"], 2).title,
          elected: false,
          tied: false,
          raffled: false,
          comparativeFigure: 1,
        },
      ],
      [
        {
          reference: getOption(["selectable"], 1).reference,
          title: getOption(["selectable"], 1).title,
          elected: false,
          tied: false,
          raffled: false,
          comparativeFigure: 1.5,
        },
        {
          reference: getOption(["selectable"], 2).reference,
          title: getOption(["selectable"], 2).title,
          elected: false,
          tied: false,
          raffled: false,
          comparativeFigure: 0.75,
        },
      ],
      {
        reference: "blank",
        title: { da: "Blank stemme", en: "Blank vote" },
        count: 1,
        elected: false,
        tied: false,
      },
    ],
  },
};

export const TiedAndElectedDark = {
  render: Template,

  parameters: {
    backgrounds: { default: "dark" },
  },
  args: {
    theme: "dark",
    distributionNumber: 5,
    seats: 4,
    result: [
      [
        {
          reference: getOption(["selectable"], 1).reference,
          title: getOption(["selectable"], 1).title,
          elected: true,
          tied: false,
          raffled: false,
          comparativeFigure: 6,
        },
        {
          reference: getOption(["selectable"], 2).reference,
          title: getOption(["selectable"], 2).title,
          elected: true,
          tied: false,
          raffled: false,
          comparativeFigure: 3,
        },
      ],
      [
        {
          reference: getOption(["selectable"], 1).reference,
          title: getOption(["selectable"], 1).title,
          elected: true,
          tied: false,
          raffled: false,
          comparativeFigure: 3,
        },
        {
          reference: getOption(["selectable"], 2).reference,
          title: getOption(["selectable"], 2).title,
          elected: true,
          tied: true,
          raffled: false,
          comparativeFigure: 2,
        },
      ],
      [
        {
          reference: getOption(["selectable"], 1).reference,
          title: getOption(["selectable"], 1).title,
          elected: false,
          tied: true,
          raffled: false,
          comparativeFigure: 2,
        },
        {
          reference: getOption(["selectable"], 2).reference,
          title: getOption(["selectable"], 2).title,
          elected: false,
          tied: false,
          raffled: false,
          comparativeFigure: 1,
        },
      ],
      [
        {
          reference: getOption(["selectable"], 1).reference,
          title: getOption(["selectable"], 1).title,
          elected: false,
          tied: false,
          raffled: false,
          comparativeFigure: 1.5,
        },
        {
          reference: getOption(["selectable"], 2).reference,
          title: getOption(["selectable"], 2).title,
          elected: false,
          tied: false,
          raffled: false,
          comparativeFigure: 0.75,
        },
      ],
      {
        reference: "blank",
        title: { da: "Blank stemme", en: "Blank vote" },
        count: 1,
        elected: false,
        tied: false,
      },
    ],
  },
};

export const ElectedAndHideElected = {
  render: Template,

  args: {
    distributionNumber: 5,
    seats: 4,
    hideElected: true,
    result: [
      [
        {
          reference: getOption(["selectable"], 1).reference,
          title: getOption(["selectable"], 1).title,
          elected: true,
          tied: false,
          raffled: false,
          comparativeFigure: 6,
        },
        {
          reference: getOption(["selectable"], 2).reference,
          title: getOption(["selectable"], 2).title,
          elected: true,
          tied: false,
          raffled: false,
          comparativeFigure: 3,
        },
      ],
      [
        {
          reference: getOption(["selectable"], 1).reference,
          title: getOption(["selectable"], 1).title,
          elected: true,
          tied: false,
          raffled: false,
          comparativeFigure: 3,
        },
        {
          reference: getOption(["selectable"], 2).reference,
          title: getOption(["selectable"], 2).title,
          elected: false,
          tied: false,
          raffled: false,
          comparativeFigure: 1.5,
        },
      ],
      [
        {
          reference: getOption(["selectable"], 1).reference,
          title: getOption(["selectable"], 1).title,
          elected: true,
          tied: false,
          raffled: false,
          comparativeFigure: 2,
        },
        {
          reference: getOption(["selectable"], 2).reference,
          title: getOption(["selectable"], 2).title,
          elected: false,
          tied: false,
          raffled: false,
          comparativeFigure: 1,
        },
      ],
      [
        {
          reference: getOption(["selectable"], 1).reference,
          title: getOption(["selectable"], 1).title,
          elected: false,
          tied: false,
          raffled: false,
          comparativeFigure: 1.5,
        },
        {
          reference: getOption(["selectable"], 2).reference,
          title: getOption(["selectable"], 2).title,
          elected: false,
          tied: false,
          raffled: false,
          comparativeFigure: 0.75,
        },
      ],
      {
        reference: "blank",
        title: { da: "Blank stemme", en: "Blank vote" },
        count: 1,
        elected: false,
        tied: false,
      },
    ],
  },
};

export const TiedAndHideTied = {
  render: Template,

  args: {
    distributionNumber: 5,
    seats: 4,
    hideTied: true,
    result: [
      [
        {
          reference: getOption(["selectable"], 1).reference,
          title: getOption(["selectable"], 1).title,
          elected: true,
          tied: false,
          raffled: false,
          comparativeFigure: 6,
        },
        {
          reference: getOption(["selectable"], 2).reference,
          title: getOption(["selectable"], 2).title,
          elected: true,
          tied: false,
          raffled: false,
          comparativeFigure: 3,
        },
      ],
      [
        {
          reference: getOption(["selectable"], 1).reference,
          title: getOption(["selectable"], 1).title,
          elected: true,
          tied: false,
          raffled: false,
          comparativeFigure: 3,
        },
        {
          reference: getOption(["selectable"], 2).reference,
          title: getOption(["selectable"], 2).title,
          elected: false,
          tied: true,
          raffled: false,
          comparativeFigure: 2,
        },
      ],
      [
        {
          reference: getOption(["selectable"], 1).reference,
          title: getOption(["selectable"], 1).title,
          elected: false,
          tied: true,
          raffled: false,
          comparativeFigure: 2,
        },
        {
          reference: getOption(["selectable"], 2).reference,
          title: getOption(["selectable"], 2).title,
          elected: false,
          tied: false,
          raffled: false,
          comparativeFigure: 1,
        },
      ],
      [
        {
          reference: getOption(["selectable"], 1).reference,
          title: getOption(["selectable"], 1).title,
          elected: false,
          tied: false,
          raffled: false,
          comparativeFigure: 1.5,
        },
        {
          reference: getOption(["selectable"], 2).reference,
          title: getOption(["selectable"], 2).title,
          elected: false,
          tied: false,
          raffled: false,
          comparativeFigure: 0.75,
        },
      ],
      {
        reference: "blank",
        title: { da: "Blank stemme", en: "Blank vote" },
        count: 1,
        elected: false,
        tied: false,
      },
    ],
  },
};
