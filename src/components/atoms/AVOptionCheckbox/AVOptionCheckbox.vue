<script setup lang="ts">
import { ref, computed, inject, onMounted, onUnmounted, watch } from "vue";
import { switchLocale } from "@/i18n";
import type { PropType, SupportedLocale, SelectionStyle } from "@/types";

const props = defineProps({
  checked: {
    type: Boolean,
    required: true,
  },
  excluded: {
    type: Boolean,
    default: false,
  },
  optionReference: {
    type: String,
    default: "",
  },
  checkBoxIndex: {
    type: Number,
    default: 1,
  },
  rank: {
    type: [Number, null],
    default: null,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  invalid: {
    type: Boolean,
    default: false,
  },
  exclusiveError: {
    type: Boolean,
    default: false,
  },
  locale: {
    type: String as PropType<SupportedLocale>,
    default: null,
  },
  selectionStyle: {
    type: String as PropType<SelectionStyle>,
    default: "checkbox",
  },
  reverseOption: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(["toggled"]);

const onToggled = (): void => emits("toggled");

const isRtl = ref<boolean>(false);

const mutationObserver = ref<MutationObserver | null>(null);

const mutationObserverTarget = document.getElementsByTagName("html")[0];

const accessibilityAttributes = computed(() => {
  if (!props.optionReference) return {};

  const attrs: Record<string, string | number> = {
    id: `option_${props.optionReference}_checkbox_${props.checkBoxIndex}`,
    "aria-labelledby": `option_${props.optionReference}_title option_${props.optionReference}_tick option_${props.optionReference}_subtitle`,
    "aria-describedby": `option_${props.optionReference}_description option_${props.optionReference}_handle option_${props.optionReference}_partial_results`,
  };

  if (props.disabled) attrs.tabindex = 0;

  return attrs;
});

onMounted(() => {
  if (props.locale) switchLocale(props.locale); // DO NOT REMOVE (If in doubt, read the next block comment)

  mutationObserver.value = new MutationObserver(() => {
    const dirAttr = mutationObserverTarget.attributes.getNamedItem("dir")?.value;
    isRtl.value = !!dirAttr && dirAttr === "rtl";
  });
  mutationObserver.value.observe(mutationObserverTarget, { attributes: true });

  const initialDir = mutationObserverTarget.attributes.getNamedItem("dir")?.value;
  isRtl.value = !!initialDir && initialDir === "rtl";
});

onUnmounted(() => mutationObserver.value && mutationObserver.value.disconnect());

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
  <div class="AVOptionCheckbox--container">
    <div
      v-if="exclusiveError && checked"
      class="AVOptionCheckbox--exclusive-container"
      :class="{ 'AVOptionCheckbox--exclusive-container--reversed': reverseOption }"
      data-test="exclusive-error"
    >
      <div class="AVOptionCheckbox--exclusive text-white px-2 d-block bg-theme-danger">
        {{ t("js.components.AVOptionCheckbox.exclusive_option") }}
      </div>
    </div>
    <button
      role="checkbox"
      type="button"
      class="AVOptionCheckbox p-0 m-0"
      :class="{
        'float-end': !isRtl,
        'float-start': isRtl,
        'AVOptionCheckbox--checked': checked && selectionStyle !== 'background',
        'AVOptionCheckbox--checked-white': checked && selectionStyle === 'background',
        'AVOptionCheckbox--disabled': disabled,
        'AVOptionCheckbox--error': (exclusiveError || invalid) && checked,
      }"
      :aria-checked="props.checked"
      :aria-label="
        checked
          ? rank && !excluded
            ? t('js.components.AVOptionCheckbox.aria_label.checked_ranked', { rank: rank })
            : t('js.components.AVOptionCheckbox.aria_label.checked_normal')
          : t('js.components.AVOptionCheckbox.aria_label.unchecked')
      "
      :aria-disabled="props.disabled || undefined"
      :disabled="disabled"
      v-bind="accessibilityAttributes"
      @click.stop="onToggled"
      @keydown.space.enter.prevent="onToggled"
      data-test="option-checkbox"
    >
      <AVOptionSelect
        v-if="checked"
        :id="`option_${optionReference}_tick`"
        :rank="excluded ? null : rank"
        :checked="checked"
        :selection-style="selectionStyle"
        data-test="select"
      />
    </button>
  </div>
</template>

<style scoped lang="scss" src="./AVOptionCheckbox.scss" />
