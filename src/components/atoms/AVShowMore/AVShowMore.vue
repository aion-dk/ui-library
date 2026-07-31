<script setup lang="ts">
import type { PropType, SupportedLocale } from "@/types";
import { ref, computed } from "vue";
import { useLocalization } from "@/composables/useLocalization";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  contentHeight: {
    type: Number,
    required: true,
  },
  customHeightInPx: {
    type: Number,
    default: 350,
  },
  displayFullContent: {
    type: Boolean,
    default: false,
  },
  locale: {
    type: String as PropType<SupportedLocale>,
    default: null,
  },
});

const isOpened = ref<boolean>(false);

const displayAll = computed(
  () => props.displayFullContent || props.contentHeight < props.customHeightInPx,
);

const { t } = useLocalization(() => props.locale);
</script>

<template>
  <div
    class="AVShowMore--content overflow-hidden position-relative"
    :style="
      isOpened || displayAll ? `height: ${contentHeight}px;` : `height: ${customHeightInPx}px;`
    "
    :id="id"
  >
    <slot name="content" />
    <div
      v-if="!displayAll"
      class="AVShowMore--overlay position-absolute bottom-0"
      :class="isOpened ? 'AVShowMore--overlay-opened' : 'AVShowMore--overlay-closed'"
    ></div>
  </div>
  <button
    v-if="!displayAll"
    class="w-100 bg-white border-0 p-3 small text-decoration-underline"
    :aria-expanded="displayFullContent || isOpened"
    :aria-controls="id"
    @click="isOpened = !isOpened"
  >
    {{
      isOpened ? t("js.components.AVShowMore.show_less") : t("js.components.AVShowMore.show_more")
    }}
  </button>
</template>

<style scoped lang="scss" src="./AVShowMore.scss" />
