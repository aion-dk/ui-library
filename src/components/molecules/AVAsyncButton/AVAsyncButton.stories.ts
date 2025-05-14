import type { Meta } from "@/types";
import { AVAsyncButton } from "@/components";
import { ASYNC_BUTTON_VARIANTS, BOOTSTRAP_BASIC_SIZES } from "@/constants";

const meta: Meta<typeof AVAsyncButton> & {
  argTypes: { "onUpdate:waiting": { action: string } };
} = {
  title: "Design System/Molecules/AVAsyncButton",
  component: AVAsyncButton,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: BOOTSTRAP_BASIC_SIZES,
    },
    variant: {
      control: { type: "select" },
      options: ASYNC_BUTTON_VARIANTS,
    },
    disabled: {
      control: { type: "boolean" },
    },
    "onUpdate:waiting": { action: "onUpdate: WAITING" },
  },
};

export default meta;

const Template = (args: Meta) => ({
  components: { AVAsyncButton },
  setup() {
    return { args };
  },
  template: `
    <AVAsyncButton v-bind="args">
      <template #label>Label</template>
      <template #waitingLabel>Working...</template>
    </AVAsyncButton>`,
});

const TemplateSuccess = (args: Meta) => ({
  components: { AVAsyncButton },
  setup() {
    return { args };
  },
  template: `
    <AVAsyncButton v-bind="args">
      <template #label>Saved</template>
      <template #waitingLabel>Working...</template>
    </AVAsyncButton>`,
});

const TemplateFailed = (args: Meta) => ({
  components: { AVAsyncButton },
  setup() {
    return { args };
  },
  template: `
    <AVAsyncButton v-bind="args">
      <template #label>Not saved</template>
      <template #waitingLabel>Working...</template>
    </AVAsyncButton>`,
});

export const Default = {
  render: Template,

  args: {},
};

export const Success = {
  render: TemplateSuccess,

  args: {
    variant: "success",
  },
};

export const Error = {
  render: TemplateFailed,

  args: {
    variant: "danger",
  },
};

export const Disabled = {
  render: Template,

  args: {
    label: "Disabled",
    disabled: true,
  },
};

export const Large = {
  render: Template,

  args: {
    label: "Large button",
    size: "lg",
  },
};

export const Small = {
  render: Template,

  args: {
    label: "Small button",
    size: "sm",
  },
};
