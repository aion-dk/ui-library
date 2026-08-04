<script lang="ts" setup>
import type {
  PropType,
  Recommendation,
  AVRecommendationListPublicType,
  CandidacyResource,
  SupportedLocale,
} from "@/types";
import { ref, computed } from "vue";
import { useLocalization } from "@/composables/useLocalization";

const props = defineProps({
  recommendations: {
    type: Array as PropType<Array<Recommendation>>,
    required: true,
  },
  summaryRecommenders: {
    type: Number,
    default: 3,
  },
  recommendationsPublic: {
    type: String as PropType<AVRecommendationListPublicType>,
    default: "public",
  },
  inviteRecommendersPath: {
    type: String,
    default: null,
  },
  viewRecommendationsPath: {
    type: String,
    default: null,
  },
  recommendationPhaseActive: {
    type: Boolean,
    default: false,
  },
  resourceType: {
    type: String as PropType<CandidacyResource>,
    default: "candidate",
  },
  isOwnProfile: {
    type: Boolean,
    default: false,
  },
  locale: {
    type: String as PropType<SupportedLocale>,
    default: null,
  },
});

const isOpen = ref<boolean>(false);

const orderedRecommendations = computed(() => {
  const cloned = Array.from(props.recommendations);
  return cloned.toSorted((a, b) => a.position - b.position);
});

const previewRecommendations = computed(() => {
  const long = processText(orderedRecommendations.value);
  const short = processText(orderedRecommendations.value, true);
  return { short, long };
});

const processText = (recommendations: Array<Recommendation>, short?: boolean): string => {
  const cloned = Array.from(recommendations);
  let string: string = "";

  cloned.forEach((recommendation, index) => {
    if (short) {
      if (index <= props.summaryRecommenders - 1) {
        string += `${recommendation.label}, `;
      }
    } else {
      if (index !== cloned.length - 1) {
        string += `${recommendation.label}, `;
      } else {
        string = string.substring(0, string.length - 2);
        string += ` & ${recommendation.label}.`;
      }
    }
  });

  if (short && recommendations.length - props.summaryRecommenders >= 1) {
    string += t("js.components.AVRecommendationList.and_more", {
      n: recommendations.length - props.summaryRecommenders,
    });
  } else if (short) {
    string = string.substring(0, string.length - 2);
  }

  return string;
};

const goToInviteRecommendersPath = (): string => {
  return (window.location.href = props.inviteRecommendersPath);
};

const goToViewRecommendationsPath = (): string => {
  return (window.location.href = props.viewRecommendationsPath);
};

const { t } = useLocalization(() => props.locale);
</script>

<template>
  <template v-if="isOwnProfile || recommendationsPublic !== 'private'">
    <div
      class="d-flex flex-column flex-sm-row align-items-start align-items-sm-center justify-content-between gap-3"
    >
      <div class="w-100">
        <h4 class="m-0 mb-0">
          {{
            t("js.components.AVRecommendationList.header_title", {
              n: recommendations.length,
            })
          }}
        </h4>
      </div>

      <div
        class="d-flex flex-column flex-sm-row align-items-center justify-content-end gap-2 w-100"
      >
        <button
          v-if="!!inviteRecommendersPath"
          :disabled="!recommendationPhaseActive"
          class="party-invite-btn btn btn-theme"
          @click.stop.prevent="goToInviteRecommendersPath"
        >
          <AVIcon icon="envelope" />
          {{ t("js.components.AVRecommendationList.invite_recommenders_button_label") }}
        </button>

        <button
          v-if="!!viewRecommendationsPath"
          class="party-invite-btn btn btn-theme"
          @click.stop.prevent="goToViewRecommendationsPath"
        >
          {{ t("js.components.AVRecommendationList.view_recommendations_button_label") }}
        </button>
      </div>
    </div>

    <hr class="m-0 mt-2" />
  </template>

  <AVCollapser
    v-if="
      Boolean(recommendations.length) &&
      recommendations.length > summaryRecommenders &&
      (recommendationsPublic === 'public' || isOwnProfile)
    "
    ref="recommendationList"
    collapsable
    start-collapsed
    pane-id="recommendation-list"
    @accordion-open="isOpen = true"
  >
    <template #toggle="{ isOpen }">
      <div
        class="AVRecommendationList--header d-flex flex-column flex-sm-row"
        :class="{
          'justify-content-end': isOpen,
        }"
      >
        <div
          v-if="orderedRecommendations.length >= summaryRecommenders && !isOpen"
          class="vstack gap-3"
        >
          <p class="hstack gap-1 text-dark mb-0" data-test="recommendation-summary">
            <AVIcon icon="user-check" class="align-self-start py-1" />
            {{ previewRecommendations.short }}
          </p>
        </div>

        <div class="hstack gap-2 text-dark align-self-end" data-test="list-collapse">
          <span class="small text-nowrap">
            {{
              isOpen
                ? t("js.components.AVRecommendationList.collapse")
                : t("js.components.AVRecommendationList.uncollapse")
            }}
          </span>

          <span
            class="AVRecommendationList--icon-container d-flex align-items-center justify-content-center"
          >
            <AVIcon
              icon="chevron-right"
              class="AVRecommendationList--collapser-icon"
              :class="{
                'AVRecommendationList--collapser-icon-opened': isOpen,
              }"
            />
          </span>
        </div>
      </div>
    </template>

    <template #pane>
      <div class="AVRecommendationList--content d-grid p-3 gap-3">
        <p
          v-for="recommendation in orderedRecommendations"
          :key="`recommendation_${recommendation.id}`"
          class="hstack gap-1 text-dark mb-0 cursor-help"
          data-test="recommendation"
          v-tooltip="recommendation.label"
        >
          <AVIcon icon="user-check" class="align-self-start py-1" />
          <span class="text-truncate">
            {{ recommendation.label }}
          </span>
        </p>
      </div>
    </template>
  </AVCollapser>

  <div
    v-else-if="
      Boolean(recommendations.length) && (recommendationsPublic === 'public' || isOwnProfile)
    "
    class="AVRecommendationList--header d-flex flex-column flex-sm-row"
  >
    <div class="vstack gap-3">
      <p class="hstack gap-1 text-dark mb-0" data-test="recommendation-summary">
        <AVIcon icon="user-check" class="align-self-start py-1" />
        {{ previewRecommendations.short }}
      </p>
    </div>
  </div>

  <div
    v-else-if="
      Boolean(recommendations.length) && (recommendationsPublic === 'public_count' || isOwnProfile)
    "
    class="AVRecommendationList--header d-flex flex-column flex-sm-row"
  >
    <div class="vstack gap-3">
      <p class="hstack gap-1 text-dark mb-0" data-test="recommendation-summary">
        <AVIcon icon="user-check" class="align-self-start py-1" />
        {{
          t(`js.components.AVRecommendationList.${resourceType}.public_count_text`, {
            n: recommendations.length,
          })
        }}
      </p>
    </div>
  </div>

  <div
    v-else-if="recommendationsPublic !== 'private' || isOwnProfile"
    class="AVRecommendationList--header d-flex flex-column flex-sm-row"
  >
    <div class="vstack gap-3">
      <p class="hstack gap-1 text-dark mb-0" data-test="recommendation-summary">
        <AVIcon icon="user-check" class="align-self-start py-1" />
        {{ t(`js.components.AVRecommendationList.${resourceType}.no_recommendations`) }}
      </p>
    </div>
  </div>
</template>

<style lang="scss" src="./AVRecommendationList.scss" />
