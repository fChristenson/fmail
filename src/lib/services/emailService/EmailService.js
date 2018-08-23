class EmailService {
  constructor(EmailModel) {
    this.EmailModel = EmailModel;
    this.createEmail = this.createEmail.bind(this);
  }

  createEmail(recipients, subject, message) {
    return new this.EmailModel({ recipients, subject, message });
  }
}

module.exports = EmailService;
