const InboxEmail = require("../utils/InboxEmail");

describe("InboxEmail", () => {
  it("has a module", () => {
    expect(InboxEmail).toBeDefined();
    const expected = "function";
    const actual = typeof InboxEmail;
    expect(expected).toEqual(actual);
  });

  it("should return empty values for a invalid IncomingEmail", () => {
    const incomingEmail = {};
    const expected = {
      id: "",
      subject: "",
      body: "",
      timestamp: "",
      viewedAt: "",
      recipients: "",
      type: "",
      isImportant: false
    };
    const actual = InboxEmail(incomingEmail);
    expect(expected).toEqual(actual);
  });

  it("should return correct values for a valid IncomingEmail", () => {
    const dateTime = "2018-08-19T09:29:21.318Z";
    const formattedDateTime = "2018-08-19 09:29";
    const incomingEmail = {
      _id: "1",
      subject: "foo",
      message: "bar",
      isImportant: false,
      recipients: ["foo@bar.se", "bar@foo.se"],
      viewedAt: undefined,
      type: "draft",
      timestamp: Date.parse(dateTime)
    };
    const expected = {
      id: "1",
      subject: "foo",
      body: "bar",
      isImportant: false,
      recipients: "foo@bar.se, bar@foo.se",
      viewedAt: "",
      type: "draft",
      timestamp: formattedDateTime
    };
    const actual = InboxEmail(incomingEmail);
    expect(expected).toEqual(actual);
  });
});
