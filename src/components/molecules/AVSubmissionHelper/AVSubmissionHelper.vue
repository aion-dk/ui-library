<script setup lang="ts">
import { computed, inject, onMounted, watch, ref, nextTick } from "vue";
import { switchLocale } from "@/i18n";
import type { PropType, SupportedLocale, Error, VoiceCredits } from "@/types";

const showErrorModal = ref(false);
const dismissButtonRef = ref<HTMLElement | null>(null);

const dismissErrorModal = (): void => {
  showErrorModal.value = false;
};

watch(showErrorModal, async (val) => {
  if (val) {
    await nextTick();
    dismissButtonRef.value?.focus();
  }
});

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
  displayErrorModal: {
    type: Boolean,
    default: false,
  },
  validateOnChange: {
    type: Boolean,
    default: true,
  },
  triggerValidation: {
    type: Number,
    default: 0,
  },
});

const emits = defineEmits(["update:complete"]);

const errorMessages = computed(() => {
  // Hint to i18n-tasks that these translations should be present:
  // t("submission_helper.errors.too_many")
  // t("submission_helper.errors.blank")
  // t("submission_helper.errors.write_in_required")
  // t("submission_helper.errors.write_in_too_long")
  // t("submission_helper.errors.write_in_not_supported")
  // t("submission_helper.errors.write_in_empty")
  // t("submission_helper.errors.exceeded_list_limit")
  // t("submission_helper.errors.exclusive")
  // t("submission_helper.errors.cross_party_voting")
  // t("submission_helper.errors.too_many_credits")
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

const scrollToBottom = (): void =>
  document
    .querySelector("#ballot-action-buttons")
    ?.scrollIntoView({ behavior: "smooth", block: "start" });

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

watch(
  () => props.errors,
  (newErrors) => {
    if (newErrors.length > 0 && props.displayErrorModal) {
      showErrorModal.value = true;
    }
  },
  { deep: true, immediate: true },
);

watch(
  () => props.displayErrorModal,
  (newVal) => {
    if (newVal && props.errors.length > 0) {
      showErrorModal.value = true;
    }
  },
);

watch(
  () => props.triggerValidation,
  () => {
    // Trigger validation from parent (e.g., when continue button is clicked)
    // Emit completeness state based on current errors
    emits("update:complete", props.errors.length === 0);
  },
);

watch(
  () => props.errors,
  () => {
    if (props.validateOnChange) {
      // Real-time validation: emit completeness whenever errors change
      emits("update:complete", props.errors.length === 0);
    }
  },
  { deep: true },
);

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
          'bg-gray-700': !errors.length || displayErrorModal,
          'text-white': !errors.length || displayErrorModal,
          'bg-theme-danger': errors.length > 0 && !displayErrorModal,
        }"
        data-test="submission-helper"
      >
        <!-- QUADRATIC VOTING DATA -->
        <div
          v-if="voiceCredits"
          class="AVSubmissionHelper--quadratic"
          :class="{
            'text-white': !errors.length || displayErrorModal,
          }"
          data-test="submission-helper-quadratic"
        >
          <span>{{ t("js.components.AVSubmissionHelper.remaining_credits") }}</span>
          <strong>{{ voiceCredits.remaining }}</strong>
          <span>/</span>
          <strong>{{ voiceCredits.total }}</strong>
        </div>

        <!-- ERRORS (only shown inline when modal mode is off) -->
        <div v-if="!displayErrorModal">
          <div
            v-for="errorMessage in errorMessages"
            :key="errorMessage"
            role="alert"
            v-text="errorMessage"
            data-test="submission-helper-error"
          ></div>
        </div>
        <hr v-if="errors.length > 0 && !displayErrorModal" class="my-3" />

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

    <!-- ERROR MODAL -->
    <template v-if="displayErrorModal && showErrorModal && errors.length > 0">
      <div class="modal-backdrop fade show"></div>
      <div
        class="modal fade show d-block"
        tabindex="-1"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="error-modal-title"
        aria-describedby="error-modal-message"
        data-test="error-modal"
        @keydown.esc="dismissErrorModal"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-body text-center p-4">
              <div class="mb-3">
                <AVIcon icon="triangle-exclamation" class="text-warning fs-1" />
              </div>
              <h2 id="error-modal-title" class="visually-hidden">
                {{ t("js.components.AVSubmissionHelper.error_modal_title") }}
              </h2>
              <div id="error-modal-message" class="mb-4">
                <p v-for="(errorMessage, index) in errorMessages" :key="index" role="alert">
                  {{ errorMessage }}
                </p>
              </div>
              <button
                ref="dismissButtonRef"
                type="button"
                class="btn btn-primary"
                @click="dismissErrorModal"
                data-test="dismiss-error-modal"
              >
                {{ t("js.components.AVSubmissionHelper.error_modal_dismiss") }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss" src="./AVSubmissionHelper.scss" />
