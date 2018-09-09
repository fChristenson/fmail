const express = require("express");
const path = require("path");
const { emailService } = require("./lib/services");
const validateIncomingEmail = require("./lib/services/emailService/validateIncomingEmail");
const validateIncomingImportantRequest = require("./lib/services/emailService/validateIncomingImportantRequest");
const catchExceptions = require("./lib/utils/catchExceptions");
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "dist")));

const MAX_EMAILS_PER_PAGE = 50;

app.get(
  "/api/v1/inbox-emails",
  catchExceptions(async (req, res) => {
    let { offset, limit } = req.query;
    offset = parseInt(offset);
    limit = parseInt(limit);
    limit = Math.min(limit, MAX_EMAILS_PER_PAGE);
    const email = await emailService.getInboxEmails(offset, limit);
    res.json(email);
  })
);

app.get(
  "/api/v1/search",
  catchExceptions(async (req, res) => {
    let { q, offset, limit } = req.query;
    offset = parseInt(offset);
    limit = parseInt(limit);
    limit = Math.min(limit, MAX_EMAILS_PER_PAGE);
    const emails = await emailService.search(q, offset, limit);
    res.json(emails);
  })
);

app.get(
  "/api/v1/emails/count",
  catchExceptions(async (req, res) => {
    const { emailType, q } = req.query;
    const count = await emailService.countEmails(emailType, q);
    res.json({ count });
  })
);

app.get(
  "/api/v1/emails/:emailId",
  catchExceptions(async (req, res) => {
    const { emailId } = req.params;
    const email = await emailService.getEmail(emailId);
    const viewedAt = Date.now();
    await emailService.setEmailToViewed(emailId, viewedAt);
    res.json(email);
  })
);

app.delete(
  "/api/v1/emails/:emailId",
  catchExceptions(async (req, res) => {
    const { emailId } = req.params;
    const email = await emailService.removeEmail(emailId);
    res.json(email);
  })
);

app.get(
  "/api/v1/important-emails",
  catchExceptions(async (req, res) => {
    let { offset, limit } = req.query;
    offset = parseInt(offset);
    limit = parseInt(limit);
    limit = Math.min(limit, MAX_EMAILS_PER_PAGE);
    const email = await emailService.getImportantEmails(offset, limit);
    res.json(email);
  })
);

app.get(
  "/api/v1/sent-emails",
  catchExceptions(async (req, res) => {
    let { offset, limit } = req.query;
    offset = parseInt(offset);
    limit = parseInt(limit);
    limit = Math.min(limit, MAX_EMAILS_PER_PAGE);
    const email = await emailService.getSentEmails(offset, limit);
    res.json(email);
  })
);

app.get(
  "/api/v1/email-overview",
  catchExceptions(async (req, res) => {
    const emailOverview = await emailService.getEmailOverview();
    res.json(emailOverview);
  })
);

app.get(
  "/api/v1/draft-emails",
  catchExceptions(async (req, res) => {
    let { offset, limit } = req.query;
    offset = parseInt(offset);
    limit = parseInt(limit);
    limit = Math.min(limit, MAX_EMAILS_PER_PAGE);
    const draftEmails = await emailService.getDraftEmails(offset, limit);
    res.json(draftEmails);
  })
);

app.get(
  "/api/v1/spam-emails",
  catchExceptions(async (req, res) => {
    let { offset, limit } = req.query;
    offset = parseInt(offset);
    limit = parseInt(limit);
    limit = Math.min(limit, MAX_EMAILS_PER_PAGE);
    const spam = await emailService.getSpamEmails(offset, limit);
    res.json(spam);
  })
);

app.post(
  "/api/v1/emails",
  validateIncomingEmail,
  catchExceptions(async (req, res) => {
    const { recipients, subject, message } = req.body;
    const email = await emailService.createEmail(recipients, subject, message);
    res.json(email);
  })
);

app.put(
  "/api/v1/draft-emails/:emailId",
  catchExceptions(async (req, res) => {
    const { emailId } = req.params;
    const { recipients, subject, message } = req.body;
    const email = await emailService.updateDraftEmail(
      emailId,
      recipients,
      subject,
      message
    );
    res.json(email);
  })
);

app.post(
  "/api/v1/draft-emails",
  catchExceptions(async (req, res) => {
    const { recipients, subject, message } = req.body;
    const viewedAt = Date.now();
    const email = await emailService.createDraftEmail(
      recipients,
      subject,
      message,
      viewedAt
    );
    res.json(email);
  })
);

app.post(
  "/api/v1/emails/:emailId/important",
  validateIncomingImportantRequest,
  catchExceptions(async (req, res) => {
    const { emailId } = req.params;
    const { isImportant } = req.body;
    const email = await emailService.setEmailAsImportant(emailId, isImportant);
    res.json(email);
  })
);

app.all("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "dist", "index.html"));
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ error: error.message });
});

module.exports = app;
