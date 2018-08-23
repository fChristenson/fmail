const express = require("express");
const path = require("path");
const { emailService } = require("./lib/services");
const validateIncomingEmail = require("./lib/services/emailService/validateIncomingEmail");
const catchExceptions = require("./lib/utils/catchExceptions");
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "dist")));

app.get("/emails", (req, res) => {
  const emails = [
    {
      id: "1",
      subject: "My subject",
      isImportant: true,
      body: "This is my email, and it is super long so that we are forced to cut it short to show it on a row",
      timestamp: Date.now() + 1001
    },
    {
      id: "2",
      subject: "My subject 2",
      viewedAt: Date.now(),
      body: "This is my email, and it is super long so that we are forced to cut it short to show it on a row",
      timestamp: Date.now() + 1002
    },
    {
      id: "3",
      subject: "My subject 3",
      body: "This is my email, and it is super long so that we are forced to cut it short to show it on a row",
      timestamp: Date.now() + 1003
    }
  ];
  res.json(emails);
});

app.post(
  "/emails",
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
