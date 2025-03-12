import type { Meta } from "@/types";
import { AVResultOption } from "@/components";
import { SUPPORTED_LOCALES } from "@/constants";
import { getOption } from "@/examples";

const meta: Meta<typeof AVResultOption> = {
  title: "Design System/Molecules/AVResultOption",
  component: AVResultOption,
  tags: ["autodocs"],
  argTypes: {
    option: {
      control: { type: "object" },
    },
    votes: {
      control: { type: "number", min: 0, max: 9999, step: 1 },
    },
    total: {
      control: { type: "number", min: 0, max: 9999, step: 1 },
    },
    elected: {
      control: { type: "boolean" },
    },
    tied: {
      control: { type: "boolean" },
    },
    hidePercentage: {
      control: { type: "boolean" },
    },
    locale: {
      control: { type: "select" },
      options: SUPPORTED_LOCALES,
    },
  },
};

export default meta;

const Template = (args: Meta) => ({
  components: { AVResultOption },
  setup() {
    return { args };
  },
  template: '<AVResultOption v-bind="args" />',
});

export const Default = {
  render: Template,

  args: {
    option: getOption(["selectable"], 1),
    votes: 20,
    total: 100,
  },
};

export const Tied = {
  render: Template,

  args: {
    option: getOption(["selectable"], 1),
    votes: 20,
    total: 100,
    tied: true,
  },
};

export const Elected = {
  render: Template,

  args: {
    option: getOption(["selectable"], 1),
    votes: 20,
    total: 100,
    elected: true,
  },
};

export const HandledTie = {
  render: Template,

  args: {
    option: getOption(["selectable"], 1),
    votes: 20,
    total: 100,
    tied: true,
    elected: true,
  },
};

export const WithImage = {
  render: Template,

  args: {
    option: getOption(["selectable", "image"], 1),
    votes: 20,
    total: 100,
  },
};
