import { computed } from "vue";
import type { Meta, NormalResultListOption } from "@/types";
import { AVResultOption } from "@/components";
import { SUPPORTED_LOCALES } from "@/constants";
import { getOption } from "@/examples";
import type { OptionContent } from "@assemblyvoting/types";

// Storybook can't put controls on nested object fields, so the result fields of `option`
// are exposed as flat story-only args (grouped under "option") and merged back in `Template`.
const optionArgType = (control: object) => ({ control, table: { category: "option" } });

const meta: Meta = {
  title: "Design System/Molecules/AVResultOption",
  component: AVResultOption,
  tags: ["autodocs"],
  argTypes: {
    option: {
      control: { type: "object" },
    },
    count: optionArgType({ type: "number", min: 0, max: 9999, step: 1 }),
    elected: optionArgType({ type: "boolean" }),
    tied: optionArgType({ type: "boolean" }),
    ineligible: optionArgType({ type: "boolean" }),
    total: {
      control: { type: "number", min: 0, max: 9999, step: 1 },
    },
    hideElected: {
      control: { type: "boolean" },
    },
    hideTied: {
      control: { type: "boolean" },
    },
    list: {
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
  args: {
    count: 20,
    elected: false,
    tied: false,
    ineligible: false,
    total: 100,
  },
};

export default meta;

const Template = (args: Record<string, unknown>) => ({
  components: { AVResultOption },
  setup() {
    const props = computed(() => {
      const { count, elected, tied, ineligible, option, ...rest } = args;
      return {
        ...rest,
        option: { ...(option as NormalResultListOption), count, elected, tied, ineligible },
      };
    });
    return { props };
  },
  template: '<AVResultOption v-bind="props" />',
});

function toResultOption(optionContent: OptionContent): NormalResultListOption {
  return {
    reference: optionContent.reference,
    title: optionContent.title,
    imageUrl: optionContent.image ?? null,
    count: 0,
    elected: false,
    tied: false,
  };
}

export const Default = {
  render: Template,

  args: {
    option: toResultOption(getOption(["selectable"], 1)),
  },
};

export const Tied = {
  render: Template,

  args: {
    option: toResultOption(getOption(["selectable"], 1)),
    tied: true,
  },
};

export const Elected = {
  render: Template,

  args: {
    option: toResultOption(getOption(["selectable"], 1)),
    elected: true,
  },
};

export const HandledTie = {
  render: Template,

  args: {
    option: toResultOption(getOption(["selectable"], 1)),
    tied: true,
    elected: true,
  },
};

export const WithImage = {
  render: Template,

  args: {
    option: toResultOption(getOption(["selectable", "image"], 1)),
  },
};

export const List = {
  render: Template,

  args: {
    option: toResultOption(getOption(["selectable"], 1)),
    list: true,
  },
};
