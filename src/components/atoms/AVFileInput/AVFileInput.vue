<script setup lang="ts">
import { ref, onMounted, computed, inject, watch } from "vue";
import { switchLocale } from "@/i18n";
import type { PropType, SupportedLocale } from "@/types";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  value: {
    type: Array as PropType<File[]>,
    default: () => [],
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  accept: {
    type: String,
    required: true,
  },
  error: {
    type: Boolean,
    default: false,
  },
  errorMessage: {
    type: String,
    default: null,
  },
  showPreview: {
    type: Boolean,
    default: false,
  },
  locale: {
    type: String as PropType<SupportedLocale>,
    default: null,
  },
  disableAcceptedFormats: {
    type: Boolean,
    default: false,
  },
  currentValue: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  multiple: {
    type: Boolean,
    default: false,
  },
});

const isDragging = ref<boolean>(false);
const fileInput = ref<HTMLInputElement | null>(null);
const files = ref<File[]>([]);

onMounted(() => {
  if (props.locale) switchLocale(props.locale);
  if (props.value) files.value = props.value;
});

watch(
  () => props.locale,
  () => {
    if (props.locale) switchLocale(props.locale);
  },
  { deep: true },
);

const emit = defineEmits(["update", "fileFormatNotAccepted", "download"]);

const onChange = () => {
  if (fileInput.value?.files) files.value = [...fileInput.value.files];
  emit("update", files.value);
};

const dragOver = (e: Event) => {
  e.preventDefault();
  if (props.disabled) return;
  isDragging.value = true;
};

const dragLeave = () => {
  isDragging.value = false;
};

const verifyFileType = (transferedFiles: File[]) => {
  const fs = Array.from(transferedFiles);

  const dataTransfer = new DataTransfer();

  for (const f of fs) {
    const fileExtension: string = f.name.split(".").pop() || "";
    const validFile = lowerCasedFormats.value.includes(`.${fileExtension.toLowerCase()}`);

    if (validFile) {
      const newFile = new File([f], f.name, {
        type: f.type,
        lastModified: f.lastModified,
      });

      dataTransfer.items.add(newFile);
    } else {
      emit("fileFormatNotAccepted", f.name);
    }
  }

  return dataTransfer.files;
};

const acceptedFormats = computed(() => props.accept.split(","));
const acceptedFormatsToText = computed(() => {
  const formats = props.accept.split(",").join(", ");
  return formats;
});
const lowerCasedFormats = computed(() =>
  acceptedFormats.value.map((format) => format.toLocaleLowerCase()),
);

const getFileSize = (fileSize: number): string => {
  const kb = Math.round(fileSize / 1024);
  const mb = Math.round(kb / 1024);
  const gb = Math.round(mb / 1024);

  switch (true) {
    case Boolean(gb):
      return `${gb}Gb`;
    case Boolean(mb):
      return `${mb}Mb`;
    case Boolean(kb):
      return `${kb}Kb`;
    default:
      return `${fileSize}b`;
  }
};

const currentValueFileName = (filePath: string) => {
  return filePath.split("/").pop();
};

const drop = (e: DragEvent) => {
  e.preventDefault();
  if (props.disabled) return;

  if (fileInput.value && e.dataTransfer)
    fileInput.value.files = verifyFileType(Array.from(e.dataTransfer.files));

  if (!fileInput.value?.files) {
    isDragging.value = false;
    return;
  }

  files.value = props.multiple ? [...fileInput.value.files] : [fileInput.value.files[0]];
  emit("update", files.value);
  isDragging.value = false;
};

const remove = (i: number) => {
  files.value.splice(i, 1);
  emit("update", files.value);
};

const generateURL = (file: File) => {
  const fileSrc = URL.createObjectURL(file);
  setTimeout(() => {
    URL.revokeObjectURL(fileSrc);
  }, 1000);
  return fileSrc;
};

const downloadFile = (file: string) => {
  emit("download", file);
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
  <div class="w-100 h-100 vstack">
    <label
      :for="id"
      class="AVFileInput--dropzone-container rounded vstack justify-content-center align-items-center"
      :class="{
        error: error,
        disabled: disabled,
      }"
      @dragover="dragOver"
      @dragleave="dragLeave"
      @drop="drop"
    >
      <input
        type="file"
        :multiple="multiple"
        :name="id"
        :id="id"
        class="AVFileInput-hidden-input opacity-0 overflow-hidden"
        @change="onChange"
        ref="fileInput"
        :accept="accept"
        :disabled="disabled"
      />

      <div class="hstack align-items-center justify-content-center">
        <AVIcon icon="cloud-arrow-up" class="text-gray-500 fs-1" data-test="input-icon" />
      </div>

      <p class="AVFileInput--dragdroptext text-gray-700 text-center m-0">
        <span v-if="isDragging">
          {{ t("js.components.AVFileInput.release") }}
        </span>
        <span v-else>
          <span>
            {{ t("js.components.AVFileInput.primary") }}
          </span>
          <br />
          <span class="small">
            {{ t("js.components.AVFileInput.secondary.start") }}
            <strong class="text-theme">
              {{ t("js.components.AVFileInput.secondary.strong") }}
            </strong>
            {{ t("js.components.AVFileInput.secondary.end") }}
          </span>
        </span>
      </p>
    </label>

    <p v-if="!disableAcceptedFormats" class="my-2 small text-gray-600">
      <strong>
        {{ t("js.components.AVFileInput.acceptedFormats") }}
      </strong>
      &nbsp;
      <em>{{ acceptedFormatsToText }}</em>
    </p>

    <div v-if="files.length" class="vstack gap-2">
      <p class="form-label mt-2">
        {{ t("js.components.AVFileInput.uploading") }}
      </p>
      <div
        v-for="file in files"
        :key="file.name"
        class="AVFileInput--preview-card rounded border hstack justify-content-between align-content-center p-2 pe-1"
        :class="{ error: error }"
      >
        <div class="AVFileInput--header hstack align-items-center gap-2">
          <img
            v-if="showPreview"
            class="AVFileInput--preview-img rounded-1"
            :src="generateURL(file)"
          />
          <AVIcon v-else icon="file" data-test="file-preview-icon" />
          <p class="text-gray-800 m-0">
            {{ file.name }}&nbsp;<em class="text-gray-600">({{ getFileSize(file.size) }})</em>
          </p>
        </div>

        <button
          v-if="!disabled"
          class="btn btn-theme-danger-outline border-theme-danger"
          type="button"
          @click="remove(files.indexOf(file))"
          title="Remove file"
        >
          <AVIcon icon="trash" data-test="file-preview-icon" />
        </button>
      </div>
    </div>

    <div v-if="currentValue.length" class="vstack gap-2">
      <p class="form-label mt-2">
        {{ t("js.components.AVFileInput.current") }}
      </p>

      <div v-for="file in currentValue" :key="`image-${file}`">
        <img
          v-if="showPreview"
          class="AVFileInput--current-img img-thumbnail"
          :src="file"
          :alt="t('js.components.AVFileInput.alt_preview')"
        />

        <div
          v-else
          class="AVFileInput--preview-card rounded border hstack justify-content-between align-content-center py-2 ps-3 pe-1"
        >
          <div class="AVFileInput--header hstack align-items-center gap-2">
            <AVIcon icon="file" class="text-gray-700" data-test="file-preview-icon" />
            <p class="text-gray-800 m-0">
              {{ currentValueFileName(file) }}
            </p>
          </div>
          <button
            class="btn btn-theme-outline"
            type="button"
            title="Download file"
            @click="downloadFile(file)"
          >
            <AVIcon icon="download" data-test="file-download-icon" />
          </button>
        </div>
      </div>
    </div>

    <p
      v-if="error && errorMessage"
      class="AVFileInput--error rounded px-3 py-2 bg-theme-danger"
      data-test="error-msg"
    >
      {{ errorMessage }}
    </p>
  </div>
</template>

<style scoped lang="scss" src="./AVFileInput.scss" />
