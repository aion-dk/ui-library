import type { LiveResult } from "@/types";

const getLiveResult = (references: string[], showPercentage: boolean = false): LiveResult => {
  const result: LiveResult = {};

  references.forEach((reference) => {
    result[reference] = {
      showPercentage: showPercentage,
      reference: reference,
      results: {
        count: 5,
        percentage: 25.2,
      },
    };
  });

  return result;
};

export { getLiveResult };
