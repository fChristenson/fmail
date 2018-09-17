class EmailServiceProvider {
  fetchEmails() {
    // fake poll strategy to get emails
    return Promise.resolve([]);
  }

  sendEmail(email) {
    // fake email dispatch
    return Promise.resolve(email);
  }
}

module.exports = EmailServiceProvider;
