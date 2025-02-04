import type { Meta } from "@/types";
import { AVOption } from "@/components";
import { SUPPORTED_LOCALES, IMAGE_OPTIONS } from "@/constants";
import { getOption, getContest, getLiveResult } from "@/examples";

const meta: Meta<typeof AVOption> & {
  argTypes: {
    "onAccordion-open": { action: string };
    onChecked: { action: string };
  };
} = {
  title: "Design System/Molecules/AVOption",
  component: AVOption,
  tags: ["autodocs"],
  argTypes: {
    option: {
      control: { type: "object" },
    },
    selections: {
      control: { type: "object" },
    },
    contest: {
      control: { type: "object" },
    },
    partialResults: {
      control: { type: "object" },
    },
    invalid: {
      control: { type: "boolean" },
    },
    disabled: {
      control: { type: "boolean" },
    },
    observerMode: {
      control: { type: "boolean" },
    },
    exclusiveError: {
      control: { type: "boolean" },
    },
    imageOption: {
      control: { type: "select" },
      options: IMAGE_OPTIONS,
    },
    locale: {
      control: { type: "select" },
      options: SUPPORTED_LOCALES,
    },
    "onAccordion-open": {
      action: "accordion-open: ACCORDION OPENED",
    },
    onChecked: {
      action: "checked: OPTION CHECKED",
    },
    "onView-candidate": {
      action: "view-candidate: CANDIDACY REQUEST SENT FOR CANDIDATE ID",
    },
  },
};

export default meta;

const Template = (args: Meta) => ({
  components: { AVOption },
  setup() {
    return { args };
  },
  template: '<AVOption v-bind="args" />',
});

export const Unselected = {
  render: Template,

  args: {
    option: getOption(["selectable"], 1),
    selections: [],
    contest: getContest([]),
    invalid: false,
  },
};

export const Selected = {
  render: Template,

  args: {
    option: getOption(["selectable"], 1),
    selections: [{ reference: "exampleOption1" }],
    contest: getContest([]),
    invalid: false,
  },
};

export const Disabled = {
  render: Template,

  args: {
    option: getOption([], 1),
    selections: [],
    contest: getContest([]),
    invalid: false,
    disabled: true,
  },
};

export const WithSquarePicture = {
  render: Template,

  args: {
    imageOption: "square",
    option: getOption(["selectable", "image"], 1),
    selections: [],
    contest: getContest([]),
    invalid: false,
  },
};

export const WithPassportPicture = {
  render: Template,

  args: {
    imageOption: "passport",
    option: getOption(["selectable", "image"], 1),
    selections: [],
    contest: getContest([]),
    invalid: false,
  },
};

export const WithAcentColor = {
  render: Template,

  args: {
    option: getOption(["selectable", "color"], 1),
    selections: [],
    contest: getContest([]),
    invalid: false,
  },
};

export const WithLiveResults = {
  render: Template,

  args: {
    option: getOption(["selectable"], 1),
    selections: [],
    contest: getContest([]),
    partialResults: getLiveResult(["exampleOption1"]),
    invalid: false,
  },
};

export const WithLiveResultsAndPercentage = {
  render: Template,

  args: {
    option: getOption(["selectable"], 1),
    selections: [],
    contest: getContest([]),
    partialResults: getLiveResult(["exampleOption1"], true),
    invalid: false,
  },
};

export const WithLiveResultsAndDisabled = {
  render: Template,

  args: {
    option: getOption(["selectable"], 1),
    selections: [],
    contest: getContest([]),
    partialResults: getLiveResult(["exampleOption1"]),
    invalid: false,
    disabled: true,
  },
};

export const WithLiveResultsAndPercentageAndDisabled = {
  render: Template,

  args: {
    option: getOption(["selectable"], 1),
    selections: [],
    contest: getContest([]),
    partialResults: getLiveResult(["exampleOption1"], true),
    invalid: false,
    disabled: true,
  },
};

export const WithPictureAndDescription = {
  render: Template,

  args: {
    option: getOption(["selectable", "description", "image"], 1),
    selections: [],
    contest: getContest([]),
    invalid: false,
  },
};

export const UncollapsableWithChildren = {
  render: Template,

  args: {
    option: getOption(["selectable", "children"], 1),
    selections: [],
    contest: getContest(["children_options"]),
    invalid: false,
  },
};

export const CollapsableWithChildren = {
  render: Template,

  args: {
    option: getOption(["selectable", "children"], 1),
    selections: [],
    contest: getContest(["children_options", "collapsable"]),
    invalid: false,
  },
};

export const ObserverMode = {
  render: Template,

  args: {
    option: getOption([], 1),
    selections: [],
    contest: getContest([]),
    invalid: false,
    observerMode: true,
  },
};

export const ObserverModeWithLiveResult = {
  render: Template,

  args: {
    option: getOption([], 1),
    selections: [],
    contest: getContest([]),
    partialResults: getLiveResult(["exampleOption1"]),
    invalid: false,
    observerMode: true,
  },
};

export const ObserverModeWithLiveResultAndPercentage = {
  render: Template,

  args: {
    option: getOption([], 1),
    selections: [],
    contest: getContest([]),
    partialResults: getLiveResult(["exampleOption1"], true),
    invalid: false,
    observerMode: true,
  },
};

export const LessThan5VotesPerOption = {
  render: Template,

  args: {
    option: getOption(["selectable"], 1),
    selections: [],
    contest: getContest(["multiple_votes_sm"]),
    invalid: false,
  },
};

export const MoreThan5VotesPerOption = {
  render: Template,

  args: {
    option: getOption(["selectable"], 1),
    selections: [],
    contest: getContest(["multiple_votes_lg"]),
    invalid: false,
  },
};

export const Error = {
  render: Template,

  args: {
    option: getOption(["selectable"], 1),
    selections: [{ reference: "exampleOption1" }],
    contest: getContest([]),
    invalid: true,
  },
};

export const ExclusiveError = {
  render: Template,

  args: {
    option: getOption(["selectable"], 1),
    selections: [{ reference: "exampleOption1" }],
    contest: getContest([]),
    exclusiveError: true,
    invalid: false,
  },
};

export const WithUrl = {
  render: Template,
  args: {
    option: getOption(["selectable", "url"], 1),
    selections: [],
    contest: getContest([]),
    invalid: false,
  },
};

export const WithUrlAndDescription = {
  render: Template,
  args: {
    option: getOption(["selectable", "description", "url"], 1),
    selections: [],
    contest: getContest([]),
    invalid: false,
  },
};

export const WithCandidacyDescriptionAndUrl = {
  render: Template,
  args: {
    option: getOption(["selectable", "description", "candidacy", "url"], 1),
    selections: [],
    contest: getContest([]),
    invalid: false,
  },
};

export const WithEverything = {
  render: Template,
  args: {
    option: getOption(
      ["selectable", "description", "candidacy", "url", "image", "children", "color"],
      1,
    ),
    partialResults: getLiveResult(
      ["exampleOption1", "exampleChildren1-1", "exampleChildren1-2"],
      true,
    ),
    selections: [],
    contest: getContest(["children_options", "collapsable"]),
    invalid: false,
  },
};
