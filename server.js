const https = require("https");
const fs = require("fs");
const app = require("./src/app");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI || "mongodb://0.0.0.0:27017/fmail", {
  useNewUrlParser: true
});

const keypath =
  process.env.CERT_PRIVATE_KEY_PATH || "./certificates/localhost.key";
const crtpath = process.env.CERT_PATH || "./certificates/localhost.crt";

const key = fs.readFileSync(keypath);
const cert = fs.readFileSync(crtpath);

https.createServer({ key, cert }, app).listen(process.env.PORT || 3000);

process.on("unhandledRejection", error => {
  console.error(error);
  process.exit(1);
});
