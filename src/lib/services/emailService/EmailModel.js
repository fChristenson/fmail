const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmailSchema = new Schema({
  recipients: { type: Array },
  from: { type: String, default: "me@fmail.com" },
  subject: { type: String, required: true },
  isImportant: { type: Boolean, default: false },
  message: { type: String },
  type: {
    type: String,
    enum: ["received", "outgoing", "draft", "sent"],
    required: true
  },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Email", EmailSchema);
