const SimpleQueryStringBody = require("./SimpleQueryStringBody");

class SearchService {
  constructor(client) {
    this.client = client;
    this.saveEmail = this.saveEmail.bind(this);
    this.deleteEmail = this.deleteEmail.bind(this);
    this.findEmail = this.findEmail.bind(this);
    this.countFoundEmails = this.countFoundEmails.bind(this);
  }

  async countFoundEmails(userId, q) {
    const response = await this.client.count({
      body: SimpleQueryStringBody(userId, q)
    });

    return response.count;
  }

  async findEmail(userId, q, offset, limit) {
    const response = await this.client.search({
      body: SimpleQueryStringBody(userId, q),
      sort: "timestamp:desc",
      from: offset,
      size: limit
    });

    return response.hits.hits;
  }

  deleteEmail(emailId) {
    return this.client.delete({
      ignore: [404],
      type: "email",
      id: emailId,
      index: "emails"
    });
  }

  saveEmail(email) {
    return this.client.create({
      index: "emails",
      id: email.id,
      type: "email",
      body: {
        userId: email.userId,
        recipients: email.recipients.join(","),
        subject: email.subject,
        message: email.message,
        from: email.from,
        timestamp: email.timestamp
      }
    });
  }
}

module.exports = SearchService;
