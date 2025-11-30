import { describe, it, expect } from "vitest";

import { Name } from "../../../src/adap-b04/names/Name";
import { StringName } from "../../../src/adap-b04/names/StringName";
import { StringArrayName } from "../../../src/adap-b04/names/StringArrayName";
import { IllegalArgumentException } from "../../../src/adap-b04/common/IllegalArgumentException";

describe("StringArrayName Tests", () => {
  
  describe("Constructor preconditions", () => {
    it("should throw IllegalArgumentException for empty array", () => {
      expect(() => new StringArrayName([])).toThrow(IllegalArgumentException);
    });

    it("should throw IllegalArgumentException for null source", () => {
      expect(() => new StringArrayName(null as any)).toThrow(IllegalArgumentException);
    });

    it("should throw IllegalArgumentException for undefined source", () => {
      expect(() => new StringArrayName(undefined as any)).toThrow(IllegalArgumentException);
    });

    it("should throw IllegalArgumentException when delimiter equals escape character", () => {
      expect(() => new StringArrayName(["a", "b"], "\\")).toThrow(IllegalArgumentException);
    });

    it("should throw IllegalArgumentException for multi-character delimiter", () => {
      expect(() => new StringArrayName(["a", "b"], "..")).toThrow(IllegalArgumentException);
    });

    it("should create name with valid input", () => {
      const name = new StringArrayName(["oss", "cs", "fau", "de"]);
      expect(name.getNoComponents()).toBe(4);
    });
  });

  describe("getComponent preconditions", () => {
    it("should throw IllegalArgumentException for negative index", () => {
      const name = new StringArrayName(["a", "b", "c"]);
      expect(() => name.getComponent(-1)).toThrow(IllegalArgumentException);
    });

    it("should throw IllegalArgumentException for index >= length", () => {
      const name = new StringArrayName(["a", "b", "c"]);
      expect(() => name.getComponent(3)).toThrow(IllegalArgumentException);
    });

    it("should return correct component for valid index", () => {
      const name = new StringArrayName(["a", "b", "c"]);
      expect(name.getComponent(1)).toBe("b");
    });
  });

  describe("setComponent preconditions", () => {
    it("should throw IllegalArgumentException for negative index", () => {
      const name = new StringArrayName(["a", "b", "c"]);
      expect(() => name.setComponent(-1, "x")).toThrow(IllegalArgumentException);
    });

    it("should throw IllegalArgumentException for index >= length", () => {
      const name = new StringArrayName(["a", "b", "c"]);
      expect(() => name.setComponent(3, "x")).toThrow(IllegalArgumentException);
    });

    it("should throw IllegalArgumentException for null component", () => {
      const name = new StringArrayName(["a", "b", "c"]);
      expect(() => name.setComponent(0, null as any)).toThrow(IllegalArgumentException);
    });

    it("should set component correctly for valid input", () => {
      const name = new StringArrayName(["a", "b", "c"]);
      name.setComponent(1, "x");
      expect(name.getComponent(1)).toBe("x");
    });
  });

  describe("insert preconditions", () => {
    it("should throw IllegalArgumentException for negative index", () => {
      const name = new StringArrayName(["a", "b"]);
      expect(() => name.insert(-1, "x")).toThrow(IllegalArgumentException);
    });

    it("should throw IllegalArgumentException for index > length", () => {
      const name = new StringArrayName(["a", "b"]);
      expect(() => name.insert(3, "x")).toThrow(IllegalArgumentException);
    });

    it("should throw IllegalArgumentException for null component", () => {
      const name = new StringArrayName(["a", "b"]);
      expect(() => name.insert(0, null as any)).toThrow(IllegalArgumentException);
    });

    it("should insert at beginning correctly", () => {
      const name = new StringArrayName(["b", "c"]);
      name.insert(0, "a");
      expect(name.getNoComponents()).toBe(3);
      expect(name.getComponent(0)).toBe("a");
    });

    it("should insert at end correctly", () => {
      const name = new StringArrayName(["a", "b"]);
      name.insert(2, "c");
      expect(name.getNoComponents()).toBe(3);
      expect(name.getComponent(2)).toBe("c");
    });
  });

  describe("append preconditions", () => {
    it("should throw IllegalArgumentException for null component", () => {
      const name = new StringArrayName(["a"]);
      expect(() => name.append(null as any)).toThrow(IllegalArgumentException);
    });

    it("should append correctly", () => {
      const name = new StringArrayName(["a"]);
      name.append("b");
      expect(name.getNoComponents()).toBe(2);
      expect(name.getComponent(1)).toBe("b");
    });
  });

  describe("remove preconditions", () => {
    it("should throw IllegalArgumentException for negative index", () => {
      const name = new StringArrayName(["a", "b"]);
      expect(() => name.remove(-1)).toThrow(IllegalArgumentException);
    });

    it("should throw IllegalArgumentException for index >= length", () => {
      const name = new StringArrayName(["a", "b"]);
      expect(() => name.remove(2)).toThrow(IllegalArgumentException);
    });

    it("should throw IllegalArgumentException when removing from single-component name", () => {
      const name = new StringArrayName(["a"]);
      expect(() => name.remove(0)).toThrow(IllegalArgumentException);
    });

    it("should remove correctly", () => {
      const name = new StringArrayName(["a", "b", "c"]);
      name.remove(1);
      expect(name.getNoComponents()).toBe(2);
      expect(name.getComponent(1)).toBe("c");
    });
  });

  describe("concat preconditions", () => {
    it("should throw IllegalArgumentException for null other", () => {
      const name = new StringArrayName(["a"]);
      expect(() => name.concat(null as any)).toThrow(IllegalArgumentException);
    });

    it("should concat correctly", () => {
      const name1 = new StringArrayName(["a", "b"]);
      const name2 = new StringArrayName(["c", "d"]);
      name1.concat(name2);
      expect(name1.getNoComponents()).toBe(4);
      expect(name1.getComponent(2)).toBe("c");
    });
  });

  describe("clone postconditions", () => {
    it("should create equal clone", () => {
      const name = new StringArrayName(["a", "b", "c"]);
      const clone = name.clone();
      expect(name.isEqual(clone)).toBe(true);
    });

    it("should create independent clone", () => {
      const name = new StringArrayName(["a", "b", "c"]);
      const clone = name.clone() as StringArrayName;
      clone.setComponent(0, "x");
      expect(name.getComponent(0)).toBe("a");
    });
  });

  describe("isEqual preconditions", () => {
    it("should throw IllegalArgumentException for null other", () => {
      const name = new StringArrayName(["a"]);
      expect(() => name.isEqual(null as any)).toThrow(IllegalArgumentException);
    });
  });
});

describe("StringName Tests", () => {
  
  describe("Constructor preconditions", () => {
    it("should throw IllegalArgumentException for null source", () => {
      expect(() => new StringName(null as any)).toThrow(IllegalArgumentException);
    });

    it("should throw IllegalArgumentException for undefined source", () => {
      expect(() => new StringName(undefined as any)).toThrow(IllegalArgumentException);
    });

    it("should throw IllegalArgumentException when delimiter equals escape character", () => {
      expect(() => new StringName("a.b", "\\")).toThrow(IllegalArgumentException);
    });

    it("should throw IllegalArgumentException for multi-character delimiter", () => {
      expect(() => new StringName("a.b", "..")).toThrow(IllegalArgumentException);
    });

    it("should create name with valid input", () => {
      const name = new StringName("oss.cs.fau.de");
      expect(name.getNoComponents()).toBe(4);
    });

    it("should handle empty string", () => {
      const name = new StringName("");
      expect(name.getNoComponents()).toBe(0);
    });
  });

  describe("getComponent preconditions", () => {
    it("should throw IllegalArgumentException for negative index", () => {
      const name = new StringName("a.b.c");
      expect(() => name.getComponent(-1)).toThrow(IllegalArgumentException);
    });

    it("should throw IllegalArgumentException for index >= noComponents", () => {
      const name = new StringName("a.b.c");
      expect(() => name.getComponent(3)).toThrow(IllegalArgumentException);
    });

    it("should return correct component for valid index", () => {
      const name = new StringName("a.b.c");
      expect(name.getComponent(1)).toBe("b");
    });
  });

  describe("setComponent preconditions", () => {
    it("should throw IllegalArgumentException for negative index", () => {
      const name = new StringName("a.b.c");
      expect(() => name.setComponent(-1, "x")).toThrow(IllegalArgumentException);
    });

    it("should throw IllegalArgumentException for index >= noComponents", () => {
      const name = new StringName("a.b.c");
      expect(() => name.setComponent(3, "x")).toThrow(IllegalArgumentException);
    });

    it("should throw IllegalArgumentException for null component", () => {
      const name = new StringName("a.b.c");
      expect(() => name.setComponent(0, null as any)).toThrow(IllegalArgumentException);
    });

    it("should set component correctly for valid input", () => {
      const name = new StringName("a.b.c");
      name.setComponent(1, "x");
      expect(name.getComponent(1)).toBe("x");
    });
  });

  describe("insert preconditions", () => {
    it("should throw IllegalArgumentException for negative index", () => {
      const name = new StringName("a.b");
      expect(() => name.insert(-1, "x")).toThrow(IllegalArgumentException);
    });

    it("should throw IllegalArgumentException for index > noComponents", () => {
      const name = new StringName("a.b");
      expect(() => name.insert(3, "x")).toThrow(IllegalArgumentException);
    });

    it("should throw IllegalArgumentException for null component", () => {
      const name = new StringName("a.b");
      expect(() => name.insert(0, null as any)).toThrow(IllegalArgumentException);
    });

    it("should insert correctly", () => {
      const name = new StringName("a.c");
      name.insert(1, "b");
      expect(name.getNoComponents()).toBe(3);
      expect(name.getComponent(1)).toBe("b");
    });
  });

  describe("append preconditions", () => {
    it("should throw IllegalArgumentException for null component", () => {
      const name = new StringName("a");
      expect(() => name.append(null as any)).toThrow(IllegalArgumentException);
    });

    it("should append correctly", () => {
      const name = new StringName("a");
      name.append("b");
      expect(name.getNoComponents()).toBe(2);
      expect(name.getComponent(1)).toBe("b");
    });
  });

  describe("remove preconditions", () => {
    it("should throw IllegalArgumentException for negative index", () => {
      const name = new StringName("a.b");
      expect(() => name.remove(-1)).toThrow(IllegalArgumentException);
    });

    it("should throw IllegalArgumentException for index >= noComponents", () => {
      const name = new StringName("a.b");
      expect(() => name.remove(2)).toThrow(IllegalArgumentException);
    });

    it("should throw IllegalArgumentException when removing from single-component name", () => {
      const name = new StringName("a");
      expect(() => name.remove(0)).toThrow(IllegalArgumentException);
    });

    it("should remove correctly", () => {
      const name = new StringName("a.b.c");
      name.remove(1);
      expect(name.getNoComponents()).toBe(2);
      expect(name.getComponent(1)).toBe("c");
    });
  });

  describe("concat preconditions", () => {
    it("should throw IllegalArgumentException for null other", () => {
      const name = new StringName("a");
      expect(() => name.concat(null as any)).toThrow(IllegalArgumentException);
    });

    it("should concat correctly", () => {
      const name1 = new StringName("a.b");
      const name2 = new StringName("c.d");
      name1.concat(name2);
      expect(name1.getNoComponents()).toBe(4);
      expect(name1.getComponent(2)).toBe("c");
    });
  });

  describe("clone postconditions", () => {
    it("should create equal clone", () => {
      const name = new StringName("a.b.c");
      const clone = name.clone();
      expect(name.isEqual(clone)).toBe(true);
    });

    it("should create independent clone", () => {
      const name = new StringName("a.b.c");
      const clone = name.clone() as StringName;
      clone.setComponent(0, "x");
      expect(name.getComponent(0)).toBe("a");
    });
  });

  describe("asString and asDataString", () => {
    it("asString should use custom delimiter", () => {
      const name = new StringName("a.b.c");
      expect(name.asString("/")).toBe("a/b/c");
    });

    it("asDataString should use default delimiter", () => {
      const name = new StringName("a/b/c", "/");
      expect(name.asDataString()).toBe("a.b.c");
    });
  });
});

describe("Equality and Hash Tests", () => {
  it("equal names should have same hash code", () => {
    const name1 = new StringArrayName(["a", "b", "c"]);
    const name2 = new StringArrayName(["a", "b", "c"]);
    expect(name1.isEqual(name2)).toBe(true);
    expect(name1.getHashCode()).toBe(name2.getHashCode());
  });

  it("different names should not be equal", () => {
    const name1 = new StringArrayName(["a", "b", "c"]);
    const name2 = new StringArrayName(["a", "b", "d"]);
    expect(name1.isEqual(name2)).toBe(false);
  });

  it("names with different lengths should not be equal", () => {
    const name1 = new StringArrayName(["a", "b"]);
    const name2 = new StringArrayName(["a", "b", "c"]);
    expect(name1.isEqual(name2)).toBe(false);
  });
});

describe("Delimiter Character Tests", () => {
  it("should return correct delimiter", () => {
    const name = new StringArrayName(["a", "b"], "/");
    expect(name.getDelimiterCharacter()).toBe("/");
  });

  it("should use default delimiter", () => {
    const name = new StringArrayName(["a", "b"]);
    expect(name.getDelimiterCharacter()).toBe(".");
  });
});

describe("isEmpty Tests", () => {
  it("StringName with empty string should be empty", () => {
    const name = new StringName("");
    expect(name.isEmpty()).toBe(true);
  });

  it("StringArrayName with components should not be empty", () => {
    const name = new StringArrayName(["a"]);
    expect(name.isEmpty()).toBe(false);
  });
});
