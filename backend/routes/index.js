const productRouter = require("./product");
const userRouter = require("./users");
const authRouter = require("./auth");

module.exports = (app, passport) => {
  authRouter(app, passport);
  productRouter(app);
  userRouter(app);
};
