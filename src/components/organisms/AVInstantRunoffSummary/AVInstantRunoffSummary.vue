<script setup lang="ts">
import type {
  PropType,
  InstantRunoffRound,
  SupportedLocale,
  Result,
  Theme,
  IterableObject,
  VoteCounts,
} from "@/types";
import { inject, onMounted, watch, computed } from "vue";
import { switchLocale } from "@/i18n";
import { getMeaningfulLabel } from "@/helpers/meaningfulLabel";

const props = defineProps({
  rounds: {
    type: Array as PropType<Array<InstantRunoffRound>>,
    required: true,
  },
  sortedResult: {
    type: Array as PropType<Array<Result>>,
    required: true,
  },
  seatNumber: {
    type: Number,
    required: true,
  },
  quota: {
    type: Number,
    required: true,
  },
  totalVotes: {
    type: Number,
    required: true,
  },
  blankVotes: {
    type: Number,
    required: true,
  },
  votesNotIncluded: {
    type: Number,
    default: null,
  },
  voteCounts: {
    type: Object as PropType<VoteCounts>,
    required: true,
  },
  locale: {
    type: String as PropType<SupportedLocale>,
    default: null,
  },
  theme: {
    type: String as PropType<Theme>,
    default: "light",
  },
});

const count = (reference: string, roundIndex: number) =>
  props.rounds[roundIndex].counts[reference] || 0;

const isEliminated = (reference: string, roundIndex: number) =>
  props.rounds[roundIndex].eliminated === reference;

const isElected = (reference: string, roundIndex: number) =>
  props.rounds[roundIndex].elected === reference;

const isEliminatedOrElected = (reference: string, roundIndex: number) =>
  isElected(reference, roundIndex) || isEliminated(reference, roundIndex);

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
  <div class="AVInstantRunoffSummary vstack">
    <h5
      class="AVInstantRunoffSummary--title"
      :class="`AVInstantRunoffSummary--text-${theme}`"
      data-test="seat-title"
    >
      {{ t("js.components.AVInstantRunoffSummary.seat_n", { n: seatNumber }) }}
    </h5>

    <div class="AVInstantRunoffSummary--container">
      <div class="AVInstantRunoffSummary--table-container table-responsive">
        <table
          class="AVInstantRunoffSummary--table table border"
          id="ranked_summary_table"
          data-test="table"
        >
          <thead class="AVInstantRunoffSummary--heading bg-secondary border-bottom">
            <tr>
              <th>
                {{ t("js.components.AVInstantRunoffSummary.header.candidate") }}
              </th>
              <th
                v-for="(_round, index) in rounds"
                :key="`instant_runoff_seat_${seatNumber}_round_${index}`"
                class="text-center text-nowrap cursor-help"
                v-tooltip="rounds[index].event"
              >
                {{
                  t("js.components.AVInstantRunoffSummary.header.round_n", {
                    n: index + 1,
                  })
                }}
                <AVIcon icon="info-circle" class="text-dark" />
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(option, optionIndex) in sortedResult" :key="optionIndex">
              <template v-if="option.title">
                <td :class="`AVInstantRunoffSummary--text-${theme}`">
                  {{
                    getMeaningfulLabel(
                      option as IterableObject,
                      i18nLocale,
                      t("js.components.AVOption.aria_labels.option"),
                    )
                  }}
                </td>
                <td
                  v-for="number in rounds.length"
                  :key="`instant_runoff_seat_${seatNumber}_number_${number}`"
                  class="text-center text-nowrap"
                  :class="{
                    'bg-success-faded': isElected(option.reference, number - 1),
                    'bg-danger-faded': isEliminated(option.reference, number - 1),
                    'AVInstantRunoffSummary--text-bold': isEliminatedOrElected(
                      option.reference,
                      number - 1,
                    ),
                    'text-dark': isEliminatedOrElected(option.reference, number - 1),
                    [`AVInstantRunoffSummary--text-${theme}`]: true,
                  }"
                >
                  {{ count(option.reference, number - 1) }}
                </td>
              </template>
            </tr>
            <tr>
              <td :class="`AVInstantRunoffSummary--text-${theme}`">
                {{ t("js.components.AVInstantRunoffSummary.summary.transfered_votes") }}
              </td>
              <td
                v-for="number in rounds.length"
                :key="`instant_runoff_seat_${seatNumber}_transferred_${number}`"
                class="text-center text-nowrap"
                :class="`AVInstantRunoffSummary--text-${theme}`"
              >
                {{ rounds[number - 1].transferred }}
              </td>
            </tr>
            <tr>
              <td :class="`AVInstantRunoffSummary--text-${theme}`">
                {{ t("js.components.AVInstantRunoffSummary.summary.exhausted") }}
              </td>
              <td
                v-for="number in rounds.length"
                :key="`instant_runoff_seat_${seatNumber}_exhausted_${number}`"
                class="text-center text-nowrap AVInstantRunoffSummary--cell-text"
                :class="`AVInstantRunoffSummary--text-${theme}`"
              >
                {{ rounds[number - 1].exhausted }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="vstack gap-1" data-test="summary">
        <AVResultSummaryItem
          v-if="votesNotIncluded"
          :title="t('js.components.AVInstantRunoffSummary.summary.not_included_count')"
          :value="votesNotIncluded"
          reference="not-included"
          :theme="theme"
        />

        <AVResultSummaryItem
          :title="t('js.components.AVInstantRunoffSummary.summary.abstain')"
          :value="blankVotes"
          reference="abstain"
          :theme="theme"
        />

        <AVResultSummaryItem
          :title="t('js.components.AVInstantRunoffSummary.summary.null_votes')"
          :value="voteCounts.excludedCount"
          reference="null_votes"
          :theme="theme"
        />

        <AVResultSummaryItem
          :title="t('js.components.AVInstantRunoffSummary.summary.total_votes')"
          :value="totalVotes"
          reference="total"
          :theme="theme"
        />

        <AVResultSummaryItem
          :title="t('js.components.AVInstantRunoffSummary.summary.quota')"
          :value="quota"
          reference="quota"
          :theme="theme"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss" src="./AVInstantRunoffSummary.scss" />
