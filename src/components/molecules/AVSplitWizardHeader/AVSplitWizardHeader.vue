<script setup lang="ts">
import { inject, onMounted, watch } from "vue";
import { switchLocale } from "@/i18n";
import type { PropType, SupportedLocale, SelectionPile, AVSplitHelperState } from "@/types";

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
