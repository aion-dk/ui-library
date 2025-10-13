<script setup lang="ts">
import { ref, computed, onMounted, inject, watch, nextTick } from "vue";
import type { PropType, SupportedLocale } from "@/types";
import { switchLocale } from "@/i18n";

const props = defineProps({
  collapsable: {
    type: Boolean,
    default: false,
  },
  startCollapsed: {
    type: Boolean,
    default: false,
  },
  paneId: {
    type: String,
    required: true,
  },
  optionReference: {
    type: String,
    default: null,
  },
  subOptionSelected: {
    type: Number,
    default: null,
  },
  invalid: {
    type: Boolean,
    default: false,
  },
  useDeferredButton: {
    type: Boolean,
    default: false,
  },
  locale: {
    type: String as PropType<SupportedLocale>,
    default: null,
  },
});

const emit = defineEmits<{
  (event: "accordionOpen"): void;
}>();

const isMounted = ref<boolean>(false);

const isOpen = ref<boolean>(false);

const animateAccordion = ref<boolean>(true);

const reactiveProps = computed(() => {
  return {
    collapsable: props.collapsable,
    startCollapsed: props.startCollapsed,
  };
});

onMounted(() => {
  const { collapsable, startCollapsed } = reactiveProps.value;
  isOpen.value = collapsable && !startCollapsed;
  nextTick();
  if (document.querySelector(`#${props.paneId}_btn`)) isMounted.value = true;
});

const toggleAccordion = (force: boolean | null = null, animate = true) => {
  if (!props.collapsable) return;

  animateAccordion.value = animate;
  if (force === null) isOpen.value = !isOpen.value;
  else isOpen.value = !!force;
  if (isOpen.value) emit("accordionOpen");
};

const triggerAccordion = () => {
  if (props.useDeferredButton) return;

  toggleAccordion();
};

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
  <template v-if="collapsable">
    <div
      :aria-controls="paneId"
      tabindex="0"
      :class="{
        AVCollapser: !useDeferredButton,
      }"
      data-test="collapser-button"
      @click="triggerAccordion()"
    >
      <slot name="toggle" :is-open="isOpen" :collapsable="collapsable" />
    </div>
    <slot name="results" />
    <AVAnimatedTransition :skip-transition="!animateAccordion">
      <div v-show="isOpen" :id="paneId" :aria-hidden="!isOpen">
        <slot name="pane" :is-open="isOpen" :toggle-collapse="toggleAccordion" />
      </div>
    </AVAnimatedTransition>

    <Teleport v-if="useDeferredButton && isMounted" defer :to="`#${paneId}_btn`">
      <button
        class="AVCollapser-collapse-btn w-100 border-0 hstack gap-2 p-3"
        data-test="option-children"
        type="button"
        :aria-label="
          isOpen
            ? t('js.components.AVCollapser.collapse_text')
            : `${t('js.components.AVCollapser.expand_text')} ${subOptionSelected && !isOpen ? t('js.components.AVCollapser.sub_options_select', { n: subOptionSelected }) : ''}`
        "
        @click.stop.prevent="toggleAccordion()"
      >
        <div
          :id="`option_${optionReference}_dropdown`"
          class="hstack gap-2 text-dark"
          aria-hidden="true"
          data-test="option-expander"
        >
          <AVIcon
            icon="chevron-right"
            class="AVCollapser--expander-icon"
            :class="{
              'AVCollapser--expander-icon-opened': isOpen,
            }"
          />
          <span
            v-html="
              isOpen
                ? t('js.components.AVCollapser.collapse_text')
                : t('js.components.AVCollapser.expand_text')
            "
          />
        </div>
        <span
          v-if="subOptionSelected && !isOpen"
          class="badge"
          :class="{
            'bg-theme-danger': invalid,
            'bg-dark': !invalid,
          }"
          data-test="option-child-selected"
        >
          {{ t("js.components.AVCollapser.sub_options_select", { n: subOptionSelected }) }}
        </span>
      </button>
    </Teleport>
  </template>
  <template v-else>
    <slot name="toggle" :is-open="true" :collapsable="false" />
    <slot name="results" />
    <slot name="pane" :is-open="true" :toggle-collapse="toggleAccordion" />
  </template>
</template>

<style scoped lang="scss" src="./AVCollapser.scss" />
