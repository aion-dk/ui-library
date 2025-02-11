/* ATOMS */
import AVSpinner from "@/components/atoms/AVSpinner/AVSpinner.messages";
import AVOptionSelect from "@/components/atoms/AVOptionSelect/AVOptionSelect.messages";
import AVOptionCheckbox from "@/components/atoms/AVOptionCheckbox/AVOptionCheckbox.messages";
import AVOptionLiveResults from "@/components/atoms/AVOptionLiveResults/AVOptionLiveResults.messages";

/* MOLECULES */
import AVSummaryOption from "@/components/molecules/AVSummaryOption/AVSummaryOption.messages";
import AVBlankOption from "@/components/molecules/AVBlankOption/AVBlankOption.messages";
import AVOption from "@/components/molecules/AVOption/AVOption.messages";
import AVSearchBallot from "@/components/molecules/AVSearchBallot/AVSearchBallot.messages";
import AVSubmissionHelper from "@/components/molecules/AVSubmissionHelper/AVSubmissionHelper.messages";
import AVWriteInOption from "@/components/molecules/AVWriteInOption/AVWriteInOption.messages";
import AVSplitWeightHelper from "@/components/molecules/AVSplitWeightHelper/AVSplitWeightHelper.messages";
import AVSplitWizardHeader from "@/components/molecules/AVSplitWizardHeader/AVSplitWizardHeader.messages";
// import AVRecommendationList from "@/components/molecules/AVRecommendationList/AVRecommendationList.messages";

/* ORGANISMS */
import AVPileSummary from "@/components/organisms/AVPileSummary/AVPileSummary.messages";
import AVBallot from "@/components/organisms/AVBallot/AVBallot.messages";
// import AVResourceSection from "@/components/organisms/AVResourceSection/AVResourceSection.messages";
// import AVCalculateResultContent from "@/components/organisms/AVCalculateResultContent/AVCalculateResultContent.messages";
// import AVRankedSummary from "@/components/organisms/AVRankedSummary/AVRankedSummary.messages";
// import AVInstantRunoffSummary from "@/components/organisms/AVInstantRunoffSummary/AVInstantRunoffSummary.messages";

/* TEMPLATES */
import AVSplitHelper from "@/components/templates/AVSplitHelper/AVSplitHelper.messages";

import type {
  LocalString,
  SupportedLocale,
  ComponentTranslationList,
  DefineLocaleMessage,
} from "@/types";

const components: DefineLocaleMessage = {
  /* ATOMS */
  AVSpinner,
  AVOptionSelect,
  AVOptionCheckbox,
  AVOptionLiveResults,

  /* MOLECULES */
  AVSummaryOption,
  AVBlankOption,
  AVOption,
  AVSearchBallot,
  AVSubmissionHelper,
  AVWriteInOption,
  AVSplitWeightHelper,
  AVSplitWizardHeader,
  // AVRecommendationList,

  /* ORGANISMS */
  AVPileSummary,
  AVBallot,
  // AVResourceSection,
  // AVCalculateResultContent,
  // AVRankedSummary,
  // AVInstantRunoffSummary,

  /* TEMPLATES */
  AVSplitHelper,
};

const getTranslations = (locale: SupportedLocale) => {
  const componentTranslation: ComponentTranslationList = {};

  Object.keys(components).forEach((componentKey: string) => {
    componentTranslation[componentKey] = (components[componentKey] as LocalString)[locale];
  });

  return componentTranslation;
};

const messages = {
  ar: {
    js: {
      components: getTranslations("ar"),
    },
  },
  ca: {
    js: {
      components: getTranslations("ca"),
    },
  },
  da: {
    js: {
      components: getTranslations("da"),
    },
  },
  de: {
    js: {
      components: getTranslations("de"),
    },
  },
  en: {
    js: {
      components: getTranslations("en"),
    },
  },
  es: {
    js: {
      components: getTranslations("es"),
    },
  },
  fi: {
    js: {
      components: getTranslations("fi"),
    },
  },
  fr: {
    js: {
      components: getTranslations("fr"),
    },
  },
  is: {
    js: {
      components: getTranslations("is"),
    },
  },
  nl: {
    js: {
      components: getTranslations("nl"),
    },
  },
  pl: {
    js: {
      components: getTranslations("pl"),
    },
  },
  pt: {
    js: {
      components: getTranslations("pt"),
    },
  },
  ro: {
    js: {
      components: getTranslations("ro"),
    },
  },
  ru: {
    js: {
      components: getTranslations("ru"),
    },
  },
  sv: {
    js: {
      components: getTranslations("sv"),
    },
  },
};

export default messages;
