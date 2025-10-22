import { describe, it, expect } from "vitest";
import { Name } from "../../../src/adap-b01/names/Name";

describe("Basic initialization tests", () => {
  it("test construction 1", () => {
    let n: Name = new Name(["oss", "cs", "fau", "de"]);
    expect(n.asString()).toBe("oss.cs.fau.de");
  });

  it("test empty components array", () => {
    let n: Name = new Name([]);
    expect(n.asString()).toBe("");
  });

  it("test single component", () => {
    let n: Name = new Name(["oss"]);
    expect(n.asString()).toBe("oss");
  });

  it("test getNoComponents", () => {
    let n: Name = new Name(["oss", "cs", "fau", "de"]);
    expect(n.getNoComponents()).toBe(4);
  });
});

describe("Basic function tests", () => {
  it("test insert", () => {
    let n: Name = new Name(["oss", "fau", "de"]);
    n.insert(1, "cs");
    expect(n.asString()).toBe("oss.cs.fau.de");
  });

  it("test insert at beginning", () => {
    let n: Name = new Name(["cs", "fau", "de"]);
    n.insert(0, "oss");
    expect(n.asString()).toBe("oss.cs.fau.de");
  });

  it("test insert at end", () => {
    let n: Name = new Name(["oss", "cs", "fau"]);
    n.insert(3, "de");
    expect(n.asString()).toBe("oss.cs.fau.de");
  });

  it("test append", () => {
    let n: Name = new Name(["oss", "cs", "fau"]);
    n.append("de");
    expect(n.asString()).toBe("oss.cs.fau.de");
  });

  it("test remove", () => {
    let n: Name = new Name(["oss", "cs", "fau", "de"]);
    n.remove(1);
    expect(n.asString()).toBe("oss.fau.de");
  });

  it("test getComponent", () => {
    let n: Name = new Name(["oss", "cs", "fau", "de"]);
    expect(n.getComponent(2)).toBe("fau");
  });

  it("test setComponent", () => {
    let n: Name = new Name(["oss", "cs", "fau", "de"]);
    n.setComponent(1, "xyz");
    expect(n.asString()).toBe("oss.xyz.fau.de");
  });
});

describe("Delimiter function tests", () => {
  it("test insert with custom delimiter", () => {
    let n: Name = new Name(["oss", "fau", "de"], '#');
    n.insert(1, "cs");
    expect(n.asString()).toBe("oss#cs#fau#de");
  });

  it("test asString with different delimiter parameter", () => {
    let n: Name = new Name(["oss", "cs", "fau", "de"], '#');
    expect(n.asString()).toBe("oss#cs#fau#de");
    expect(n.asString('/')).toBe("oss/cs/fau/de");
  });

  it("test custom delimiter in asDataString", () => {
    let n: Name = new Name(["a", "b", "c"], '#');
    expect(n.asDataString()).toBe("a.b.c"); // asDataString nutzt immer DEFAULT_DELIMITER
  });
});

describe("Empty components tests", () => {
  it("test empty string components", () => {
    let n: Name = new Name(["", "", "", ""], '/');
    expect(n.asString()).toBe("///");
  });

  it("test mixed empty and non-empty components", () => {
    let n: Name = new Name(["a", "", "c"]);
    expect(n.asString()).toBe("a..c");
  });
});

describe("Escape character tests", () => {
  it("test escape delimiter in component", () => {
    let n: Name = new Name(["oss.cs.fau.de"], '#');
    expect(n.asString()).toBe("oss.cs.fau.de");
  });

  it("test escape delimiter with default delimiter", () => {
    let n: Name = new Name(["a.b.c"]);
    expect(n.asString()).toBe("a\\.b\\.c"); // Punkte sind escaped
  });

  it("test escape character in component", () => {
    let n: Name = new Name(["a\\b\\c"]);
    expect(n.asString()).toBe("a\\\\b\\\\c"); // Backslashes sind verdoppelt
  });

  it("test asDataString with escape characters", () => {
    let n: Name = new Name(["oss.cs.fau.de"], '#');
    expect(n.asDataString()).toBe("oss\\.cs\\.fau\\.de"); // Punkte escaped wegen DEFAULT_DELIMITER
  });

  it("test escape and delimiter boundary conditions", () => {
    // Original name string = "oss.cs.fau.de"
    let n: Name = new Name(["oss.cs.fau.de"], '#');
    expect(n.asString()).toBe("oss.cs.fau.de");
    n.append("people");
    expect(n.asString()).toBe("oss.cs.fau.de#people");
  });
});

describe("Edge cases and error handling", () => {
  it("test getComponent out of bounds - negative", () => {
    let n: Name = new Name(["a", "b", "c"]);
    expect(() => n.getComponent(-1)).toThrow("Index out of bounds");
  });

  it("test getComponent out of bounds - too large", () => {
    let n: Name = new Name(["a", "b", "c"]);
    expect(() => n.getComponent(5)).toThrow("Index out of bounds");
  });

  it("test setComponent out of bounds", () => {
    let n: Name = new Name(["a", "b", "c"]);
    expect(() => n.setComponent(5, "x")).toThrow("Index out of bounds");
  });

  it("test insert out of bounds - negative", () => {
    let n: Name = new Name(["a", "b", "c"]);
    expect(() => n.insert(-1, "x")).toThrow("Index out of bounds");
  });

  it("test insert out of bounds - too large", () => {
    let n: Name = new Name(["a", "b", "c"]);
    expect(() => n.insert(5, "x")).toThrow("Index out of bounds");
  });

  it("test remove out of bounds", () => {
    let n: Name = new Name(["a", "b", "c"]);
    expect(() => n.remove(5)).toThrow("Index out of bounds");
  });

  it("test remove at beginning", () => {
    let n: Name = new Name(["a", "b", "c"]);
    n.remove(0);
    expect(n.asString()).toBe("b.c");
  });

  it("test remove at end", () => {
    let n: Name = new Name(["a", "b", "c"]);
    n.remove(2);
    expect(n.asString()).toBe("a.b");
  });

  it("test multiple operations in sequence", () => {
    let n: Name = new Name(["a", "c"]);
    n.insert(1, "b");
    expect(n.asString()).toBe("a.b.c");
    n.append("d");
    expect(n.asString()).toBe("a.b.c.d");
    n.remove(1);
    expect(n.asString()).toBe("a.c.d");
    n.setComponent(0, "x");
    expect(n.asString()).toBe("x.c.d");
  });
});
