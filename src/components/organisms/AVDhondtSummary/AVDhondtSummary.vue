<script setup lang="ts">
import { inject, onMounted, watch, computed } from "vue";
import { switchLocale } from "@/i18n";
import type {
  AVDhondtResultOptionRow,
  SupportedLocale,
  Theme,
  PropType,
  IterableObject,
} from "@/types";
import { getMeaningfulLabel } from "@/helpers/meaningfulLabel";

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
    typ: Number,
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
  locale: {
    type: String as PropType<SupportedLocale>,
    default: "en",
  },
  theme: {
    type: String as PropType<Theme>,
    default: "light",
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
          <th>
            {{ t("js.components.AVDhondtSummary.header.title") }}
          </th>
          <th>
            {{ t("js.components.AVDhondtSummary.header.group") }}
          </th>
          <th>
            {{ t("js.components.AVDhondtSummary.header.count") }}
          </th>
          <th>
            {{ t("js.components.AVDhondtSummary.header.comparative_figure") }}
          </th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="option in result"
          :key="`option_${option.reference}`"
          :class="{
            'bg-success-faded': !hideElected && option.elected,
            'bg-warning-faded': !hideTied && option.tied,
          }"
          data-test="candidate-dhondt-result"
        >
          <td
            :class="{
              [`AVDhondtSummary--text-${theme}`]: !option.elected && !option.tied,
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
              [`AVDhondtSummary--text-${theme}`]: !option.elected && !option.tied,
            }"
          >
            {{
              option.group !== null && option.reference !== "blank"
                ? getMeaningfulLabel(
                    option as unknown as IterableObject,
                    i18nLocale,
                    t("js.components.AVOption.aria_labels.option"),
                    ["group", "first_available_locale"],
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
              [`AVDhondtSummary--text-${theme}`]: !option.elected && !option.tied,
            }"
          >
            {{ option.count }}
          </td>
          <td
            :class="{
              [`AVDhondtSummary--text-${theme}`]: !option.elected && !option.tied,
            }"
          >
            {{ option.comparativeFigure ? Number(option.comparativeFigure).toFixed(3) : "" }}
          </td>
        </tr>

        <tr>
          <td
            :class="{
              [`AVDhondtSummary--text-${theme}`]: true,
            }"
          >
            <strong>{{ t("js.components.AVDhondtSummary.total_count") }}</strong>
          </td>
          <td></td>
          <td
            :class="{
              [`AVDhondtSummary--text-${theme}`]: true,
            }"
          >
            <strong>{{ totalCount }}</strong>
          </td>
          <td></td>
        </tr>
      </tbody>
    </table>
  </div>

  <div
    :class="`AVDhondtSummary--summary vstack gap-1 AVDhondtSummary--text-semibold AVDhondtSummary--text-${theme}`"
    data-test="summary"
  >
    <p class="mb-0">{{ t("js.components.AVDhondtSummary.summary.seats") }}: {{ seats }}</p>
    <p v-if="distributionNumber > 0" class="mb-0">
      {{ t("js.components.AVDhondtSummary.summary.distribution") }}:
      {{ distributionNumber }}
    </p>
    <p v-if="elected.length > 0" class="mb-0">
      {{ t("js.components.AVDhondtSummary.summary.elected") }}:
      <span>
        {{ elected.join(", ") }}
      </span>
    </p>
    <p v-if="tied.length > 0" class="mb-0">
      {{ t("js.components.AVDhondtSummary.summary.tied") }}:
      <span>
        {{ tied.join(", ") }}
      </span>
    </p>
  </div>
</template>

<style scoped lang="scss" src="./AVDhondtSummary.scss" />
