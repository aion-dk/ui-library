import type { Meta } from "@/types";
import { AVFileInput } from "@/components";
import { SUPPORTED_LOCALES } from "@/constants";

const meta: Meta<typeof AVFileInput> = {
  title: "Design System/Atoms/AVFileInput",
  component: AVFileInput,
  tags: ["autodocs"],
  argTypes: {
    id: {
      control: { type: "text" },
    },
    value: {
      control: { type: "object" },
    },
    disabled: {
      control: { type: "boolean" },
    },
    accept: {
      control: { type: "text" },
    },
    error: {
      control: { type: "boolean" },
    },
    errorMessage: {
      control: { type: "text" },
    },
    showPreview: {
      control: { type: "boolean" },
    },
    multiple: {
      control: { type: "boolean" },
    },
    disableAcceptedFormats: {
      control: { type: "boolean" },
    },
    currentValue: {
      control: { type: "object" },
    },
    locale: {
      control: { type: "select" },
      options: SUPPORTED_LOCALES,
    },
  },
};

export default meta;

const Template = (args: Meta) => ({
  components: { AVFileInput },
  setup() {
    return { args };
  },
  template: '<AVFileInput v-bind="args" />',
});

export const Default = {
  render: Template,

  args: {
    id: "ID",
    inputLabel: "Upload jsons or pdfs",
    accept: ".csv,.json,.pdf",
  },
};

export const Multiple = {
  render: Template,

  args: {
    id: "ID",
    inputLabel: "Upload jsons or pdfs",
    accept: ".csv,.json,.pdf",
    multiple: true,
  },
};

export const DefaultAndCurrentValue = {
  render: Template,

  args: {
    id: "ID",
    inputLabel: "Upload jsons or pdfs",
    accept: ".csv,.json,.pdf",
    currentValue: ["https://assemblyvoting.com/wp-content/uploads/av_logo.svg"],
  },
};

export const WithPreview = {
  render: Template,

  args: {
    id: "ID",
    inputLabel: "Upload images",
    accept: ".jpg,.jpeg,.png,.gif,.svg",
    showPreview: true,
  },
};

export const WithPreviewAndCurrentValue = {
  render: Template,

  args: {
    id: "ID",
    inputLabel: "Upload images",
    accept: ".jpg,.jpeg,.png,.gif,.svg",
    showPreview: true,
    currentValue: ["https://assemblyvoting.com/wp-content/uploads/av_logo.svg"],
  },
};

export const MultipleWithPreviewAndCurrentValue = {
  render: Template,

  args: {
    id: "ID",
    inputLabel: "Upload images",
    accept: ".jpg,.jpeg,.png,.gif,.svg",
    showPreview: true,
    multiple: true,
    currentValue: [
      "https://assemblyvoting.com/wp-content/uploads/av_logo.svg",
      "https://assemblyvoting.com/wp-content/uploads/Photo_2-1024x663.jpg",
      "https://assemblyvoting.com/wp-content/uploads/Photo_19-2.jpg",
    ],
  },
};

export const Disabled = {
  render: Template,

  args: {
    id: "ID",
    inputLabel: "Upload something",
    accept: ".jpg,.jpeg,.png,.gif,.svg",
    disabled: true,
  },
};

export const WithError = {
  render: Template,

  args: {
    id: "ID",
    inputLabel: "Upload something",
    accept: ".jpg,.jpeg,.png,.gif,.svg",
    error: true,
    errorMessage: "File too big!",
  },
};
