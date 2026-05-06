<script setup lang="ts">
import { ref, computed, inject, onMounted, watch } from "vue";
import { switchLocale } from "@/i18n";
import { flattenOptions } from "@/helpers/contestHelpers";
import { getMeaningfulLabel } from "@/helpers/meaningfulLabel";
import type {
  PropType,
  SupportedLocale,
  ContestContent,
  SelectionPile,
  CheckedEventArgs,
  PartialResults,
  Error,
  ImageOption,
  IterableObject,
  AVBallotGalleryOption,
  VoiceCredits,
  OptionContent,
} from "@/types";
import SelectionPileValidator from "@assemblyvoting/js-client/dist/lib/validators/selectionPileValidator";
import BelgiumBallotValidator from "@assemblyvoting/js-client/dist/lib/validators/belgiumBallotValidator";

const props = defineProps({
  contest: {
    type: Object as PropType<ContestContent>,
    required: true,
  },
  selectionPile: {
    type: Object as PropType<SelectionPile>,
    required: true,
  },
  locale: {
    type: String as PropType<SupportedLocale>,
    default: null,
  },
  showSubmissionHelper: {
    type: Boolean,
    default: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  observerMode: {
    type: Boolean,
    default: false,
  },
  partialResults: {
    type: Object as PropType<PartialResults>,
    default: null,
  },
  includeLazyErrors: {
    type: Boolean,
    default: false,
  },
  imageOption: {
    type: String as PropType<ImageOption>,
    default: "square",
  },
  reverseOption: {
    type: Boolean,
    default: false,
  },
  selectionStyle: {
    type: String as PropType<"checkbox" | "background">,
    default: "checkbox",
  },
  displayErrorModal: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(["update:selectionPile", "update:errors", "view-candidate"]);

const search = ref<HTMLInputElement | null>(null);

const selections = computed(() => [...props.selectionPile.optionSelections]);

const validator = computed(() => new SelectionPileValidator(props.contest));

const customValidators = computed(() => {
  const validators = [];
  if (props.contest.customRulesets?.includes("belgian_ballot_rules")) {
    validators.push(new BelgiumBallotValidator(props.contest));
  }
  return validators;
});

const errors = computed(() => {
  const customErrors: Error[] = [];

  customValidators.value.forEach((defaultValidator) => {
    customErrors.push(...defaultValidator.validate(props.selectionPile));
  });

  const combinedErrors = [
    ...validator.value.validate(props.selectionPile, props.includeLazyErrors),
    ...customErrors,
  ];

  if (isBelgianBallot.value && combinedErrors.some((err) => err.message === "cross_party_voting")) {
    let errorIndex;
    if (combinedErrors.some((err) => err.message === "exclusive")) {
      errorIndex = combinedErrors.findIndex((err) => err.message === "exclusive");
      combinedErrors.splice(errorIndex, 1);
    }
    if (combinedErrors.some((err) => err.message === "blank")) {
      errorIndex = combinedErrors.findIndex((err) => err.message === "cross_party_voting");
      combinedErrors.splice(errorIndex, 1);
    }
  }

  emits("update:errors", combinedErrors);
  return combinedErrors;
});

const isValid = computed(() => errors.value.length === 0);

const question = computed(() => props.contest.question?.[i18nLocale.value]);

const isBelgianBallot = computed(() =>
  props.contest.customRulesets?.includes("belgian_ballot_rules"),
);

const contestHasExclusiveOptions = computed(() => {
  return flattenOptions(props.contest.options).some((option) => option.exclusive);
});

const reactiveContest = computed(() => props.contest);

const totalVoiceCredits = computed(
  () => props.contest.markingType.quadraticVotingVoiceCredits || 0,
);

const voiceCredits = computed<VoiceCredits>(() => {
  const counts = new Map<string, number>();
  let usedCredits: number = 0;

  for (const selection of selections.value) {
    counts.set(selection.reference, (counts.get(selection.reference) ?? 0) + 1);
  }

  const credits = new Map<string, number>();
  for (const [reference, count] of counts.entries()) {
    let optionCredits = 0;
    optionCredits += count * count;
    credits.set(reference, optionCredits);
    usedCredits += optionCredits;
  }

  return {
    credits,
    total: totalVoiceCredits.value,
    remaining: totalVoiceCredits.value - usedCredits,
  };
});

watch(reactiveContest, (present, previous) => {
  if (previous && present && present.reference !== previous.reference) {
    document.getElementById("content")?.focus();
    if (previous.searchForm) (search.value as HTMLInputElement).value = "";
  }
});

const toggleBlank = (): void => {
  emits("update:selectionPile", {
    ...props.selectionPile,
    explicitBlank: !props.selectionPile.explicitBlank,
  });
};

const toggleOption = ({ reference, amount, text, onlyUpdate }: CheckedEventArgs): void => {
  const currentAmount = selections.value.filter(
    (selection) => selection.reference === reference,
  ).length;

  const selectionIndex = selections.value.findIndex(
    (selection) => selection.reference === reference,
  );
  const newSelection = { reference, text };

  let finalAmount = amount;
  if (amount === currentAmount && !onlyUpdate) finalAmount = amount - 1;

  let newSelections = selections.value.filter((selection) => {
    if (selection.reference !== reference) return { ...selection };
  });

  for (let i = 0; i < finalAmount; i += 1) {
    newSelections.push(newSelection);
  }

  if (onlyUpdate && selectionIndex >= 0) {
    const selectionWithUpdatedText = [...selections.value];
    selectionWithUpdatedText[selectionIndex] = newSelection;
    newSelections = selectionWithUpdatedText;
  }

  emits("update:selectionPile", {
    ...props.selectionPile,
    optionSelections: newSelections,
  });
};

const viewCandidate = (contestReference: string, optionReference: string): void =>
  emits("view-candidate", contestReference, optionReference);

const galleryOptions = computed(() => {
  const options: AVBallotGalleryOption[] = [];

  props.contest.options.forEach((parent) => {
    if (parent.selectable) options.push({ ...parent, isChildren: false });

    parent.children?.forEach((children: OptionContent) =>
      options.push({
        ...children,
        isChildren: true,
        parentTitle: getMeaningfulLabel(
          parent as unknown as IterableObject,
          i18nLocale.value,
          t("js.components.AVOption.aria_labels.option"),
        ),
        parentColor: parent.accentColor,
      }),
    );
  });

  return options;
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
const i18nLocale = computed<SupportedLocale>(() => i18n.global.locale.value || i18n.global.locale);
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
    class="AVBallot"
    :class="{
      'AVBallot--error': !isValid,
    }"
    :aria-label="t('js.components.AVBallot.aria_labels.ballot')"
    data-test="ballot"
  >
    <h5
      v-if="question"
      :id="`ballot_${contest.reference}_question`"
      class="mt-4"
      aria-live="polite"
      data-test="ballot-question"
    >
      {{ question }}
    </h5>
    <AVSearchBallot
      v-if="contest.searchForm && !disabled && !observerMode"
      ref="search"
      :options="flattenOptions(contest.options)"
      :options-container-id="'ballot_options'"
    />

    <hr class="my-3" />

    <div v-if="contest.mode === 'gallery'" class="AVBallot--gallery-grid">
      <div v-for="option in galleryOptions" :key="option.reference">
        <AVOption
          :selections="selections"
          :option="option"
          :invalid="!isValid"
          :exclusive-error="
            !isBelgianBallot &&
            option.exclusive &&
            errors.some((err) => err.message.includes('exclusive'))
          "
          :contest="contest"
          :disabled="disabled"
          :observerMode="observerMode"
          :partial-results="partialResults"
          :image-option="imageOption"
          :parentTitle="option.parentTitle"
          :parentColor="option.parentColor"
          @checked="toggleOption"
          @view-candidate="viewCandidate"
          :reverse-option="reverseOption"
          :selection-style="selectionStyle"
        />
      </div>

      <AVBlankOption
        v-if="contest.markingType.blankSubmission === 'active_choice'"
        :checked="selectionPile.explicitBlank"
        :error="!isBelgianBallot && errors.some((err) => err.message.includes('blank'))"
        :disabled="disabled"
        :invalid="!isValid"
        :observer-mode="observerMode"
        :accent-color="contest.blankOptionColor"
        :partial-results="partialResults ? partialResults['blank'] : null"
        gallery-mode
        @toggle-blank="toggleBlank"
      />
    </div>

    <div
      v-else
      id="ballot_options"
      class="vstack gap-2"
      :aria-label="t('js.components.AVBallot.aria_labels.ballot_options')"
    >
      <template v-for="option in contest.options" :key="option.reference">
        <AVOption
          :selections="selections"
          :option="option"
          :invalid="!isValid"
          :exclusive-error="
            !isBelgianBallot &&
            option.exclusive &&
            errors.some((err) => err.message.includes('exclusive'))
          "
          :contest="contest"
          :disabled="disabled"
          :observerMode="observerMode"
          :partial-results="partialResults"
          :image-option="imageOption"
          :voice-credits="voiceCredits"
          @checked="toggleOption"
          @view-candidate="viewCandidate"
          :reverse-option="reverseOption"
          :selection-style="selectionStyle"
        />
      </template>
      <AVBlankOption
        v-if="contest.markingType.blankSubmission === 'active_choice'"
        :checked="selectionPile.explicitBlank"
        :error="!isBelgianBallot && errors.some((err) => err.message.includes('blank'))"
        :disabled="disabled"
        :invalid="!isValid"
        :observer-mode="observerMode"
        :accent-color="contest.blankOptionColor"
        :partial-results="partialResults ? partialResults['blank'] : null"
        :reverse-option="reverseOption"
        :selection-style="selectionStyle"
        @toggle-blank="toggleBlank"
      />
    </div>

    <AVSubmissionHelper
      v-if="showSubmissionHelper && !disabled && !observerMode"
      :chosen-count="selections.length"
      :errors="errors"
      :min-marks="contest.markingType.minMarks"
      :max-marks="contest.markingType.maxMarks"
      :has-exclusive-options="contestHasExclusiveOptions"
      :display-scroll-to-bottom="contest.displayScrollToBottomBtn"
      :voice-credits="contest.markingType.quadraticVoting ? voiceCredits : null"
      class="mt-3"
      data-test="ballot-submission-helper"
      :display-error-modal="displayErrorModal"
    />
  </div>
</template>

<style scoped lang="scss" src="./AVBallot.scss" />
