const validateIncomingImportantRequest = require("../validateIncomingImportantRequest");

describe("validateIncomingImportantRequest", () => {
  it("has a module", () => {
    expect(validateIncomingImportantRequest).toBeDefined();
    const expected = "function";
    const actual = typeof validateIncomingImportantRequest;
    expect(expected).toEqual(actual);
  });

  it("calls next with an error if isImportant is missing", () => {
    const req = {
      body: {}
    };
    const res = {};
    const next = jest.fn();
    validateIncomingImportantRequest(req, res, next);
    expect(next).toBeCalledWith(
      new Error(
        'ValidationError: child "isImportant" fails because ["isImportant" is required]'
      )
    );
  });

  it("calls next if isImportant is defined", () => {
    const req = {
      body: { isImportant: true }
    };
    const res = {};
    const next = jest.fn();
    validateIncomingImportantRequest(req, res, next);
    expect(next).toBeCalledWith();
  });
});
