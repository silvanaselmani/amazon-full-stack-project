const { JWT_SECRET } = require("../config");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      isadmin: user.isadmin,
    },
    JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
};

module.exports = generateToken;
