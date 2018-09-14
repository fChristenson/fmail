const bcrypt = require("bcrypt");

const SALT_ROUNDS = 10;

class UserService {
  constructor(UserModel) {
    this.UserModel = UserModel;
    this.getUserByEmail = this.getUserByEmail.bind(this);
    this.createUser = this.createUser.bind(this);
    this.registerUser = this.registerUser.bind(this);
  }

  getUserByEmail(email) {
    return this.UserModel.findOne({ email });
  }

  createUser(email, password) {
    return new this.UserModel({ email, password }).save();
  }

  async registerUser(email, password) {
    const maybeUser = await this.getUserByEmail(email);

    if (maybeUser) {
      throw new Error("There is already a user with that email");
    }

    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    return this.createUser(email, hash);
  }
}

module.exports = UserService;
