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

  it("correctly serialises the model", async () => {
    const subject = "foo";
    const message = "bar";
    const from = "me@fmail.com";
    const type = "outgoing";
    const timestamp = new Date("2018-08-23T16:42:41.897Z");
    const recipients = [];
    const email = new EmailModel({
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
      from,
      isImportant: false,
      _id: email.id,
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
