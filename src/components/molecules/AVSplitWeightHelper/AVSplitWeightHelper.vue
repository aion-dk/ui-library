<script setup lang="ts">
import { inject, onMounted, watch } from "vue";
import { switchLocale } from "@/i18n";
import type { PropType, SupportedLocale } from "@/types";

const props = defineProps({
  assignedWeight: {
    type: Number,
    required: true,
  },
  unusedWeight: {
    type: Number,
    required: true,
  },
  activeAssigned: {
    type: Number,
    default: null,
  },
  locale: {
    type: String as PropType<SupportedLocale>,
    default: null,
  },
});

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
  <div class="AVSplitWeightHelper d-flex flex-column flex-sm-row gap-2 mb-3">
    <div class="card p-3 bg-dark-faded w-100" data-test="weight-helper-total">
      <span
        >{{ t("js.components.AVSplitWeightHelper.total") }}
        <strong>{{ assignedWeight + unusedWeight }}</strong></span
      >
    </div>

    <div class="card p-3 bg-dark-faded w-100" data-test="weight-helper-assigned">
      <span
        >{{ t("js.components.AVSplitWeightHelper.assigned") }}
        <strong>{{ assignedWeight }}</strong></span
      >
    </div>

    <div class="card p-3 bg-dark-faded w-100" data-test="weight-helper-unused">
      <span
        >{{ t("js.components.AVSplitWeightHelper.unused") }}
        <strong>{{ unusedWeight }}</strong></span
      >
    </div>
  </div>
</template>

<style scoped src="./AVSplitWeightHelper.css" />
