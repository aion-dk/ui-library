<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch, nextTick } from "vue";
import type { PropType, Theme } from "@/types";
import { useLocalization } from "@/composables/useLocalization";

const props = defineProps({
  stepNumber: {
    type: Number,
    validate: (v: number) => v >= 1 && v <= 9,
  },
  status: {
    type: String,
    validate: (v: string) => ["default", "active", "done"].includes(v),
    default: "default",
  },
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    default: null,
  },
  collapsed: {
    type: Boolean,
    default: false,
  },
  hasNextStep: {
    type: Boolean,
    default: false,
  },
  hasPrevStep: {
    type: Boolean,
    default: false,
  },
  linkMode: {
    type: Boolean,
    default: false,
  },
  summary: {
    type: Boolean,
    default: false,
  },
  inProgress: {
    type: Boolean,
    default: false,
  },
  theme: {
    type: String as PropType<Theme>,
    default: "dark",
  },
});

const acronym = computed(() => {
  const words = props.title.split(" ");
  if (words.length < 2) return `${words[0][0].toUpperCase()}${words[0][1].toUpperCase()}`;
  return `${words[0][0].toUpperCase()}${words[1][0].toUpperCase()}`;
});

const verticalStepItem = ref<HTMLDivElement | null>(null);

const currentStepHeight = ref<number>(0);

const currentDistance = computed(() => Math.ceil((currentStepHeight.value - 32) / 2));

const lineStylePre = computed(() => {
  if (!props.hasPrevStep) return "";
  return `
    height: ${currentDistance.value + 4}px;
    margin-bottom: -${currentDistance.value - 4}px;
  `;
});

const lineStylePost = computed(() => {
  if (!props.hasNextStep) return "";
  return `
    height: ${currentDistance.value + 4}px;
    margin-top: -${currentDistance.value - 4}px;
  `;
});

const updateValues = (): void => {
  if (!props.linkMode) {
    setTimeout(
      () => (currentStepHeight.value = verticalStepItem.value?.clientHeight || 0),
      props.collapsed ? 0 : 250,
    );
  }
};

const validateStepNumber = (): void => {
  if (!props.linkMode && !props.stepNumber)
    throw new Error("stepNumber prop is required when linkMode is disabled");
};

onMounted(() => {
  validateStepNumber();
  updateValues();
  window.addEventListener("resize", updateValues);
});

onUnmounted(() => window.removeEventListener("resize", updateValues));

// This component has no `locale` prop of its own; it inherits the locale resolved
// by the nearest AV ancestor, and re-measures because a locale change resizes text.
const { locale: i18nLocale } = useLocalization();

watch(i18nLocale, () => {
  nextTick();
  updateValues();
});
</script>

<template>
  <div class="AVVerticalStep" :class="`AVVerticalStep--${theme}`">
    <div
      v-if="hasPrevStep"
      class="AVVerticalStep--line"
      :style="lineStylePre"
      data-test="step-line-pre"
    ></div>

    <div
      class="AVVerticalStep--container"
      :class="{
        'AVVerticalStep--link-container': linkMode,
        'AVVerticalStep--link-active': linkMode && status === 'active',
      }"
      ref="verticalStepItem"
      :data-index="stepNumber"
    >
      <transition>
        <div v-if="inProgress" class="AVVerticalStep--in-progress"></div>
      </transition>
      <div :class="`AVVerticalStep--step AVVerticalStep--step-${status}`" data-test="step-circle">
        <!-- Summary -->
        <div v-if="summary && status === 'active'" class="AVVerticalStep--bullet-wrapper">
          <AVIcon icon="grip-vertical" />
        </div>
        <div v-else-if="summary" class="AVVerticalStep--transition-icon" data-test="back-icon">
          <div class="AVVerticalStep--bullet-wrapper">
            <AVIcon icon="grip-vertical" />
          </div>
          <div class="AVVerticalStep--bullet-wrapper">
            <AVIcon icon="arrow-left" />
          </div>
        </div>

        <!-- Link -->
        <div v-else-if="linkMode && status === 'active'" class="AVVerticalStep--bullet-wrapper">
          <span class="AVVerticalStep--acronym">
            {{ acronym }}
          </span>
        </div>
        <div v-else-if="linkMode" class="AVVerticalStep--transition-icon" data-test="acronym-text">
          <div class="AVVerticalStep--bullet-wrapper">
            <span class="AVVerticalStep--acronym">
              {{ acronym }}
            </span>
          </div>
          <div class="AVVerticalStep--bullet-wrapper">
            <AVIcon icon="arrow-right" />
          </div>
        </div>

        <!-- Step -->
        <div v-else class="AVVerticalStep--bullet-wrapper">
          <AVIcon
            :icon="status === 'done' ? 'check' : `${stepNumber}`"
            class="AVVerticalStep--icon"
            data-test="step-icon"
          />
        </div>
      </div>

      <transition @after-enter="updateValues" @after-leave="updateValues">
        <div
          v-if="!collapsed"
          class="AVVerticalStep--text"
          :class="{
            'AVVerticalStep--text-link-active': linkMode && status === 'active',
          }"
        >
          <span
            :class="`AVVerticalStep--title AVVerticalStep--text-${status}`"
            data-test="step-title"
          >
            {{ title }}
          </span>
          <span
            v-if="subtitle"
            :class="`AVVerticalStep--subtitle AVVerticalStep--text-${status}`"
            data-test="step-subtitle"
          >
            {{ subtitle }}
          </span>
        </div>
      </transition>
    </div>

    <div
      v-if="hasNextStep"
      class="AVVerticalStep--line"
      :style="lineStylePost"
      data-test="step-line-post"
    ></div>
  </div>
</template>

<style scoped src="./AVVerticalStep.scss" />
