<script setup lang="ts">
import { inject, onMounted, watch } from "vue";
import { switchLocale } from "@/i18n";
import type { PropType, SupportedLocale, Party } from "@/types";

const props = defineProps({
  parties: {
    type: Array as PropType<Party[]>,
    required: true,
  },
  candidateValue: {
    type: String,
    required: true,
  },
  partyValue: {
    type: String,
    required: true,
  },
  checkedValue: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  observerMode: {
    type: Boolean,
    defaul: false,
  },
  locale: {
    type: String as PropType<SupportedLocale>,
    default: null,
  },
});

const emits = defineEmits(["update:candidateValue", "update:partyValue", "update:checkedValue"]);

const setWriteInCandidate = (text: string) => {
  emits("update:candidateValue", text);
  setChecked();
};

const setWriteInParty = (party: string) => {
  emits("update:partyValue", party);
  setChecked();
};

const setChecked = () => {
  const checked = props.partyValue !== "" || props.candidateValue !== "";
  if (checked !== props.checkedValue) emits("update:checkedValue", checked);
};

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
  <div
    class="AVWriteInOption card position-relative"
    :class="{
      'opacity-80': disabled,
    }"
    :aria-label="t('js.components.AVWriteInOption.aria_labels.option')"
  >
    <div class="hstack">
      <form class="row g-1 p-3 flex-grow-1">
        <div id="option_writeIn" class="AVWriteInOption--title col-12">
          {{ t("js.components.AVWriteInOption.title") }}
        </div>

        <div class="col-12 col-md-5">
          <label for="party_selector" class="visually-hidden">{{
            t("js.components.AVWriteInOption.aria_labels.party")
          }}</label>

          <select
            class="form-control"
            id="party_selector"
            :aria-label="t('js.components.AVWriteInOption.aria_labels.party')"
            :disabled="disabled"
            @input="setWriteInParty(($event.target as HTMLInputElement).value)"
          >
            <option value="">
              {{ t("js.components.AVWriteInOption.choose_party") }}
            </option>
            <option
              v-for="party in parties"
              :key="party.letter"
              :value="party.letter"
              :selected="party.letter === partyValue"
            >
              {{ party.letter }} - {{ party.name }}
            </option>
          </select>
        </div>

        <div class="col-12 col-md-5">
          <label for="candidate_name" class="visually-hidden">{{
            t("js.components.AVWriteInOption.aria_labels.candidate")
          }}</label>

          <input
            :value="candidateValue"
            id="candidate_name"
            class="form-control"
            :placeholder="t('js.components.AVWriteInOption.placeholder')"
            :aria-label="t('js.components.AVWriteInOption.aria_labels.candidate')"
            :disabled="disabled"
            @input="setWriteInCandidate(($event.target as HTMLInputElement).value)"
          />
        </div>
      </form>

      <AVOptionCheckbox
        class="AVWriteInOption--checkbox mt-3 me-3"
        :checked="checkedValue"
        :option-id="0"
        :disabled="disabled || observerMode"
      />
    </div>
  </div>
</template>

<style scoped lang="scss" src="./AVWriteInOption.scss" />
