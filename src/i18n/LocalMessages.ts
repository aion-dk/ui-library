/* ATOMS */
import AVSpinner from "@/components/atoms/AVSpinner/AVSpinner.messages";
// import AVFileInput from "@/components/atoms/AVFileInput/AVFileInput.messages";
// import AVOptionCheckbox from "@/components/atoms/AVOptionCheckbox/AVOptionCheckbox.messages";
// import AVOptionSelect from "@/components/atoms/AVOptionSelect/AVOptionSelect.messages";

/* MOLECULES */
// import AVBlankOption from "@/components/molecules/AVBlankOption/AVBlankOption.messages";
// import AVOption from "@/components/molecules/AVOption/AVOption.messages";
// import AVSearchBallot from "@/components/molecules/AVSearchBallot/AVSearchBallot.messages";
// import AVSplitWeightHelper from "@/components/molecules/AVSplitWeightHelper/AVSplitWeightHelper.messages";
// import AVSplitWizardHeader from "@/components/molecules/AVSplitWizardHeader/AVSplitWizardHeader.messages";
// import AVSubmissionHelper from "@/components/molecules/AVSubmissionHelper/AVSubmissionHelper.messages";
// import AVSummaryOption from "@/components/molecules/AVSummaryOption/AVSummaryOption.messages";
// import AVWriteInOption from "@/components/molecules/AVWriteInOption/AVWriteInOption.messages";
// import AVRecommendationList from "@/components/molecules/AVRecommendationList/AVRecommendationList.messages";

/* ORGANISMS */
// import AVBallot from "@/components/organisms/AVBallot/AVBallot.messages";
// import AVPileSummary from "@/components/organisms/AVPileSummary/AVPileSummary.messages";
// import AVSplitHelper from "@/components/organisms/AVSplitHelper/AVSplitHelper.messages";
// import AVResourceSection from "@/components/organisms/AVResourceSection/AVResourceSection.messages";
// import AVCalculateResultContent from "@/components/organisms/AVCalculateResultContent/AVCalculateResultContent.messages";
// import AVRankedSummary from "@/components/organisms/AVRankedSummary/AVRankedSummary.messages";
// import AVInstantRunoffSummary from "@/components/organisms/AVInstantRunoffSummary/AVInstantRunoffSummary.messages";

import type {
  LocalString,
  SupportedLocales,
  ComponentTranslationList,
  DefineLocaleMessage,
} from "@/types";

const components: DefineLocaleMessage = {
  /* ATOMS */
  AVSpinner,
  // AVFileInput,
  // AVOptionCheckbox,
  // AVOptionSelect,
  /* MOLECULES */
  // AVBlankOption,
  // AVOption,
  // AVSearchBallot,
  // AVSplitWeightHelper,
  // AVSplitWizardHeader,
  // AVSubmissionHelper,
  // AVSummaryOption,
  // AVWriteInOption,
  // AVRecommendationList,
  /* ORGANISMS */
  // AVBallot,
  // AVPileSummary,
  // AVSplitHelper,
  // AVResourceSection,
  // AVCalculateResultContent,
  // AVRankedSummary,
  // AVInstantRunoffSummary,
};

const getTranslations = (locale: SupportedLocales) => {
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
