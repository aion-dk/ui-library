import type { SelectionPile, SelectionPileArg } from "@/types";

const getOptionSelections = (args: SelectionPileArg[]) => {
  if (args.includes("single")) return [{ reference: "exampleOption1" }];
  if (args.includes("multi"))
    return [{ reference: "exampleOption1" }, { reference: "exampleOption2" }];
  if (args.includes("multivote"))
    return [
      { reference: "exampleOption1" },
      { reference: "exampleOption1" },
      { reference: "exampleOption1" },
      { reference: "exampleOption1" },
    ];
  if (args.includes("children"))
    return [{ reference: "exampleOption2" }, { reference: "exampleChildren1-2" }];
  if (args.includes("many"))
    return [
      { reference: "exampleOption1" },
      { reference: "exampleOption2" },
      { reference: "exampleOption3" },
      { reference: "exampleOption4" },
      { reference: "exampleOption5" },
      { reference: "exampleOption6" },
      { reference: "exampleOption7" },
    ];
  return [];
};

const getSelectionPile = (args: SelectionPileArg[]): SelectionPile => {
  return {
    multiplier: args.includes("weighted") ? 10 : 1,
    optionSelections: getOptionSelections(args),
    explicitBlank: args.includes("blank"),
  };
};

export { getSelectionPile };
