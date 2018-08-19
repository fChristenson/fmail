const isSelected = require("../isSelected");

describe("isSelected", () => {
  it("has a module", () => {
    expect(isSelected).toBeDefined();
    const expected = "function";
    const actual = typeof isSelected;
    expect(expected).toEqual(actual);
  });

  it("returns true if the provided path matches the provided pathname", () => {
    const expected = true;
    const actual = isSelected("/foo", "/foo");
    expect(expected).toEqual(actual);
  });

  it("returns true if the provided path is /inbox and the provided pathname is /", () => {
    const expected = true;
    const actual = isSelected("/", "/inbox");
    expect(expected).toEqual(actual);
  });

  it("returns false if the provided path is not /inbox and the provided pathname is /", () => {
    const expected = false;
    const actual = isSelected("/", "/fail");
    expect(expected).toEqual(actual);
  });

  it("returns false if the provided path does not matche the provided pathname", () => {
    const expected = false;
    const actual = isSelected("/foo", "/bar");
    expect(expected).toEqual(actual);
  });
});
