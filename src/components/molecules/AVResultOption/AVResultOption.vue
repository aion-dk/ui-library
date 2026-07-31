<script setup lang="ts">
import { computed } from "vue";
import type { PropType, SupportedLocale, OptionContent, IterableObject } from "@/types";
import { getMeaningfulLabel } from "@/helpers/meaningfulLabel";
import { useLocalization } from "@/composables/useLocalization";

const props = defineProps({
  option: {
    type: Object as PropType<OptionContent>,
    required: true,
  },
  votes: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  elected: {
    type: Boolean,
    default: false,
  },
  ineligible: {
    type: Boolean,
    default: false,
  },
  tied: {
    type: Boolean,
    default: false,
  },
  hidePercentage: {
    type: Boolean,
    default: false,
  },
  locale: {
    type: String as PropType<SupportedLocale>,
    default: null,
  },
});

const optionPercent = computed(() =>
  props.total > 0 ? Math.round((props.votes / props.total) * 10000) / 100 : 0,
);

const truncatedVotes = computed(() => Math.round(props.votes * 100) / 100);

const { locale: i18nLocale, t } = useLocalization(() => props.locale);
</script>

<template>
  <div
    class="d-flex p-3"
    :class="{
      'text-body': true,
      'bg-body-alt-10': !tied && !elected && !ineligible,
      'AVResultOption--highlighted': elected || tied,
      'bg-success-faded': elected,
      'bg-warning-faded': tied && !elected,
      'bg-danger-faded': ineligible,
    }"
    data-test="result-option"
  >
    <div
      class="hstack justify-content-between w-100"
      v-tooltip="
        getMeaningfulLabel(
          option as unknown as IterableObject,
          i18nLocale,
          t('js.components.AVOption.aria_labels.option'),
        )
      "
    >
      <div class="hstack gap-3 overflow-hidden text-nowrap">
        <img
          v-if="option.image"
          :src="option.image"
          class="AVResultOption--image ratio ratio-1x1"
          aria-hidden="true"
          data-test="result-image"
        />
        <span class="text-truncate" data-test="result-title">
          {{
            getMeaningfulLabel(
              option as unknown as IterableObject,
              i18nLocale,
              t("js.components.AVOption.aria_labels.option"),
            )
          }}
        </span>
      </div>
      <div class="vstack align-items-end justify-content-center gap-1" data-test="result-results">
        <p class="mb-0">{{ truncatedVotes }}</p>
        <p v-if="!hidePercentage" class="mb-0">{{ optionPercent }}%</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss" src="./AVResultOption.scss" />
