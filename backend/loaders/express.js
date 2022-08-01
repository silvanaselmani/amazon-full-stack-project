const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const logger = require("morgan");

const { SESSION_SECRET } = require("../config");

module.exports = (app) => {
  // Enable Cross Origin Resource Sharing to all origins by default
  app.use(cors());
  app.use(logger("dev"));

  // Transforms raw string of req.body into JSON
  app.use(bodyParser.json());

  app.use(bodyParser.urlencoded({ extended: true }));
  //app.use(cookieParser());

  //
  app.set("trust proxy", 1);

  app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
  });

  // Creates a session
  app.use(
    session({
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: "none",
      },
    })
  );

  return app;
};
