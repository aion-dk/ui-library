<script setup lang="ts">
import { ref } from "vue";
const isOpen = ref(false);
</script>

<template>
  <main>
    <AVCollapser
      collapsable
      start-collapsed
      pane-id="recommendation-list"
      @accordion-open="isOpen = true"
    >
      <template #toggle>
        <div class="AVRecommendationList--header">
          HERE
        </div>
      </template>

      <template #pane>
        <div class="AVRecommendationList--content">
          <p>CONTENT</p>
        </div>
      </template>
    </AVCollapser>
  </main>
</template>

<style scoped>
</style>
