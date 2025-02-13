import type { Meta } from "@/types";
import { AVResourceSection } from "@/components";
import { SUPPORTED_LOCALES } from "@/constants";
import { getCandidate } from "@/examples";

const meta: Meta<typeof AVResourceSection> = {
  title: "Design System/Organisms/AVResourceSection",
  component: AVResourceSection,
  tags: ["autodocs"],
  argTypes: {
    candidate: {
      control: { type: "object" },
    },
    currentCandidateGroup: {
      control: { type: "number", min: 0, max: 10, step: 1 },
    },
    summary: {
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
  components: { AVResourceSection },
  setup() {
    return { args };
  },
  template: '<AVResourceSection v-bind="args" />',
});

export const Default = {
  render: Template,

  args: {
    candidate: getCandidate(),
  },
};

export const Summary = {
  render: Template,

  args: {
    candidate: getCandidate(),
    summary: true,
  },
};

export const WithCustomGroup = {
  render: Template,

  args: {
    candidate: getCandidate(),
    currentCandidateGroup: 2,
    summary: true,
  },
};

export const Card = {
  render: Template,

  args: {
    candidate: getCandidate(),
    currentCandidateGroup: 2,
    summary: true,
    card: true,
  },
};
