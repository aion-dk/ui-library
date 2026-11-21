// js-client's validators are CommonJS files with `exports.default = Class`.
// Vite 8 (Rolldown) applies Node-style interop in a `"type": "module"` package,
// so a default import yields `module.exports` rather than the class. Older Vite
// (and Vitest's Node runner) unwrap it. Normalize once here so components get
// the class under either behavior.
import SelectionPileValidatorImport from "@assemblyvoting/js-client/dist/lib/validators/selectionPileValidator";
import ContestSelectionValidatorImport from "@assemblyvoting/js-client/dist/lib/validators/contestSelectionValidator";
import BelgiumBallotValidatorImport from "@assemblyvoting/js-client/dist/lib/validators/belgiumBallotValidator";

export const interopDefault = <T>(imported: T): T =>
  (imported as { default?: T }).default ?? imported;

export const SelectionPileValidator = interopDefault(SelectionPileValidatorImport);
export const ContestSelectionValidator = interopDefault(ContestSelectionValidatorImport);
export const BelgiumBallotValidator = interopDefault(BelgiumBallotValidatorImport);
