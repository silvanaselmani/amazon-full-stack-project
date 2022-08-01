const createError = require("http-errors");
const UserModel = require("../models/user");
//const UserService = require("./UserService");
const UserModelInstance = new UserModel();
//const UserServiceInstance = new UserService();
const bcrypt = require("bcrypt");

module.exports = class AuthService {
  async register(data) {
    const { email, password } = data;
    try {
      //Check if user already exists

      const user = await UserModelInstance.findOneByEmail(email);

      //if user already exists, reject
      if (user) {
        throw createError(409, "Email already in use");
      } else {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const newData = { ...data, password: hash };
        return await UserModelInstance.create(newData);
      }
    } catch (error) {
      throw createError(500, error);
    }
  }

  async login(data) {
    //Check if user exists
    const { email, password } = data;
    try {
      const user = await UserModelInstance.findOneByEmail(email);
      if (!user) {
        throw createError(401, "Incorrect username or password");
      }

      const matchedPassword = await bcrypt.compare(password, user.password);
      console.log(password);
      console.log(user.password);
      console.log(matchedPassword);
      if (!matchedPassword) {
        throw createError(401, "incorrect username or password");
      }
      return user;
    } catch (err) {
      throw createError(500, err);
    }
  }
};
