const mongoose = require("mongoose");
const { emailService } = require("./src/lib/services");

mongoose.connect(process.env.MONGO_URI || "mongodb://0.0.0.0:27017/fmail", {
  useNewUrlParser: true
});

const limit = 100;

setInterval(() => {
  emailService.sendEmails(limit).catch(error => {
    console.error(error.message);
    process.exit(1);
  });
}, 5000);
