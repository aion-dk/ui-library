<script setup lang="ts">
import { ref, computed, inject, onMounted, watch } from "vue";
import { flattenOptions } from "@/helpers/contestHelpers";
import { switchLocale } from "@/i18n";
import type {
  PropType,
  SupportedLocale,
  SelectionPile,
  ContestContent,
  OptionContent,
  ImageOption,
  AVPileSummaryOptionSummary,
  AVPileSummaryState,
} from "@/types";

const emits = defineEmits(["editCurrentSelection", "deleteSelection"]);

const props = defineProps({
  selectionPile: {
    type: Object as PropType<SelectionPile>,
    required: true,
  },
  contest: {
    type: Object as PropType<ContestContent>,
    required: true,
  },
  maximumOptionsShown: {
    type: Number,
    default: null,
  },
  activeState: {
    type: String as PropType<AVPileSummaryState>,
    required: true,
  },
  pileIndex: {
    type: Number,
    default: null,
  },
  isEditing: {
    type: Boolean,
    default: false,
  },
  totalPiles: {
    type: Number,
    required: true,
  },
  locale: {
    type: String as PropType<SupportedLocale>,
    default: null,
  },
  imageOption: {
    type: String as PropType<ImageOption>,
    default: "square",
  },
});

const showAllOptions = ref(false);

const blankSelected = computed(() => {
  return props.selectionPile.optionSelections.length === 0;
});

const shownOptions = computed(() => {
  if (!props.maximumOptionsShown || showAllOptions.value) return optionSummaries.value.options;

  return optionSummaries.value.options.slice(0, props.maximumOptionsShown);
});

const remainingOptions = computed(() => {
  return optionSummaries.value.options.length - shownOptions.value.length;
});

const selectableOptions = computed(() => {
  const allOptions = flattenOptions(props.contest.options);
  const allSelectable = allOptions.filter((option) => option.selectable);
  return allSelectable;
});

const getAllParents = (option: OptionContent, parents: OptionContent[]): OptionContent[] => {
  if (option && option.parentContent) {
    parents.push(option.parentContent);
    return getAllParents(option.parentContent, parents);
  } else {
    return parents;
  }
};

const optionSummaries = computed(() => {
  const optionSummary: AVPileSummaryOptionSummary = {
    options: [],
    writeIns: [],
  };

  props.selectionPile.optionSelections.forEach((selection) => {
    if (selection.text) {
      optionSummary.writeIns.push({
        partyLetter: "?", // TODO: Figure out how this party stuff is supposed to work
        partyName: "?", // TODO: Figure out how this party stuff is supposed to work
        candidateName: selection.text,
      });
    } else {
      const preexisting = optionSummary.options.find((o) => o.handle === selection.reference);

      const optionContent = selectableOptions.value.find(
        (o) => o.reference === selection.reference,
      );

      if (!optionContent) return;

      if (preexisting) {
        preexisting.crosses += 1;
      } else {
        optionSummary.options.push({
          title: optionContent.title,
          handle: selection.reference,
          image: optionContent.image,
          crosses: 1,
          parent: optionContent.parentContent,
          rank:
            props.contest.markingType.voteVariation === "ranked"
              ? optionSummary.options.length + 1
              : undefined,
        });
      }
    }
  });

  return optionSummary;
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
  <div v-if="activeState === 'summary'" class="d-grid flex-grow-1">
    <header
      v-if="contest.markingType.maxPiles !== 1"
      class="AVPileSummary--summary-header hstack justify-content-between px-3 py-2"
      data-test="pile-summary-header"
    >
      <span
        >{{ t("js.components.AVPileSummary.selection") }} {{ pileIndex + 1 }} /
        {{ totalPiles }}</span
      >
      <span class="AVPileSummary--summary-header-text my-0"
        >{{ selectionPile.multiplier }} {{ t("js.components.AVPileSummary.ballots") }}</span
      >
    </header>

    <header v-else class="AVPileSummary--summary-header hstack px-3 py-1">
      <span>{{ t("js.components.AVPileSummary.selection") }}</span>
    </header>

    <div class="AVPileSummary--summary-body vstack gap-2 p-3 border">
      <AVSummaryOption
        v-for="(option, index) in optionSummaries.options"
        :key="index"
        :option="option"
        :multiple-votes-allowed="
          contest.markingType.votesAllowedPerOption && contest.markingType.votesAllowedPerOption > 1
        "
        :parents="
          option.parent ? getAllParents(option.parent, option.parent ? [option.parent] : []) : []
        "
        :image-option="imageOption"
      />
      <AVSummaryOption v-if="blankSelected" :blank="blankSelected" />
    </div>
  </div>

  <div v-else class="AVPileSummary--assign d-flex mb-3">
    <div
      class="AVPileSummary--assign-card vstack border pb-0"
      :class="{
        'border-end-0': activeState === 'overview',
      }"
    >
      <div
        class="AVPileSummary--assign-header hstack justify-content-between gap-2 py-2 px-3 mb-0 rounded-0 btn btn-secondary border-0 border-bottom"
        :aria-label="t('js.components.AVPileSummary.aria_labels.edit_selection')"
        role="button"
        data-test="pile-summary-edit"
        @click="emits('editCurrentSelection')"
      >
        <div class="AVPileSummary--edit hstack gap-2 text-dark">
          <AVIcon icon="pen-to-square" />
          <span>{{ t("js.components.AVPileSummary.ballot_selection") }} {{ pileIndex + 1 }}</span>
        </div>
        <span v-if="activeState === 'overview' || isEditing" data-test="pile-summary-assigned">
          {{ t("js.components.AVPileSummary.assigned") }}
          {{ selectionPile.multiplier }}
        </span>
      </div>

      <div class="AVPileSummary--assign-body bg-white p-3" data-test="pile-summary-body">
        <p v-if="blankSelected" class="AVPileSummary--assign-text mb-0">
          {{ t("js.components.AVPileSummary.blank") }}
        </p>
        <p
          v-for="(option, index) in shownOptions"
          :key="index"
          class="AVPileSummary--assign-text mb-0"
        >
          {{ option.rank ? `${option.rank}: ` : "" }}
          {{ option.title[i18nLocale] }}
        </p>
        <p
          v-for="(option, index) in optionSummaries.writeIns"
          :key="index"
          class="AVPileSummary--assign-text mb-0"
        >
          <b>{{ option.partyLetter }} - {{ option.partyName }}</b>
          <br /><span>{{ option.candidateName }}</span>
        </p>
        <p
          v-if="remainingOptions > 0"
          role="button"
          class="AVPileSummary--show-more-button mb-0 text-dark"
          data-test="pile-summary-more"
          @click.stop.prevent="showAllOptions = true"
        >
          <u
            ><em>
              {{
                `${t("js.components.AVPileSummary.and_n_more_pre")} ${remainingOptions} ${t(
                  "js.components.AVPileSummary.and_n_more_pos",
                )}`
              }}</em
            ></u
          >
        </p>
        <p
          v-if="showAllOptions"
          role="button"
          class="AVPileSummary--show-more-button mb-0 text-dark"
          data-test="pile-summary-more"
          @click.stop.prevent="showAllOptions = false"
        >
          <u
            ><em>{{ t("js.components.AVPileSummary.show_less") }}</em></u
          >
        </p>
      </div>
    </div>

    <div
      v-if="activeState === 'overview'"
      class="AVPileSummary--assign-delete-button hstack btn btn-theme-danger-outline rounded-0"
      role="button"
      :aria-label="t('js.components.AVPileSummary.aria_labels.delete_selection')"
      data-test="pile-summary-delete"
      @click.stop.prevent="emits('deleteSelection')"
    >
      <AVIcon icon="trash-can" />
    </div>
  </div>
</template>

<style scoped src="./AVPileSummary.css" />
