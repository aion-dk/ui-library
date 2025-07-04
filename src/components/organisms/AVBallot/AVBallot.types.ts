import type { OptionContent } from "@/types";

interface AVBallotGalleryOption extends OptionContent {
  isChildren: boolean;
  parentTitle?: string;
  parentColor?: string;
}

export type { AVBallotGalleryOption };
