import type { Meta } from "@/types";
import { AVVerticalStep } from "@/components";

const meta: Meta<typeof AVVerticalStep> = {
  title: "Design System/Atoms/AVVerticalStep",
  component: AVVerticalStep,
  tags: ["autodocs"],
  globals: {
    backgrounds: { value: "dark" },
  },
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
    theme: {
      control: { type: "select" },
      options: ["light", "dark"],
    },
  },
};

export default meta;

const DarkTemplate = (args: Meta) => ({
  components: { AVVerticalStep },
  setup() {
    return { args };
  },
  template: '<AVVerticalStep v-bind="args" />',
});

const LightTemplate = (args: Meta) => ({
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

const Template2Light = (args: Meta) => ({
  components: { AVVerticalStep },
  setup() {
    return { args };
  },
  template: '<div style="width: 150px;"><AVVerticalStep v-bind="args" /></div>',
});

export const DefaultDark = {
  render: DarkTemplate,

  args: {
    stepNumber: 1,
    status: "default",
    title: "Connect to election",
    subtitle: "Choose location for partial key",
    collapsed: false,
    hasNextStep: false,
  },
};

export const DefaultLight = {
  render: LightTemplate,

  globals: {
    backgrounds: { value: "light" },
  },

  args: {
    stepNumber: 1,
    status: "default",
    title: "Connect to election",
    subtitle: "Choose location for partial key",
    collapsed: false,
    hasNextStep: false,
    theme: "light",
  },
};

export const ActiveDark = {
  render: DarkTemplate,

  args: {
    stepNumber: 1,
    status: "active",
    title: "Connect to election",
    subtitle: "Choose location for partial key",
    collapsed: false,
    hasNextStep: false,
  },
};

export const ActiveLight = {
  render: LightTemplate,

  globals: {
    backgrounds: { value: "light" },
  },

  args: {
    stepNumber: 1,
    status: "active",
    title: "Connect to election",
    subtitle: "Choose location for partial key",
    collapsed: false,
    hasNextStep: false,
    theme: "light",
  },
};

export const DoneDark = {
  render: DarkTemplate,

  args: {
    stepNumber: 1,
    status: "done",
    title: "Connect to election",
    subtitle: "Choose location for partial key",
    collapsed: false,
    hasNextStep: false,
  },
};

export const DoneLight = {
  render: LightTemplate,

  globals: {
    backgrounds: { value: "light" },
  },

  args: {
    stepNumber: 1,
    status: "done",
    title: "Connect to election",
    subtitle: "Choose location for partial key",
    collapsed: false,
    hasNextStep: false,
    theme: "light",
  },
};

export const LinkModeDark = {
  render: DarkTemplate,

  args: {
    linkMode: true,
    title: "Voting Round 1",
    subtitle: "3 contests",
  },
};

export const LinkModeLight = {
  render: LightTemplate,

  globals: {
    backgrounds: { value: "light" },
  },

  args: {
    linkMode: true,
    title: "Voting Round 1",
    subtitle: "3 contests",
    theme: "light",
  },
};

export const LinkModeSummary = {
  render: DarkTemplate,

  args: {
    linkMode: true,
    summary: true,
    title: "Overview",
    subtitle: "All Voting Rounds",
  },
};

export const LinkModeSummaryActive = {
  render: DarkTemplate,

  args: {
    linkMode: true,
    summary: true,
    status: "active",
    title: "Overview",
    subtitle: "All Voting Rounds",
  },
};

export const WithoutSubtitle = {
  render: DarkTemplate,

  args: {
    stepNumber: 1,
    status: "default",
    title: "Connect to election",
    collapsed: false,
    hasNextStep: false,
  },
};

export const CollapsedDark = {
  render: DarkTemplate,

  args: {
    stepNumber: 1,
    status: "default",
    title: "Connect to election",
    subtitle: "Choose location for partial key",
    collapsed: true,
    hasNextStep: false,
  },
};

export const CollapsedLight = {
  render: LightTemplate,

  globals: {
    backgrounds: { value: "light" },
  },

  args: {
    stepNumber: 1,
    status: "default",
    title: "Connect to election",
    subtitle: "Choose location for partial key",
    collapsed: true,
    hasNextStep: false,
    theme: "light",
  },
};

export const WithPreviousStep = {
  render: DarkTemplate,

  args: {
    stepNumber: 1,
    status: "default",
    title: "Connect to election",
    subtitle: "Choose location for partial key",
    collapsed: false,
    hasPrevStep: true,
  },
};

export const WithNextStep = {
  render: DarkTemplate,

  args: {
    stepNumber: 1,
    status: "default",
    title: "Connect to election",
    subtitle: "Choose location for partial key",
    collapsed: false,
    hasNextStep: true,
  },
};

export const WithLongTextDark = {
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
};

export const WithLongTextLight = {
  render: Template2Light,

  globals: {
    backgrounds: { value: "light" },
  },

  args: {
    stepNumber: 1,
    status: "default",
    title: "This is a very long text",
    subtitle: "This is also a very very veeeery long text",
    collapsed: false,
    hasPrevStep: true,
    hasNextStep: true,
    theme: "light",
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
};
