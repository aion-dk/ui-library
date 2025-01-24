<script setup lang="ts">
import { ref, computed, onMounted } from "vue";

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
    default: "option_reference_children",
  },
});

const emit = defineEmits<{
  (event: "accordionOpen"): void;
}>();

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
});

const toggleAccordion = (force: boolean | null = null, animate = true) => {
  if (!props.collapsable) return;

  animateAccordion.value = animate;
  if (force === null) isOpen.value = !isOpen.value;
  else isOpen.value = !!force;
  if (isOpen.value) emit("accordionOpen");
};
</script>

<template>
  <template v-if="collapsable">
    <div
      role="button"
      :aria-controls="paneId"
      tabindex="0"
      :aria-expanded="isOpen"
      class="AVCollapser"
      @click="toggleAccordion()"
      @keypress.space.enter.prevent="toggleAccordion()"
      data-test="collapser-button"
    >
      <slot name="toggle" :is-open="isOpen" :collapsable="collapsable" />
    </div>
    <slot name="results" />
    <AVAnimatedTransition :skip-transition="!animateAccordion">
      <div v-show="isOpen" :id="paneId" :aria-hidden="!isOpen">
        <slot name="pane" :is-open="isOpen" :toggle-collapse="toggleAccordion" />
      </div>
    </AVAnimatedTransition>
  </template>
  <template v-else>
    <slot name="toggle" :is-open="true" :collapsable="false" />
    <slot name="results" />
    <slot name="pane" :is-open="true" :toggle-collapse="toggleAccordion" />
  </template>
</template>

<style scoped src="./AVCollapser.css" />
