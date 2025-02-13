import type { Resource, Url, LocalString, AVLinkVisualizerKey } from "@/types";
import image from "@/assets/silhouette.jpg";

const getUrl = (web: AVLinkVisualizerKey | "website"): Url => {
  return {
    attributes: {
      name: `My ${web}`,
      url: `https://www.${web}.com/example`,
    },
  };
};

const lorem: LocalString = {
  ar: "<p>هذا نص طويل جدًا. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae justo eget magna fermentum. In vitae turpis massa sed elementum. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed.</p>",
  ca: "<p>Aquest és un text molt llarg. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae justo eget magna fermentum. In vitae turpis massa sed elementum. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed.</p>",
  da: "<p>Dette er en meget lang tekst. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae justo eget magna fermentum. In vitae turpis massa sed elementum. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed.</p>",
  de: "<p>Das ist ein sehr langer Text. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae justo eget magna fermentum. In vitae turpis massa sed elementum. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed.</p>",
  en: "<p>This is a very long text. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae justo eget magna fermentum. In vitae turpis massa sed elementum. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed.</p>",
  es: "<p>Este es un texto muy largo. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae justo eget magna fermentum. In vitae turpis masa sed elementum. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed.</p>",
  fi: "<p>Tämä on erittäin pitkä teksti. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae justo eget magna fermentum. In vitae turpis massa sed elementum. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed.</p>",
  fr: "<p>C'est un très long texte. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae juste pour obtenir du magna fermentum. In vitae turpis massa sed elementum. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed.</p>",
  is: "<p>Þetta er mjög langur texti. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae justo eget magna fermentum. In vitae turpis massa sed elementum. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed.</p>",
  nl: "<p>Dit is een hele lange tekst. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae justo eget magna fermentum. In vitae turpis massa sed elementum. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed.</p>",
  pl: "<p>To jest bardzo długi tekst. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae justo eget magna fermentum. In vitae turpis massa sed elementum. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed.</p>",
  pt: "<p>Este é um texto muito longo. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidente ut labore et dolore magna aliqua. Vitae justo eget magna fermentum. In vitae turpis massa sed elementum. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed.</p>",
  ro: "<p>Acesta este un text foarte lung. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae justo eget magna fermentum. In vitae turpis massa sed elementum. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed.</p>",
  ru: "<p>Это очень длинный текст. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut Labore et dolore magna aliqua. Vitae justo eget Magna Fermentum. In vitae turpis массировал элементум. Ac feugiat sed lectus вестибулум mattis ullamcorper velit sed.</p>",
  sv: "<p>Det här är en mycket lång text. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae justo eget magna fermentum. In vitae turpis massa sed elementum. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed.</p>",
};

const fieldLabel: LocalString = {
  ar: "تسمية الحقل",
  ca: "Etiqueta del camp",
  da: "Felt label",
  de: "Feldbezeichnung",
  en: "Field label",
  es: "Etiqueta del campo",
  fi: "Kentän etiketti",
  fr: "Étiquette du champ",
  is: "Merki á sviði",
  nl: "Veldlabel",
  pl: "Etykieta pola",
  pt: "Etiqueta do campo",
  ro: "Etichetă de câmp",
  ru: "Метка поля",
  sv: "Fältetikett",
};

const groupNames: LocalString[] = [
  {
    ar: "نيوزيلندا",
    ca: "Zelanda",
    da: "Sjælland",
    de: "Seeland",
    en: "Zealand",
    es: "Zelanda",
    fi: "Seelanti",
    fr: "Zélande",
    is: "Sjáland",
    nl: "Zeeland",
    pl: "Zelandia",
    pt: "Zelândia",
    ro: "Zeelandă",
    ru: "Зеландия",
    sv: "Själland",
  },
  {
    ar: "جوتلاند",
    ca: "Jutlàndia",
    da: "Jylland",
    de: "Jütland",
    en: "Jutland",
    es: "Jutlandia",
    fi: "Jyllanti",
    fr: "Jutland",
    is: "Jótland",
    nl: "Jutland",
    pl: "Jutlandia",
    pt: "Jutlândia",
    ro: "Iutlanda",
    ru: "Ютландия",
    sv: "Jylland",
  },
];

const getCandidate = (): Resource => {
  return {
    generic: [
      {
        id: 1,
        attribute_name: "image",
        label: fieldLabel,
        localised: false,
        position: 3,
        purpose: "generic",
        item_type: "image",
        form_content: image,
      },
      {
        id: 2,
        attribute_name: "voteforme",
        label: fieldLabel,
        localised: true,
        position: 6,
        purpose: "generic",
        item_type: "rich_text_area",
        form_content: lorem,
      },
      {
        id: 3,
        attribute_name: "other_links",
        label: fieldLabel,
        localised: false,
        position: 7,
        purpose: "generic",
        item_type: "link_list",
        form_content: [
          getUrl("instagram"),
          getUrl("twitter"),
          getUrl("facebook"),
          getUrl("github"),
          getUrl("website"),
          getUrl("tiktok"),
        ],
      },
      {
        id: 4,
        attribute_name: "birth",
        label: fieldLabel,
        localised: false,
        position: 11,
        purpose: "generic",
        item_type: "date",
        form_content: "2000-01-01",
      },
      {
        id: 5,
        attribute_name: "video",
        label: fieldLabel,
        position: 14,
        purpose: "generic",
        item_type: "video",
        form_content: "https://www.youtube.com/watch?v=P_qnA3jdLno",
      },
    ],
    title: [
      {
        id: 6,
        attribute_name: "name",
        label: fieldLabel,
        localised: false,
        position: 4,
        purpose: "title",
        item_type: "text",
        form_content: "Jhon Doe",
      },
    ],
    subtitle: [
      {
        id: 7,
        attribute_name: "profession",
        label: fieldLabel,
        localised: true,
        position: 5,
        purpose: "subtitle",
        item_type: "text",
        form_content: { en: "Developer" },
      },
    ],
    summary: [
      {
        id: 8,
        attribute_name: "links",
        label: fieldLabel,
        localised: false,
        position: 7,
        purpose: "summary",
        item_type: "link_list",
        form_content: [getUrl("instagram"), getUrl("twitter"), getUrl("facebook")],
      },
      {
        id: 9,
        attribute_name: "untranslatable",
        label: fieldLabel,
        localised: false,
        position: 15,
        purpose: "summary",
        item_type: "text",
        form_content: "Some text",
      },
    ],
    groups: [
      {
        id: 1,
        title: groupNames[0],
      },
      {
        id: 2,
        title: groupNames[1],
      },
    ],
    identifier: [],
  };
};

export { getUrl, getCandidate };
