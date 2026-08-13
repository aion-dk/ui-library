<script setup lang="ts">
import { search } from "@/helpers/ballotSearcher";
import useEventsBus from "@/helpers/eventBus";
import type { PropType, SupportedLocale, OptionContent, IterableObject } from "@/types";
import { ref, computed } from "vue";
import { getMeaningfulLabel } from "@/helpers/meaningfulLabel";
import { useLocalization } from "@/composables/useLocalization";

const { eventBusEmit } = useEventsBus();

const props = defineProps({
  options: {
    type: Array as PropType<OptionContent[]>,
    required: true,
  },
  locale: {
    type: String as PropType<SupportedLocale>,
    default: null,
  },
});

const searchTerm = ref<string>("");

const searchedOptions = computed(() => {
  if (searchTerm.value.trim() === "") return [];

  return search(props.options, searchTerm.value, (option: OptionContent) =>
    getMeaningfulLabel(
      option as unknown as IterableObject,
      i18nLocale.value,
      t("js.components.AVOption.aria_labels.option"),
    ),
  );
});

const optionParents = (option: OptionContent): Array<OptionContent> => {
  return parentLookup(option, []).toReversed();
};

const parentLookup = (option: OptionContent, parents: OptionContent[]): OptionContent[] => {
  if (option.parentContent) {
    parents.push(option.parentContent);
    return parentLookup(option.parentContent, parents);
  } else {
    return parents;
  }
};

const clearSearch = (): void => {
  searchTerm.value = "";
};

const highlightOption = (option: OptionContent): void => {
  eventBusEmit("highlight-option", option.reference);
  clearSearch();
};

const { locale: i18nLocale, t } = useLocalization(() => props.locale);
</script>

<template>
  <form
    role="search"
    class="card rounded vstack"
    :aria-label="t('js.components.AVSearchBallot.aria_labels.ballot_options')"
    data-test="search-ballot"
    @submit.prevent
  >
    <div class="AVSearchBallot--form-group mx-3 mt-3">
      <label
        for="ballot_search"
        class="form-label"
        v-text="t('js.components.AVSearchBallot.search_the_ballot')"
      />
      <input
        id="ballot_search"
        v-model="searchTerm"
        type="search"
        class="form-control"
        :placeholder="t('js.components.AVSearchBallot.enter_option_name')"
        data-test="search-ballot-input"
      />
    </div>

    <div
      id="ballot_searcher_results"
      class="AVSearchBallot--results vstack overflow-auto"
      tabindex="0"
      aria-live="polite"
      data-test="search-results"
    >
      <div v-for="option in searchedOptions" :key="option.reference" class="card">
        <div
          v-if="optionParents(option).length > 0"
          class="AVSeachOptionBallot--ancestry card-header small"
        >
          <ul class="breadcrumb m-0">
            <li v-for="opt in optionParents(option)" :key="opt.reference" class="breadcrumb-item">
              {{
                getMeaningfulLabel(
                  opt as unknown as IterableObject,
                  i18nLocale,
                  t("js.components.AVOption.aria_labels.option"),
                )
              }}
            </li>
          </ul>
        </div>

        <div
          :id="`search_result_${option.reference}`"
          class="AVSearchBallot--option card-body"
          role="button"
          :aria-label="`${t('js.components.AVSearchBallot.aria_labels.go_to_option')} ${getMeaningfulLabel(
            option as unknown as IterableObject,
            i18nLocale,
            t('js.components.AVOption.aria_labels.option'),
          )}`"
          data-test="search-result"
          @click.prevent="highlightOption(option)"
        >
          <span
            class="text-decoration-underline"
            v-text="
              getMeaningfulLabel(
                option as unknown as IterableObject,
                i18nLocale,
                t('js.components.AVOption.aria_labels.option'),
              )
            "
          />
        </div>
      </div>

      <div
        v-if="searchTerm && searchedOptions.length === 0"
        class="alert alert-warning py-2 px-3 m-0"
        v-text="t('js.components.AVSearchBallot.no_results')"
      />
    </div>
  </form>
</template>

<style scoped lang="scss" src="./AVSearchBallot.scss" />
