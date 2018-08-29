const express = require("express");
const path = require("path");
const { emailService } = require("./lib/services");
const validateIncomingEmail = require("./lib/services/emailService/validateIncomingEmail");
const catchExceptions = require("./lib/utils/catchExceptions");
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "dist")));

app.get(
  "/api/v1/inbox-emails",
  catchExceptions(async (req, res) => {
    res.json([]);
  })
);

app.get(
  "/api/v1/important-emails",
  catchExceptions(async (req, res) => {
    res.json([]);
  })
);

app.get(
  "/api/v1/sent-emails",
  catchExceptions(async (req, res) => {
    const email = await emailService.getSentEmails();
    res.json(email);
  })
);

app.get(
  "/api/v1/draft-emails",
  catchExceptions(async (req, res) => {
    res.json([]);
  })
);

app.get(
  "/api/v1/spam-emails",
  catchExceptions(async (req, res) => {
    res.json([]);
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

app.all("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "dist", "index.html"));
});

app.use((error, req, res, next) => {
  res.status(500).json({ error: error.message });
});

module.exports = app;
