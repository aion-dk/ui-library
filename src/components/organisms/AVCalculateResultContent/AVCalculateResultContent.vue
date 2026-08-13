<script setup lang="ts">
import { computed } from "vue";
import type {
  PropType,
  SupportedLocale,
  AVCalculateResultContentRole,
  AVCalculateResultContentStatus,
  AVCalculateResultContentElapsed,
} from "@/types";
import { useLocalization } from "@/composables/useLocalization";

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

const { t } = useLocalization(() => props.locale);
</script>

<template>
  <div class="AVCalculateResultContent--container vstack gap-3 mt-3 text-body-70">
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
