class EmailService {
  constructor(EmailModel) {
    this.EmailModel = EmailModel;
    this.createEmail = this.createEmail.bind(this);
    this.getEmail = this.getEmail.bind(this);
    this.getSentEmails = this.getSentEmails.bind(this);
    this.getDraftEmails = this.getDraftEmails.bind(this);
    this.getImportantEmails = this.getImportantEmails.bind(this);
    this.setEmailAsImportant = this.setEmailAsImportant.bind(this);
    this.createDraftEmail = this.createDraftEmail.bind(this);
    this.getInboxEmails = this.getInboxEmails.bind(this);
    this.getSpamEmails = this.getSpamEmails.bind(this);
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

  getEmail(emailId) {
    return this.EmailModel.findById(emailId);
  }

  getInboxEmails() {
    return this.EmailModel.find({ type: "received" });
  }

  getSpamEmails() {
    return this.EmailModel.find({ isSpam: true });
  }

  getImportantEmails() {
    return this.EmailModel.find({ isImportant: true });
  }

  async setEmailAsImportant(emailId, isImportant) {
    const email = await this.EmailModel.findById(emailId);
    email.isImportant = isImportant;
    return email.save();
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
