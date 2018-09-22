const mongoose = require("mongoose");
const UserModel = require("../UserModel");

describe("UserModel", () => {
  let db;

  beforeAll(done => {
    db = mongoose.connect("mongodb://localhost:27017/test", done);
  });

  afterAll(done => {
    db.close(done);
  });

  beforeEach(done => {
    UserModel.remove({}, done);
  });

  it("correctly serialises the model", async () => {
    const email = "foo@fmail.se";
    const password = "bar";
    const createdAt = new Date("2018-08-23T16:42:41.897Z");
    const user = new UserModel({
      email,
      password,
      createdAt
    });
    await user.save();
    const emailInDatabase = await UserModel.findById(user.id);
    const expected = {
      _id: user.id,
      email,
      password,
      createdAt,
      __v: 0
    };
    const expectedString = JSON.stringify(expected);
    const actual = JSON.stringify(emailInDatabase);
    expect(expectedString).toEqual(actual);
  });
});
