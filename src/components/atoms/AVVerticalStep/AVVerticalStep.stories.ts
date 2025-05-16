import type { Meta } from "@/types";
import { AVVerticalStep } from "@/components";

const meta: Meta<typeof AVVerticalStep> = {
  title: "Design System/Atoms/AVVerticalStep",
  component: AVVerticalStep,
  tags: ["autodocs"],
  argTypes: {
    stepNumber: {
      control: { type: "number", min: 1, max: 9, step: 1 },
    },
    status: {
      control: { type: "select" },
      options: ["default", "active", "done"],
    },
    title: {
      control: { type: "text" },
    },
    subtitle: {
      control: { type: "text" },
    },
    collapsed: {
      control: { type: "boolean" },
    },
    hasNextStep: {
      control: { type: "boolean" },
    },
    inProgress: {
      control: { type: "boolean" },
    },
  },
};

export default meta;

const Template = (args: Meta) => ({
  components: { AVVerticalStep },
  setup() {
    return { args };
  },
  template: '<AVVerticalStep v-bind="args" />',
});

const Template2 = (args: Meta) => ({
  components: { AVVerticalStep },
  setup() {
    return { args };
  },
  template: '<div style="width: 150px;"><AVVerticalStep v-bind="args" /></div>',
});

export const Default = {
  render: Template,

  args: {
    stepNumber: 1,
    status: "default",
    title: "Connect to election",
    subtitle: "Choose location for partial key",
    collapsed: false,
    hasNextStep: false,
  },

  parameters: {
    backgrounds: { default: "dark" },
  },
};

export const Active = {
  render: Template,

  args: {
    stepNumber: 1,
    status: "active",
    title: "Connect to election",
    subtitle: "Choose location for partial key",
    collapsed: false,
    hasNextStep: false,
  },

  parameters: {
    backgrounds: { default: "dark" },
  },
};

export const Done = {
  render: Template,

  args: {
    stepNumber: 1,
    status: "done",
    title: "Connect to election",
    subtitle: "Choose location for partial key",
    collapsed: false,
    hasNextStep: false,
  },

  parameters: {
    backgrounds: { default: "dark" },
  },
};

export const LinkMode = {
  render: Template,

  args: {
    linkMode: true,
    title: "Voting Round 1",
    subtitle: "3 contests",
  },

  parameters: {
    backgrounds: { default: "dark" },
  },
};

export const LinkModeSummary = {
  render: Template,

  args: {
    linkMode: true,
    summary: true,
    title: "Overview",
    subtitle: "All Voting Rounds",
  },

  parameters: {
    backgrounds: { default: "dark" },
  },
};

export const LinkModeSummaryActive = {
  render: Template,

  args: {
    linkMode: true,
    summary: true,
    status: "active",
    title: "Overview",
    subtitle: "All Voting Rounds",
  },

  parameters: {
    backgrounds: { default: "dark" },
  },
};

export const WithoutSubtitle = {
  render: Template,

  args: {
    stepNumber: 1,
    status: "default",
    title: "Connect to election",
    collapsed: false,
    hasNextStep: false,
  },

  parameters: {
    backgrounds: { default: "dark" },
  },
};

export const Collapsed = {
  render: Template,

  args: {
    stepNumber: 1,
    status: "default",
    title: "Connect to election",
    subtitle: "Choose location for partial key",
    collapsed: true,
    hasNextStep: false,
  },

  parameters: {
    backgrounds: { default: "dark" },
  },
};

export const WithPreviousStep = {
  render: Template,

  args: {
    stepNumber: 1,
    status: "default",
    title: "Connect to election",
    subtitle: "Choose location for partial key",
    collapsed: false,
    hasPrevStep: true,
  },

  parameters: {
    backgrounds: { default: "dark" },
  },
};

export const WithNextStep = {
  render: Template,

  args: {
    stepNumber: 1,
    status: "default",
    title: "Connect to election",
    subtitle: "Choose location for partial key",
    collapsed: false,
    hasNextStep: true,
  },

  parameters: {
    backgrounds: { default: "dark" },
  },
};

export const WithLongText = {
  render: Template2,

  args: {
    stepNumber: 1,
    status: "default",
    title: "This is a very long text",
    subtitle: "This is also a very very veeeery long text",
    collapsed: false,
    hasPrevStep: true,
    hasNextStep: true,
  },

  parameters: {
    backgrounds: { default: "dark" },
  },
};

export const InProgress = {
  render: Template2,

  args: {
    linkMode: true,
    title: "Voting Round 1",
    subtitle: "3 contests",
    inProgress: true,
  },

  parameters: {
    backgrounds: { default: "dark" },
  },
};
