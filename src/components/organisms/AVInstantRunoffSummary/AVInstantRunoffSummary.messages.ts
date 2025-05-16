import type { DefineLocaleMessage } from "@/types";

const translations: DefineLocaleMessage = {
  ar: {
    seat_n: "المقعد {n}",
    header: {
      candidate: "المرشح",
      round_n: "الجولة {n}",
    },
    summary: {
      transfered_votes: "الأصوات المحولة من المرشحين المستبعدين",
      exhausted: "بطاقات الاقتراع المستنفدة",
      not_included_count: "أصوات المرشحين المنتخبين غير المدرجين في العد لهذا المقعد",
      abstain: "امتناع عن التصويت",
      total_votes: "إجمالي الأصوات",
      quota: "الحصص اللازمة للانتخاب",
      null_votes: "الأصوات الفارغة",
    },
  },
  ca: {
    seat_n: "Banca {n}",
    header: {
      candidate: "Candidata",
      round_n: "Ronda {n}",
    },
    summary: {
      transfered_votes: "Vots transferits de candidatures eliminades",
      exhausted: "Votacions esgotades",
      not_included_count:
        "Vots per candidatures electes no inclosos en l escrutini per aquesta banca",
      abstain: "Abstencions",
      total_votes: "Vots totals",
      quota: "Mínim requerit per ser electe",
      null_votes: "Vots nuls",
    },
  },
  cy: {
    seat_n: "Sedd {n}",
    header: {
      candidate: "Ymgeisydd",
      round_n: "Rownd {n}",
    },
    summary: {
      transfered_votes: "Pleidleisiau a drosglwyddwyd oddi wrth ymgeiswyr a ddilëwyd",
      exhausted: "Cardiau blinedig",
      not_included_count:
        "Pleidleisiau ar gyfer ymgeiswyr etholedig nad ydynt wedi'u cynnwys yn y cyfrif ar gyfer y sedd hon",
      abstain: "Atal",
      total_votes: "Cyfanswm Pleidleisiau",
      quota: "Mae angen cworwm ar gyfer etholiad",
      null_votes: "Pleidleisiau gwag",
    },
  },
  da: {
    seat_n: "Sæde {n}",
    header: {
      candidate: "Kandidat",
      round_n: "Runde {n}",
    },
    summary: {
      transfered_votes: "Overførte stemmer fra eliminerede kandidater",
      exhausted: "Opbrugte stemmesedler",
      not_included_count:
        "Stemmer på valgte kandidater, der ikke indgår i optællingen til denne plads",
      abstain: "Udeladt at stemme",
      total_votes: "Samlet antal stemmer",
      quota: "Kvote nødvendig til valg",
      null_votes: "Nul stemmer",
    },
  },
  de: {
    seat_n: "Sitz {n}",
    header: {
      candidate: "Kandidat",
      round_n: "Runde {n}",
    },
    summary: {
      transfered_votes: "Übertragene Stimmen von ausgeschiedenen Kandidaten",
      exhausted: "Erschöpfte Stimmzettel",
      not_included_count:
        "Stimmen für gewählte Kandidaten, die nicht in die Zählung für diesen Sitz einbezogen werden",
      abstain: "Verzichten",
      total_votes: "Gesamte stimmen",
      quota: "Quote für die Wahl erforderlich",
      null_votes: "Nullstimmen",
    },
  },
  en: {
    seat_n: "Seat {n}",
    header: {
      candidate: "Candidate",
      round_n: "Round {n}",
    },
    summary: {
      transfered_votes: "Transferred votes from eliminated candidates",
      exhausted: "Exhausted ballots",
      not_included_count: "Votes for elected candidates not included in the count for this seat",
      abstain: "Abstain",
      total_votes: "Total votes",
      quota: "Quota needed for election",
      null_votes: "Null votes",
    },
  },
  es: {
    seat_n: "Banca Nº {n}",
    header: {
      candidate: "Candidato",
      round_n: "Ronda {n}",
    },
    summary: {
      transfered_votes: "Votos transferidos de candidatos eliminados",
      exhausted: "Papeletas agotadas",
      not_included_count:
        "Votos para candidatos electos no incluídos en el escrutinio para esta banca",
      abstain: "Abstenciones",
      total_votes: "Votos totales",
      quota: "Mínimo requerido para ser electo",
      null_votes: "Votos nulos",
    },
  },
  fi: {
    seat_n: "Istuin {n}",
    header: {
      candidate: "Ehdokas",
      round_n: "Kierros {n}",
    },
    summary: {
      transfered_votes: "Äänet siirretty poistuneilta ehdokkaista",
      exhausted: "Loppuneet äänestysliput",
      not_included_count:
        "Äänet valituille ehdokkaille, jotka eivät sisälly tämän paikan laskemiseen",
      abstain: "Pidättäytyä äänestämästä",
      total_votes: "Äänet yhteensä",
      quota: "Vaaleihin tarvitaan kiintiö",
      null_votes: "Nollaäänet",
    },
  },
  fr: {
    seat_n: "Siège {n}",
    header: {
      candidate: "Candidat",
      round_n: "Tour {n}",
    },
    summary: {
      transfered_votes: "Votes transférés des candidats éliminés",
      exhausted: "Bulletins épuisés",
      not_included_count: "Votes pour les candidats élus non inclus dans le décompte de ce siège",
      abstain: "Abstention",
      total_votes: "Total des votes",
      quota: "Quota nécessaire pour l'élection",
      null_votes: "Votes nuls",
    },
  },
  is: {
    seat_n: "Sæti {n}",
    header: {
      candidate: "Frambjóðandi",
      round_n: "Umferð {n}",
    },
    summary: {
      transfered_votes: "Flutt atkvæði frá útskrifuðum frambjóðendum",
      exhausted: "Búið að tæma kjörseðla",
      not_included_count: "Atkvæði kjörinna frambjóðenda sem ekki eru taldir með í þetta sæti",
      abstain: "Forðastu",
      total_votes: "Samtals atkvæði",
      quota: "Kvóti sem þarf til kosninga",
      null_votes: "Núll atkvæði",
    },
  },
  it: {
    seat_n: "Seggio {n}",
    header: {
      candidate: "Candidato",
      round_n: "Round {n}",
    },
    summary: {
      transfered_votes: "Voti trasferiti dai candidati eliminati",
      exhausted: "Schede esaurite",
      not_included_count: "Voti per i candidati eletti non inclusi nel conteggio per questo seggio",
      abstain: "Astenuti",
      total_votes: "Voti totali",
      quota: "Quorum necessario per l'elezione",
      null_votes: "Voti nulli",
    },
  },
  nl: {
    seat_n: "Zitting {n}",
    header: {
      candidate: "Kandidaat",
      round_n: "Ronde {n}",
    },
    summary: {
      transfered_votes: "Overgedragen stemmen van geëlimineerde kandidaten",
      exhausted: "Uitgeput stembiljetten",
      not_included_count: "Stemmen voor gekozen kandidaten die niet zijn meegeteld voor deze zetel",
      abstain: "Onthouden",
      total_votes: "Totaal aantal stemmen",
      quota: "Quotum nodig voor verkiezingen",
      null_votes: "Nul stemmen",
    },
  },
  pl: {
    seat_n: "Mandat {n}",
    header: {
      candidate: "Kandydat",
      round_n: "Runda {n}",
    },
    summary: {
      transfered_votes: "Przeniesione głosy z wyeliminowanych kandydatów",
      exhausted: "Wyczerpane karty",
      not_included_count: "Głosy na wybranych kandydatów nieuwzględnione w tej rundzie",
      abstain: "Wstrzymanie się od głosu",
      total_votes: "Liczba głosów",
      quota: "Kwota potrzebna do wyboru",
      null_votes: "Głosy zerowe",
    },
  },
  pt: {
    seat_n: "Lugar {n}",
    header: {
      candidate: "Candidato",
      round_n: "Ronda {n}",
    },
    summary: {
      transfered_votes: "Votos transferidos de candidatos eliminados",
      exhausted: "Boletins esgotados",
      not_included_count: "Votos para candidatos eleitos não incluídos na contagem para este lugar",
      abstain: "Abster-se",
      total_votes: "Total de votos",
      quota: "Quota necessária para a eleição",
      null_votes: "Votos nulos",
    },
  },
  ro: {
    seat_n: "Locul {n}",
    header: {
      candidate: "Candidat",
      round_n: "Runda {n}",
    },
    summary: {
      transfered_votes: "Voturi transferate de la candidații eliminați",
      exhausted: "Buletine epuizate",
      not_included_count:
        "Voturile pentru candidații aleși nu sunt incluse în numărătoarea pentru acest loc",
      abstain: "Abținere",
      total_votes: "Total voturi",
      quota: "Cotă necesară pentru alegeri",
      null_votes: "Voturi nule",
    },
  },
  ru: {
    seat_n: "Сиденье {n}",
    header: {
      candidate: "Кандидат",
      round_n: "{n} тур",
    },
    summary: {
      transfered_votes: "Перенесенные голоса от исключенных кандидатов",
      exhausted: "Исчерпанные бюллетени",
      not_included_count: "Голоса за избранных кандидатов, не включенные в подсчет на это место",
      abstain: "Воздержаться",
      total_votes: "Всего голосов",
      quota: "Квота нужна для выборов",
      null_votes: "Нулевые голоса",
    },
  },
  sv: {
    seat_n: "Plats {n}",
    header: {
      candidate: "Kandidat",
      round_n: "Omgång {n}",
    },
    summary: {
      transfered_votes: "Överförde röster från utslagna kandidater",
      exhausted: "Uttömda valsedlar",
      not_included_count: "Röster på valda kandidater som inte ingår i räkningen för denna plats",
      abstain: "Avstå",
      total_votes: "Totalt antal röster",
      quota: "Kvot behövs för val",
      null_votes: "Nollröster",
    },
  },
};

export default translations;
