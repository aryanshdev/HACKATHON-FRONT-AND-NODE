const express = require("express");
const sql = require("sqlite3").verbose();
const session = require("express-session");
const passport = require("passport");
const dotenv = require("dotenv");
const appRouter = require("./routes/app");
dotenv.config();

const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FLASK_URL = "http://127.0.0.1:5000";

//Connect DB
const userDB = new sql.Database("./userDB.db");

const app = express();
app.use(express.json());

app.use(
  session({
    secret: "AVENGE-AI",
    resave: false,
    saveUninitialized: true,
  })
);

function ensureAuth(req,res,next) {
  if(req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/");
  }  
}

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.OAUTH_CLIENT,
      clientSecret: process.env.OAUTH_SECRET,
      callbackURL: "http://localhost:10000/app/process-google",
      scope: ["https://www.googleapis.com/auth/plus.login"],
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});


app.use("/app", appRouter);

app.listen(10000, () => {
  console.log("SERVER LISTENING AT PORT 10,000");
});
