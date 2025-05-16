import type { Meta } from "@/types";
import { AVCalculateResultContent } from "@/components";
import { CALCULATE_RESULT_ROLE, CALCULATE_RESULT_STATUS, SUPPORTED_LOCALES } from "@/constants";

const meta: Meta<typeof AVCalculateResultContent> = {
  title: "Design System/Organisms/AVCalculateResultContent",
  component: AVCalculateResultContent,
  tags: ["autodocs"],
  argTypes: {
    id: {
      control: { type: "text" },
    },
    progress: {
      control: { type: "number", min: 0, max: 100, step: 1 },
    },
    role: {
      control: { type: "select" },
      options: CALCULATE_RESULT_ROLE,
    },
    status: {
      control: { type: "select" },
      options: CALCULATE_RESULT_STATUS,
    },
    mixes: {
      control: { type: "object" },
    },
    decryptions: {
      control: { type: "object" },
    },
    elapsed: {
      control: { type: "text" },
    },
    locale: {
      control: { type: "select" },
      options: SUPPORTED_LOCALES,
    },
  },
};

export default meta;

const Template = (args: Meta) => ({
  components: { AVCalculateResultContent },
  setup() {
    return { args };
  },
  template: '<AVCalculateResultContent v-bind="args" />',
});

export const Default = {
  render: Template,

  args: {
    id: "test_1",
    progress: 26,
    status: "initial",
    role: "all",
    mixes: [4, 15],
    decryptions: [7, 20],
    elapsed: "00:01:27",
  },
};

export const Mixer = {
  render: Template,

  args: {
    id: "test_2",
    progress: 26,
    status: "mixing",
    role: "mixer",
    mixes: [4, 15],
    decryptions: [7, 20],
    elapsed: "00:01:27",
  },
};

export const Decrypter = {
  render: Template,

  args: {
    id: "test_3",
    progress: 26,
    status: "decrypting",
    role: "decrypter",
    mixes: [4, 15],
    decryptions: [7, 20],
    elapsed: "00:01:27",
  },
};

export const Observer = {
  render: Template,

  args: {
    id: "test_4",
    progress: 26,
    status: "aggregating",
    role: "observer",
    mixes: [4, 15],
    decryptions: [7, 20],
    elapsed: "00:01:27",
  },
};

export const Completed = {
  render: Template,

  args: {
    id: "test_5",
    progress: 100,
    status: "finished",
    role: "all",
    mixes: [15, 15],
    decryptions: [20, 20],
    elapsed: "00:05:41",
  },
};
