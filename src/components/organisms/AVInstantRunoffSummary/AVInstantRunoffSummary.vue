<script setup lang="ts">
import type {
  PropType,
  InstantRunoffRound,
  SupportedLocale,
  IterableObject,
  VoteCounts,
  OptionResult,
} from "@/types";

import { getMeaningfulLabel } from "@/helpers/meaningfulLabel";
import { useLocalization } from "@/composables/useLocalization";

const props = defineProps({
  rounds: {
    type: Array as PropType<Array<InstantRunoffRound>>,
    required: true,
  },
  sortedResult: {
    type: Array as PropType<Array<OptionResult>>,
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
});

const count = (reference: string, roundIndex: number): number =>
  props.rounds[roundIndex].counts[reference] || 0;

const isEliminated = (reference: string, roundIndex: number): boolean =>
  props.rounds[roundIndex].eliminated === reference;

const isElected = (reference: string, roundIndex: number): boolean =>
  props.rounds[roundIndex].elected === reference;

const isEliminatedOrElected = (reference: string, roundIndex: number): boolean =>
  isElected(reference, roundIndex) || isEliminated(reference, roundIndex);

const { locale: i18nLocale, t } = useLocalization(() => props.locale);
</script>

<template>
  <div class="AVInstantRunoffSummary vstack">
    <h5 class="AVInstantRunoffSummary--title text-body" data-test="seat-title">
      {{ t("js.components.AVInstantRunoffSummary.seat_n", { n: seatNumber }) }}
    </h5>

    <div class="AVInstantRunoffSummary--container">
      <div class="AVInstantRunoffSummary--table-container table-responsive">
        <table
          class="AVInstantRunoffSummary--table table border"
          id="ranked_summary_table"
          data-test="table"
        >
          <thead class="AVInstantRunoffSummary--heading bg-body-80 border-bottom">
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
                <AVIcon icon="info-circle" class="text-body-60" />
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(option, optionIndex) in sortedResult" :key="optionIndex">
              <template v-if="option.title">
                <td class="text-body">
                  {{
                    getMeaningfulLabel(
                      option as unknown as IterableObject,
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
                    'AVInstantRunoffSummary--highlighted': isEliminatedOrElected(
                      option.reference,
                      number - 1,
                    ),
                    'text-body': true,
                  }"
                >
                  {{ count(option.reference, number - 1) }}
                </td>
              </template>
            </tr>
            <tr>
              <td class="text-body">
                {{ t("js.components.AVInstantRunoffSummary.summary.transfered_votes") }}
              </td>
              <td
                v-for="number in rounds.length"
                :key="`instant_runoff_seat_${seatNumber}_transferred_${number}`"
                class="text-center text-nowrap text-body"
              >
                {{ rounds[number - 1].transferred }}
              </td>
            </tr>
            <tr>
              <td class="text-body">
                {{ t("js.components.AVInstantRunoffSummary.summary.exhausted") }}
              </td>
              <td
                v-for="number in rounds.length"
                :key="`instant_runoff_seat_${seatNumber}_exhausted_${number}`"
                class="text-body text-center text-nowrap AVInstantRunoffSummary--cell-text"
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
        />

        <AVResultSummaryItem
          :title="t('js.components.AVInstantRunoffSummary.summary.abstain')"
          :value="blankVotes"
          reference="abstain"
        />

        <AVResultSummaryItem
          v-if="Number.isFinite(voteCounts.excludedCount)"
          :title="t('js.components.AVInstantRunoffSummary.summary.null_votes')"
          :value="voteCounts.excludedCount"
          reference="null_votes"
        />

        <AVResultSummaryItem
          :title="t('js.components.AVInstantRunoffSummary.summary.total_votes')"
          :value="totalVotes"
          reference="total"
        />

        <AVResultSummaryItem
          :title="t('js.components.AVInstantRunoffSummary.summary.quota')"
          :value="quota"
          reference="quota"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss" src="./AVInstantRunoffSummary.scss" />
