class EmailService {
  constructor(EmailModel, searchService, userService) {
    this.userService = userService;
    this.searchService = searchService;
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
    this.countEmails = this.countEmails.bind(this);
    this.search = this.search.bind(this);
  }

  async search(userId, q, offset, limit) {
    const results = await this.searchService.findEmail(
      userId,
      q,
      offset,
      limit
    );
    const idArray = results.map(res => res._id);
    return this.EmailModel.find({
      _id: { $in: idArray },
      userId
    });
  }

  countEmails(userId, emailType, q) {
    switch (emailType) {
      case "search":
        return this.searchService.countFoundEmails(userId, q);

      case "inbox":
        return this.EmailModel.count({
          userId,
          type: "received",
          isSpam: false
        });

      case "important":
        return this.EmailModel.count({
          userId,
          isImportant: true
        });

      case "sent":
        return this.EmailModel.count({
          userId,
          $or: [{ type: "outgoing" }, { type: "sent" }]
        });

      case "drafts":
        return this.EmailModel.count({
          userId,
          type: "draft"
        });

      case "spam":
        return this.EmailModel.count({
          userId,
          type: "received",
          isSpam: true
        });

      default:
        throw new Error(`${emailType} is not a valid emailType`);
    }
  }

  async setEmailToViewed(userId, emailId, viewedAt) {
    const email = await this.EmailModel.findOne({ userId, _id: emailId });
    email.viewedAt = viewedAt;
    return email.save();
  }

  async getEmailOverview(userId) {
    const unreadInboxEmails = await this.EmailModel.count({
      userId,
      type: "received",
      isSpam: false,
      viewedAt: undefined
    });

    const draftEmails = await this.EmailModel.count({ userId, type: "draft" });

    const unreadSpamEmails = await this.EmailModel.count({
      userId,
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

  async createEmail(userId, recipients, subject, message) {
    const user = await this.userService.getUser(userId);
    const type = "outgoing";
    const email = await new this.EmailModel({
      userId: user.id,
      from: user.email,
      recipients,
      subject,
      message,
      type
    }).save();
    await this.searchService.saveEmail(email);
    return email;
  }

  async createDraftEmail(userId, recipients, maybeSubject, message, viewedAt) {
    const user = await this.userService.getUser(userId);
    const type = "draft";
    const subject = maybeSubject || "<no subject>";
    const email = await new this.EmailModel({
      userId: user.id,
      from: user.email,
      recipients,
      subject,
      message,
      type,
      viewedAt
    }).save();
    await this.searchService.saveEmail(email);
    return email;
  }

  async updateDraftEmail(userId, emailId, recipients, subject, message) {
    const email = await this.EmailModel.findOne({ _id: emailId, userId });
    email.recipients = recipients;
    email.subject = subject;
    email.message = message;

    return email.save();
  }

  getEmail(userId, emailId) {
    return this.EmailModel.findOne({ _id: emailId, userId });
  }

  async removeEmail(userId, emailId) {
    const email = await this.EmailModel.findOne({ _id: emailId, userId });
    await this.searchService.deleteEmail(email.id);
    return email.remove();
  }

  getInboxEmails(userId, offset, limit) {
    return this.EmailModel.find(
      { userId, type: "received", isSpam: false },
      null,
      {
        skip: offset,
        limit,
        sort: {
          timestamp: -1
        }
      }
    );
  }

  getSpamEmails(userId, offset, limit) {
    return this.EmailModel.find({ userId, isSpam: true }, null, {
      skip: offset,
      limit,
      sort: {
        timestamp: -1
      }
    });
  }

  getImportantEmails(userId, offset, limit) {
    return this.EmailModel.find({ userId, isImportant: true }, null, {
      skip: offset,
      limit,
      sort: {
        timestamp: -1
      }
    });
  }

  async setEmailAsImportant(userId, emailId, isImportant) {
    const email = await this.EmailModel.findOne({ _id: emailId, userId });
    email.isImportant = isImportant;
    return email.save();
  }

  getDraftEmails(userId, offset, limit) {
    return this.EmailModel.find({ userId, type: "draft" }, null, {
      skip: offset,
      limit,
      sort: {
        timestamp: -1
      }
    });
  }

  getSentEmails(userId, offset, limit) {
    return this.EmailModel.find(
      {
        userId,
        $or: [{ type: "outgoing" }, { type: "sent" }]
      },
      null,
      {
        skip: offset,
        limit,
        sort: {
          timestamp: -1
        }
      }
    );
  }
}

module.exports = EmailService;
