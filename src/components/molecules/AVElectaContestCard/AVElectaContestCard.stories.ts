import type { Meta } from "@/types";
import { AVElectaContestCard } from "@/components";

const meta: Meta<typeof AVElectaContestCard> = {
  title: "Design System/Molecules/AVElectaContestCard",
  component: AVElectaContestCard,
  tags: ["autodocs"],
  argTypes: {
    contestTitle: {
      control: { type: "text" },
    },
    votingRoundTitle: {
      control: { type: "text" },
    },
  },
};

export default meta;

const Template = (args: Meta) => ({
  components: { AVElectaContestCard },
  setup() {
    return { args };
  },
  template:
    '<AVElectaContestCard v-bind="args"><template #card-content>Content goes here.</template></AVElectaContestCard>',
});

export const Default = {
  render: Template,

  args: {
    contestTitle: "Contest title",
    votingRoundTitle: "Voting Round title",
  },
};
