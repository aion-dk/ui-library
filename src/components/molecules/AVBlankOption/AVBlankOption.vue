<script setup lang="ts">
import { onMounted, ref, onUnmounted } from "vue";
import type { PropType, SupportedLocale, PartialResult, SelectionStyle } from "@/types";
import { useLocalization } from "@/composables/useLocalization";

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
  galleryMode: {
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
  reverseOption: {
    type: Boolean,
    default: false,
  },
  selectionStyle: {
    type: String as PropType<SelectionStyle>,
    default: "checkbox",
  },
});

const emits = defineEmits(["toggleBlank"]);

const isRtl = ref<boolean>(false);

const mutationObserver = ref<MutationObserver | null>(null);

const mutationObserverTarget = document.getElementsByTagName("html")[0];

onMounted(() => {
  mutationObserver.value = new MutationObserver(() => {
    const dirAttr = mutationObserverTarget.attributes.getNamedItem("dir")?.value;
    isRtl.value = !!dirAttr && dirAttr === "rtl";
  });
  mutationObserver.value.observe(mutationObserverTarget, { attributes: true });

  const initialDir = mutationObserverTarget.attributes.getNamedItem("dir")?.value;
  isRtl.value = !!initialDir && initialDir === "rtl";
});

onUnmounted(() => mutationObserver.value && mutationObserver.value.disconnect());

const { t } = useLocalization(() => props.locale);
</script>

<template>
  <div
    class="cursor-pointer"
    :class="{
      'AVBlankOption--disabled': disabled,
      'h-100': galleryMode,
    }"
    data-test="blank-option"
    @click="emits('toggleBlank')"
  >
    <div
      class="AVBlankOption card position-relative"
      :class="{
        'AVBlankOption--accent': accentColor,
        'h-100': galleryMode,
        'AVBlankOption--selected-background': selectionStyle === 'background' && checked,
      }"
      :style="accentColor ? `border-${isRtl ? 'right' : 'left'}-color: ${accentColor};` : ''"
      :aria-label="t('js.components.AVBlankOption.aria_labels.option')"
      data-test="option-container"
    >
      <div
        class="hstack p-3"
        :class="reverseOption ? 'justify-content-start gap-3' : 'justify-content-between'"
        data-test="option-content"
      >
        <div v-if="reverseOption" class="p-1">
          <AVOptionCheckbox
            option-reference="blank"
            :rank="null"
            :checked="checked"
            :exclusive-error="error"
            :invalid="invalid"
            :disabled="disabled || observerMode"
            :gallery-mode="galleryMode"
            :selection-style="selectionStyle"
            :reverse-option="reverseOption"
            @toggled="emits('toggleBlank')"
            data-test="blank-checkbox"
          />
        </div>
        <h5 id="option_blank_title" class="AVBlankOption--title m-0">
          {{ t("js.components.AVBlankOption.title") }}
        </h5>
        <span id="option_blank_handle" class="visually-hidden">blank</span>
        <div v-if="!reverseOption" class="p-1">
          <AVOptionCheckbox
            option-reference="blank"
            :rank="null"
            :checked="checked"
            :exclusive-error="error"
            :invalid="invalid"
            :disabled="disabled || observerMode"
            :gallery-mode="galleryMode"
            :selection-style="selectionStyle"
            :reverse-option="reverseOption"
            @toggled="emits('toggleBlank')"
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

<style scoped lang="scss" src="./AVBlankOption.scss" />
