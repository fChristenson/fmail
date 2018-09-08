const formFieldChanged = require("../utils/formFieldChanged");

describe("formFieldChanged", () => {
  it("has a module", () => {
    expect(formFieldChanged).toBeDefined();
    const expected = "function";
    const actual = typeof formFieldChanged;
    expect(expected).toEqual(actual);
  });

  it("returns false if there is nothing in the form", () => {
    const expected = false;
    const originalForm = {};
    const currentForm = {};
    const actual = formFieldChanged(originalForm, currentForm);
    expect(expected).toEqual(actual);
  });

  it("returns false if there is nothing changed in the form", () => {
    const expected = false;
    const originalForm = { foo: 1 };
    const currentForm = { foo: 1 };
    const actual = formFieldChanged(originalForm, currentForm);
    expect(expected).toEqual(actual);
  });

  it("returns true if there is something changed in the form", () => {
    const expected = true;
    const originalForm = { foo: 1 };
    const currentForm = { foo: 12 };
    const actual = formFieldChanged(originalForm, currentForm);
    expect(expected).toEqual(actual);
  });
});
