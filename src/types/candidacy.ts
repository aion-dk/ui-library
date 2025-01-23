import type { LocalString } from "@/types";

type ItemType =
  | "video"
  | "check_box"
  | "date_time"
  | "date"
  | "divider"
  | "image"
  | "information"
  | "link_list"
  | "number"
  | "rich_text_area"
  | "text"
  | "image_link"
  | "jumbotron"
  | "select";

type ItemPurpose = "generic" | "summary" | "title" | "subtitle" | "identifier";

type ResourceDataContent = string | number | boolean | Url[] | LocalString;

type RecommendationPublicType = "public" | "private" | "public_count";

interface Url {
  attributes: {
    url: string;
    name: string;
  };
}

interface ResourceGroup {
  id: number;
  title: LocalString;
}

type ResourceData = {
  [purpose in ItemPurpose]: ResourceItem[];
};

interface ResourceItem {
  id: number;
  attribute_name: string;
  label: LocalString;
  purpose: ItemPurpose;
  position: number;
  item_type: ItemType;
  form_content: ResourceDataContent;
  localised?: boolean;
}

interface Resource extends ResourceData {
  groups?: ResourceGroup[];
}

interface Recommendation {
  id: number;
  position: number;
  label: string;
}

export type {
  ItemType,
  ItemPurpose,
  ResourceDataContent,
  Url,
  ResourceGroup,
  ResourceData,
  ResourceItem,
  Resource,
  Recommendation,
  RecommendationPublicType,
};
