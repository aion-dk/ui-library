<script lang="ts" setup>
import { watch, ref, computed, inject, onMounted, onUnmounted } from "vue";
import { switchLocale } from "@/i18n";
import type {
  PropType,
  SupportedLocale,
  AVSummaryOptionObject,
  AVSummaryOptionParent,
  ImageOption,
  IterableObject,
} from "@/types";
import { getMeaningfulLabel } from "@/helpers/meaningfulLabel";

const props = defineProps({
  option: {
    type: Object as PropType<AVSummaryOptionObject>,
    default: null,
  },
  multipleVotesAllowed: {
    type: Boolean,
    default: false,
  },
  locale: {
    type: String as PropType<SupportedLocale>,
    default: null,
  },
  blank: {
    type: Boolean,
    default: false,
  },
  galleryMode: {
    type: Boolean,
    default: false,
  },
  parents: {
    type: Array as PropType<Array<AVSummaryOptionParent>>,
    default: () => [],
  },
  imageOption: {
    type: String as PropType<ImageOption>,
    default: "square",
  },
});

const isRtl = ref<boolean>(false);

const mutationObserver = ref<MutationObserver | null>(null);

const mutationObserverTarget = document.getElementsByTagName("html")[0];

const useFooter = computed(
  () =>
    props.option?.crosses &&
    props.option?.crosses > 1 &&
    props.multipleVotesAllowed &&
    !props.blank,
);

const ancestryTitles = computed(() => {
  if (props.parents.length < 1) return null;

  return props.parents
    .map((opt: AVSummaryOptionParent) => {
      return opt.title[i18nLocale.value];
    })
    .reverse();
});

const displayTitle = computed(() => {
  if (props.blank) {
    return t("js.components.AVSummaryOption.blank");
  } else {
    return getMeaningfulLabel(
      props.option as unknown as IterableObject,
      i18nLocale.value,
      t("js.components.AVOption.aria_labels.option"),
    );
  }
});

const optionGroups = computed(() => {
  const options = Array.from(Array(props.option?.crosses).keys());
  options.forEach((index) => (options[index] = index + 1));
  const half = options.indexOf(Math.ceil(props.option?.crosses / 2)) + 1;
  const group1 = options.slice(0, half);
  const group2 = options.slice(half);
  if (group2.length) return [group1, group2];
  else return [group1];
});

const imageUrl = computed(() =>
  props.option?.image?.includes("square") // backward compatibility for old boards which had the variant as part of the imageurl
    ? props.option?.image
    : `${props.option?.image}/${props.imageOption}`,
);

const bsBorderColor = computed(() =>
  getComputedStyle(document.documentElement).getPropertyValue("--bs-border-color"),
);

const coloredEdgeStyle = computed(() => {
  if (
    props.option?.accentColor ||
    (props.galleryMode && (props.parents[0]?.accentColor || ancestryTitles.value?.length))
  ) {
    const color = props.option.accentColor || props.parents[0]?.accentColor || bsBorderColor.value;
    return `
      border-${isRtl.value ? "right" : "left"}-color: ${color};
      border-${isRtl.value ? "right" : "left"}-width: 0.5rem;
    `;
  } else return "";
});

onMounted(() => {
  if (props.locale) switchLocale(props.locale); // DO NOT REMOVE (If in doubt, read the next block comment)

  mutationObserver.value = new MutationObserver(() => {
    const dirAttr = mutationObserverTarget.attributes.getNamedItem("dir")?.value;
    isRtl.value = !!dirAttr && dirAttr === "rtl";
  });
  mutationObserver.value.observe(mutationObserverTarget, { attributes: true });
});

onUnmounted(() => mutationObserver.value && mutationObserver.value.disconnect());

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
const i18nLocale = computed(() => i18n.global.locale.value || i18n.global.locale);
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
    class="AVSummaryOption card rounded-0 position-relative"
    :style="coloredEdgeStyle"
    :aria-label="t('js.components.AVSummaryOption.aria_label.option')"
    data-test="summary-option"
  >
    <!-- ANCESTRY (NORMAL) -->
    <div v-if="ancestryTitles && !galleryMode" class="AVSummaryOption--ancestry card-header small">
      <div aria-label="breadcrumb">
        <ol class="breadcrumb mb-0" data-test="summary-option-ancestry">
          <li
            v-for="(title, index) in ancestryTitles"
            :key="title + index"
            class="breadcrumb-item"
            data-test="breadcrumb-item"
          >
            {{ title }}
          </li>
        </ol>
      </div>
    </div>

    <!-- ANCESTRY (GALLERY) -->
    <div v-if="ancestryTitles && galleryMode" class="vstack p-0" style="max-height: fit-content">
      <div
        class="ps-3 pe-2 py-1 small rounded-0 text-wrap text-start w-100 bg-light"
        data-test="parent-bagde"
      >
        {{ ancestryTitles[0] }}
      </div>
    </div>

    <!-- OPTION -->
    <div
      class="card-body hstack gap-2"
      :class="{ 'p-4': useFooter, 'justify-content-between': !galleryMode }"
    >
      <div :class="{ vstack: galleryMode }" style="max-width: calc(100%-70px)">
        <div class="w-100" :class="{ hstack: !galleryMode }">
          <img
            v-if="option?.image"
            :src="imageUrl"
            class="AVSummaryOption--img me-2 me-sm-3"
            :class="{
              'mb-3': galleryMode,
            }"
            :alt="t('js.components.AVSummaryOption.aria_label.option_image')"
            data-test="summary-option-image"
          />
          <div class="hstack" style="min-height: 30px">
            <h5 class="AVSummaryOption--title m-0">
              {{ displayTitle }}
            </h5>
          </div>
        </div>
      </div>
      <div v-if="!useFooter" class="align-self-start">
        <AVOptionCheckbox
          :checked="true"
          :rank="option?.rank"
          :disabled="true"
          data-test="summary-cross"
        />
      </div>
    </div>

    <!-- IF MULTIVOTE -->
    <div
      v-if="useFooter"
      class="card-footer bg-light d-flex gap-2 justify-content-end py-3 flex-wrap"
    >
      <div
        v-for="groupIndex in optionGroups"
        :key="groupIndex.toString()"
        class="hstack gap-2 flex-nowrap"
      >
        <AVOptionCheckbox
          v-for="optionIndex in groupIndex"
          :key="optionIndex"
          :checked="true"
          :rank="option?.rank"
          :disabled="true"
          data-test="summary-cross"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss" src="./AVSummaryOption.scss" />
