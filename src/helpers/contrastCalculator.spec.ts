import { describe, it, expect } from "vitest";

import { hexToRgb, getTextContrastColor } from "./contrastCalculator";

describe("hexToRgb", () => {
  it("parses a lowercase hex color with leading #", () => {
    const result = hexToRgb("#aabbcc");
    expect(result).to.not.be.null;
    expect(result?.[1]).to.eq("aa");
    expect(result?.[2]).to.eq("bb");
    expect(result?.[3]).to.eq("cc");
  });

  it("parses an uppercase hex color", () => {
    const result = hexToRgb("#FF8800");
    expect(result).to.not.be.null;
    expect(result?.[1]).to.eq("FF");
    expect(result?.[2]).to.eq("88");
    expect(result?.[3]).to.eq("00");
  });

  it("parses a hex color without leading #", () => {
    const result = hexToRgb("123456" as `#${string}`);
    expect(result).to.not.be.null;
    expect(result?.[1]).to.eq("12");
    expect(result?.[2]).to.eq("34");
    expect(result?.[3]).to.eq("56");
  });

  it("returns null for shorthand 3-digit hex colors", () => {
    expect(hexToRgb("#abc")).to.be.null;
  });

  it("returns null for invalid hex strings", () => {
    expect(hexToRgb("#zzzzzz" as `#${string}`)).to.be.null;
    expect(hexToRgb("not-a-color" as `#${string}`)).to.be.null;
    expect(hexToRgb("#12345" as `#${string}`)).to.be.null;
  });

  it("returns null for an empty string", () => {
    expect(hexToRgb("" as `#${string}`)).to.be.null;
  });
});

describe("getTextContrastColor", () => {
  it("returns 'white' for a black background", () => {
    expect(getTextContrastColor("#000000")).to.eq("white");
  });

  it("returns 'black' for a white background", () => {
    expect(getTextContrastColor("#ffffff")).to.eq("black");
  });

  it("returns 'black' for a light background (e.g. light yellow)", () => {
    expect(getTextContrastColor("#ffff66")).to.eq("black");
  });

  it("returns 'white' for a dark background (e.g. navy blue)", () => {
    expect(getTextContrastColor("#001f3f")).to.eq("white");
  });

  it("returns 'black' for a saturated red", () => {
    expect(getTextContrastColor("#ff0000")).to.eq("black");
  });

  it("returns 'black' for a saturated green", () => {
    expect(getTextContrastColor("#00ff00")).to.eq("black");
  });

  it("returns 'white' for a saturated blue", () => {
    expect(getTextContrastColor("#0000ff")).to.eq("white");
  });

  it("accepts uppercase hex values", () => {
    expect(getTextContrastColor("#FFFFFF")).to.eq("black");
    expect(getTextContrastColor("#000000")).to.eq("white");
  });

  it("accepts hex values without a leading #", () => {
    expect(getTextContrastColor("ffffff")).to.eq("black");
    expect(getTextContrastColor("000000")).to.eq("white");
  });

  it("falls back to 'black' when the input is not a valid hex color", () => {
    expect(getTextContrastColor("not-a-color")).to.eq("black");
    expect(getTextContrastColor("#abc")).to.eq("black");
    expect(getTextContrastColor("")).to.eq("black");
  });
});
