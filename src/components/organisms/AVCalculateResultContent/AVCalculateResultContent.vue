<script setup lang="ts">
import { computed, inject, onMounted, watch } from "vue";
import { switchLocale } from "@/i18n";
import type {
  PropType,
  SupportedLocale,
  AVCalculateResultContentRole,
  AVCalculateResultContentStatus,
  AVCalculateResultContentElapsed,
} from "@/types";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  progress: {
    type: Number,
    default: 0,
    validate: (v: number) => v >= 0 && v <= 100,
  },
  role: {
    type: String as PropType<AVCalculateResultContentRole>,
    default: "decrypter",
  },
  status: {
    type: String as PropType<AVCalculateResultContentStatus>,
    default: "initial",
  },
  mixes: {
    type: Array,
    required: true,
    validate: (v: Array<number>) => v.length === 2,
  },
  decryptions: {
    type: Array,
    required: true,
    validate: (v: Array<number>) => v.length === 2,
  },
  elapsed: {
    type: String as PropType<AVCalculateResultContentElapsed>,
    required: true,
  },
  locale: {
    type: String as PropType<SupportedLocale>,
    default: null,
  },
});

const userRole = computed(() => t(`js.components.AVCalculateResultContent.roles.${props.role}`));

const currentStatus = computed(() =>
  t(`js.components.AVCalculateResultContent.status.${props.status}`),
);

const statusIcon = computed(() => {
  switch (props.status) {
    case "initial":
      return "hourglass-half";
    case "mixing":
      return "shuffle";
    case "decrypting":
      return "key";
    case "aggregating":
      return "calculator";
    case "finished":
      return "circle-check";
    default:
      return "xmark";
  }
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
  <div class="AVCalculateResultContent--container vstack gap-3 mt-3 text-gray-700">
    <AVProgressBar :id="`result_${id}`" :value="progress" data-test="progress" />
    <div class="AVCalculateResultContent--information align-items-start">
      <div
        class="AVCalculateResultContent--information-set AVCalculateResultContent--role"
        data-test="role"
      >
        <span class="AVCalculateResultContent--label">
          {{ t("js.components.AVCalculateResultContent.roles.label") }}
        </span>
        <span>
          <AVIcon icon="user-shield" />
          {{ userRole }}
        </span>
      </div>
      <div class="AVCalculateResultContent--information-set" data-test="status">
        <span class="AVCalculateResultContent--label">
          {{ t("js.components.AVCalculateResultContent.status.label") }}
        </span>
        <span class="hstack align-items-end">
          <AVIcon
            :icon="statusIcon"
            class="AVCalculateResultContent--status-icon me-1"
            :class="{
              'text-success': status === 'finished',
            }"
            data-test="status-icon"
          />
          {{ currentStatus }}
          <AVWaitingDots v-if="status !== 'finished'" />
        </span>
      </div>

      <div class="AVCalculateResultContent--information-set" data-test="mixes">
        <span class="AVCalculateResultContent--label">
          {{ t("js.components.AVCalculateResultContent.mixes.label") }}
        </span>
        <span>{{ `${mixes[0]}/${mixes[1]}` }}</span>
      </div>

      <div class="AVCalculateResultContent--information-set" data-test="decryptions">
        <span class="AVCalculateResultContent--label">
          {{ t("js.components.AVCalculateResultContent.decryptions.label") }}
        </span>
        <span>{{ `${decryptions[0]}/${decryptions[1]}` }}</span>
      </div>

      <div class="AVCalculateResultContent--information-set" data-test="time">
        <span class="AVCalculateResultContent--label">
          {{ t("js.components.AVCalculateResultContent.elapsed.label") }}
        </span>
        <time class="AVCalculateResultContent--elapsed">{{ elapsed }}</time>
      </div>
    </div>
  </div>
</template>

<style scoped src="./AVCalculateResultContent.scss" />
