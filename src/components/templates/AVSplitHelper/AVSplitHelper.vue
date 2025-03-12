<script setup lang="ts">
import { ref, computed, inject, onMounted, watch } from "vue";
import { switchLocale } from "@/i18n";
import type {
  PropType,
  SupportedLocale,
  ContestContent,
  SelectionPile,
  ContestSelection,
  AVSplitHelperState,
  PartialResults,
  ImageOption,
} from "@/types";
import SelectionPileValidator from "@aion-dk/js-client/dist/lib/validators/selectionPileValidator";
import ContestSelectionValidator from "@aion-dk/js-client/dist/lib/validators/contestSelectionValidator";
import { getMeaningfulLabel } from "@/helpers/meaningfulLabel";

const props = defineProps({
  contest: {
    type: Object as PropType<ContestContent>,
    required: true,
  },
  contestSelection: {
    type: Object as PropType<ContestSelection>,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  showSubmissionHelper: {
    type: Boolean,
    default: true,
  },
  partialResults: {
    type: Object as PropType<PartialResults>,
    default: null,
  },
  locale: {
    type: String as PropType<SupportedLocale>,
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

const emits = defineEmits([
  "update:complete",
  "update:contestSelection",
  "update:activeState",
  "update:activePile",
  "view-candidate",
]);

const activeSelectionPileIndex = ref<number | null>(null);

const activePile = ref<SelectionPile>(
  props.contestSelection.piles[0] || {
    multiplier: props.weight,
    optionSelections: [],
    explicitBlank: false,
  },
);

const activeState = ref<AVSplitHelperState>(
  props.contestSelection.piles?.length === 0 || props.contest.markingType.maxPiles === 1
    ? "ballot"
    : "overview",
);

const contestErrors = ref<string[]>([]);

const selectionPiles = computed(() => props.contestSelection.piles);

const unusedWeight = computed(() =>
  selectionPiles.value?.reduce(
    (sum: number, bs: SelectionPile) => sum - bs.multiplier,
    props.weight,
  ),
);

const selectionPileValidator = computed(() => new SelectionPileValidator(props.contest));

const contestSelectionValidator = computed(
  () =>
    new ContestSelectionValidator({
      contest: props.contest,
      voterWeight: props.weight,
    }),
);

const readyForSubmission = computed(() => {
  return (
    unusedWeight.value === 0 &&
    contestErrors.value.length == 0 &&
    selectionPiles.value.every((pile: SelectionPile) =>
      selectionPileValidator.value.isComplete(pile),
    )
  );
});

const assignedWeight = computed(() =>
  selectionPiles.value?.reduce((sum: number, pile: SelectionPile) => sum + pile.multiplier, 0),
);

const activeWeight = computed(() => activePile.value?.multiplier);

const maxAssignable = computed(() =>
  selectionPiles.value
    .filter((_: SelectionPile, index: number) => index !== activeSelectionPileIndex.value)
    .reduce((sum: number, bs: SelectionPile) => sum - bs.multiplier, props.weight),
);

const userCanSplit = computed(() => props.contest.markingType.maxPiles !== 1 && props.weight > 1);

const isEditing = computed(() => activeSelectionPileIndex.value !== null);

const isComplete = (pile: SelectionPile) => {
  return selectionPileValidator.value.isComplete(pile);
};

const hasError = (pile: SelectionPile) => {
  return selectionPileValidator.value.validate(pile, props.includeLazyErrors).length > 0;
};

const persistActivePile = () => {
  if (userCanSplit.value) {
    const newPiles = [...selectionPiles.value];
    if (activeSelectionPileIndex.value === null) {
      newPiles.push({ ...activePile.value });
    } else {
      newPiles.splice(activeSelectionPileIndex.value, 1, {
        ...activePile.value,
      });
    }
    emits("update:contestSelection", {
      ...props.contestSelection,
      piles: newPiles,
    });
    activeSelectionPileIndex.value = null;
    activeState.value = "overview";
  } else {
    activePile.value.multiplier = props.weight;
    emits("update:contestSelection", {
      ...props.contestSelection,
      piles: [activePile.value],
    });
  }
};

const updateActivePile = (newPile: SelectionPile) => {
  activePile.value = newPile;
  if (!userCanSplit.value) {
    persistActivePile();
  }
};

const newSplit = () => {
  activePile.value = {
    optionSelections: [],
    multiplier: maxAssignable.value,
    explicitBlank: false,
  };
  activeSelectionPileIndex.value = null;
  activeState.value = "ballot";
};

const removeSplit = (splitIndex: number) => {
  selectionPiles.value.splice(splitIndex, 1);
};

const selectPile = (index: number) => {
  activePile.value = { ...selectionPiles.value[index] };
  activeSelectionPileIndex.value = index;
  activeState.value = "ballot";
};

const updateErrors = (errors: string[]) => {
  contestErrors.value = errors;
};

const viewCandidate = (reference: string) => emits("view-candidate", reference);

watch(readyForSubmission, (newValue) => emits("update:complete", newValue));

watch(activeWeight, () => {
  if (!activePile.value) return;
  activePile.value.multiplier = Math.max(0, Math.min(activeWeight.value, maxAssignable.value));
});

watch(activePile, (newPile) => {
  emits("update:activePile", newPile);
});

watch(activeState, (newState) => emits("update:activeState", newState));

onMounted(() => {
  if (props.locale) switchLocale(props.locale); // DO NOT REMOVE (If in doubt, read the next block comment)
  emits("update:activePile", activePile.value);
  emits("update:activeState", activeState.value);
  emits("update:complete", readyForSubmission.value);
  if (!userCanSplit.value) persistActivePile();
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
  <h3 class="h4 mt-0 mb-2" aria-live="polite" data-test="split-helper-contest-title">
    {{ getMeaningfulLabel("contest", contest, i18nLocale, t) }}
  </h3>
  <div data-test="split-helper-contest-description" v-html="contest.description?.[i18nLocale]" />
  <template v-if="userCanSplit">
    <AVSplitWizardHeader
      v-if="['ballot', 'assign', 'overview'].includes(activeState)"
      :active-selection-pile-index="activeSelectionPileIndex"
      :active-state="activeState"
      :selection-piles="selectionPiles"
      :total-weight="assignedWeight + unusedWeight"
      :is-editing="isEditing"
    />
    <transition name="transition-fade" mode="out-in">
      <div
        v-if="activePile && activeState === 'ballot'"
        :key="activeSelectionPileIndex || 'no_selection_pile_index'"
      >
        <AVBallot
          class="mb-3"
          :selection-pile="activePile"
          :partial-results="partialResults"
          :contest="contest"
          :weight="weight"
          :includeLazyErrors="includeLazyErrors"
          :show-submission-helper="showSubmissionHelper"
          :image-option="imageOption"
          @update:selection-pile="updateActivePile"
          @update:errors="(errors: string[]) => updateErrors(errors)"
        />

        <div class="mt-3 row">
          <div class="col-12 col-sm-6 order-2 order-sm-1 d-flex justify-content-sm-start">
            <button
              v-if="selectionPiles.length > 0"
              key="back"
              class="btn btn-lg btn-outline-dark AVSplitHelper--full-width-mobile"
              @click="activeState = 'overview'"
            >
              {{ t("js.components.AVSplitHelper.ballot.back_button") }}
            </button>
          </div>

          <div class="col-12 col-sm-6 order-2 order-sm-1 d-flex justify-content-sm-end">
            <button
              key="assign"
              class="btn btn-lg btn-dark AVSplitHelper--full-width-mobile"
              :disabled="!isComplete(activePile) || hasError(activePile)"
              data-test="split-helper-confirm"
              @click="activeState = 'assign'"
            >
              {{ t("js.components.AVSplitHelper.ballot.confirm_button") }}
            </button>
          </div>
        </div>
      </div>

      <div v-else-if="activeState === 'assign'">
        <div class="card bg-gray-300 p-3 mb-2 text-break">
          <h4 class="h5 mb-3 mt-1" data-test="split-helper-contest-question">
            {{ t("js.components.AVSplitHelper.assign.split_question") }}
          </h4>
          <AVPileSummary
            :selection-pile="activePile"
            :contest="contest"
            :maximum-options-shown="3"
            :pile-index="isEditing ? activeSelectionPileIndex : selectionPiles.length"
            :active-state="activeState"
            :is-editing="isEditing"
            :total-piles="contestSelection.piles.length"
            :image-option="imageOption"
            @edit-current-selection="activeState = 'ballot'"
          />
          <label
            :for="`${contest.reference}-ballot-selector`"
            class="form-label"
            data-test="split-helper-assign-label"
            >{{
              isEditing
                ? t("js.components.AVSplitHelper.assign.ballots_to_assign_edit_mode")
                : t("js.components.AVSplitHelper.assign.ballots_to_assign")
            }}</label
          >
          <input
            :id="`${contest.reference}-ballot-selector`"
            v-model="activePile.multiplier"
            class="AVSplitHelper--assign-input form-control py-3 px-4 w-100 text-dark rounded-0"
            type="number"
            :max="maxAssignable"
            data-test="split-helper-assign-input"
          />
        </div>
        <AVSplitWeightHelper
          :assigned-weight="assignedWeight"
          :unused-weight="unusedWeight"
          :active-assigned="
            activeSelectionPileIndex && selectionPiles[activeSelectionPileIndex]?.multiplier
          "
        />

        <div class="mt-3 row gap-3 gap-sm-0">
          <div class="col-12 col-sm-6 order-2 order-sm-1 d-flex justify-content-sm-start">
            <button
              key="ballot"
              class="btn btn-lg btn-outline-dark AVSplitHelper--full-width-mobile"
              data-test="split-helper-assign-back"
              @click="activeState = 'ballot'"
            >
              {{ t("js.components.AVSplitHelper.assign.back_button") }}
            </button>
          </div>

          <div class="col-12 col-sm-6 order-2 order-sm-1 d-flex justify-content-sm-end">
            <button
              key="confirm"
              class="btn btn-lg btn-dark AVSplitHelper--full-width-mobile"
              :disabled="activePile?.multiplier < 1 || activePile?.multiplier > maxAssignable"
              data-test="split-helper-assign-confirm"
              @click="persistActivePile()"
            >
              {{ t("js.components.AVSplitHelper.assign.confirm_button") }}
            </button>
          </div>
        </div>
      </div>

      <div v-else-if="activeState === 'overview'" data-test="split-helper-overview">
        <div
          v-if="unusedWeight === 0 && contestSelectionValidator.isComplete(contestSelection)"
          class="alert alert-success rounded-0 text-center"
        >
          <AVIcon icon="circle-check" />
          {{ t("js.components.AVSplitHelper.overview.all_ballots_assigned") }}
        </div>
        <div v-else class="vstack border bg-secondary text-center p-3 mb-3">
          <p class="h5 mb-3">
            <strong>{{ unusedWeight }}</strong>
            {{ t("js.components.AVSplitHelper.overview.ballots_left") }}
          </p>
          <button
            key="newSelection"
            class="AVSplitHelper--overview-new-ballot-btn btn bg-white border rounded-0 p-3"
            :disabled="unusedWeight === 0"
            data-test="split-helper-new-selection"
            @click="newSplit"
          >
            <AVIcon icon="file-circle-plus" />
            {{ t("js.components.AVSplitHelper.overview.new_ballot_selection") }}
          </button>
        </div>

        <article
          v-for="(pile, index) in selectionPiles"
          :key="`preview-${index}`"
          @click="selectPile(index)"
        >
          <AVPileSummary
            :selection-pile="pile"
            :contest="contest"
            :maximum-options-shown="3"
            :active-state="activeState"
            :pile-index="index"
            :total-piles="contestSelection.piles.length"
            :image-option="imageOption"
            @delete-selection="removeSplit(index)"
          />
        </article>
      </div>
    </transition>
  </template>
  <template v-else>
    <AVBallot
      :selection-pile="activePile"
      :partial-results="partialResults"
      :includeLazyErrors="includeLazyErrors"
      :contest="contest"
      :weight="weight"
      :image-option="imageOption"
      :show-submission-helper="showSubmissionHelper"
      @update:selection-pile="updateActivePile"
      @update:errors="(errors: string[]) => updateErrors(errors)"
      @view-candidate="viewCandidate"
    />
  </template>
</template>

<style scoped lang="scss" src="./AVSplitHelper.scss" />
