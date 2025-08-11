<script setup lang="ts">
import { watch, onMounted, computed, inject } from "vue";
import { switchLocale } from "@/i18n";
import { getMeaningfulLabel } from "@/helpers/meaningfulLabel";
import type {
  ResourceItem,
  PropType,
  Resource,
  SupportedLocale,
  Url,
  ResourceGroup,
  LocalString,
  IterableObject,
  AVResourceSectionPartyLeader,
} from "@/types";

const props = defineProps({
  candidate: {
    type: Object as PropType<Resource>,
    required: true,
  },
  currentCandidateGroup: {
    type: Number,
    default: null,
  },
  summary: {
    type: Boolean,
    default: false,
  },
  card: {
    type: Boolean,
    default: false,
  },
  forceLightTheme: {
    type: Boolean,
    default: false,
  },
  isPartyLeader: {
    type: Boolean,
    default: false,
  },
  partyLeaderData: {
    type: Object as PropType<AVResourceSectionPartyLeader>,
    default: null,
  },
  locale: {
    type: String as PropType<SupportedLocale>,
    default: null,
  },
});

const title = computed(() =>
  props.candidate.title?.[0]?.localised
    ? (props.candidate.title?.[0]?.form_content as LocalString)[i18nLocale.value]
    : props.candidate.title?.[0]?.form_content,
);

const subtitle = computed(() =>
  props.candidate.subtitle?.[0]?.localised
    ? (props.candidate.subtitle?.[0]?.form_content as LocalString)[i18nLocale.value]
    : props.candidate.subtitle?.[0]?.form_content,
);

const groups = computed(() => {
  if (!props.candidate.groups) return null;

  let displayed: ResourceGroup[] = [];
  let remaining: ResourceGroup[] = [];
  let remainingString = "";

  if (props.currentCandidateGroup) {
    props.candidate.groups.forEach((group: ResourceGroup) => {
      group.id === props.currentCandidateGroup ? displayed.push(group) : remaining.push(group);
    });
  } else {
    remaining = [...props.candidate.groups];
    displayed = remaining.splice(0, 1);
  }

  remaining.forEach((group: ResourceGroup, i: number) => {
    if (i === 0 || props.candidate.groups?.length === 1)
      remainingString = group.title[i18nLocale.value];
    else if (i === remaining.length - 1) remainingString += ` & ${group.title[i18nLocale.value]}`;
    else remainingString += `, ${group.title[i18nLocale.value]}`;
  });

  return {
    title: displayed[0]?.title[i18nLocale.value],
    surplus: remaining.length || null,
    remaining: remainingString,
  };
});

const sectionItems = computed(() =>
  props.summary
    ? props.candidate.summary
    : props.candidate.generic.filter((item: ResourceItem) => item.item_type !== "image"),
);

const hasContent = computed(() =>
  props.summary ? !!props.candidate.summary.length : !!props.candidate.generic.length,
);

const itemHasContent = (item: ResourceItem) => {
  if (item.item_type === "check_box") return true;
  if (!item.form_content) return false;
  if (item.item_type === "link_list") return !!(item.form_content as Url[]).length;
  if (item.localised) return !!(item.form_content as LocalString)[i18nLocale.value];
  return !!item.form_content;
};

const image = computed(
  () =>
    props.candidate.generic.find((item: ResourceItem) => item.item_type === "image")
      ?.form_content as string,
);

/**
 * This is necesary in order to support both provided i18n and local i18n.
 * The used locale will be taken from the provided i18n as long as there is one
 * (this happens when we plug-in the library into a product, as electa or evs),
 * otherwise, it will take the locale from the local i18n instance.
 * Removing it, will cause all tests, storybook and the playground to break.
 */
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
const i18n: any = inject("i18n");
const { t, d } = i18n.global;
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
  <section class="vstack">
    <div
      :class="`d-flex gap-3 ${card ? 'flex-column' : 'flex-column flex-sm-row gap-sm-4 gap-md-5'}`"
      data-test="resource-section"
    >
      <div
        v-if="summary && image"
        :class="{
          'px-3': card,
          'pt-3': card,
        }"
      >
        <img
          :src="image"
          :alt="t('js.components.AVResourceSection.alt_candidate')"
          class="AVResourceSection--image img-fluid ratio ratio-1x1"
          :class="{
            'shadow-lg': !card,
            shadow: card,
          }"
          data-test="resource-image"
        />
        <div
          v-if="isPartyLeader"
          class="hstack gap-1 bg-theme px-2 py-1"
          data-test="party-leader-tag"
        >
          <AVIcon icon="certificate" />
          {{ t("js.components.AVResourceSection.party_leader") }}
        </div>
      </div>

      <div
        :class="{
          vstack: summary,
          'w-100': !summary && !card,
          'justify-content-center': summary,
          'px-3': summary,
          'px-4': summary && card,
          'px-sm-0': summary && !card,
        }"
      >
        <!-- Title (only summary) -->
        <h4
          v-if="summary && !!title"
          :class="{
            h3: !card,
            h5: card,
            'mb-0': card && !subtitle,
            'AVResourceSection--header-text': !card && !forceLightTheme,
            'text-gray-800': card || forceLightTheme,
          }"
          data-test="heading-title"
        >
          {{ title }}
        </h4>

        <!-- Subtitle (only summary) -->
        <h5
          v-if="summary && !!subtitle"
          :class="{
            h4: !card,
            h6: card,
            'mb-0': card,
            'AVResourceSection--header-text': !card,
            'text-gray-800': card,
          }"
          data-test="heading-subtitle"
        >
          {{ subtitle }}
        </h5>

        <!-- Group (only when enabled) -->
        <h6
          v-if="summary && candidate.groups && !card"
          class="h5"
          :class="{
            'AVResourceSection--header-text': !card,
            'text-gray-800': card,
          }"
          data-test="heading-group"
        >
          <span class="align-middle me-2">
            {{ groups?.title }}
          </span>

          <span
            v-if="!!groups?.surplus"
            v-tooltip:top="groups.remaining"
            class="cursor-help badge rounded-pill text-bg-secondary"
            style="color: black !important"
          >
            {{
              t("js.components.AVResourceSection.and_more", {
                amount: groups.surplus,
              })
            }}
          </span>
        </h6>

        <!-- Party leader tag (when is party profile) -->
        <div v-if="partyLeaderData" class="hstack gap-2 mb-2">
          <span class="d-block m-0">
            {{ t("js.components.AVResourceSection.party_leader") }}:
          </span>
          <a
            :href="partyLeaderData.url"
            class="AVResourceSection--party-leader-badge btn btn-theme btn-sm rounded-pill"
            data-test="party-leader-btn"
          >
            <AVIcon icon="certificate" />
            {{ partyLeaderData.label[i18nLocale] }}
          </a>
        </div>

        <!-- Content -->
        <template v-if="!card">
          <template v-for="item in sectionItems" :key="`attribute_${item.attribute_name}`">
            <div
              v-if="hasContent && itemHasContent(item)"
              :class="
                summary
                  ? 'AVResourceSection--container-summary'
                  : 'AVResourceSection--container-generic'
              "
              data-test="resource-content"
            >
              <h4
                v-if="!summary"
                :class="{
                  'mt-1': item.item_type === 'check_box',
                  'mb-3': item.item_type === 'check_box',
                }"
                data-test="resource-title"
              >
                {{
                  getMeaningfulLabel(
                    item as unknown as IterableObject,
                    i18nLocale,
                    `${`${t("js.components.AVResourceSection.human")} ${item.item_type}`} ${item.item_type}`,
                  )
                }}
                <AVIcon
                  v-if="item.item_type === 'check_box'"
                  :icon="item.form_content ? 'square-check' : 'square-xmark'"
                  :class="item.form_content ? 'text-success ms-1' : 'text-danger ms-1'"
                  :aria-label="
                    item.form_content
                      ? t('js.components.AVResourceSection.true')
                      : t('js.components.AVResourceSection.false')
                  "
                  data-test="resource-checkbox-icon"
                />
              </h4>

              <hr v-if="!summary && item.item_type !== 'check_box'" class="mt-1 mb-3" />

              <template v-if="item.item_type === 'link_list' && itemHasContent(item)">
                <div class="hstack gap-1 flex-wrap" data-test="resource-link-list">
                  <span v-if="summary">{{
                    `${getMeaningfulLabel(item as unknown as IterableObject, i18nLocale, `${t("js.components.AVResourceSection.human")} ${item.item_type}`)}:`
                  }}</span>
                  <AVLinkVisualizer
                    v-for="link in item.form_content"
                    :key="(link as Url).attributes.name"
                    :link="link"
                    :large="!summary"
                  />
                </div>
              </template>

              <div
                v-else-if="item.item_type === 'check_box' && summary"
                data-test="resource-checkbox-summary"
              >
                <span>{{
                  getMeaningfulLabel(
                    item as unknown as IterableObject,
                    i18nLocale,
                    `${t("js.components.AVResourceSection.human")} ${item.item_type}`,
                  )
                }}</span>
                <AVIcon
                  :icon="item.form_content ? 'square-check' : 'square-xmark'"
                  :class="item.form_content ? 'text-success ms-1' : 'text-danger ms-1'"
                  :aria-label="
                    item.form_content
                      ? t('js.components.AVResourceSection.true')
                      : t('js.components.AVResourceSection.false')
                  "
                />
              </div>

              <div
                v-else-if="item.item_type === 'select' && itemHasContent(item)"
                data-test="resource-selection"
              >
                <span v-if="summary">{{
                  `${getMeaningfulLabel(item as unknown as IterableObject, i18nLocale, `${t("js.components.AVResourceSection.human")} ${item.item_type}`)}:`
                }}</span>
                {{ (item.form_content as LocalString)[i18nLocale] }}
              </div>

              <div
                v-else-if="item.item_type === 'video' && itemHasContent(item)"
                data-test="resource-video"
              >
                <iframe
                  style="width: 100%; height: 100%; min-height: 400px"
                  :src="item.form_content.toString()"
                  :aria-label="t('js.components.AVResourceSection.video')"
                ></iframe>
              </div>

              <div
                v-else-if="item.item_type === 'rich_text_area' && !summary && itemHasContent(item)"
                class="AVResourceSection--rich-text"
                v-html="
                  item.localised
                    ? (item.form_content as LocalString)[i18nLocale]
                    : item.form_content
                "
                data-test="resource-rich-text"
              />

              <template
                v-else-if="item.item_type !== 'rich_text_area' && item.item_type !== 'check_box'"
              >
                <p
                  class="AVResourceSection--regular-content"
                  :class="{ 'text-truncate': summary }"
                  data-test="resource-regular-content"
                >
                  <span v-if="summary">{{
                    `${getMeaningfulLabel(item as unknown as IterableObject, i18nLocale, `${t("js.components.AVResourceSection.human")} ${item.item_type}`)}: `
                  }}</span>
                  <template v-if="item.item_type === 'date' || item.item_type === 'date_time'">{{
                    d(item.form_content, item.item_type === "date" ? null : "long")
                  }}</template>
                  <template v-else>
                    {{
                      item.localised
                        ? (item.form_content as LocalString)[i18nLocale]
                        : item.form_content
                    }}
                  </template>
                </p>
              </template>
            </div>
          </template>
        </template>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss" src="./AVResourceSection.scss" />
