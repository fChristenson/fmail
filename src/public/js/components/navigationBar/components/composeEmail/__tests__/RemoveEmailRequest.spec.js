const RemoveEmailRequest = require("../utils/RemoveEmailRequest");

describe("RemoveEmailRequest", () => {
  it("has a module", () => {
    expect(RemoveEmailRequest).toBeDefined();
    const expected = "function";
    const actual = typeof RemoveEmailRequest;
    expect(expected).toEqual(actual);
  });

  it("constructs the correct request", () => {
    const expected = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    };
    const actual = RemoveEmailRequest();
    expect(expected).toEqual(actual);
  });
});
