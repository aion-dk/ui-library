import type { Meta } from "@/types";
import { SUPPORTED_LOCALES } from "@/constants";
import { AVWriteInOption } from "@/components";

const meta: Meta<typeof AVWriteInOption> & {
  argTypes: {
    "onUpdate:candidateValue": { action: string };
    "onUpdate:partyValue": { action: string };
    "onUpdate:checkedValue": { action: string };
  };
} = {
  title: "Design System/Molecules/AVWriteInOption",
  component: AVWriteInOption,
  tags: ["autodocs"],
  argTypes: {
    parties: {
      control: { type: "object" },
    },
    candidateValue: {
      control: { type: "text" },
    },
    partyValue: {
      control: { type: "text" },
    },
    checkedValue: {
      control: { type: "boolean" },
    },
    disabled: {
      control: { type: "boolean" },
    },
    observerMode: {
      control: { type: "boolean" },
    },
    locale: {
      control: { type: "select" },
      options: SUPPORTED_LOCALES,
    },
    "onUpdate:candidateValue": {
      action: "update:candidateValue: UPDATED CANDIDATE",
    },
    "onUpdate:partyValue": {
      action: "update:partyValue: UPDATED PARTY",
    },
    "onUpdate:checkedValue": {
      action: "update:checkedValue: UPDATED CHECKED",
    },
  },
};

export default meta;

const Template = (args: Meta) => ({
  components: { AVWriteInOption },
  setup() {
    return { args };
  },
  template: '<AVWriteInOption v-bind="args" />',
});

const parties = [
  { letter: "A", name: "Party A" },
  { letter: "B", name: "Party B" },
  { letter: "C", name: "Party C" },
];

export const Empty = {
  render: Template,

  args: {
    parties: parties,
    partyValue: "",
    candidateValue: "",
    checkedValue: false,
  },
};

export const Filled = {
  render: Template,

  args: {
    parties: parties,
    partyValue: "B",
    candidateValue: "Jhon Doe",
    checkedValue: true,
  },
};

export const ObserverMode = {
  render: Template,

  args: {
    parties: parties,
    partyValue: "",
    candidateValue: "",
    checkedValue: false,
    observerMode: true,
  },
};

export const EmptyAndDisabled = {
  render: Template,

  args: {
    parties: parties,
    partyValue: "",
    candidateValue: "",
    checkedValue: false,
    disabled: true,
  },
};

export const FilledAndDisabled = {
  render: Template,

  args: {
    parties: parties,
    partyValue: "B",
    candidateValue: "Jhon Doe",
    checkedValue: true,
    disabled: true,
  },
};
