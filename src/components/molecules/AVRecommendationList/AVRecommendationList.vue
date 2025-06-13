<script lang="ts" setup>
import type {
  PropType,
  Recommendation,
  AVRecommendationListPublicType,
  SupportedLocale,
} from "@/types";
import { ref, onMounted, watch, inject, computed } from "vue";
import { switchLocale } from "@/i18n";

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
  locale: {
    type: String as PropType<SupportedLocale>,
    default: null,
  },
  recommendationPhaseActive: {
    type: Boolean,
    default: false,
  },
});

const isOpen = ref<boolean>(false);

const orderedRecommendations = computed(() => {
  const cloned = Array.from(props.recommendations);
  return cloned.sort((a, b) => a.position - b.position);
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

const goToInviteRecommendersPath = () => {
  return (window.location.href = props.inviteRecommendersPath);
};

/**
 * This is necesary in order to support both provided i18n and local i18n.
 * The used locale will be taken from the provided i18n as long as there is one
 * (this happens when we plug-in the library into a product, as electa or evs),
 * otherwise, it will take the locale from the local i18n instance.
 * Removing it, will cause all tests, storybook and the playground to break.
 */
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
const i18n: any = inject("i18n");
const { t } = i18n.global;
onMounted(() => {
  if (props.locale) switchLocale(props.locale);
});
watch(
  () => props.locale,
  () => {
    if (props.locale) switchLocale(props.locale);
  },
  { deep: true },
);
/* END */
</script>

<template>
  <AVCollapser
    v-if="
      Boolean(recommendations.length) &&
      recommendations.length > summaryRecommenders &&
      recommendationsPublic === 'public'
    "
    ref="recommendationList"
    collapsable
    start-collapsed
    pane-id="recommendation-list"
    @accordion-open="isOpen = true"
  >
    <template #toggle="{ isOpen }">
      <div class="AVRecommendationList--header d-flex flex-column flex-sm-row">
        <div class="vstack gap-3">
          <div class="hstack gap-3">
            <h4 class="m-0">
              {{
                t("js.components.AVRecommendationList.header_title", {
                  n: recommendations.length,
                })
              }}
            </h4>
            <button
              v-if="!!inviteRecommendersPath"
              :disabled="recommendationPhaseActive"
              class="AVRecommendationList--invite-btn btn btn-sm btn-theme-outline"
              @click.stop.prevent="goToInviteRecommendersPath"
            >
              <AVIcon icon="envelope" />
              {{ t("js.components.AVRecommendationList.invite_recommenders_button_label") }}
            </button>
          </div>

          <p
            v-if="orderedRecommendations.length >= summaryRecommenders && !isOpen"
            class="hstack gap-1 text-dark mb-0"
            data-test="recommendation-summary"
          >
            <AVIcon icon="user-check" class="align-self-start py-1" />
            {{ previewRecommendations.short }}
          </p>
        </div>

        <div class="hstack gap-2 text-dark" data-test="list-collapse">
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
              icon="chevron-down"
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
    v-else-if="Boolean(recommendations.length) && recommendationsPublic == 'public'"
    class="AVRecommendationList--header d-flex flex-column flex-sm-row"
  >
    <div class="vstack gap-3">
      <div class="hstack gap-3">
        <h4 class="m-0">
          {{
            t("js.components.AVRecommendationList.header_title", {
              n: recommendations.length,
            })
          }}
        </h4>
        <button
          v-if="!!inviteRecommendersPath"
          :disabled="recommendationPhaseActive"
          class="AVRecommendationList--invite-btn btn btn-sm btn-theme-outline"
          @click.stop.prevent="goToInviteRecommendersPath"
        >
          <AVIcon icon="envelope" />
          {{ t("js.components.AVRecommendationList.invite_recommenders_button_label") }}
        </button>
      </div>

      <p class="hstack gap-1 text-dark mb-0" data-test="recommendation-summary">
        <AVIcon icon="user-check" class="align-self-start py-1" />
        {{ previewRecommendations.short }}
      </p>
    </div>
  </div>

  <div
    v-else-if="recommendationsPublic !== 'private'"
    class="AVRecommendationList--header d-flex flex-column flex-sm-row"
  >
    <div class="vstack gap-3">
      <h4 class="m-0">
        {{
          t("js.components.AVRecommendationList.header_title", {
            n: recommendations.length,
          })
        }}
        <button
          v-if="!!inviteRecommendersPath"
          :disabled="recommendationPhaseActive"
          class="AVRecommendationList--invite-btn btn btn-sm btn-theme-outline"
          @click.stop.prevent="goToInviteRecommendersPath"
        >
          <AVIcon icon="envelope" />
          {{ t("js.components.AVRecommendationList.invite_recommenders_button_label") }}
        </button>
      </h4>
      <p class="m-0 text-dark">
        <AVIcon icon="user-check" />
        {{
          t("js.components.AVRecommendationList.public_count_text", {
            n: recommendations.length,
          })
        }}
      </p>
    </div>
  </div>
</template>

<style lang="scss" src="./AVRecommendationList.scss" />
