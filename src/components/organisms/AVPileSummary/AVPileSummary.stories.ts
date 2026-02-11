import type { Meta } from "@/types";
import { AVPileSummary } from "@/components";
import { SUPPORTED_LOCALES } from "@/constants";
import { getContest, getSelectionPile } from "@/examples";

const meta: Meta<typeof AVPileSummary> & {
  argTypes: {
    onEditCurrentSelection: { action: string };
    onDeleteSelection: { action: string };
  };
} = {
  title: "Design System/Organisms/AVPileSummary",
  component: AVPileSummary,
  tags: ["autodocs"],
  argTypes: {
    selectionPile: {
      control: { type: "object" },
    },
    contest: {
      control: { type: "object" },
    },
    maximumOptionsShown: {
      control: { type: "number", min: 0, max: 100, step: 1 },
    },
    activeState: {
      control: { type: "select" },
      options: ["ballot", "assign", "overview", "summary"],
    },
    pileIndex: {
      control: { type: "number", min: 0, max: 9, step: 1 },
    },
    isEditing: {
      control: { type: "boolean" },
    },
    totalPiles: {
      control: { type: "number", min: 0, max: 10, step: 1 },
    },
    showOptionsDescription: {
      control: { type: "boolean" },
    },
    locale: {
      control: { type: "select" },
      options: SUPPORTED_LOCALES,
    },
    onEditCurrentSelection: {
      action: "editCurrentSelection: EDIT SELECTION",
    },
    onDeleteSelection: {
      action: "deleteSelection: DELETE SELECTION",
    },
  },
};

export default meta;

const Template = (args: Meta) => ({
  components: { AVPileSummary },
  setup() {
    return { args };
  },
  template: '<AVPileSummary v-bind="args" />',
});

export const Ballot = {
  render: Template,

  args: {
    contest: getContest([]),
    activeState: "assign",
    isEditing: false,
    maximumOptionsShown: 3,
    pileIndex: 0,
    totalPiles: 0,
    selectionPile: getSelectionPile(["single", "weighted"]),
  },
};

export const MultiBallotWithChildren = {
  render: Template,

  args: {
    contest: getContest(["children_options", "multi"]),
    activeState: "assign",
    isEditing: false,
    maximumOptionsShown: 3,
    pileIndex: 0,
    totalPiles: 0,
    selectionPile: getSelectionPile(["children", "weighted"]),
  },
};

export const RankedBallotWithChildren = {
  render: Template,

  args: {
    contest: getContest(["children_options", "ranked"]),
    activeState: "assign",
    isEditing: false,
    maximumOptionsShown: 3,
    pileIndex: 0,
    totalPiles: 0,
    selectionPile: getSelectionPile(["children", "weighted"]),
  },
};

export const AssingWithWriteIn = {
  render: Template,

  args: {
    contest: getContest(["write_in"]),
    activeState: "assign",
    isEditing: false,
    maximumOptionsShown: 3,
    pileIndex: 0,
    totalPiles: 0,
    selectionPile: {
      multiplier: 1,
      optionSelections: [
        {
          reference: "exampleOption4",
          text: "Here's something I wrote",
        },
      ],
      explicitBlank: false,
    },
  },
};

export const RankedBallot = {
  render: Template,

  args: {
    contest: getContest(["ranked"]),
    activeState: "assign",
    isEditing: false,
    maximumOptionsShown: 3,
    pileIndex: 0,
    totalPiles: 0,
    selectionPile: getSelectionPile(["multi", "weighted"]),
  },
};

export const ManyOptionsWithMaximum = {
  render: Template,

  args: {
    contest: getContest(["many_options", "multi"]),
    activeState: "assign",
    isEditing: false,
    maximumOptionsShown: 3,
    pileIndex: 0,
    totalPiles: 0,
    selectionPile: getSelectionPile(["many", "weighted"]),
  },
};

export const ManyOptionsWithoutMaximum = {
  render: Template,

  args: {
    contest: getContest(["many_options", "multi"]),
    activeState: "assign",
    isEditing: false,
    pileIndex: 0,
    totalPiles: 0,
    selectionPile: getSelectionPile(["many", "weighted"]),
  },
};

export const Overview = {
  render: Template,

  args: {
    contest: getContest([]),
    activeState: "overview",
    isEditing: false,
    maximumOptionsShown: 3,
    pileIndex: 0,
    totalPiles: 0,
    selectionPile: getSelectionPile(["single", "weighted"]),
  },
};

export const Summary = {
  render: Template,

  args: {
    contest: getContest([]),
    activeState: "summary",
    isEditing: false,
    maximumOptionsShown: 3,
    pileIndex: 0,
    totalPiles: 3,
    selectionPile: getSelectionPile(["single", "weighted"]),
  },
};

export const SummaryWithDescriptions = {
  render: Template,

  args: {
    contest: getContest(["complete_options"]),
    activeState: "summary",
    isEditing: false,
    maximumOptionsShown: 3,
    pileIndex: 0,
    totalPiles: 3,
    showOptionsDescription: true,
    selectionPile: getSelectionPile(["single", "weighted"]),
  },
};

export const SummaryWithWriteIn = {
  render: Template,

  args: {
    contest: getContest(["complete_options", "write_in"]),
    activeState: "summary",
    isEditing: false,
    maximumOptionsShown: 3,
    pileIndex: 0,
    totalPiles: 3,
    showOptionsDescription: true,
    selectionPile: {
      multiplier: 1,
      optionSelections: [
        {
          reference: "exampleOption4",
          text: "Here's something I wrote",
        },
      ],
      explicitBlank: false,
    },
  },
};

export const SummaryWithPrefilled = {
  render: Template,

  args: {
    contest: getContest([]),
    activeState: "summary",
    isEditing: false,
    maximumOptionsShown: 3,
    pileIndex: 0,
    totalPiles: 3,
    selectionPile: getSelectionPile(["single", "weighted"]),
    isPrefilled: true,
  },
};

export const SummaryRankedWithChildren = {
  render: Template,

  args: {
    contest: getContest(["children_options", "ranked"]),
    activeState: "summary",
    isEditing: false,
    maximumOptionsShown: 3,
    pileIndex: 0,
    totalPiles: 3,
    selectionPile: getSelectionPile(["children", "weighted"]),
  },
};

export const GalleryMode = {
  render: Template,

  args: {
    contest: getContest(["gallery_parents"]),
    activeState: "summary",
    isEditing: false,
    pileIndex: 0,
    totalPiles: 1,
    selectionPile: getSelectionPile(["children"]),
    galleryMode: true,
  },
};
