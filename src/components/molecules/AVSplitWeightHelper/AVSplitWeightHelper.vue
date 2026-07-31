<script setup lang="ts">
import type { PropType, SupportedLocale } from "@/types";
import { useLocalization } from "@/composables/useLocalization";

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

const { t } = useLocalization(() => props.locale);
</script>

<template>
  <div class="d-flex flex-column flex-sm-row gap-2 mb-3">
    <div class="card p-3 bg-gray-300 w-100" data-test="weight-helper-total">
      <span
        >{{ t("js.components.AVSplitWeightHelper.total") }}
        <strong class="text-rubik">{{ assignedWeight + unusedWeight }}</strong></span
      >
    </div>

    <div class="card p-3 bg-gray-300 w-100" data-test="weight-helper-assigned">
      <span
        >{{ t("js.components.AVSplitWeightHelper.assigned") }}
        <strong class="text-rubik">{{ assignedWeight }}</strong></span
      >
    </div>

    <div class="card p-3 bg-gray-300 w-100" data-test="weight-helper-unused">
      <span
        >{{ t("js.components.AVSplitWeightHelper.unused") }}
        <strong class="text-rubik">{{ unusedWeight }}</strong></span
      >
    </div>
  </div>
</template>

<style scoped lang="scss" src="./AVSplitWeightHelper.scss" />
