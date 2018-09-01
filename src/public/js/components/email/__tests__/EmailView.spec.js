const EmailView = require("../EmailView");

describe("EmailView", () => {
  it("has a module", () => {
    expect(EmailView).toBeDefined();
    const expected = "function";
    const actual = typeof EmailView;
    expect(expected).toEqual(actual);
  });

  it("should return empty values for a invalid IncomingEmail", () => {
    const incomingEmail = {};
    const expected = {
      subject: "",
      from: "",
      body: "",
      recipients: "",
      timestamp: ""
    };
    const actual = EmailView(incomingEmail);
    expect(expected).toEqual(actual);
  });

  it("should return correct values for a valid IncomingEmail", () => {
    const dateTime = "2018-08-19T09:29:21.318Z";
    const formattedDateTime = "2018-08-19 09:29";
    const incomingEmail = {
      subject: "foo",
      from: "",
      recipients: [],
      message: "bar",
      timestamp: Date.parse(dateTime)
    };
    const expected = {
      subject: "foo",
      from: "",
      recipients: "",
      body: "bar",
      timestamp: formattedDateTime
    };
    const actual = EmailView(incomingEmail);
    expect(expected).toEqual(actual);
  });
});
