const EmailModel = require("./emailService/EmailModel");
const EmailService = require("./emailService/EmailService");
const elasticsearch = require("elasticsearch");
const client = new elasticsearch.Client({
  host: process.env.ELASTICSEARCH_URI || "localhost:9200"
});
const SearchService = require("./searchService/SearchService");
const searchService = new SearchService(client);
const emailService = new EmailService(EmailModel, searchService);

module.exports = {
  emailService,
  searchService
};
