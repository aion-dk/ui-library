<template>
  <span :id="countId" v-text="tweenedCount.toFixed(decimals)" />
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import { animate } from "motion";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    default: 0,
  },
  duration: {
    type: Number,
    default: 1,
  },
  decimals: {
    type: Number,
    default: 0,
  },
});

const tweenedCount = ref<number>(0);

const countId = computed(() => `${props.id}_count`);

const animateCount = (initialValue: number, finalValue: number) => {
  animate(initialValue, finalValue, {
    onUpdate: (latest) => (tweenedCount.value = latest),
    duration: props.duration,
  });
};

onMounted(() => animateCount(0, props.count));

watch(
  () => props.count,
  (newCount, oldCount) => animateCount(oldCount, newCount),
);
</script>
