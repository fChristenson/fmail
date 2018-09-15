const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmailSchema = new Schema({
  userId: { type: String, required: true },
  recipients: { type: Array },
  from: { type: String, required: true },
  subject: { type: String, required: true },
  isImportant: { type: Boolean, default: false },
  isSpam: { type: Boolean, default: false },
  message: { type: String },
  type: {
    type: String,
    enum: ["received", "outgoing", "draft", "sent"],
    required: true
  },
  viewedAt: { type: Date },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Email", EmailSchema);
