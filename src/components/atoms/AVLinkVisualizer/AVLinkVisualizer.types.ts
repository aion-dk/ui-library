import { LINK_VISUALIZER_KEYS } from "@/constants";

type AVLinkVisualizerKey = (typeof LINK_VISUALIZER_KEYS)[number];

type AVLinkVisualizerType = Record<AVLinkVisualizerKey, RegExp>;

export type { AVLinkVisualizerKey, AVLinkVisualizerType };
