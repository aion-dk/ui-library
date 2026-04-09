import type { DefineLocaleMessage } from "@/types";

const translations: DefineLocaleMessage = {
  ar: {
    amount: "لا أصوات | {n} صوت | {n} أصوات",
    used_credits: "لا أرصدة صوتية مستخدمة | {n} رصيد صوتي مستخدم | {n} أرصدة صوتية مستخدمة",
    aria_label: {
      add: "إضافة صوت واحد",
      substract: "طرح صوت واحد",
    },
  },
  ca: {
    amount: "cap vot | {n} vot | {n} vots",
    used_credits:
      "cap crèdit de veu utilitzat | {n} crèdit de veu utilitzat | {n} crèdits de veu utilitzats",
    aria_label: {
      add: "Afegeix un vot",
      substract: "Resta un vot",
    },
  },
  cy: {
    amount: "dim pleidleisiau | {n} bleidlais | {n} phleidlais",
    used_credits:
      "dim credydau llais wedi'u defnyddio | {n} credyd llais wedi'i ddefnyddio | {n} credyd llais wedi'u defnyddio",
    aria_label: {
      add: "Ychwanegu un bleidlais",
      substract: "Tynnu un bleidlais",
    },
  },
  da: {
    amount: "ingen stemmer | {n} stemme | {n} stemmer",
    used_credits:
      "ingen stemmekreditter brugt | {n} stemmekredit brugt | {n} stemmekreditter brugt",
    aria_label: {
      add: "Tilføj én stemme",
      substract: "Fratræk én stemme",
    },
  },
  de: {
    amount: "keine Stimmen | {n} Stimme | {n} Stimmen",
    used_credits:
      "keine Stimmguthaben verwendet | {n} Stimmguthaben verwendet | {n} Stimmguthaben verwendet",
    aria_label: {
      add: "Eine Stimme hinzufügen",
      substract: "Eine Stimme entfernen",
    },
  },
  en: {
    amount: "no votes | {n} vote | {n} votes",
    used_credits: "No voice credits used | {n} voice credit used | {n} voice credits used",
    aria_label: {
      add: "Add one vote",
      substract: "Subtract one vote",
    },
  },
  es: {
    amount: "sin votos | {n} voto | {n} votos",
    used_credits:
      "no utiliza créditos de voz | {n} crédito de voz utilizado | {n} créditos de voz utilizados",
    aria_label: {
      add: "Agregar un voto",
      substract: "Restar un voto",
    },
  },
  fi: {
    amount: "ei ääniä | {n} ääni | {n} ääntä",
    used_credits:
      "ei käytettyjä äänikrediittejä | {n} äänikrediitti käytetty | {n} äänikrediittiä käytetty",
    aria_label: {
      add: "Lisää yksi ääni",
      substract: "Vähennä yksi ääni",
    },
  },
  fr: {
    amount: "aucun vote | {n} vote | {n} votes",
    used_credits:
      "aucun crédit de voix utilisé | {n} crédit de voix utilisé | {n} crédits de voix utilisés",
    aria_label: {
      add: "Ajouter un vote",
      substract: "Retirer un vote",
    },
  },
  is: {
    amount: "engin atkvæði | {n} atkvæði | {n} atkvæði",
    used_credits: "engin raddkreditar notuð | {n} raddkreditur notaður | {n} raddkreditar notaðir",
    aria_label: {
      add: "Bæta við einu atkvæði",
      substract: "Draga frá einu atkvæði",
    },
  },
  it: {
    amount: "nessun voto | {n} voto | {n} voti",
    used_credits:
      "nessun credito voce utilizzato | {n} credito voce utilizzato | {n} crediti voce utilizzati",
    aria_label: {
      add: "Aggiungi un voto",
      substract: "Rimuovi un voto",
    },
  },
  nl: {
    amount: "geen stemmen | {n} stem | {n} stemmen",
    used_credits:
      "geen stemkredieten gebruikt | {n} stemkrediet gebruikt | {n} stemkredieten gebruikt",
    aria_label: {
      add: "Voeg één stem toe",
      substract: "Verwijder één stem",
    },
  },
  ja: {
    amount: "投票なし | {n} 票 | {n} 票",
    used_credits: "音声クレジット未使用 | {n} 音声クレジット使用済み | {n} 音声クレジット使用済み",
    aria_label: {
      add: "1票追加する",
      substract: "1票減らす",
    },
  },
  ko: {
    amount: "투표 없음 | {n} 표 | {n} 표",
    used_credits: "사용된 음성 크레딧 없음 | {n} 음성 크레딧 사용됨 | {n} 음성 크레딧 사용됨",
    aria_label: {
      add: "한 표 추가",
      substract: "한 표 빼기",
    },
  },
  zh: {
    amount: "无投票 | {n} 票 | {n} 票",
    used_credits: "未使用语音积分 | {n} 语音积分已使用 | {n} 语音积分已使用",
    aria_label: {
      add: "添加一票",
      substract: "减少一票",
    },
  },
  pl: {
    amount: "brak głosów | {n} głos | {n} głosów",
    used_credits:
      "brak użytych kredytów głosowych | {n} kredyt głosowy użyty | {n} kredytów głosowych użytych",
    aria_label: {
      add: "Dodaj jeden głos",
      substract: "Odejmij jeden głos",
    },
  },
  pt: {
    amount: "sem votos | {n} voto | {n} votos",
    used_credits:
      "sem créditos de voz usados | {n} crédito de voz usado | {n} créditos de voz usados",
    aria_label: {
      add: "Adicionar um voto",
      substract: "Subtrair um voto",
    },
  },
  ro: {
    amount: "fără voturi | {n} vot | {n} voturi",
    used_credits:
      "fără credite vocale utilizate | {n} credit vocal utilizat | {n} credite vocale utilizate",
    aria_label: {
      add: "Adăugați un vot",
      substract: "Scădeți un vot",
    },
  },
  ru: {
    amount: "нет голосов | {n} голос | {n} голосов",
    used_credits:
      "голосовые кредиты не использованы | {n} голосовой кредит использован | {n} голосовых кредитов использовано",
    aria_label: {
      add: "Добавить один голос",
      substract: "Убрать один голос",
    },
  },
  sv: {
    amount: "inga röster | {n} röst | {n} röster",
    used_credits: "inga röstpoäng använda | {n} röstpoäng använd | {n} röstpoäng använda",
    aria_label: {
      add: "Lägg till en röst",
      substract: "Ta bort en röst",
    },
  },
};

export default translations;
