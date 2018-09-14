const UserService = require("../UserService");

describe("UserService", () => {
  it("has a module", () => {
    expect(UserService).toBeDefined();
    const expected = "function";
    const actual = typeof UserService;
    expect(expected).toEqual(actual);
  });
});
