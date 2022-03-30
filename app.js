const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require("dotenv").config();

const cors = require('cors')
let User= require('./models/user')

const app = express();
app.use(cors())


let session = require('express-session');
let passport = require('passport');
let passportLocal = require('passport-local');

let passportJWT = require('passport-jwt');
let JWTStrategy = passportJWT.Strategy;
let ExtractJWT = passportJWT.ExtractJwt;


let localStrategy = passportLocal.Strategy;

require("dotenv").config();

const mongoose = require('mongoose')



const userRouter = require('./routes/user');
const computerRouter= require('./routes/computer')


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//initializing session midleware
app.use(session({
  secret: process.env.Secret,
  saveUninitialized: false,
  resave:false
}))


//initializing passport
app.use(passport.initialize())
app.use(passport.session())

// const User = userModel.userSchema

passport.use(User.createStrategy())

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

let jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken()
jwtOptions.secretOrKey = process.env.Secret

let strategy = new JWTStrategy(jwtOptions, (jwt_payload, done) => {
    User.findById(jwt_payload.id)
        .then(user => {
      return done(null, user);
    })
    .catch(err => {
      return done(err, false);
    });
})

passport.use(strategy)

app.use('/api', userRouter);
app.use('/api/computers',computerRouter)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});





// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
    res.status(err.status || 500).json({ error:err});
    
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