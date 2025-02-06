<script setup lang="ts">
import { inject, onMounted, watch } from "vue";
import type { PropType, SupportedLocale, PartialResult } from "@/types";
import { switchLocale } from "@/i18n";

const props = defineProps({
  checked: {
    type: Boolean,
    required: true,
  },
  error: {
    type: Boolean,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  partialResults: {
    type: Object as PropType<PartialResult>,
    default: null,
  },
  accentColor: {
    type: String,
    default: null,
  },
  observerMode: {
    type: Boolean,
    default: false,
  },
  locale: {
    type: String as PropType<SupportedLocale>,
    default: null,
  },
  invalid: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["toggleBlank"]);

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
  <div
    :class="{
      'AVBlankOption--disabled': disabled,
    }"
    data-test="blank-option"
  >
    <div
      class="AVBlankOption card position-relative"
      :class="{
        'AVBlankOption--accent': accentColor,
        'border-start-theme': accentColor,
      }"
      :aria-label="t('js.components.AVBlankOption.aria_labels.option')"
      data-test="option-container"
    >
      <div
        class="AVBlankOption--header hstack justify-content-between p-3"
        data-test="option-content"
      >
        <h5 id="option_blank_title" class="AVBlankOption--title m-0">
          {{ t("js.components.AVBlankOption.title") }}
        </h5>
        <span id="option_blank_handle" class="visually-hidden">blank</span>
        <div class="AVBlankOption--checkbox p-1">
          <AVOptionCheckbox
            option-reference="blank"
            :rank="null"
            :checked="checked"
            :exclusive-error="error"
            :invalid="invalid"
            :disabled="disabled || observerMode"
            @toggled="$emit('toggleBlank')"
            data-test="blank-checkbox"
          />
        </div>
        <AVOptionLiveResults
          v-if="partialResults && (observerMode || disabled)"
          option-reference="blank"
          :partial-results="partialResults"
          mode="internal"
          :show-percentage="partialResults.showPercentage"
        />
      </div>
    </div>

    <AVOptionLiveResults
      v-if="!disabled && partialResults && !observerMode"
      option-reference="blank"
      :partial-results="partialResults"
      mode="external"
      :show-percentage="partialResults.showPercentage"
    />
  </div>
</template>

<style scoped src="./AVBlankOption.css" />
