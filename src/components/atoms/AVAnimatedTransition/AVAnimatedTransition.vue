<script setup lang="ts">
const props = defineProps({
  skipTransition: {
    type: Boolean,
    default: false,
  },
});

const enter = (element: Element): void => {
  if (props.skipTransition) return;
  (element as HTMLDivElement).style.height = "auto";

  const height = getComputedStyle(element).height;
  (element as HTMLDivElement).style.height = "0";

  // Force redraw to make sure the animation is triggered correctly.
  // oxlint-disable-next-line @typescript-eslint/no-unused-expressions
  getComputedStyle(element).height;

  // Timeout makes sure the browser has redrawn before we trigger animation
  setTimeout(() => {
    (element as HTMLDivElement).style.height = height;
  });
};

const afterEnter = (element: Element): void => {
  (element as HTMLDivElement).style.height = "auto";
};

const leave = (element: Element): void => {
  if (props.skipTransition) return;
  const height = getComputedStyle(element).height;
  (element as HTMLDivElement).style.height = height;

  // Force redraw to make sure the animation is triggered correctly.
  // oxlint-disable-next-line @typescript-eslint/no-unused-expressions
  getComputedStyle(element).height;

  // Timeout makes sure the browser has redrawn before we trigger animation
  setTimeout(() => {
    (element as HTMLDivElement).style.height = "0";
  });
};
</script>

<template>
  <transition name="transition-fade" @enter="enter" @leave="leave" @after-enter="afterEnter">
    <slot></slot>
  </transition>
</template>

<style scoped lang="scss" src="./AVAnimatedTransition.scss" />
