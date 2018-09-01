const SetEmailToImportantRequest = require("../SetEmailToImportantRequest");

describe("SetEmailToImportantRequest", () => {
  it("has a module", () => {
    expect(SetEmailToImportantRequest).toBeDefined();
    const expected = "function";
    const actual = typeof SetEmailToImportantRequest;
    expect(expected).toEqual(actual);
  });

  it("constructs the correct request", () => {
    const isImportant = true;
    const expected = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ isImportant })
    };
    const actual = SetEmailToImportantRequest(isImportant);
    expect(expected).toEqual(actual);
  });
});
