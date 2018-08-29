const SendEmailRequest = require("../SendEmailRequest");

describe("SendEmailRequest", () => {
  it("has a module", () => {
    expect(SendEmailRequest).toBeDefined();
    const expected = "function";
    const actual = typeof SendEmailRequest;
    expect(expected).toEqual(actual);
  });

  it("constructs the correct request", () => {
    const recipients = "foo";
    const subject = "bar";
    const message = "foobar";
    const data = {
      recipients: ["foo"],
      subject,
      message
    };
    const expected = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    };
    const actual = SendEmailRequest(recipients, subject, message);
    expect(expected).toEqual(actual);
  });

  it("turns the recipients string in to an array of emails", () => {
    const recipients = "foo@bar.se foo@bar.se,foo@bar.se;foo@bar.se";
    const subject = "bar";
    const message = "foobar";
    const data = {
      recipients: ["foo@bar.se", "foo@bar.se", "foo@bar.se", "foo@bar.se"],
      subject,
      message
    };
    const expected = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    };
    const actual = SendEmailRequest(recipients, subject, message);
    expect(expected).toEqual(actual);
  });
});
