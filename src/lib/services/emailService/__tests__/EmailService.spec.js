const EmailService = require("../EmailService");

describe("EmailService", () => {
  it("has a module", () => {
    expect(EmailService).toBeDefined();
    const expected = "function";
    const actual = typeof EmailService;
    expect(expected).toEqual(actual);
  });

  describe("createEmail", () => {
    it("creates an email", () => {
      const MockEmailModel = jest.fn();
      const emailService = new EmailService(MockEmailModel);
      const recipients = ["foo@bar.se"];
      const subject = "foo";
      const message = "bar";
      emailService.createEmail(recipients, subject, message);
      expect(MockEmailModel).toBeCalledWith({ recipients, subject, message });
    });
  });
});
