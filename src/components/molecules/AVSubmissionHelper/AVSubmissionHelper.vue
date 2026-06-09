<script setup lang="ts">
import { computed, inject, onMounted, watch } from "vue";
import { switchLocale } from "@/i18n";
import type { PropType, SupportedLocale, Error, VoiceCredits, ValidationResult } from "@/types";

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
  displayScrollToBottom: {
    type: Boolean,
    default: false,
  },
  hasExclusiveOptions: {
    type: Boolean,
    default: false,
  },
  voiceCredits: {
    type: Object as PropType<VoiceCredits>,
    default: null,
  },
  locale: {
    type: String as PropType<SupportedLocale>,
    default: null,
  },
  policyInlineResults: {
    type: Array as PropType<ValidationResult[]>,
    default: () => [],
  },
  displayErrorModal: {
    type: Boolean,
    default: false,
  },
});

const errorMessages = computed(() => {
  return props.errors.map((e) => {
    if (e.keys) {
      for (const key of Object.keys(e.keys)) {
        if (typeof e.keys[key] === "object") {
          e.keys[key] = e.keys[key][i18nLocale.value];
        }
      }

      return t(`js.components.AVSubmissionHelper.errors.${e.message}`, e.keys);
    } else {
      return t(`js.components.AVSubmissionHelper.errors.${e.message}`);
    }
  });
});

const scrollToBottom = (): void =>
  document
    .querySelector("#ballot-action-buttons")
    ?.scrollIntoView({ behavior: "smooth", block: "start" });

/**
 * This is necessary in order to support both provided i18n and local i18n.
 * The used locale will be taken from the provided i18n as long as there is one
 * (this happens when we plug-in the library into a product, as electa or evs),
 * otherwise, it will take the locale from the local i18n instance.
 * Removing it, will cause all tests, storybook and the playground to break.
 */
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
const i18n: any = inject("i18n");
const { t } = i18n.global;
const i18nLocale = computed<SupportedLocale>(() => i18n.global.locale.value || i18n.global.locale);
onMounted(() => {
  switchLocale(props.locale || i18nLocale.value);
});
watch(
  () => props.locale,
  () => {
    if (props.locale) switchLocale(props.locale);
  },
  { deep: true },
);
watch(i18nLocale, (newLocale) => {
  if (!props.locale) switchLocale(newLocale);
});
/* END */
</script>

<template>
  <div>
    <div class="mt-2 sticky-bottom">
      <button
        v-if="displayScrollToBottom"
        type="button"
        class="btn bg-gray-300 rounded-0 border-0 w-100"
        data-test="scroll-bottom"
        @click="scrollToBottom"
      >
        <AVIcon icon="chevron-down" />
        {{ t("js.components.AVSubmissionHelper.go_to_bottom") }}
      </button>
      <div
        class="p-3"
        :class="{
          'bg-gray-700':
            (!errors.length && !policyInlineResults.some((r) => r.blocked)) || chosenCount === 0,
          'text-white':
            (!errors.length && !policyInlineResults.some((r) => r.blocked)) || chosenCount === 0,
          'bg-theme-danger':
            (errors.length > 0 || policyInlineResults.some((r) => r.blocked)) && chosenCount > 0,
        }"
        data-test="submission-helper"
      >
        <!-- QUADRATIC VOTING DATA -->
        <div
          v-if="voiceCredits"
          class="AVSubmissionHelper--quadratic"
          :class="{
            'text-white': !errors.length,
          }"
          data-test="submission-helper-quadratic"
        >
          <span>{{ t("js.components.AVSubmissionHelper.remaining_credits") }}</span>
          <strong>{{ voiceCredits.remaining }}</strong>
          <span>/</span>
          <strong>{{ voiceCredits.total }}</strong>
        </div>

        <!-- ERRORS -->
        <div>
          <div
            v-for="errorMessage in errorMessages"
            :key="errorMessage"
            role="alert"
            v-text="errorMessage"
            data-test="submission-helper-error"
          ></div>
        </div>
        <div v-if="policyInlineResults.length > 0 && chosenCount > 0">
          <div
            v-for="result in policyInlineResults"
            :key="result.scenario"
            role="alert"
            :class="{
              'text-white': result.warning || result.blocked,
            }"
            data-test="submission-helper-policy-feedback"
          >
            {{
              result.isRawMessage
                ? result.feedbackMessage
                : t(
                    `js.components.AVSubmissionHelper.${result.feedbackMessage}`,
                    result.feedbackParams,
                  )
            }}
          </div>
        </div>
        <hr v-if="errors.length > 0 || policyInlineResults.length > 0" class="my-3" />

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
  </div>
</template>

<style scoped lang="scss" src="./AVSubmissionHelper.scss" />
