const { Router } = require("express");
const { emailService } = require("../lib/services");
const validateIncomingEmail = require("../lib/services/emailService/validateIncomingEmail");
const validateIncomingImportantRequest = require("../lib/services/emailService/validateIncomingImportantRequest");
const catchExceptions = require("../lib/utils/catchExceptions");
const userIsLoggedIn = require("../lib/utils/userIsLoggedIn");
const logger = require("../lib/utils/logger");
const router = Router();
const MAX_EMAILS_PER_PAGE = 50;

router.get(
  "/api/v1/inbox-emails",
  userIsLoggedIn,
  catchExceptions(async (req, res) => {
    let { offset, limit } = req.query;
    logger.info(
      `GET /api/v1/inbox-emails offset=${offset} limit=${limit} userId=${req.session.userId}`
    );
    offset = parseInt(offset);
    limit = parseInt(limit);
    limit = Math.min(limit, MAX_EMAILS_PER_PAGE);
    const email = await emailService.getInboxEmails(
      req.session.userId,
      offset,
      limit
    );
    res.json(email);
  })
);

router.get(
  "/api/v1/search",
  userIsLoggedIn,
  catchExceptions(async (req, res) => {
    let { q, offset, limit } = req.query;
    logger.info(
      `GET /api/v1/search q=${q} offset=${offset} limit=${limit} userId=${req.session.userId}`
    );
    offset = parseInt(offset);
    limit = parseInt(limit);
    limit = Math.min(limit, MAX_EMAILS_PER_PAGE);
    const emails = await emailService.search(
      req.session.userId,
      q,
      offset,
      limit
    );
    res.json(emails);
  })
);

router.get(
  "/api/v1/emails/count",
  userIsLoggedIn,
  catchExceptions(async (req, res) => {
    const { emailType, q } = req.query;
    logger.info(
      `GET /api/v1/emails/count q=${q} emailType=${emailType} userId=${req.session.userId}`
    );
    const count = await emailService.countEmails(
      req.session.userId,
      emailType,
      q
    );
    res.json({ count });
  })
);

router.get(
  "/api/v1/emails/:emailId",
  userIsLoggedIn,
  catchExceptions(async (req, res) => {
    const { emailId } = req.params;
    logger.info(`GET /api/v1/emails/${emailId} userId=${req.session.userId}`);
    const email = await emailService.getEmail(req.session.userId, emailId);
    const viewedAt = Date.now();
    await emailService.setEmailToViewed(req.session.userId, emailId, viewedAt);
    res.json(email);
  })
);

router.delete(
  "/api/v1/emails/:emailId",
  userIsLoggedIn,
  catchExceptions(async (req, res) => {
    const { emailId } = req.params;
    logger.info(
      `DELETE /api/v1/emails/${emailId} userId=${req.session.userId}`
    );
    const email = await emailService.removeEmail(req.session.userId, emailId);
    res.json(email);
  })
);

router.get(
  "/api/v1/important-emails",
  userIsLoggedIn,
  catchExceptions(async (req, res) => {
    let { offset, limit } = req.query;
    logger.info(
      `GET /api/v1/important-emails offset=${offset} limit=${limit} userId=${req.session.userId}`
    );
    offset = parseInt(offset);
    limit = parseInt(limit);
    limit = Math.min(limit, MAX_EMAILS_PER_PAGE);
    const email = await emailService.getImportantEmails(
      req.session.userId,
      offset,
      limit
    );
    res.json(email);
  })
);

router.get(
  "/api/v1/sent-emails",
  userIsLoggedIn,
  catchExceptions(async (req, res) => {
    let { offset, limit } = req.query;
    logger.info(
      `GET /api/v1/sent-emails offset=${offset} limit=${limit} userId=${req.session.userId}`
    );
    offset = parseInt(offset);
    limit = parseInt(limit);
    limit = Math.min(limit, MAX_EMAILS_PER_PAGE);
    const email = await emailService.getSentEmails(
      req.session.userId,
      offset,
      limit
    );
    res.json(email);
  })
);

router.get(
  "/api/v1/email-overview",
  userIsLoggedIn,
  catchExceptions(async (req, res) => {
    logger.info("GET /api/v1/email-overview");
    const emailOverview = await emailService.getEmailOverview(
      req.session.userId
    );
    res.json(emailOverview);
  })
);

router.get(
  "/api/v1/draft-emails",
  userIsLoggedIn,
  catchExceptions(async (req, res) => {
    let { offset, limit } = req.query;
    logger.info(
      `GET /api/v1/draft-emails offset=${offset} limit=${limit} userId=${req.session.userId}`
    );
    offset = parseInt(offset);
    limit = parseInt(limit);
    limit = Math.min(limit, MAX_EMAILS_PER_PAGE);
    const draftEmails = await emailService.getDraftEmails(
      req.session.userId,
      offset,
      limit
    );
    res.json(draftEmails);
  })
);

router.get(
  "/api/v1/spam-emails",
  userIsLoggedIn,
  catchExceptions(async (req, res) => {
    let { offset, limit } = req.query;
    logger.info(
      `GET /api/v1/spam-emails offset=${offset} limit=${limit} userId=${req.session.userId}`
    );
    offset = parseInt(offset);
    limit = parseInt(limit);
    limit = Math.min(limit, MAX_EMAILS_PER_PAGE);
    const spam = await emailService.getSpamEmails(
      req.session.userId,
      offset,
      limit
    );
    res.json(spam);
  })
);

router.post(
  "/api/v1/emails",
  validateIncomingEmail,
  userIsLoggedIn,
  catchExceptions(async (req, res) => {
    const { recipients, subject, message } = req.body;
    logger.info(
      `POST /api/v1/emails recipients=${recipients} subject=${subject} message=${message} userId=${req.session.userId}`
    );
    const email = await emailService.createEmail(
      req.session.userId,
      recipients,
      subject,
      message
    );
    //TODO: should we send the email after creating it?
    res.json(email);
  })
);

router.put(
  "/api/v1/draft-emails/:emailId",
  userIsLoggedIn,
  catchExceptions(async (req, res) => {
    const { emailId } = req.params;
    const { recipients, subject, message } = req.body;
    logger.info(
      `PUT /api/v1/draft-emails/${emailId} recipients=${recipients} subject=${subject} message=${message} userId=${req.session.userId}`
    );
    const email = await emailService.updateDraftEmail(
      req.session.userId,
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
    logger.info(
      `POST /api/v1/draft-emails recipients=${recipients} subject=${subject} message=${message} userId=${req.session.userId}`
    );
    const viewedAt = Date.now();
    const email = await emailService.createDraftEmail(
      req.session.userId,
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
    logger.info(
      `POST /api/v1/emails/${emailId}/important isImportant=${isImportant} userId=${req.session.userId}`
    );
    const email = await emailService.setEmailAsImportant(
      req.session.userId,
      emailId,
      isImportant
    );
    res.json(email);
  })
);

router.post(
  "/api/v1/emails/webhook",
  catchExceptions(async (req, res) => {
    //TODO: handle webhook emails
    res.end();
  })
);

module.exports = router;
