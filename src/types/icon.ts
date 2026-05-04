import type {
  IconPrefix,
  IconName,
  IconDefinition,
  IconPack,
  IconLookup,
} from "@fortawesome/fontawesome-common-types";

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

export interface IconNotFound extends IconLookup {
  iconName: IconName & "not_found";
}

export type { IconName, IconPack, IconLookup };
