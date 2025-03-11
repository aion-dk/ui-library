import type { ContestContent, Locale, LocalString, OptionContent, ResourceItem } from "@/types";

interface ParameterMap {
  option: OptionContent;
  contest: ContestContent;
  resource: ResourceItem;
  resourceLabel: ResourceItem;
}

type GetMeaningfulLabel = <K extends keyof ParameterMap>(
  type: K,
  object: ParameterMap[K],
  locale: Locale,
  t: (key: string) => string,
) => string;

const getMeaningfulLabel: GetMeaningfulLabel = (type, object, locale, t) => {
  if (type === "option" || type === "contest") {
    const OPTION_OR_CONTEST = object as OptionContent;
    switch (true) {
      case !!OPTION_OR_CONTEST.title[locale]:
        return OPTION_OR_CONTEST.title[locale];
      case !!OPTION_OR_CONTEST.title.en:
        return OPTION_OR_CONTEST.title.en;
      case !!Object.keys(OPTION_OR_CONTEST.title).length:
        const firstAvailableLocale = Object.keys(OPTION_OR_CONTEST.title)[0];
        return OPTION_OR_CONTEST.title[firstAvailableLocale];
      case type === "option" && (!!OPTION_OR_CONTEST.id || !!OPTION_OR_CONTEST.code):
        return `${t("js.components.AVOption.aria_labels.option")} #${OPTION_OR_CONTEST.id || OPTION_OR_CONTEST.code}`;
      case type === "contest" && !!OPTION_OR_CONTEST.id:
        return `${t("js.components.AVBallot.aria_labels.ballot")} #${OPTION_OR_CONTEST.id}`;
      case (type === "contest" || type === "option") && !!OPTION_OR_CONTEST.reference:
        return OPTION_OR_CONTEST.reference;
      default:
        return "Unknown resource";
    }
  } else if (type === "resource") {
    const RESOURCE = object as ResourceItem;
    switch (true) {
      case RESOURCE.localised && typeof RESOURCE.form_content === "object":
        const localisedFormContent = RESOURCE.form_content as LocalString;
        if (!!localisedFormContent[locale]) return localisedFormContent[locale];
        if (!!localisedFormContent.en) return localisedFormContent.en;
        if (!!Object.keys(localisedFormContent).length)
          return localisedFormContent[Object.keys(localisedFormContent)[0]];
      case !RESOURCE.localised && typeof RESOURCE.form_content === "string":
        return RESOURCE.form_content as string;
      default:
        return "";
    }
  } else if (type === "resourceLabel") {
    const RESOURCE = object as ResourceItem;
    switch (true) {
      case !!RESOURCE.label[locale]:
        return RESOURCE.label[locale];
      case !!RESOURCE.label.en:
        return RESOURCE.label.en;
      case !!Object.keys(RESOURCE.label).length:
        return RESOURCE.label[Object.keys(RESOURCE.label)[0]];
      case !!RESOURCE.internal_name:
        return RESOURCE.internal_name;
      case !!RESOURCE.attribute_name:
        return RESOURCE.attribute_name;
      case !!RESOURCE.item_type && (!!RESOURCE.position || !!RESOURCE.id):
        if (RESOURCE.position)
          return `${t("js.components.AVResourceSection.human")} ${RESOURCE.item_type} #${RESOURCE.position}`;
        if (RESOURCE.id)
          return `${t("js.components.AVResourceSection.human")} ${RESOURCE.item_type} #${RESOURCE.id}`;
      default:
        return "Unknown resource";
    }
  } else return "Unknown resource";
};

export { getMeaningfulLabel };
