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
    this.updateDraftEmail = this.updateDraftEmail.bind(this);
    this.getInboxEmails = this.getInboxEmails.bind(this);
    this.getSpamEmails = this.getSpamEmails.bind(this);
    this.getEmailOverview = this.getEmailOverview.bind(this);
    this.setEmailToViewed = this.setEmailToViewed.bind(this);
    this.removeEmail = this.removeEmail.bind(this);
  }

  async setEmailToViewed(emailId, viewedAt) {
    const email = await this.EmailModel.findById(emailId);
    email.viewedAt = viewedAt;
    return email.save();
  }

  async getEmailOverview() {
    const unreadInboxEmails = await this.EmailModel.count({
      type: "received",
      isSpam: false,
      viewedAt: undefined
    });

    const draftEmails = await this.EmailModel.count({ type: "draft" });

    const unreadSpamEmails = await this.EmailModel.count({
      type: "received",
      isSpam: true,
      viewedAt: undefined
    });

    return {
      unreadInboxEmails,
      draftEmails,
      unreadSpamEmails
    };
  }

  createEmail(recipients, subject, message) {
    const type = "outgoing";
    return new this.EmailModel({ recipients, subject, message, type }).save();
  }

  createDraftEmail(recipients, maybeSubject, message, viewedAt) {
    const type = "draft";
    const subject = maybeSubject || "<no subject>";
    return new this.EmailModel({
      recipients,
      subject,
      message,
      type,
      viewedAt
    }).save();
  }

  async updateDraftEmail(emailId, recipients, subject, message) {
    const email = await this.EmailModel.findById(emailId);
    email.recipients = recipients;
    email.subject = subject;
    email.message = message;

    return email.save();
  }

  getEmail(emailId) {
    return this.EmailModel.findById(emailId);
  }

  async removeEmail(emailId) {
    const email = await this.EmailModel.findById(emailId);
    return email.remove();
  }

  getInboxEmails() {
    return this.EmailModel.find({ type: "received", isSpam: false });
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
