const EmailOverview = require("../EmailOverview");

describe("EmailOverview", () => {
  it("has a module", () => {
    expect(EmailOverview).toBeDefined();
    const expected = "function";
    const actual = typeof EmailOverview;
    expect(expected).toEqual(actual);
  });

  it("returns a default overview", () => {
    const expected = {
      unreadInboxEmails: 0,
      draftEmails: 0,
      unreadSpamEmails: 0
    };
    const actual = EmailOverview({});
    expect(expected).toEqual(actual);
  });

  it("returns a overview", () => {
    const incomingOverview = {
      unreadInboxEmails: 1,
      draftEmails: 1,
      unreadSpamEmails: 1,
      foo: 1
    };
    const expected = {
      unreadInboxEmails: 1,
      draftEmails: 1,
      unreadSpamEmails: 1
    };
    const actual = EmailOverview(incomingOverview);
    expect(expected).toEqual(actual);
  });
});
