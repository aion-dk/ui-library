<script setup lang="ts">
import type { PropType, SupportedLocale, SelectionPile, AVSplitHelperState } from "@/types";
import { useLocalization } from "@/composables/useLocalization";

const props = defineProps({
  activeSelectionPileIndex: {
    type: Number,
    default: 0,
  },
  activeState: {
    type: String as PropType<AVSplitHelperState>,
    required: true,
  },
  selectionPiles: {
    type: Array as PropType<SelectionPile[]>,
    required: true,
  },
  totalWeight: {
    type: Number,
    required: true,
  },
  isEditing: {
    type: Boolean,
    required: true,
  },
  locale: {
    type: String as PropType<SupportedLocale>,
    default: null,
  },
});

const { t } = useLocalization(() => props.locale);
</script>

<template>
  <header class="AVSplitWizardHeader mb-3" data-test="split-wizard-header">
    <p v-if="activeState === 'ballot'" class="fs-4 m-0" style="font-weight: 400">
      {{
        isEditing
          ? t("js.components.AVSplitWizardHeader.ballot.editing", {
              n: activeSelectionPileIndex + 1,
            })
          : t("js.components.AVSplitWizardHeader.ballot.adding", { n: selectionPiles.length + 1 })
      }}
    </p>

    <p v-else-if="activeState === 'assign'" class="fs-4 m-0" style="font-weight: 400">
      {{
        isEditing
          ? t("js.components.AVSplitWizardHeader.assign.header_edit_mode", {
              n: (isEditing ? activeSelectionPileIndex : selectionPiles.length) + 1,
            })
          : t("js.components.AVSplitWizardHeader.assign.header", {
              n: (isEditing ? activeSelectionPileIndex : selectionPiles.length) + 1,
            })
      }}
    </p>

    <p v-else class="fs-4 m-0" style="font-weight: 400">
      {{ t("js.components.AVSplitWizardHeader.overview.header") }}
    </p>

    <AVTooltip
      v-if="activeState === 'ballot'"
      :content="
        t('js.components.AVSplitWizardHeader.ballot.can_assign_description', { n: totalWeight })
      "
      :text="t('js.components.AVSplitWizardHeader.ballot.can_assign_ballots', { n: totalWeight })"
      class="AVSplitWizardHeader--tooltip-text"
      icon="circle-info"
      id="split-helper-tooltip"
      position="top"
      data-test="split-wizard-tooltip"
    />
  </header>
</template>

<style scoped lang="scss" src="./AVSplitWizardHeader.scss" />
