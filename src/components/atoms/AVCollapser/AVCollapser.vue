<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import type { PropType, SupportedLocale } from "@/types";
import { useLocalization } from "@/composables/useLocalization";

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

onMounted(() => {
  if (props.collapsable) isOpen.value = !props.startCollapsed;
  nextTick(() => (isMounted.value = true));
});

const toggleAccordion = (force: boolean | null = null, animate = true): void => {
  if (!props.collapsable) return;

  animateAccordion.value = animate;
  if (force === null) isOpen.value = !isOpen.value;
  else isOpen.value = !!force;
  if (isOpen.value) emit("accordionOpen");
};

const triggerAccordion = (): void => {
  if (props.useDeferredButton) return;

  toggleAccordion();
};

const onKeydown = (event: KeyboardEvent): void => {
  if (props.useDeferredButton) return;
  if (event.key === "Enter" || event.key === " " || event.key === "Spacebar") {
    event.preventDefault();
    toggleAccordion();
  }
};

const { t } = useLocalization(() => props.locale);
</script>

<template>
  <template v-if="collapsable">
    <!--
      When `useDeferredButton` is true the real toggle button is Teleported
      outside the toggle slot (to `#${paneId}_btn`), and the wrapper below only
      hosts the option's visual content. Keeping `role="button"`/`tabindex` here
      would mark a non-button container as interactive while it holds other
      focusable controls (checkboxes, links, textarea) — axe `nested-interactive`.
      So we strip the interactive semantics in that branch; the handlers are
      no-ops there anyway (triggerAccordion/onKeydown early-return).
    -->
    <div
      :role="useDeferredButton ? undefined : 'button'"
      :tabindex="useDeferredButton ? undefined : 0"
      :aria-controls="useDeferredButton ? undefined : paneId"
      :aria-expanded="useDeferredButton ? undefined : isOpen"
      class="w-100 border-0"
      style="background: transparent; box-shadow: none; padding: 0"
      :class="{
        AVCollapser: !useDeferredButton,
      }"
      data-test="collapser-button"
      @click="triggerAccordion()"
      @keydown="onKeydown"
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
