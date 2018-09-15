const mongoose = require("mongoose");
const EmailModel = require("../EmailModel");

describe("EmailModel", () => {
  let db;

  beforeAll(done => {
    db = mongoose.connect("mongodb://localhost:27017/test", done);
  });

  afterAll(done => {
    db.close(done);
  });

  beforeEach(done => {
    EmailModel.remove({}, done);
  });

  it("correctly serializes the model", async () => {
    const userId = "id";
    const subject = "foo";
    const message = "bar";
    const from = "me@fmail.com";
    const type = "outgoing";
    const timestamp = new Date("2018-08-23T16:42:41.897Z");
    const recipients = [];
    const email = new EmailModel({
      userId,
      from,
      recipients,
      subject,
      message,
      type,
      timestamp
    });
    await email.save();
    const emailInDatabase = await EmailModel.findById(email.id);
    const expected = {
      recipients,
      isImportant: false,
      isSpam: false,
      _id: email.id,
      userId,
      from,
      subject,
      message,
      type,
      timestamp,
      __v: 0
    };
    const expectedString = JSON.stringify(expected);
    const actual = JSON.stringify(emailInDatabase);
    expect(expectedString).toEqual(actual);
  });
});
