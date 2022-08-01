const express = require("express");
const router = express.Router();
const UserService = require("../services/UserService");
const jwt = require("jsonwebtoken");
//const isAuthorized = require("../modules/isAuthorized");
//const { JWT_SECRET } = require("../config");

const UserServiceInstance = new UserService();

module.exports = (app) => {
  app.use("/api/users", router);
  router.get("/:email", async (req, res, next) => {
    try {
      const { email } = req.params;
      const response = await UserServiceInstance.getByEmail({ email: email });
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  router.get("/:userId", async (req, res, next) => {
    try {
      const { userId } = req.params;

      const response = await UserServiceInstance.get({ id: userId });
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  router.put("/:userId", async (req, res, next) => {
    try {
      const { userId } = req.params;
      const data = req.body;

      const response = await UserServiceInstance.update({
        id: userId,
        ...data,
      });
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  /*router.post("/register", async (req, res, next) => {
    try {
      const response = await UserServiceInstance.register(req.body);

      if (response) {
        let secret = JWT_SECRET;
        let token = jwt.sign({ id: response.id }, secret, {
          algorithm: "HS256",
          expiresIn: "3600s",
        });
        res.cookie("jwt_ukulele", token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60,
          sameSite: isProduction ? "none" : "lax",
          secure: isProduction ? true : false,
        });
        res.json(response.id);
      } else {
        //response above is null when the users email they are trying to register is already in the database.
        res.status(400).send();
      }
    } catch (err) {
      next(err);
    }
  });*/
};
