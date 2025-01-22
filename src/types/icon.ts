export * from "@fortawesome/fontawesome-common-types";

import type { IconPrefix, IconName, IconDefinition } from "@fortawesome/fontawesome-common-types";

export type IconAttribute = {
  [attributeName: string]: string | number;
};

export interface AbstractElement {
  tag: string;
  prefix?: IconPrefix;
  iconName?: IconName;
  icon?: IconDefinition;
  attributes: IconAttribute;
  children?: AbstractElement[];
}

export interface IconMixin {
  attrs: IconAttribute;
}
