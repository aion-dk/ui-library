import type { Meta } from "@/types";
import { AVCollapser } from "@/components";
import { SUPPORTED_LOCALES } from "@/constants";

const meta: Meta<typeof AVCollapser> & {
  argTypes: { onAccordionOpen: { action: string } };
} = {
  title: "Design System/Atoms/AVCollapser",
  component: AVCollapser,
  tags: ["autodocs"],
  argTypes: {
    collapsable: { control: { type: "boolean" } },
    startCollapsed: { control: { type: "boolean" } },
    paneId: { control: { type: "text" } },
    optionReference: { control: { type: "text" } },
    subOptionSelected: { control: { type: "number", min: "1", max: "9" } },
    invalid: { control: { type: "boolean" } },
    useDeferredButton: { control: { type: "boolean" } },
    locale: {
      control: { type: "select" },
      options: SUPPORTED_LOCALES,
    },
    onAccordionOpen: { action: "@accordion-open: EMITTED" },
  },
};

export default meta;

const Template = (args: Meta) => ({
  components: { AVCollapser },
  setup() {
    return { args };
  },
  template:
    '<AVCollapser v-bind="args"><template #toggle>|---TRIGGER---|</template><template #pane>|---CONTENT---|</template></AVCollapser>',
});

export const NotCollapsible = {
  render: Template,

  args: {
    paneId: "test-collapse1",
  },
};

export const Collapsible = {
  render: Template,

  args: {
    collapsable: true,
    paneId: "test-collapse2",
  },
};

export const StartCollapsed = {
  render: Template,

  args: {
    collapsable: true,
    startCollapsed: true,
    paneId: "test-collapse3",
  },
};
