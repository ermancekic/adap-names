import { describe, it, expect } from "vitest";
import { Name, DEFAULT_DELIMITER } from "../../../src/adap-b01/names/Name";

describe("Basic initialization tests", () => {
  it("test construction 1", () => {
    const n = new Name(["oss", "cs", "fau", "de"]);
    expect(n.asString()).toBe("oss.cs.fau.de");
  });

  it("empty components yields empty string", () => {
    const n = new Name([]);
    expect(n.asString()).toBe("");
    expect(n.asDataString()).toBe("");
  });

  it("single empty component is rendered as empty string (no leading delimiter)", () => {
    const n = new Name([""]);
    expect(n.asString()).toBe("");
    expect(n.asDataString()).toBe("");
  });

  it("multiple empty components produce consecutive delimiters", () => {
    const n = new Name(["", "", "", ""]);
    expect(n.asString()).toBe("..."); // human-readable (no escaping)
    expect(n.asDataString()).toBe("..."); // default delimiter is '.'
  });
});

describe("Basic function tests", () => {
  it("test insert in the middle", () => {
    const n = new Name(["oss", "fau", "de"]);
    n.insert(1, "cs");
    expect(n.asString()).toBe("oss.cs.fau.de");
  });

  it("insert at the beginning and at the end", () => {
    const n = new Name(["b", "c"]);
    n.insert(0, "a");
    n.insert(n.getNoComponents(), "d");
    expect(n.asString()).toBe("a.b.c.d");
  });

  it("append, setComponent, getComponent, remove", () => {
    const n = new Name(["a"]);
    n.append("b");
    expect(n.getNoComponents()).toBe(2);
    expect(n.getComponent(1)).toBe("b");

    n.setComponent(1, "beta");
    expect(n.asString()).toBe("a.beta");

    n.remove(0);
    expect(n.asString()).toBe("beta");
    expect(n.getNoComponents()).toBe(1);
  });

  it("bounds checks throw errors", () => {
    const n = new Name(["x", "y"]);
    expect(() => n.getComponent(-1)).toThrowError();
    expect(() => n.getComponent(2)).toThrowError();
    expect(() => n.setComponent(5, "z")).toThrowError();
    expect(() => n.insert(99, "z")).toThrowError();
    expect(() => n.remove(-1)).toThrowError();
  });
});

describe("Delimiter function tests", () => {
  it("custom delimiter is used by asString()", () => {
    const n = new Name(["oss", "fau", "de"], "#");
    n.insert(1, "cs");
    expect(n.asString()).toBe("oss#cs#fau#de");
  });

  it("asString(delimiterParam) overrides instance delimiter", () => {
    const n = new Name(["a", "b", "c"], "#");
    expect(n.asString("/")).toBe("a/b/c");
    expect(n.asString()).toBe("a#b#c"); // instance default unchanged
  });

  it("asDataString() always uses DEFAULT delimiter and escaping", () => {
    const n = new Name(["a#b", "c"], "#");
    // human-readable keeps '#'
    expect(n.asString()).toBe("a#b#c");
    // data string uses DEFAULT '.' and escapes '.' and '\'
    expect(n.asDataString()).toBe("a#b.c"); // '#' is not special for data string
    // sanity: default delimiter is '.'
    expect(DEFAULT_DELIMITER).toBe(".");
  });
});

describe("Escape character & serialization", () => {
  it("escapes delimiter characters in components for asDataString()", () => {
    const n = new Name(["a.b", "c"]);
    expect(n.asString()).toBe("a.b.c");        // human-readable (no escaping)
    expect(n.asDataString()).toBe("a\\.b.c");  // machine-readable with escapes
  });

  it("escapes backslashes in components for asDataString()", () => {
    const n = new Name(["a\\b", "c"]);
    // human-readable keeps single backslash
    expect(n.asString()).toBe("a\\b.c");
    // data string doubles backslashes
    expect(n.asDataString()).toBe("a\\\\b.c");
  });

  it("combination: backslash and delimiter in same component", () => {
    const n = new Name(["x\\y.z", "w"]);
    // human-readable
    expect(n.asString()).toBe("x\\y.z.w");
    // machine-readable: backslash -> '\\\\', dot -> '\.'
    expect(n.asDataString()).toBe("x\\\\y\\.z.w");
  });

  it("custom human-readable delimiter does not escape components", () => {
    const n = new Name(["oss.cs.fau.de"], "#");
    expect(n.asString()).toBe("oss.cs.fau.de");
    n.append("people");
    expect(n.asString()).toBe("oss.cs.fau.de#people");
  });
});
