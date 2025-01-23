import type { ContestSelection, ContestSelectionArg } from "@/types";

const getPiles = (args: ContestSelectionArg[]) => {
  if (args.includes("complete"))
    return [
      {
        multiplier: 6,
        optionSelections: [{ reference: "exampleOption3" }],
        explicitBlank: false,
      },
      {
        optionSelections: [{ reference: "exampleOption1" }],
        multiplier: 4,
        explicitBlank: false,
      },
    ];
  else if (args.includes("half"))
    return [
      {
        multiplier: 5,
        optionSelections: [{ reference: "exampleOption3" }],
        explicitBlank: false,
      },
    ];
  else return [];
};

const getContestSelection = (args: ContestSelectionArg[]): ContestSelection => {
  return {
    reference: "exampleContest",
    piles: getPiles(args),
  };
};

export { getContestSelection };
