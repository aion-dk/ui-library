<script setup lang="ts">
import { ref, computed, inject, onMounted, watch } from "vue";
import { switchLocale } from "@/i18n";
import type { PropType, SupportedLocale } from "@/types";

const props = defineProps({
  amount: {
    type: Number,
    default: 0,
  },
  maxAmount: {
    type: Number,
    default: 99,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  invalid: {
    type: Boolean,
    default: false,
  },
  isQuadratic: {
    type: Boolean,
    default: false,
  },
  locale: {
    type: String as PropType<SupportedLocale>,
    default: null,
  },
});

const emits = defineEmits(["updateCrosses"]);

const value = ref<number>(props.amount);

const checked = computed(() => Boolean(value.value));

const creditsUsed = computed(() =>
  t("js.components.AVOptionCounter.used_credits", {
    n: value.value * value.value,
  }),
);

const add = (): void => {
  value.value = value.value + 1;
  emits("updateCrosses", value.value);
};

const subtract = (): void => {
  value.value = value.value - 1;
  emits("updateCrosses", value.value);
};

watch(
  () => props.amount,
  () => (value.value = props.amount),
);

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
  <div class="hstack gap-1 z-1" data-test="option-counter">
    <button
      class="AVOptionCounter--base AVOptionCounter--btn AVOptionCounter--subtract"
      :aria-label="t('js.components.AVOptionCounter.aria_label.subtract')"
      :disabled="disabled || value === 0"
      data-test="option-counter-subtract"
      @click="subtract()"
    >
      <AVIcon icon="minus" />
    </button>
    <div
      class="AVOptionCounter--base"
      :class="{
        'AVOptionCounter--checked': checked,
        'AVOptionCounter--error': invalid && !!value,
        'cursor-help': isQuadratic,
      }"
      :aria-label="t('js.components.AVOptionCounter.amount', { n: value })"
      data-test="option-counter-votes"
      v-tooltip="isQuadratic ? creditsUsed : undefined"
    >
      <strong>{{ value }}</strong>
    </div>
    <button
      class="AVOptionCounter--base AVOptionCounter--btn AVOptionCounter--add"
      :aria-label="t('js.components.AVOptionCounter.aria_label.add')"
      :disabled="disabled || value + 1 > maxAmount"
      data-test="option-counter-add"
      @click="add()"
    >
      <AVIcon icon="plus" />
    </button>
  </div>
</template>

<style scoped lang="scss" src="./AVOptionCounter.scss" />
