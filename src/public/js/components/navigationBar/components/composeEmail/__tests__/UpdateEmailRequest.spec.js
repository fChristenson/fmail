const UpdateEmailRequest = require("../utils/UpdateEmailRequest");

describe("UpdateEmailRequest", () => {
  it("has a module", () => {
    expect(UpdateEmailRequest).toBeDefined();
    const expected = "function";
    const actual = typeof UpdateEmailRequest;
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
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    };
    const actual = UpdateEmailRequest(recipients, subject, message);
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
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    };
    const actual = UpdateEmailRequest(recipients, subject, message);
    expect(expected).toEqual(actual);
  });
});
