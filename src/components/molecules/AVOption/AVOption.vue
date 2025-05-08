<script setup lang="ts">
import useEventsBus from "@/helpers/eventBus";
import { getMeaningfulLabel } from "@/helpers/meaningfulLabel";
import { watch, ref, nextTick, computed, inject, onMounted, onUnmounted } from "vue";
import type {
  PropType,
  SupportedLocale,
  OptionContent,
  OptionSelection,
  ContestContent,
  CheckedEventArgs,
  PartialResults,
  ImageOption,
  IterableObject,
} from "@/types";
import { switchLocale } from "@/i18n";

const { eventBus } = useEventsBus();
const highlighted = ref(false);
const el = ref<null | HTMLDivElement>(null);

const props = defineProps({
  option: {
    type: Object as PropType<OptionContent>,
    required: true,
  },
  selections: {
    type: Array as PropType<OptionSelection[]>,
    required: true,
  },
  contest: {
    type: Object as PropType<ContestContent>,
    required: true,
  },
  invalid: {
    type: Boolean,
    required: true,
  },
  exclusiveError: {
    type: Boolean,
    default: false,
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
  locale: {
    type: String as PropType<SupportedLocale>,
    default: null,
  },
  imageOption: {
    type: String as PropType<ImageOption>,
    default: "square",
  },
});

const emits = defineEmits(["accordion-open", "checked", "view-candidate"]);

const ranked = computed(() => props.contest.markingType.voteVariation === "ranked");

const checkedCount = computed(
  () =>
    props.selections.filter(
      (selection: OptionSelection) => selection.reference === props.option.reference,
    ).length,
);

const title = computed(
  () =>
    getMeaningfulLabel(
      props.option as unknown as IterableObject,
      i18nLocale.value,
      t("js.components.AVOption.aria_labels.option"),
    ) ?? "",
);

const description = computed(() => props.option.description?.[i18nLocale.value] ?? "");

const url = computed(() => props.option.url?.[i18nLocale.value] ?? "");

const videoUrl = computed(() => props.option.videoUrl?.[i18nLocale.value] ?? "");

const imageUrl = computed(() =>
  props.option.image?.includes("square") // backward compatibility for old boards which had the variant as part of the imageurl
    ? props.option.image
    : `${props.option.image}/${props.imageOption}`,
);

const links = computed(() => {
  const links = [];
  if (url.value)
    links.push({
      url: url.value,
      text: t("js.components.AVOption.info_link_text_html"),
    });
  if (videoUrl.value)
    links.push({
      url: videoUrl.value,
      text: t("js.components.AVOption.video_link_text_html"),
    });
  return links;
});

const hasChildren = computed(() => props.option.children && props.option.children.length > 0);

const votesAllowedPerOption = computed(() => {
  if (props.option.selectable !== undefined && !props.option.selectable) return 0;
  if (exclusive.value) return 1;
  return props.option.voteLimit || props.contest.markingType.votesAllowedPerOption || 1;
});

const subOptionSelected = computed(() => {
  if (props.selections.length > 0) {
    return checkSubOptionSelected(props.option.children);
  } else {
    return 0;
  }
});

const exclusive = computed(() => props.option.exclusive);

const optionGroups = computed(() => {
  const options = Array.from(Array(votesAllowedPerOption.value).keys());
  options.forEach((index) => (options[index] = index + 1));
  const half = options.indexOf(Math.ceil(votesAllowedPerOption.value / 2)) + 1;
  const group1 = options.slice(0, half);
  const group2 = options.slice(half);
  if (group2.length) return [group1, group2];
  else return [group1];
});

const optionPartialResults = computed(() => {
  return props.partialResults ? props.partialResults[props.option.reference] : null;
});

const toggleOption = (reference: string, amount = 1) => {
  emits("checked", {
    reference: reference,
    amount: amount,
  } as CheckedEventArgs);
};

const checkSubOptionSelected = (options: OptionContent[] | undefined): number => {
  if (!options) return 0;

  const count = options.filter((option) =>
    props.selections.map((s: OptionSelection) => s.reference).includes(option.reference),
  ).length;
  return options.reduce((sum, subOption) => {
    return sum + checkSubOptionSelected(subOption.children);
  }, count);
};

const handleHighlightOptionChange = (reference: string) => {
  highlighted.value = false;

  if (reference === props.option.reference) {
    emits("accordion-open");
    nextTick(() => {
      highlighted.value = true;

      if (!el.value?.scrollIntoView) return;
      el.value.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }
};

const isRtl = ref<boolean>(false);

const mutationObserver = ref<MutationObserver | null>(null);

const mutationObserverTarget = document.getElementsByTagName("html")[0];

const openChildrenCandidate = (reference: string) => {
  emits("view-candidate", reference);
};

watch(
  () => eventBus.value.get("highlight-option"),
  (val) => {
    const [optionId] = val ?? [];
    handleHighlightOptionChange(optionId);
  },
);

onMounted(() => {
  if (props.locale) switchLocale(props.locale); // DO NOT REMOVE (If in doubt, read the next block comment)

  mutationObserver.value = new MutationObserver(() => {
    const dirAttr = mutationObserverTarget.attributes.getNamedItem("dir")?.value;
    isRtl.value = !!dirAttr && dirAttr === "rtl";
  });
  mutationObserver.value.observe(mutationObserverTarget, { attributes: true });
});

onUnmounted(() => mutationObserver.value && mutationObserver.value.disconnect());

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
  <div
    class="position-relative"
    :class="{
      'AVOption--disabled': disabled,
    }"
    data-test="option"
  >
    <a
      :id="option.reference"
      class="AVOption--scroll-anchor visually-hidden"
      :href="`option_${option.reference}_checkbox`"
      :aria-labelledby="`option_${option.reference}_title`"
    />
    <AVCollapser
      :pane-id="`pane_for_option_${option.reference}`"
      :collapsable="contest.collapsable && hasChildren"
      :start-collapsed="contest.collapseDefault && !observerMode"
      @accordion-open="emits('accordion-open')"
    >
      <template #toggle="{ isOpen, collapsable }">
        <section
          ref="el"
          class="AVOption card"
          :class="{
            'AVOption--highlight': highlighted,
            'AVOption--accent': option.accentColor,
          }"
          :style="
            props.option.accentColor
              ? `border-${isRtl ? 'right' : 'left'}-color: ${props.option.accentColor};`
              : ''
          "
          :aria-label="`${t('js.components.AVOption.aria_labels.option')} ${getMeaningfulLabel(option as unknown as IterableObject, i18nLocale, t('js.components.AVOption.aria_labels.option'))}`"
          data-test="option-section"
        >
          <div
            class="d-flex justify-content-between"
            :class="{
              'flex-column': votesAllowedPerOption > 1,
              'flex-sm-row': votesAllowedPerOption <= 5,
            }"
            data-test="option-container"
          >
            <div
              class="vstack gap-2 p-3 align-items-start justify-content-center"
              data-test="option-content"
            >
              <header
                class="AVOption--header d-flex flex-column flex-sm-row align-items-sm-center gap-3"
              >
                <img
                  v-if="option.image"
                  :src="imageUrl"
                  :alt="t('js.components.AVOption.aria_labels.option_image')"
                  class="AVOption-image"
                  data-test="option-image"
                />
                <h5
                  class="AVOption--title m-0"
                  :id="`option_${option.reference}_title`"
                  v-text="title"
                />
                <span :id="`option_${option.reference}_handle`" class="visually-hidden">{{
                  option.reference
                }}</span>
              </header>
              <div
                v-if="
                  description ||
                  links.length ||
                  (hasChildren && collapsable) ||
                  !!option.candidateId
                "
                class="vstack gap-2"
                data-test="option-summary"
              >
                <div
                  v-if="description"
                  :id="`option_${option.reference}_description`"
                  class="AVOption--description vstack gap-1 mt-2"
                  data-test="option-description"
                  v-html="description"
                />
                <div
                  class="AVOption--links-container hstack gap-2"
                  v-if="links.length > 0 || !!option.candidateId"
                >
                  <button
                    v-if="!!option.candidateId"
                    class="btn btn-sm btn-outline-dark"
                    @click.stop="emits('view-candidate', option.candidateId)"
                    data-test="option-candidacy"
                  >
                    {{ t("js.components.AVOption.view_candidate") }}
                  </button>

                  <a
                    v-for="link in links"
                    :key="link.toString()"
                    :href="link.url"
                    class="btn btn-sm btn-outline-dark"
                    target="_blank"
                    @click.stop
                    data-test="option-link"
                  >
                    {{ link.text }}
                  </a>
                </div>
                <div
                  v-if="collapsable && hasChildren"
                  class="hstack gap-2 mt-2"
                  data-test="option-children"
                >
                  <div
                    :id="`option_${option.reference}_dropdown`"
                    class="hstack gap-1 text-dark"
                    aria-hidden="true"
                    data-test="option-expander"
                  >
                    <AVIcon
                      icon="chevron-down"
                      class="AVOption--expander-icon"
                      :class="{
                        'AVOption--expander-icon-opened': isOpen,
                      }"
                    />
                    <span
                      v-html="
                        isOpen
                          ? t('js.components.AVOption.collapse_text')
                          : t('js.components.AVOption.expand_text')
                      "
                    />
                  </div>

                  <span
                    v-if="subOptionSelected && !isOpen"
                    class="badge"
                    :class="{
                      'bg-theme-danger': invalid,
                      'bg-dark': !invalid,
                    }"
                    data-test="option-child-selected"
                  >
                    {{ t("js.components.AVOption.sub_options_select", { n: subOptionSelected }) }}
                  </span>
                </div>
              </div>
            </div>

            <div
              v-if="votesAllowedPerOption >= 1"
              :class="{
                'AVOption--multivote-aside hstack gap-2 justify-content-end bg-secondary':
                  votesAllowedPerOption <= 5 && votesAllowedPerOption !== 1,
                'AVOption--multivote-footer hstack gap-2 flex-wrap justify-content-end border-top bg-secondary':
                  votesAllowedPerOption > 5,
                'AVOption--singlevote': votesAllowedPerOption === 1,
              }"
              data-test="option-multivote"
            >
              <div
                v-for="groupIndex in optionGroups"
                :key="groupIndex.toString()"
                class="hstack gap-2 flex-nowrap"
              >
                <AVOptionCheckbox
                  v-for="optionIndex in groupIndex"
                  :key="optionIndex"
                  :excluded="option.excluded"
                  :checked="checkedCount >= optionIndex"
                  :rank="
                    ranked
                      ? selections
                          .map((s: OptionSelection) => s.reference)
                          .indexOf(option.reference) + 1
                      : null
                  "
                  :exclusive-error="exclusiveError"
                  :invalid="invalid"
                  :option-reference="option.reference"
                  :check-box-index="optionIndex"
                  :disabled="disabled || observerMode"
                  @toggled="toggleOption(option.reference, optionIndex)"
                />
              </div>
            </div>
            <AVOptionLiveResults
              v-if="optionPartialResults && (observerMode || disabled)"
              :option-reference="option.reference"
              :partial-results="optionPartialResults"
              mode="internal"
              :show-percentage="optionPartialResults.showPercentage"
              class="px-3"
            />
          </div>
        </section>
      </template>

      <template #results v-if="!disabled && optionPartialResults && !observerMode">
        <AVOptionLiveResults
          :option-reference="option.reference"
          :partial-results="optionPartialResults"
          mode="external"
          :show-percentage="optionPartialResults.showPercentage"
        />
      </template>

      <template #pane="{ toggleCollapse }">
        <div
          v-if="hasChildren"
          class="AVOption--children vstack gap-2 py-2"
          data-test="option-children"
        >
          <AVOption
            v-for="childOption in option.children"
            :key="childOption.reference"
            :option="childOption"
            :selections="selections"
            :contest="contest"
            :invalid="invalid"
            :disabled="disabled"
            :observer-mode="observerMode"
            :partial-results="partialResults"
            :exclusive-error="childOption.exclusive && exclusiveError"
            :image-option="imageOption"
            @checked="(args: boolean) => emits('checked', args)"
            @accordion-open="() => toggleCollapse(true, false)"
            @view-candidate="openChildrenCandidate"
          />
        </div>
      </template>
    </AVCollapser>
  </div>
</template>

<style scoped lang="scss" src="./AVOption.scss" />
