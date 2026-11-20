import { describe, it, expect } from "vitest";
import {
  interopDefault,
  SelectionPileValidator,
  ContestSelectionValidator,
  BelgiumBallotValidator,
} from "./validators";

describe("validators", () => {
  it("unwraps a CommonJS module.exports object", () => {
    class Example {}
    expect(interopDefault({ default: Example })).to.eq(Example);
  });

  it("passes an already-unwrapped default through", () => {
    class Example {}
    expect(interopDefault(Example)).to.eq(Example);
  });

  it("exposes constructable validators", () => {
    expect(SelectionPileValidator).to.be.a("function");
    expect(ContestSelectionValidator).to.be.a("function");
    expect(BelgiumBallotValidator).to.be.a("function");
  });
});
