const mongoose = require("mongoose");
const EmailModel = require("./src/lib/services/emailService/EmailModel");

mongoose.connect(process.env.MONGO_URI || "mongodb://0.0.0.0:27017/fmail", {
  useNewUrlParser: true
});

const promises = [];

for (let i = 0; i < 30; i++) {
  const userId = process.argv[2];
  const recipients = ["me@fmail.com"];
  const subject = "This is spam!";
  const message =
    "Buy this thing that will make you happy instead of finding yourself!";
  const type = "received";
  const isSpam = true;
  const email = new EmailModel({
    userId,
    recipients,
    subject,
    message,
    type,
    isSpam
  });
  promises.push(email.save());
}

Promise.all(promises).then(emails => {
  console.log(`Created ${emails.length} emails`);
  process.exit(0);
});
