const https = require("https");
const fs = require("fs");
const app = require("./src/app");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI || "mongodb://0.0.0.0:27017/fmail", {
  useNewUrlParser: true
});

const key = fs.readFileSync("./certificates/private.key");
const cert = fs.readFileSync("./certificates/certificate.crt");
const ca = fs.readFileSync("./certificates/ca.crt");

https.createServer({ key, cert, ca }, app).listen(3000);
