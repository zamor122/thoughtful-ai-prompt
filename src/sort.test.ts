import { describe, it, expect } from "vitest";
import { sort } from "./sort";

describe("sort - standard classification", () => {
  it("returns STANDARD for small package", () => {
    expect(sort(10, 10, 10, 5)).toBe("STANDARD");
  });

  it("returns STANDARD when mass is 0 (valid per requirement)", () => {
    expect(sort(10, 10, 10, 0)).toBe("STANDARD");
  });

  it("returns STANDARD for decimal dimensions", () => {
    expect(sort(49.5, 20.1, 10.2, 0.1)).toBe("STANDARD");
  });

  it("returns STANDARD when volume just below 1M", () => {
    expect(sort(99, 100, 100, 10)).toBe("STANDARD");
  });
});

describe("sort - special (heavy only)", () => {
  it("returns SPECIAL when mass exactly at threshold", () => {
    expect(sort(10, 10, 10, 20)).toBe("SPECIAL");
  });

  it("returns SPECIAL when mass above threshold", () => {
    expect(sort(10, 10, 10, 21)).toBe("SPECIAL");
  });

  it("returns SPECIAL for heavy precision boundary", () => {
    expect(sort(10, 10, 10, 20.0001)).toBe("SPECIAL");
  });
});

describe("sort - special (bulky only)", () => {
  it("returns SPECIAL when bulky by volume only", () => {
    expect(sort(100, 100, 100, 10)).toBe("SPECIAL");
  });

  it("returns SPECIAL when bulky by width dimension", () => {
    expect(sort(150, 10, 10, 10)).toBe("SPECIAL");
  });

  it("returns SPECIAL when bulky by height dimension", () => {
    expect(sort(10, 150, 10, 10)).toBe("SPECIAL");
  });

  it("returns SPECIAL when bulky by length dimension", () => {
    expect(sort(10, 10, 150, 10)).toBe("SPECIAL");
  });
});

describe("sort - rejected (bulky and heavy)", () => {
  it("returns REJECTED when bulky by dimension and heavy", () => {
    expect(sort(150, 10, 10, 20)).toBe("REJECTED");
  });

  it("returns REJECTED when bulky by volume and heavy", () => {
    expect(sort(100, 100, 100, 25)).toBe("REJECTED");
  });
});

describe("sort - boundary precision", () => {
  it("returns STANDARD for pure dimension just-below boundary", () => {
    expect(sort(149.999, 10, 10, 10)).toBe("STANDARD");
  });

  it("returns STANDARD for dimension and mass just-below boundary", () => {
    expect(sort(149.999, 10, 10, 19.999)).toBe("STANDARD");
  });

  it("returns STANDARD for volume and mass just-below combined", () => {
    expect(sort(99, 100, 100, 19.999)).toBe("STANDARD");
  });

  it("returns SPECIAL when dimension at boundary and mass just-below", () => {
    expect(sort(150, 10, 10, 19.999)).toBe("SPECIAL");
  });
});

describe("sort - large number safety", () => {
  it("returns SPECIAL for very large volume", () => {
    expect(sort(10000, 10000, 10000, 1)).toBe("SPECIAL");
  });
});

describe("sort - validation", () => {
  it("throws for negative width", () => {
    expect(() => sort(-1, 10, 10, 10)).toThrow("Invalid package dimensions or mass");
  });

  it("throws for zero dimension", () => {
    expect(() => sort(0, 10, 10, 10)).toThrow("Invalid package dimensions or mass");
  });

  it("throws for negative mass", () => {
    expect(() => sort(10, 10, 10, -1)).toThrow("Invalid package dimensions or mass");
  });
});
