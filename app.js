const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
require("dotenv").config();

const cors = require("cors");
 let User = require("./models/user");


const app = express();
app.use(cors());

let session = require("express-session");
let passport = require("passport");

let passportJWT = require("passport-jwt");
let JWTStrategy = passportJWT.Strategy;
let ExtractJWT = passportJWT.ExtractJwt;


const mongoose = require("mongoose");

const userRouter = require("./routes/user");
const computerRouter = require("./routes/computer");
const basketRouter = require("./routes/basket");

app.use(logger("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//initializing session midleware
app.use(
  session({
    secret: process.env.Secret,
    saveUninitialized: false,
    resave: false,
  })
);

//initializing passport
app.use(passport.initialize());
app.use(passport.session());


 passport.use(User.createStrategy());

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
      console.log("called frodeserialize, user:", id, user);

    done(err, user);
  });
});

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.Secret;

let strategy = new JWTStrategy(jwtOptions, (jwt_payload, done) => {
  User.findById(jwt_payload.id)
    .then((user) => {
      return done(null, user);
    })
    .catch((err) => {
      return done(err, false);
    });
});

passport.use(strategy);

app.use("/api", userRouter);
app.use("/api/computers", computerRouter);
app.use("/api/basket", basketRouter);

app.use("/", (req, res, nex) => {
  res.send("Computer rentals Api");
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500).json({ error: err });

  //   res.render('error');
});

mongoose
  .connect(process.env.URI, {
    useNewurlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected");
    app.listen(process.env.PORT || 80);
  })
  .catch((err) => console.log(`connection error ${err}`));

module.exports = app;
