const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

// Instantiate Services
const AuthService = require("../services/authService");
const AuthServiceInstance = new AuthService();
//const UserService = require("../service/UserService");
//const UserServiceInstance = new UserService();

module.exports = (app, passport) => {
  app.use("/api/user", router);

  // Registration Endpoint

  router.post("/register", async (req, res, next) => {
    try {
      const data = req.body;
      const response = await AuthServiceInstance.register(data);
      /*if (response) {
        let secret = JWT_SECRET;
        let token = jwt.sign({ id: response.id }, secret, {
          algorithm: "HS256",
          expiresIn: "3600s",
        });
        res.cookie("jwt_ukulele", token, {
          httpOnly: true,
          magAge: 100 * 60 * 60,
          sameSite: "none",
          secure: true,
        });
        */
      res.status(400).send(response);
    } catch (error) {
      next(error);
    }
  });

  //Login Endpoint

  router.post(
    "/login",
    passport.authenticate("local"),
    async (req, res, next) => {
      try {
        const { username, password } = req.body;
        const response = await AuthServiceInstance.login({
          email: username,
          password,
        });
        res.status(200).send(response);
      } catch (error) {
        next(error);
      }
    }
  );
};
