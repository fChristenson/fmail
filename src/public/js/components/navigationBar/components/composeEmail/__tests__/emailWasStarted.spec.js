const emailWasStarted = require("../utils/emailWasStarted");

describe("emailWasStarted", () => {
  it("has a module", () => {
    expect(emailWasStarted).toBeDefined();
    const expected = "function";
    const actual = typeof emailWasStarted;
    expect(expected).toEqual(actual);
  });

  it("returns false if there is nothing in the email request", () => {
    const expected = false;
    const recipients = "";
    const subject = "";
    const message = "";
    const request = { recipients, subject, message };
    const actual = emailWasStarted(request);
    expect(expected).toEqual(actual);
  });

  it("returns true if there is text in the email request", () => {
    const expected = true;
    const recipients = "";
    const subject = "";
    const message = "a";
    const request = { recipients, subject, message };
    const actual = emailWasStarted(request);
    expect(expected).toEqual(actual);
  });

  it("returns true if there is a subject in the email request", () => {
    const expected = true;
    const recipients = "";
    const subject = "a";
    const message = "";
    const request = { recipients, subject, message };
    const actual = emailWasStarted(request);
    expect(expected).toEqual(actual);
  });

  it("returns true if there are recipients in the email request", () => {
    const expected = true;
    const recipients = "a";
    const subject = "";
    const message = "";
    const request = { recipients, subject, message };
    const actual = emailWasStarted(request);
    expect(expected).toEqual(actual);
  });
});
