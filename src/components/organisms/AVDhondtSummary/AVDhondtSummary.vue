<script setup lang="ts">
import { onMounted, computed } from "vue";
import type {
  AVDhondtSummaryOption,
  AVDhondtSummaryResult,
  AVDhondtSummarySortedResult,
  AVDhondtSummaryAdditionalData,
  SupportedLocale,
  Theme,
  PropType,
  IterableObject,
  VoteCounts,
} from "@/types";
import { getMeaningfulLabel } from "@/helpers/meaningfulLabel";
import { useLocalization } from "@/composables/useLocalization";

const props = defineProps({
  result: {
    type: Array as PropType<AVDhondtSummaryResult>,
    required: true,
  },
  distributionNumber: {
    type: Number,
    required: true,
  },
  seats: {
    type: Number,
    required: true,
  },
  locale: {
    type: String as PropType<SupportedLocale>,
    default: "en",
  },
  hideElected: {
    type: Boolean,
    default: false,
  },
  hideTied: {
    type: Boolean,
    default: false,
  },
  voteCounts: {
    type: Object as PropType<VoteCounts>,
    required: true,
  },
  theme: {
    type: String as PropType<Theme>,
    default: "light",
  },
});

const sortedData = computed(() => {
  const sorted: AVDhondtSummarySortedResult = {
    seats: [],
    blank: null,
  };

  props.result.filter((seat) => {
    if (Array.isArray(seat)) sorted.seats.push(seat);
    else sorted.blank = seat;
  });

  return sorted;
});

const optionReferences = computed(() =>
  sortedData.value.seats[0].map((option) => option.reference),
);

const getElectedSeats = (amount: number): string => {
  if (amount > 1)
    return t("js.components.AVDhondtSummary.summary.seat_count.n_seats", { n: amount });
  else if (amount === 1) return t("js.components.AVDhondtSummary.summary.seat_count.one_seat");
  else return t("js.components.AVDhondtSummary.summary.seat_count.no_seats");
};

const additionalData = computed(() => {
  const data: AVDhondtSummaryAdditionalData = {};

  optionReferences.value.forEach((reference) => {
    data[reference] = {
      title: getMeaningfulLabel(
        sortedData.value.seats[0].find(
          (option) => option.reference === reference,
        ) as unknown as IterableObject,
        i18nLocale.value,
        t("js.components.AVOption.aria_labels.option"),
      ),
      elected: sortedData.value.seats.reduce((accumulator, currentValue) => {
        return currentValue.find((option) => option.reference === reference)?.elected
          ? accumulator + 1
          : accumulator;
      }, 0),
      tied: sortedData.value.seats.reduce((accumulator, currentValue) => {
        return currentValue.find((option) => option.reference === reference)?.tied
          ? accumulator + 1
          : accumulator;
      }, 0),
    };
  });

  return data;
});

const getOptionForSeat = (seat: number, optionReference: string): AVDhondtSummaryOption =>
  sortedData.value.seats[seat].find(
    (option) => option.reference === optionReference,
  ) as AVDhondtSummaryOption;

onMounted(() => {
  if (props.seats !== sortedData.value.seats.length)
    throw new Error("Amount of seats doesn't match with amount of rounds on the result");
});

const { locale: i18nLocale, t } = useLocalization(() => props.locale);
</script>

<template>
  <div class="table-responsive">
    <table
      class="table border"
      :class="{
        'border-light': theme === 'dark',
      }"
      id="dhondt_summary_table"
      data-test="table"
    >
      <thead class="bg-secondary border-bottom">
        <tr>
          <th>{{ t("js.components.AVDhondtSummary.header.party") }}</th>

          <th
            v-for="seatNumber in seats"
            :key="`header_for_round_${seatNumber}`"
            class="text-center text-nowrap"
          >
            {{
              t("js.components.AVDhondtSummary.header.seat_n", {
                n: seatNumber,
              })
            }}
          </th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="(optionReference, index) in Object.keys(additionalData)"
          :key="`list_${optionReference}`"
          :data-test="`party-list-${index}`"
        >
          <td :class="`AVDhondtSummary--text-${theme}`">
            {{ additionalData[optionReference].title }}
          </td>
          <td
            v-for="(_seat, seatNumber) in sortedData.seats"
            :key="`seat_${seatNumber}`"
            class="text-center"
            :class="{
              [`AVDhondtSummary--text-${theme}`]:
                !getOptionForSeat(seatNumber, optionReference).elected &&
                !getOptionForSeat(seatNumber, optionReference).tied,
              'text-gray-800':
                getOptionForSeat(seatNumber, optionReference).elected ||
                getOptionForSeat(seatNumber, optionReference).tied,
              'bg-success-faded':
                getOptionForSeat(seatNumber, optionReference).elected && !hideElected,
              'bg-danger-faded': getOptionForSeat(seatNumber, optionReference).ineligible,
              'AVDhondtSummary--text-semibold':
                (getOptionForSeat(seatNumber, optionReference).elected && !hideElected) ||
                (getOptionForSeat(seatNumber, optionReference).tied && !hideTied),
              'bg-warning-faded':
                getOptionForSeat(seatNumber, optionReference).tied &&
                !getOptionForSeat(seatNumber, optionReference).elected &&
                !hideTied,
            }"
          >
            {{ Number(getOptionForSeat(seatNumber, optionReference).comparativeFigure).toFixed(2) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="vstack gap-1" data-test="summary">
    <AVResultSummaryItem
      :title="t('js.components.AVDhondtSummary.summary.seats')"
      :value="seats"
      reference="seats"
      :theme="theme"
    />

    <template v-if="!hideElected">
      <AVResultSummaryItem
        v-for="partyReference in optionReferences"
        :key="`written_results_for_${partyReference}`"
        :title="additionalData[partyReference].title"
        :value="getElectedSeats(additionalData[partyReference].elected)"
        :reference="partyReference"
        :theme="theme"
      />
    </template>

    <AVResultSummaryItem
      v-if="sortedData.blank"
      :title="t('js.components.AVDhondtSummary.summary.blank')"
      :value="sortedData.blank.count"
      reference="blank_votes"
      :theme="theme"
    />

    <AVResultSummaryItem
      v-if="Number.isFinite(voteCounts.excludedCount)"
      :title="t('js.components.AVDhondtSummary.summary.null_votes')"
      :value="voteCounts.excludedCount"
      reference="null_votes"
      :theme="theme"
    />

    <AVResultSummaryItem
      v-if="distributionNumber > 0"
      :title="t('js.components.AVDhondtSummary.summary.distribution')"
      :value="distributionNumber"
      reference="distribution_n"
      :theme="theme"
    />
  </div>
</template>

<style scoped lang="scss" src="./AVDhondtSummary.scss" />
