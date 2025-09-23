import type { Meta } from "@/types";
import { AVResourceSection } from "@/components";
import { SUPPORTED_LOCALES } from "@/constants";
import { getCandidate } from "@/examples";

const meta: Meta<typeof AVResourceSection> = {
  title: "Design System/Organisms/AVResourceSection",
  component: AVResourceSection,
  tags: ["autodocs"],
  argTypes: {
    candidate: {
      control: { type: "object" },
    },
    currentCandidateGroup: {
      control: { type: "number", min: 0, max: 10, step: 1 },
    },
    summary: {
      control: { type: "boolean" },
    },
    card: {
      control: { type: "boolean" },
    },
    forceLightTheme: {
      control: { type: "boolean" },
    },
    isPartyLeader: {
      control: { type: "boolean" },
    },
    partyLeaderData: {
      control: { type: "object" },
    },
    locale: {
      control: { type: "select" },
      options: SUPPORTED_LOCALES,
    },
    isStoryBook: {
      control: { type: "boolean" },
    },
  },
};

export default meta;

const noPicture = { ...getCandidate() };
noPicture.generic.shift();

const Template = (args: Meta) => ({
  components: { AVResourceSection },
  setup() {
    return { args };
  },
  template: '<AVResourceSection v-bind="args" />',
});

const SummaryTemplate = (args: Meta) => ({
  components: { AVResourceSection },
  setup() {
    return { args };
  },
  template: '<div class="bg-theme-secondary p-5"><AVResourceSection v-bind="args" /></div>',
});

const SmallCardTemplate = (args: Meta) => ({
  components: { AVResourceSection },
  setup() {
    return { args };
  },
  template:
    '<div class="card p-0 pb-3 overflow-hidden rounded" style="width: 12rem;"><AVResourceSection v-bind="args" /></div>',
});

const LargeCardTemplate = (args: Meta) => ({
  components: { AVResourceSection },
  setup() {
    return { args };
  },
  template:
    '<div class="card p-0 pb-3 overflow-hidden rounded" style="width: 15rem;"><AVResourceSection v-bind="args" /></div>',
});

export const Default = {
  render: Template,

  args: {
    candidate: getCandidate(),
    isStoryBook: true,
  },
};

export const Summary = {
  render: SummaryTemplate,

  args: {
    candidate: getCandidate(),
    summary: true,
    isStoryBook: true,
  },
};

export const SummaryWithoutPicture = {
  render: SummaryTemplate,

  args: {
    candidate: noPicture,
    summary: true,
    isStoryBook: true,
  },
};

export const PartySummaryWLeaderProfile = {
  render: SummaryTemplate,

  args: {
    candidate: getCandidate(),
    summary: true,
    partyLeaderData: {
      label: "Someone Important",
      url: "https://www.google.com",
    },
    isStoryBook: true,
  },
};

export const PartySummaryWoLeaderProfile = {
  render: SummaryTemplate,

  args: {
    candidate: getCandidate(),
    summary: true,
    partyLeaderData: {
      label: "Someone Important",
    },
    isStoryBook: true,
  },
};

export const PartyLeaderSummary = {
  render: SummaryTemplate,

  args: {
    candidate: getCandidate(),
    summary: true,
    isPartyLeader: true,
  },
  isStoryBook: true,
};

export const WithCustomGroup = {
  render: SummaryTemplate,

  args: {
    candidate: getCandidate(),
    currentCandidateGroup: 2,
    summary: true,
    isStoryBook: true,
  },
};

export const SmallCard = {
  render: SmallCardTemplate,

  args: {
    candidate: getCandidate(),
    currentCandidateGroup: 2,
    summary: true,
    isStoryBook: true,
    card: true,
  },
};

export const CardWithoutPicture = {
  render: SmallCardTemplate,

  args: {
    candidate: noPicture,
    currentCandidateGroup: 2,
    summary: true,
    card: true,
    isStoryBook: true,
  },
};

export const LargeCard = {
  render: LargeCardTemplate,

  args: {
    candidate: getCandidate(),
    currentCandidateGroup: 2,
    summary: true,
    card: true,
    isStoryBook: true,
  },
};
