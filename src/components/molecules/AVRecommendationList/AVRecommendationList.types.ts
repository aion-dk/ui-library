import { RECOMMENDATION_PUBLIC_TYPES, CANDIDACY_RESOURCES } from "@/constants";

type AVRecommendationListPublicType = (typeof RECOMMENDATION_PUBLIC_TYPES)[number];
type AVRecommendationListResource = (typeof CANDIDACY_RESOURCES)[number];

export type { AVRecommendationListPublicType, AVRecommendationListResource };
