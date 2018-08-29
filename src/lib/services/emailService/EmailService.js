class EmailService {
  constructor(EmailModel) {
    this.EmailModel = EmailModel;
    this.createEmail = this.createEmail.bind(this);
    this.getSentEmails = this.getSentEmails.bind(this);
    this.getDraftEmails = this.getDraftEmails.bind(this);
    this.createDraftEmail = this.createDraftEmail.bind(this);
  }

  createEmail(recipients, subject, message) {
    const type = "outgoing";
    return new this.EmailModel({ recipients, subject, message, type }).save();
  }

  createDraftEmail(recipients, maybeSubject, message) {
    const type = "draft";
    const subject = maybeSubject || "<no subject>";
    return new this.EmailModel({ recipients, subject, message, type }).save();
  }

  getDraftEmails() {
    return this.EmailModel.find({ type: "draft" });
  }

  getSentEmails() {
    return this.EmailModel.find({
      $or: [{ type: "outgoing" }, { type: "sent" }]
    });
  }
}

module.exports = EmailService;
