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
      const mockSave = jest.fn();
      const MockEmailModel = jest.fn(() => {
        return {
          save: mockSave
        };
      });
      const emailService = new EmailService(MockEmailModel);
      const recipients = ["foo@bar.se"];
      const subject = "foo";
      const message = "bar";
      const type = "outgoing";
      emailService.createEmail(recipients, subject, message);
      expect(MockEmailModel).toBeCalledWith({
        recipients,
        subject,
        message,
        type
      });
      expect(mockSave).toBeCalled();
    });
  });

  describe("getSentEmails", () => {
    it("gets sent emails", () => {
      const mockFind = jest.fn();
      const MockEmailModel = {
        find: mockFind
      };
      const query = {
        $or: [{ type: "outgoing" }, { type: "sent" }]
      };
      const emailService = new EmailService(MockEmailModel);
      emailService.getSentEmails();
      expect(mockFind).toBeCalledWith(query);
    });
  });

  describe("getDraftEmails", () => {
    it("gets draft emails", () => {
      const mockFind = jest.fn();
      const MockEmailModel = {
        find: mockFind
      };
      const query = { type: "draft" };
      const emailService = new EmailService(MockEmailModel);
      emailService.getDraftEmails();
      expect(mockFind).toBeCalledWith(query);
    });
  });
});
