<script setup lang="ts">
import { onMounted, ref, onUnmounted } from "vue";
import type { PropType, SupportedLocale, PartialResult } from "@/types";
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
      }"
      :style="accentColor ? `border-${isRtl ? 'right' : 'left'}-color: ${accentColor};` : ''"
      :aria-label="t('js.components.AVBlankOption.aria_labels.option')"
      data-test="option-container"
    >
      <div class="hstack justify-content-between p-3" data-test="option-content">
        <h5 id="option_blank_title" class="AVBlankOption--title m-0">
          {{ t("js.components.AVBlankOption.title") }}
        </h5>
        <span id="option_blank_handle" class="visually-hidden">blank</span>
        <div class="p-1">
          <AVOptionCheckbox
            option-reference="blank"
            :rank="null"
            :checked="checked"
            :exclusive-error="error"
            :invalid="invalid"
            :disabled="disabled || observerMode"
            :gallery-mode="galleryMode"
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
