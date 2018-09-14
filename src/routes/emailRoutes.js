const { Router } = require("express");
const { emailService } = require("../lib/services");
const validateIncomingEmail = require("../lib/services/emailService/validateIncomingEmail");
const validateIncomingImportantRequest = require("../lib/services/emailService/validateIncomingImportantRequest");
const catchExceptions = require("../lib/utils/catchExceptions");
const userIsLoggedIn = require("../lib/utils/userIsLoggedIn");
const router = Router();
const MAX_EMAILS_PER_PAGE = 50;

router.get(
  "/api/v1/inbox-emails",
  userIsLoggedIn,
  catchExceptions(async (req, res) => {
    let { offset, limit } = req.query;
    offset = parseInt(offset);
    limit = parseInt(limit);
    limit = Math.min(limit, MAX_EMAILS_PER_PAGE);
    const email = await emailService.getInboxEmails(offset, limit);
    res.json(email);
  })
);

router.get(
  "/api/v1/search",
  userIsLoggedIn,
  catchExceptions(async (req, res) => {
    let { q, offset, limit } = req.query;
    offset = parseInt(offset);
    limit = parseInt(limit);
    limit = Math.min(limit, MAX_EMAILS_PER_PAGE);
    const emails = await emailService.search(q, offset, limit);
    res.json(emails);
  })
);

router.get(
  "/api/v1/emails/count",
  userIsLoggedIn,
  catchExceptions(async (req, res) => {
    const { emailType, q } = req.query;
    const count = await emailService.countEmails(emailType, q);
    res.json({ count });
  })
);

router.get(
  "/api/v1/emails/:emailId",
  userIsLoggedIn,
  catchExceptions(async (req, res) => {
    const { emailId } = req.params;
    const email = await emailService.getEmail(emailId);
    const viewedAt = Date.now();
    await emailService.setEmailToViewed(emailId, viewedAt);
    res.json(email);
  })
);

router.delete(
  "/api/v1/emails/:emailId",
  userIsLoggedIn,
  catchExceptions(async (req, res) => {
    const { emailId } = req.params;
    const email = await emailService.removeEmail(emailId);
    res.json(email);
  })
);

router.get(
  "/api/v1/important-emails",
  userIsLoggedIn,
  catchExceptions(async (req, res) => {
    let { offset, limit } = req.query;
    offset = parseInt(offset);
    limit = parseInt(limit);
    limit = Math.min(limit, MAX_EMAILS_PER_PAGE);
    const email = await emailService.getImportantEmails(offset, limit);
    res.json(email);
  })
);

router.get(
  "/api/v1/sent-emails",
  userIsLoggedIn,
  catchExceptions(async (req, res) => {
    let { offset, limit } = req.query;
    offset = parseInt(offset);
    limit = parseInt(limit);
    limit = Math.min(limit, MAX_EMAILS_PER_PAGE);
    const email = await emailService.getSentEmails(offset, limit);
    res.json(email);
  })
);

router.get(
  "/api/v1/email-overview",
  userIsLoggedIn,
  catchExceptions(async (req, res) => {
    const emailOverview = await emailService.getEmailOverview();
    res.json(emailOverview);
  })
);

router.get(
  "/api/v1/draft-emails",
  userIsLoggedIn,
  catchExceptions(async (req, res) => {
    let { offset, limit } = req.query;
    offset = parseInt(offset);
    limit = parseInt(limit);
    limit = Math.min(limit, MAX_EMAILS_PER_PAGE);
    const draftEmails = await emailService.getDraftEmails(offset, limit);
    res.json(draftEmails);
  })
);

router.get(
  "/api/v1/spam-emails",
  userIsLoggedIn,
  catchExceptions(async (req, res) => {
    let { offset, limit } = req.query;
    offset = parseInt(offset);
    limit = parseInt(limit);
    limit = Math.min(limit, MAX_EMAILS_PER_PAGE);
    const spam = await emailService.getSpamEmails(offset, limit);
    res.json(spam);
  })
);

router.post(
  "/api/v1/emails",
  validateIncomingEmail,
  userIsLoggedIn,
  catchExceptions(async (req, res) => {
    const { recipients, subject, message } = req.body;
    const email = await emailService.createEmail(recipients, subject, message);
    res.json(email);
  })
);

router.put(
  "/api/v1/draft-emails/:emailId",
  userIsLoggedIn,
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

router.post(
  "/api/v1/draft-emails",
  userIsLoggedIn,
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

router.post(
  "/api/v1/emails/:emailId/important",
  validateIncomingImportantRequest,
  userIsLoggedIn,
  catchExceptions(async (req, res) => {
    const { emailId } = req.params;
    const { isImportant } = req.body;
    const email = await emailService.setEmailAsImportant(emailId, isImportant);
    res.json(email);
  })
);

module.exports = router;
