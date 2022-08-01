const passport = require("passport");
//const FacebookStrategy = require("passport-facebook").Strategy;
//const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");

const AuthService = require("../services/authService");
const AuthServiceInstance = new AuthService();

module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());

  //Set method to serialize data to store in cookie

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  //Set method to deserialize data stored in cooki and attach to req.use
  passport.deserializeUser((user, done) => {
    done(null, { id });
  });

  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await AuthServiceInstance.login({
          email: username,
          password,
        });
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );

  return passport;
};
