import type { LocalString, OptionContent, OptionArg, ExampleColor } from "@/types";

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

const url: LocalString = {
  ar: "https://www.google.ar",
  ca: "https://www.google.ca",
  da: "https://www.google.dk",
  de: "https://www.google.de",
  en: "https://www.google.com/",
  es: "https://www.google.es",
  fi: "https://www.google.fi",
  fr: "https://www.google.fr",
  is: "https://www.google.is",
  nl: "https://www.google.nl",
  pl: "https://www.google.pl",
  pt: "https://www.google.pt",
  ro: "https://www.google.ro",
  ru: "https://www.google.ru",
  sv: "https://www.google.sv",
};

const image: string = "https://placehold.co/40";

const colors: ExampleColor = {
  1: "#FF0000",
  2: "#00FF00",
  3: "#0000FF",
};

const getOption = (args: OptionArg[], index: number, children: boolean = false, parent: number | null = null): OptionContent => {
  const option: OptionContent = {
    reference: children ? `exampleChildren${parent}-${index}` : `exampleOption${index}`,
    code: index,
    position: index,
    title: {
      ar: children ? `خيار الطفل ${parent}.${index}` : `خيار المثال ${index}`,
      ca: children ? `Opció infantil ${parent}.${index}` : `Opció d'exemple ${index}`,
      da: children ? `Barn mulighed ${parent}.${index}` : `Eksempel mulighed ${index}`,
      de: children ? `Kinderoption ${parent}.${index}` : `Beispieloption ${index}`,
      en: children ? `Child option ${parent}.${index}` : `Example option ${index}`,
      es: children ? `Opción subordinada ${parent}.${index}` : `Opción de ejemplo ${index}`,
      fi: children ? `Lapsi vaihtoehto ${parent}.${index}` : `Esimerkkivaihtoehto ${index}`,
      fr: children ? `Option enfant ${parent}.${index}` : `Exemple d'option ${index}`,
      is: children ? `Barnakostur ${parent}.${index}` : `Dæmi um valmöguleika ${index}`,
      nl: children ? `Kind optie ${parent}.${index}` : `Voorbeeld optie ${index}`,
      pl: children ? `Opcja dziecięca ${parent}.${index}` : `Przykładowa opcja ${index}`,
      pt: children ? `Opção infantil ${parent}.${index}` : `Opção de exemplo ${index}`,
      ro: children ? `Opțiunea pentru copii ${parent}.${index}` : `Exemplu de opțiune ${index}`,
      ru: children ? `Детский вариант ${parent}.${index}` : `Пример варианта ${index}`,
      sv: children ? `Alternativ för barn ${parent}.${index}` : `Exempelalternativ ${index}`,
    },
    description: args.includes("description") ? description : {},
    image: args.includes("image") ? image : "",
    selectable: args.includes("selectable"),
    exclusive: args.includes("exclusive"),
    children: args.includes("children") && !children ? getOptions(args, 2, true, index) : [],
    randomizeChildren: args.includes("randomizeChildren"),
    accentColor: args.includes("color") ? colors[index] : "",
    url: args.includes("url") ? url : {},
    candidateId: args.includes("candidacy") ? index : undefined,
  };

  return option;
};

const getOptions = (args: OptionArg[], quantity: number, children: boolean = false, parent: number | null = null): OptionContent[] => {
  const options: OptionContent[] = [];

  for (let index = 0; index < quantity; index++) {
    const option = getOption(args, index + 1, children, parent);
    options.push(option);
  }

  return options;
};

export { getOptions, getOption };
