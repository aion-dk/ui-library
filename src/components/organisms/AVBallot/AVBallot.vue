<script setup lang="ts">
import { ref, computed, inject, onMounted, watch } from "vue";
import { switchLocale } from "@/i18n";
import { flattenOptions } from "@/helpers/contestHelpers";
import type {
  PropType,
  SupportedLocale,
  ContestContent,
  SelectionPile,
  CheckedEventArgs,
  PartialResults,
  Error,
  ImageOption,
} from "@/types";
import SelectionPileValidator from "@aion-dk/js-client/dist/lib/validators/selectionPileValidator";
import BelgiumBallotValidator from "@aion-dk/js-client/dist/lib/validators/belgiumBallotValidator";

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
  weight: {
    type: Number,
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
});

const emits = defineEmits(["update:selectionPile", "update:errors", "view-candidate"]);

// const writeInChecked = ref<boolean>(false);
// const writeInParty = ref<string>("");
// const writeInCandidate = ref<string>("");

const endOfBallot = ref<HTMLDivElement | null>(null);

const search = ref<HTMLInputElement | null>(null);

const selections = computed(() => props.selectionPile.optionSelections);

const validator = computed(() => new SelectionPileValidator(props.contest));

const displayedWeight = computed(() => (props.contest.disregardVoterWeight ? null : props.weight));

const customValidators = computed(() => {
  const validators = [];
  if (props.contest.customRulesets?.includes("belgian_ballot_rules")) {
    validators.push(new BelgiumBallotValidator(props.contest));
  }
  return validators;
});

const errors = computed(() => {
  const customErrors: Error[] = [];

  customValidators.value.forEach((validator) => {
    customErrors.push(...validator.validate(props.selectionPile));
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

watch(reactiveContest, (present, previous) => {
  if (previous && present && present.reference !== previous.reference) {
    document.getElementById("content")?.focus();
    if (previous.searchForm) (search.value as HTMLInputElement).value = "";
  }
});

const toggleBlank = () => {
  emits("update:selectionPile", {
    ...props.selectionPile,
    explicitBlank: !props.selectionPile.explicitBlank,
  });
};

const toggleOption = ({ reference, amount }: CheckedEventArgs) => {
  const currentAmount = selections.value.filter(
    (selection) => selection.reference === reference,
  ).length;
  if (amount === currentAmount) amount = amount - 1;
  const newSelections = selections.value.filter((selection) => selection.reference !== reference);
  for (let i = 0; i < amount; i++) {
    newSelections.push({ reference });
  }
  emits("update:selectionPile", {
    ...props.selectionPile,
    optionSelections: newSelections,
  });
};

const viewCandidate = (reference: string) => emits("view-candidate", reference);

const scrollToBottom = () =>
  endOfBallot.value?.scrollIntoView({ behavior: "smooth", block: "end" });

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

    <div
      id="ballot_options"
      class="vstack gap-2"
      :aria-label="t('js.components.AVBallot.aria_labels.ballot_options')"
    >
      <template v-for="option in contest.options" :key="option.reference">
        <AVOption
          v-if="!option.writeIn"
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
          @checked="toggleOption"
          @view-candidate="viewCandidate"
        />
        <!-- <AVWriteInOption
          v-else
          v-model:candidate-value="writeInCandidate"
          v-model:party-value="writeInParty"
          v-model:checked-value="writeInChecked"
          :parties="[] /* contest.parties // TODO: we need to figure out how this should work */"
          :disabled="disabled"
          :observerMode="observerMode"
        /> -->
      </template>
      <AVBlankOption
        v-if="contest.markingType.blankSubmission === 'active_choice'"
        :checked="selectionPile.explicitBlank"
        :error="!isBelgianBallot && errors.some((err) => err.message.includes('blank'))"
        :disabled="disabled"
        :invalid="!isValid"
        :observerMode="observerMode"
        :accentColor="contest.blankOptionColor"
        :partial-results="partialResults ? partialResults['blank'] : null"
        @toggle-blank="toggleBlank"
      />
    </div>

    <AVSubmissionHelper
      v-if="showSubmissionHelper && !disabled && !observerMode"
      :chosen-count="selections.length"
      :errors="errors"
      :weight="displayedWeight"
      :min-marks="contest.markingType.minMarks"
      :max-marks="contest.markingType.maxMarks"
      :has-exclusive-options="contestHasExclusiveOptions"
      :show-scroll-to-bottom="contest.displayScrollToBottomBtn"
      @scroll-to-bottom="scrollToBottom"
      class="mt-3"
      data-test="ballot-submission-helper"
    />
  </div>
  <div ref="endOfBallot" class="visually-hidden"></div>
</template>

<style scoped lang="scss" src="./AVBallot.scss" />
