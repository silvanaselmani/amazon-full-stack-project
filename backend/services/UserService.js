const createError = require("http-errors");
const UserModel = require("../models/user");

const UserModelInstance = new UserModel();

module.exports = class UserService {
  async get(data) {
    const { id } = data;

    try {
      // Check if user already exists
      const user = await UserModelInstance.findOneById(id);

      // If user doesn't exist, reject
      if (!user) {
        throw createError(404, "User record not found");
      }

      return user;
    } catch (err) {
      throw err;
    }
  }

  async getByEmail(data) {
    const { email } = data;

    try {
      // Check if user already exists
      const user = await UserModelInstance.findOneByEmail(email);

      // If user doesn't exist, reject
      if (!user) {
        throw createError(404, "User record not found");
      }

      return user;
    } catch (err) {
      throw err;
    }
  }

  async update(data) {
    try {
      // Check if user already exists
      const user = await UserModelInstance.update(data);

      return user;
    } catch (err) {
      throw err;
    }
  }
};
/*
  async register(data) {
    try {
      const user = await UserModelInstance.findOneByEmail(data.email);
      if (!user) {
        const encryptedPassword = this.encrypt(data.password);
        const newData = { ...data, password: await encryptedPassword };
        const loginData = await UserModelInstance.create(newData);
        return loginData;
      } else {
        return null;
      }
    } catch (err) {
      throw err;
    }
  }
};
*/
