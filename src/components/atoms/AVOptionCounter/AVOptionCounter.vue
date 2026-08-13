<script setup lang="ts">
import { ref, computed, watch } from "vue";
import type { PropType, SupportedLocale } from "@/types";
import { useLocalization } from "@/composables/useLocalization";

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

const { t } = useLocalization(() => props.locale);
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
