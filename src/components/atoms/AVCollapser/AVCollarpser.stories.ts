import type { Meta } from "@/types";
import { AVCollapser } from "@/components";

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

  args: {},
};

export const Collapsible = {
  render: Template,

  args: {
    collapsable: true,
  },
};

export const StartCollapsed = {
  render: Template,

  args: {
    collapsable: true,
    startCollapsed: true,
  },
};
