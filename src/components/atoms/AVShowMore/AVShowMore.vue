<script setup lang="ts">
import type { PropType, SupportedLocale } from "@/types";
import { ref, computed, inject, onMounted, watch } from "vue";
import { switchLocale } from "@/i18n";

const slots = defineSlots<{
  content(): Array<{ el: HTMLElement }>;
}>();

const props = defineProps({
  id: {
    type: String,
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

const contentHeight = ref<number>(0);

const displayAll = computed(
  () => props.displayFullContent || contentHeight.value < props.customHeightInPx,
);

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
onMounted(() => {
  if (props.locale) switchLocale(props.locale);

  contentHeight.value = slots.content().reduce((sum, el) => sum + el.el.clientHeight, 0);
});
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
  <div
    role=""
    class="overflow-hidden position-relative"
    :style="isOpened || displayAll ? 'height: fit-content;' : `max-height: ${customHeightInPx}px;`"
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
    class="w-100 bg-white border-0 p-3"
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
