import type { Meta } from "@/types";
import { AVLinkVisualizer } from "@/components";
import { getUrl } from "@/examples";

const meta: Meta<typeof AVLinkVisualizer> = {
  title: "Design System/Atoms/AVLinkVisualizer",
  component: AVLinkVisualizer,
  tags: ["autodocs"],
  argTypes: {
    link: {
      control: { type: "object" },
    },
    large: {
      control: { type: "boolean" },
    },
  },
};

export default meta;

const Template = (args: Meta) => ({
  components: { AVLinkVisualizer },
  setup() {
    return { args };
  },
  template: '<AVLinkVisualizer v-bind="args" />',
});

export const Default = {
  render: Template,

  args: {
    link: getUrl("website"),
    large: false,
  },
};

export const Large = {
  render: Template,

  args: {
    link: getUrl("twitter"),
    large: true,
  },
};

export const SocialNetworkIcons = {
  render: Template,

  args: {
    link: getUrl("facebook"),
    large: false,
  },
};

export const Email = {
  render: Template,

  args: {
    link: {
      attributes: {
        name: "My email",
        url: "mailto:mail@me.yo",
      },
    },
    large: false,
  },
};
