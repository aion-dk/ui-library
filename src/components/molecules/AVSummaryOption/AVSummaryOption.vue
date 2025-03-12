<script lang="ts" setup>
import { computed, inject, onMounted, watch } from "vue";
import { switchLocale } from "@/i18n";
import type {
  PropType,
  SupportedLocale,
  AVSummaryOptionObject,
  AVSummaryOptionParent,
  ImageOption,
  OptionContent,
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
  parents: {
    type: Array as PropType<Array<AVSummaryOptionParent>>,
    default: () => [],
  },
  imageOption: {
    type: String as PropType<ImageOption>,
    default: "square",
  },
});

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
      "option",
      props.option as unknown as OptionContent,
      i18nLocale.value,
      t,
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
  props.option.image?.includes("square") // backward compatibility for old boards which had the variant as part of the imageurl
    ? props.option.image
    : `${props.option.image}/${props.imageOption}`,
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
const i18nLocale = computed(() => i18n.global.locale.value || i18n.global.locale);
onMounted(() => {
  if (props.locale) switchLocale(props.locale);
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
    class="AVSummaryOption card rounded-0 position-relative"
    :aria-label="t('js.components.AVSummaryOption.aria_label.option')"
    data-test="summary-option"
  >
    <!-- ANCESTRY -->
    <div v-if="ancestryTitles" class="AVSummaryOption--ancestry card-header small">
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

    <!-- OPTION -->
    <div class="card-body hstack gap-2" :class="{ 'p-4': useFooter }">
      <img
        v-if="option?.image"
        :src="imageUrl"
        class="AVSummaryOption--img me-2 me-sm-3"
        :alt="t('js.components.AVSummaryOption.aria_label.option_image')"
        data-test="summary-option-image"
      />
      <div class="AVSummaryOption--body pb-0 d-flex align-items-center">
        <div class="AVSummaryOption--title m-0">
          {{ displayTitle }}
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
      class="card-footer bg-secondary d-flex gap-2 justify-content-end py-3 flex-wrap"
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
