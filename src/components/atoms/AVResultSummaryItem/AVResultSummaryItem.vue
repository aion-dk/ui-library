<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true,
  },
  value: {
    type: [String, Number],
    required: true,
  },
  reference: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <p class="m-0 text-body-80" :data-test="reference">
    <strong> {{ title }}: </strong>
    {{ value }}
  </p>
</template>
