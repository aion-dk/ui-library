<script setup lang="ts">
import { computed } from "vue";
import type {
  PropType,
  NormalResultDataForDisplay,
  NormalResultListGroup,
  VoteCounts,
  SupportedLocale,
  IterableObject,
} from "@/types";
import { getMeaningfulLabel } from "@/helpers/meaningfulLabel";
import { useLocalization } from "@/composables/useLocalization";
import { AVResultOption } from "@/components";

const props = defineProps({
  sortedResult: {
    type: Array as PropType<NormalResultDataForDisplay>,
    required: true,
  },
  hidePercentage: {
    type: Boolean,
    default: false,
  },
  hideElected: {
    type: Boolean,
    default: false,
  },
  hideTied: {
    type: Boolean,
    default: false,
  },
  disregardBlank: {
    type: Boolean,
    default: false,
  },
  totalCount: {
    type: Number,
    required: true,
  },
  voteCounts: {
    type: Object as PropType<VoteCounts>,
    required: true,
  },
  locale: {
    type: String as PropType<SupportedLocale>,
    default: "en",
  },
});

const isPercentageHidden = (reference: string): boolean =>
  reference === "blank" && props.disregardBlank ? true : props.hidePercentage;

const isGroup = (item: NormalResultDataForDisplay[number]): item is NormalResultListGroup =>
  "children" in item && Array.isArray(item.children);

const hasGroups = computed(() => props.sortedResult.some(isGroup));

const { locale: i18nLocale, t } = useLocalization(() => props.locale);
</script>

<template>
  <div class="AVNormalSummary--container vstack w-100">
    <div
      class="AVNormalSummary d-grid gap-2 w-100 mb-3"
      :class="{ 'dynamic-columns': !hasGroups && sortedResult.length > 8 }"
    >
      <template v-for="item in sortedResult" :key="`result_for_${item.reference}`">
        <section
          v-if="isGroup(item)"
          class="AVNormalSummary--group vstack gap-2"
          data-test="result-group"
        >
          <div
            class="AVNormalSummary--group-header hstack justify-content-between gap-3 p-3 bg-body border"
          >
            <div class="hstack gap-3 overflow-hidden text-nowrap">
              <img
                v-if="item.imageUrl"
                :src="item.imageUrl"
                style="object-fit: cover; max-height: 35px; max-width: 35px"
                class="AVResultOption--image ratio ratio-1x1"
                aria-hidden="true"
                data-test="result-image"
              />
              <h3 class="fs-5 fw-light mb-0 text-body" data-test="group-title">
                {{
                  getMeaningfulLabel(
                    item as unknown as IterableObject,
                    i18nLocale,
                    t("js.components.AVOption.aria_labels.option"),
                  )
                }}
              </h3>
            </div>
            <small
              v-if="typeof item.seats === 'number' && !hideElected"
              class="text-body-70 text-nowrap"
              data-test="group-seats"
            >
              {{ t("js.components.AVNormalSummary.group.seats", {}, item.seats) }}
            </small>
          </div>

          <div class="ms-4 vstack gap-2">
            <AVResultOption
              v-for="child in item.children"
              :key="`result_for_${item.reference}_${child.reference}`"
              :option="child"
              :votes="child.count"
              :total="totalCount"
              :elected="!hideElected && child.elected"
              :tied="!hideTied && child.tied"
              :list="child.reference === item.reference"
              :hide-percentage="isPercentageHidden(child.reference)"
              data-test="result-option"
            />
          </div>
        </section>

        <AVResultOption
          v-else
          :option="item"
          :votes="item.count"
          :total="totalCount"
          :elected="!hideElected && item.elected"
          :tied="!hideTied && item.tied"
          :ineligible="item.ineligible"
          :hide-percentage="isPercentageHidden(item.reference)"
          data-test="result-option"
        />
      </template>
    </div>

    <div class="vstack gap-1" data-test="summary">
      <AVResultSummaryItem
        v-if="Number.isFinite(voteCounts.excludedCount)"
        :title="t('js.components.AVNormalSummary.summary.null_votes')"
        :value="voteCounts.excludedCount"
        reference="null_votes"
      />
    </div>
  </div>
</template>

<style scoped lang="scss" src="./AVNormalSummary.scss" />
