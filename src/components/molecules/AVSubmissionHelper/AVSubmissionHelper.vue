<script setup lang="ts">
import { computed, inject, onMounted, watch } from "vue";
import { switchLocale } from "@/i18n";
import type { PropType, SupportedLocale, Error } from "@/types";

const props = defineProps({
  minMarks: {
    type: Number,
    required: true,
  },
  maxMarks: {
    type: Number,
    required: true,
  },
  errors: {
    type: Array as PropType<Error[]>,
    required: true,
  },
  chosenCount: {
    type: Number,
    required: true,
  },
  showScrollToBottom: {
    type: Boolean,
    default: false,
  },
  hasExclusiveOptions: {
    type: Boolean,
    default: false,
  },
  weight: {
    type: Number as PropType<number | null>,
    default: null,
  },
  locale: {
    type: String as PropType<SupportedLocale>,
    default: null,
  },
});

const emits = defineEmits(["scrollToBottom"]);

const errorMessages = computed(() => {
  // Hint to i18n-tasks that these translations should be present:
  // t("submission_helper.errors.too_many")
  // t("submission_helper.errors.blank")
  // t("submission_helper.errors.cross_party_voting")
  // t("submission_helper.errors.write_in_required")
  // t("submission_helper.errors.write_in_too_long")
  // t("submission_helper.errors.exclusive")
  // t("submission_helper.errors.exceeded_list_limit")
  return props.errors.map((e) => {
    if (e.keys) {
      Object.keys(e.keys).forEach((key) => {
        if (typeof e.keys[key] === "object") {
          e.keys[key] = e.keys[key][i18nLocale.value];
        }
      });

      return t(`js.components.AVSubmissionHelper.errors.${e.message}`, e.keys);
    } else {
      return t(`js.components.AVSubmissionHelper.errors.${e.message}`);
    }
  });
});

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
  <div class="sticky-bottom">
    <button
      v-if="showScrollToBottom"
      class="btn btn-light rounded-0 w-100 border AVSubmissionHelper--btn-override"
      @click="emits('scrollToBottom')"
    >
      <AVIcon icon="chevron-down" />
      Go to bottom
      <!-- {{ t("js.components.AVSubmissionHelper.go_to_bottom") }} -->
    </button>
    <div
      class="p-3"
      :class="{
        'bg-dark': !errors.length,
        'text-white': !errors.length,
        'bg-theme-danger': errors.length > 0,
      }"
      data-test="submission-helper"
    >
      <!-- WEIGHT -->
      <div
        v-if="weight"
        class="AVSubmissionHelper--weight"
        :class="{
          'text-white': !errors.length,
        }"
        data-test="submission-helper-weight"
      >
        {{ t("js.components.AVSubmissionHelper.your_vote_weight", { weight }) }}
      </div>

      <!-- ERRORS -->
      <div v-if="errors.length > 0">
        <div
          v-for="errorMessage in errorMessages"
          :key="errorMessage"
          role="alert"
          v-text="errorMessage"
          data-test="submission-helper-error"
        ></div>
        <hr class="my-3" />
      </div>

      <div v-if="maxMarks > 1">
        <div class="d-block justify-content-between align-items-center">
          <div v-if="minMarks === maxMarks">
            {{
              `${t("js.components.AVSubmissionHelper.select_exactly", {
                min_marks: minMarks,
              })}`
            }}
          </div>
          <div v-else>
            {{
              `${
                hasExclusiveOptions
                  ? t("js.components.AVSubmissionHelper.select_multiple_with_exclusives", {
                      min_marks: minMarks,
                      max_marks: maxMarks,
                    })
                  : t("js.components.AVSubmissionHelper.select_multiple", {
                      min_marks: minMarks,
                      max_marks: maxMarks,
                    })
              }`
            }}
          </div>
          <div
            v-if="chosenCount > 0"
            v-html="
              t('js.components.AVSubmissionHelper.selected', {
                selected: chosenCount,
              })
            "
            class="mt-2 mt-sm-0"
            data-test="submission-helper-count"
          ></div>
        </div>
      </div>

      <div v-else>
        <div>{{ t("js.components.AVSubmissionHelper.select_single") }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss" src="./AVSubmissionHelper.scss" />
