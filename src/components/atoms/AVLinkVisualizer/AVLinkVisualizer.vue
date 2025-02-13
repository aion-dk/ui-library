<script setup lang="ts">
import { computed } from "vue";
import type { PropType, Url, AVLinkVisualizerKey, AVLinkVisualizerType } from "@/types";

const props = defineProps({
  link: {
    type: Object as PropType<Url>,
    required: true,
  },
  large: {
    type: Boolean,
    default: false,
  },
});

const regexps: AVLinkVisualizerType = {
  github: new RegExp(/^(http(s)?:\/\/)?([A-Za-z]+\.)?github\.com\//gm),
  instagram: new RegExp(/^(http(s)?:\/\/)?([A-Za-z]+\.)?instagram\.com\//gm),
  linkedin: new RegExp(/^(http(s)?:\/\/)?([A-Za-z]+\.)?linkedin\.com\/(in|profile|pub)\//gm),
  twitter: new RegExp(/^(http(s)?:\/\/)?([A-Za-z]+\.)?(twitter\.|x\.)com\//gm),
  envelope: new RegExp(/mailto:([^]*)/gm),
  facebook: new RegExp(/^(http(s)?:\/\/)?([A-Za-z]+\.)?facebook.com\//gm),
  vimeo: new RegExp(/^(http(s)?:\/\/)?([A-Za-z]+\.)?vimeo\.com\//gm),
  youtube: new RegExp(/^(http(s)?:\/\/)?([A-Za-z]+\.)?((?:youtube(-nocookie)?\.com|youtu.be))\//gm),
  tiktok: new RegExp(/^(http(s)?:\/\/)?([A-Za-z]+\.)?tiktok\.com\//gm),
};

const icon = computed(() => {
  let icon = "link";
  Object.keys(regexps).map((key) => {
    if (regexps[key as AVLinkVisualizerKey].test(props.link.attributes.url)) icon = key;
  });
  return icon;
});

const openLink = (url: string) => window.open(url, "_blank")?.focus();
</script>

<template>
  <button
    class="btn btn-theme d-flex gap-2 align-items-center"
    :class="{
      'btn-lg': large,
      'btn-sm': !large,
    }"
    data-test="button"
    @click="openLink(link.attributes.url)"
  >
    <AVIcon :icon="icon" data-test="icon" />
    <span data-test="name">{{ link.attributes.name }}</span>
  </button>
</template>

<style scoped lang="scss" src="./AVLinkVisualizer.scss" />
