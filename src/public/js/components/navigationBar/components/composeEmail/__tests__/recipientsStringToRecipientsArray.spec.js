const recipientsStringToRecipientsArray = require("../utils/recipientsStringToRecipientsArray");

describe("recipientsStringToRecipientsArray", () => {
  it("has a module", () => {
    expect(recipientsStringToRecipientsArray).toBeDefined();
    const expected = "function";
    const actual = typeof recipientsStringToRecipientsArray;
    expect(expected).toEqual(actual);
  });

  it("returns a formatted string for one recipient", () => {
    const expected = ["foo@bar.se"];
    const actual = recipientsStringToRecipientsArray("foo@bar.se");
    expect(expected).toEqual(actual);
  });

  it("returns a formatted string for several recipients", () => {
    const expected = ["foo@bar.se", "foo@bar.se", "foo@bar.se", "foo@bar.se"];
    const actual = recipientsStringToRecipientsArray(
      "foo@bar.se;foo@bar.se,foo@bar.se foo@bar.se"
    );
    expect(expected).toEqual(actual);
  });
});
