import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

import { humanizeDate } from "./datetime";

const NOW = new Date("2026-06-08T12:00:00.000Z");

describe("humanizeDate", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(NOW);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("past dates (default short style)", () => {
    it("returns 'less than a minute ago' for sub-minute past dates", () => {
      const date = new Date(NOW.getTime() - 30 * 1000);
      expect(humanizeDate(date)).to.eq("1 min. ago");
    });

    it("formats minutes ago", () => {
      const date = new Date(NOW.getTime() - 5 * 60 * 1000);
      expect(humanizeDate(date)).to.eq("5 min. ago");
    });

    it("formats hours ago", () => {
      const date = new Date(NOW.getTime() - 3 * 60 * 60 * 1000);
      expect(humanizeDate(date)).to.eq("3 hr. ago");
    });

    it("formats days ago", () => {
      const date = new Date(NOW.getTime() - 2 * 24 * 60 * 60 * 1000);
      expect(humanizeDate(date)).to.eq("2 days ago");
    });

    it("formats weeks ago", () => {
      const date = new Date(NOW.getTime() - 2 * 7 * 24 * 60 * 60 * 1000);
      expect(humanizeDate(date)).to.eq("2 wk. ago");
    });

    it("formats months ago", () => {
      const date = new Date(NOW.getTime() - 2 * 30 * 24 * 60 * 60 * 1000);
      expect(humanizeDate(date)).to.eq("2 mo. ago");
    });

    it("formats years ago", () => {
      const date = new Date(NOW.getTime() - 2 * 365 * 24 * 60 * 60 * 1000);
      expect(humanizeDate(date)).to.eq("2 yr. ago");
    });
  });

  describe("future dates (default short style)", () => {
    it("returns 'in less than a minute' for sub-minute future dates", () => {
      const date = new Date(NOW.getTime() + 30 * 1000);
      expect(humanizeDate(date)).to.eq("in 1 min.");
    });

    it("formats minutes in the future", () => {
      const date = new Date(NOW.getTime() + 5 * 60 * 1000);
      expect(humanizeDate(date)).to.eq("in 5 min.");
    });

    it("formats hours in the future", () => {
      const date = new Date(NOW.getTime() + 3 * 60 * 60 * 1000);
      expect(humanizeDate(date)).to.eq("in 3 hr.");
    });

    it("formats days in the future", () => {
      const date = new Date(NOW.getTime() + 2 * 24 * 60 * 60 * 1000);
      expect(humanizeDate(date)).to.eq("in 2 days");
    });

    it("formats years in the future", () => {
      const date = new Date(NOW.getTime() + 2 * 365 * 24 * 60 * 60 * 1000);
      expect(humanizeDate(date)).to.eq("in 2 yr.");
    });
  });

  describe("locale support", () => {
    it("formats in Spanish", () => {
      const date = new Date(NOW.getTime() - 5 * 60 * 1000);
      expect(humanizeDate(date, "es")).to.eq("hace 5 min");
    });

    it("formats in Danish", () => {
      const date = new Date(NOW.getTime() - 2 * 60 * 60 * 1000);
      expect(humanizeDate(date, "da")).to.eq("2 timer siden");
    });
  });

  describe("style support", () => {
    it("supports narrow style", () => {
      const date = new Date(NOW.getTime() - 5 * 60 * 1000);
      expect(humanizeDate(date, "en", "narrow")).to.eq("5m ago");
    });

    it("supports long style", () => {
      const date = new Date(NOW.getTime() - 5 * 60 * 1000);
      expect(humanizeDate(date, "en", "long")).to.eq("5 minutes ago");
    });
  });

  it("clamps the current moment to 1 minute ago", () => {
    expect(humanizeDate(NOW)).to.eq("1 min. ago");
  });
});
