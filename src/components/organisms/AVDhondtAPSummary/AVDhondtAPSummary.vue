<script setup lang="ts">
import { computed } from "vue";
import type {
  AVDhondtResultOptionRow,
  SupportedLocale,
  PropType,
  IterableObject,
  VoteCounts,
} from "@/types";
import { getMeaningfulLabel } from "@/helpers/meaningfulLabel";
import { useLocalization } from "@/composables/useLocalization";

const props = defineProps({
  result: {
    type: Array as PropType<Array<AVDhondtResultOptionRow>>,
    required: true,
  },
  totalCount: {
    type: Number,
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
  locale: {
    type: String as PropType<SupportedLocale>,
    default: "en",
  },
});

const elected = computed(() => {
  return props.result
    .filter((row: AVDhondtResultOptionRow) => row.elected)
    .map((row: AVDhondtResultOptionRow) => {
      return (
        getMeaningfulLabel(
          { reference: row.reference, title: row.title },
          i18nLocale.value,
          t("js.components.AVOption.aria_labels.option"),
        ) ?? Object.values(row.title)[0]
      );
    });
});

const tied = computed(() => {
  return props.result
    .filter((row: AVDhondtResultOptionRow) => row.tied)
    .map((row: AVDhondtResultOptionRow) => {
      return (
        getMeaningfulLabel(
          { reference: row.reference, title: row.title },
          i18nLocale.value,
          t("js.components.AVOption.aria_labels.option"),
        ) ?? Object.values(row.title)[0]
      );
    });
});

const { locale: i18nLocale, t } = useLocalization(() => props.locale);
</script>

<template>
  <div class="table-responsive">
    <table class="table border" id="dhondt_summary_table" data-test="table">
      <thead class="bg-body-80 border-bottom">
        <tr>
          <th>
            {{ t("js.components.AVDhondtAPSummary.header.title") }}
          </th>
          <th>
            {{ t("js.components.AVDhondtAPSummary.header.group") }}
          </th>
          <th>
            {{ t("js.components.AVDhondtAPSummary.header.count") }}
          </th>
          <th>
            {{ t("js.components.AVDhondtAPSummary.header.comparative_figure") }}
          </th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="option in result"
          :key="`option_${option.reference}`"
          :class="{
            'bg-success-faded': !hideElected && option.elected,
            'bg-warning-faded': !hideTied && option.tied && !option.elected,
          }"
          data-test="candidate-dhondt-result"
        >
          <td
            :class="{
              'text-body': !option.elected && !option.tied,
              'AVDhondtAPSummary--highlighted': option.elected || option.tied,
            }"
          >
            <template v-if="option.group">
              {{
                getMeaningfulLabel(
                  option as unknown as IterableObject,
                  i18nLocale,
                  t("js.components.AVOption.aria_labels.option"),
                  ["title", "first_available_locale", "reference", "id"],
                )
              }}
            </template>
          </td>
          <td
            :class="{
              'text-body': !option.elected && !option.tied,
              'AVDhondtAPSummary--highlighted': option.elected || option.tied,
            }"
          >
            {{
              option.group !== null && option.reference !== "blank"
                ? getMeaningfulLabel(
                    option as unknown as IterableObject,
                    i18nLocale,
                    t("js.components.AVOption.aria_labels.option"),
                    ["group"],
                  )
                : getMeaningfulLabel(
                    option as unknown as IterableObject,
                    i18nLocale,
                    t("js.components.AVOption.aria_labels.option"),
                    ["title", "first_available_locale", "reference", "id"],
                  )
            }}
          </td>
          <td
            :class="{
              'text-body': !option.elected && !option.tied,
              'AVDhondtAPSummary--highlighted': option.elected || option.tied,
            }"
          >
            {{ option.count }}
          </td>
          <td
            :class="{
              'text-body': !option.elected && !option.tied,
              'AVDhondtAPSummary--highlighted': option.elected || option.tied,
            }"
          >
            {{ option.comparativeFigure ? Number(option.comparativeFigure).toFixed(2) : "" }}
          </td>
        </tr>

        <tr>
          <td class="text-body">
            <strong>{{ t("js.components.AVDhondtAPSummary.total_count") }}</strong>
          </td>
          <td></td>
          <td class="text-body">
            <strong>{{ totalCount }}</strong>
          </td>
          <td></td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="vstack gap-1" data-test="summary">
    <AVResultSummaryItem
      :title="t('js.components.AVDhondtAPSummary.summary.seats')"
      :value="seats"
      reference="seats"
    />

    <AVResultSummaryItem
      v-if="distributionNumber > 0"
      :title="t('js.components.AVDhondtAPSummary.summary.distribution')"
      :value="distributionNumber"
      reference="distribution_n"
    />

    <AVResultSummaryItem
      v-if="elected.length > 0 && !hideElected"
      :title="t('js.components.AVDhondtAPSummary.summary.elected')"
      :value="elected.join(', ')"
      reference="elected"
    />

    <AVResultSummaryItem
      v-if="tied.length > 0 && !hideTied"
      :title="t('js.components.AVDhondtAPSummary.summary.tied')"
      :value="tied.join(', ')"
      reference="tied"
    />

    <AVResultSummaryItem
      v-if="Number.isFinite(voteCounts.excludedCount)"
      :title="t('js.components.AVDhondtAPSummary.summary.null_votes')"
      :value="voteCounts.excludedCount"
      reference="null_votes"
    />
  </div>
</template>

<style scoped lang="scss" src="./AVDhondtAPSummary.scss" />
