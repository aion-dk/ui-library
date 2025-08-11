import type { Meta } from "@/types";
import { RECOMMENDATION_PUBLIC_TYPES, SUPPORTED_LOCALES } from "@/constants";
import { AVRecommendationList } from "@/components";
import { getRecommendationsList } from "@/examples";

const meta: Meta<typeof AVRecommendationList> = {
  title: "Design System/Molecules/AVRecommendationList",
  component: AVRecommendationList,
  tags: ["autodocs"],
  argTypes: {
    recommendations: {
      control: { type: "object" },
    },
    summaryRecommenders: {
      control: { type: "number", min: 1, max: 5 },
    },
    recommendationsPublic: {
      control: { type: "select" },
      options: RECOMMENDATION_PUBLIC_TYPES,
    },
    inviteRecommendersPath: {
      control: { type: "text" },
    },
    viewRecommendationsPath: {
      control: { type: "text" },
    },
    locale: {
      control: { type: "select" },
      options: SUPPORTED_LOCALES,
    },
    recommendationPhaseActive: {
      control: { type: "boolean" },
    },
  },
};

export default meta;

const Template = (args: Meta) => ({
  components: { AVRecommendationList },
  setup() {
    return { args };
  },
  template: '<AVRecommendationList v-bind="args" />',
});

export const PublicCollapsible = {
  render: Template,

  args: {
    recommendationsPublic: "public",
    summaryRecommenders: 4,
    recommendations: getRecommendationsList(),
  },
};

export const PublicCollapsibleWithShortSummary = {
  render: Template,

  args: {
    recommendationsPublic: "public",
    summaryRecommenders: 1,
    recommendations: getRecommendationsList(),
  },
};

export const PublicCollapsibleWithInvitationButton = {
  render: Template,

  args: {
    recommendationsPublic: "public",
    inviteRecommendersPath: "https://www.google.com",
    recommendations: getRecommendationsList(),
  },
};

export const PublicLessRecommendations = {
  render: Template,

  args: {
    recommendationsPublic: "public",
    recommendations: getRecommendationsList(2),
  },
};

export const PublicLessRecommendationsWithInvitationButton = {
  render: Template,

  args: {
    recommendationsPublic: "public",
    inviteRecommendersPath: "https://www.google.com",
    recommendations: getRecommendationsList(2),
  },
};

export const PublicCount = {
  render: Template,

  args: {
    recommendationsPublic: "public_count",
    recommendations: getRecommendationsList(),
  },
};

export const Private = {
  render: Template,

  args: {
    recommendationsPublic: "private",
    recommendations: getRecommendationsList(),
  },
};
