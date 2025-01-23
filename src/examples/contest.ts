import type { LocalString, ContestContent, OptionContent, ContestArg } from "@/types";
import { getOptions } from "@/examples/option";

const description: LocalString = {
  ar: "<p>هذا وصف...</p>",
  ca: "<p>Aquesta és una descripció...</p>",
  da: "<p>Dette er en beskrivelse...</p>",
  de: "<p>Dies ist eine Beschreibung...</p>",
  en: "<p>This is a description...</p>",
  es: "<p>Esta es una descripción...</p>",
  fi: "<p>Tämä on kuvaus...</p>",
  fr: "<p>Ceci est une description...</p>",
  is: "<p>Þetta er lýsing...</p>",
  nl: "<p>Dit is een beschrijving...</p>",
  pl: "<p>To jest opis...</p>",
  pt: "<p>Esta é uma descrição...</p>",
  ro: "<p>Aceasta este o descriere...</p>",
  ru: "<p>Это описание...</p>",
  sv: "<p>Detta är en beskrivning...</p>",
};

const question: LocalString = {
  ar: "لمن يقرع الجرس؟",
  ca: "Per a qui sona el timbre?",
  da: "For hvem ringer klokken?",
  de: "Für wen läutet die Glocke?",
  en: "For whom does the bell toll?",
  es: "¿Por quién doblan las campanas?",
  fi: "Kenelle kellot soivat?",
  fr: "Pour qui sonne le glas ?",
  is: "Fyrir hvern hringir bjallan?",
  nl: "Voor wie luidt de bel?",
  pl: "Dla kogo bije dzwon?",
  pt: "Por quem dobra o sino?",
  ro: "Pentru cine bate clopotul?",
  ru: "По кому звонит колокол?",
  sv: "För vem klämtar klockan?",
};

const getContestOptions = (args: ContestArg[]): OptionContent[] => {
  if (args.includes("children_options")) return getOptions(["selectable", "children"], 3);
  else if (args.includes("color_options")) return getOptions(["selectable", "color"], 3);
  else if (args.includes("complete_options")) return getOptions(["selectable", "description", "image"], 3);
  else if (args.includes("many_options")) return getOptions(["selectable"], 8);
  else return getOptions(["selectable"], 3);
};

const getVotesAllowedPerOption = (args: ContestArg[]) => {
  if (args.includes("multiple_votes_lg")) return 10;
  else if (args.includes("multiple_votes_sm")) return 5;
  else return 1;
};

const getMaxMarks = (args: ContestArg[]) => {
  if (args.includes("many_options")) return 10;
  else if (args.includes("multiple_votes_lg")) return 10;
  else if (args.includes("multiple_votes_sm")) return 5;
  else if (args.includes("multi") || args.includes("ranked")) return 3;
  else return 1;
};

const getContest = (args: ContestArg[]): ContestContent => {
  return {
    reference: "exampleContest",
    title: {
      ar: "مثال الاقتراع",
      ca: "Exemple de papereta",
      da: "Eksempel valgseddel",
      de: "Beispielwahlzettel",
      en: "Example ballot",
      es: "Boleta de ejemplo",
      fi: "Esimerkkiäänestys",
      fr: "Exemple de bulletin de vote",
      is: "Dæmi um atkvæðagreiðslu",
      nl: "Voorbeeld stembiljet",
      pl: "Przykładowa karta do głosowania",
      pt: "Cédula de exemplo",
      ro: "Exemplu de vot",
      ru: "Пример бюллетеня",
      sv: "Exempel omröstning",
    },
    description: args.includes("description") ? description : {},
    question: args.includes("question") ? question : {},
    collapsable: args.includes("collapsable"),
    collapseDefault: args.includes("collapse_default"),
    searchForm: args.includes("search_form"),
    randomizeOptions: args.includes("randomize"),
    blankOptionColor: args.includes("color_options") ? "#999999" : "",
    markingType: {
      votesAllowedPerOption: getVotesAllowedPerOption(args),
      blankSubmission: args.includes("blank") ? "active_choice" : "disabled",
      minMarks: 1,
      maxMarks: getMaxMarks(args),
      voteVariation: args.includes("ranked") ? "ranked" : "normal",
      encoding: { codeSize: 1, maxSize: 1, cryptogramCount: 1 },
    },
    resultType: { name: "regular" },
    options: getContestOptions(args),
  };
};

export default getContest;
