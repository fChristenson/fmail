const EmailModel = require("./emailService/EmailModel");
const UserModel = require("./userService/UserModel");
const EmailService = require("./emailService/EmailService");
const EmailServiceProvider = require("./emailService/EmailServiceProvider");
const elasticsearch = require("elasticsearch");
const client = new elasticsearch.Client({
  host: process.env.ELASTICSEARCH_URI || "localhost:9200"
});
const SearchService = require("./searchService/SearchService");
const UserService = require("./userService/UserService");

const emailServiceProvider = new EmailServiceProvider();
const searchService = new SearchService(client);
const userService = new UserService(UserModel);
const emailService = new EmailService(
  EmailModel,
  searchService,
  userService,
  emailServiceProvider
);

module.exports = {
  userService,
  emailService,
  searchService
};
