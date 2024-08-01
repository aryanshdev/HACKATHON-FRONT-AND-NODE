const express = require("express");
const sql = require("sqlite3").verbose();
const session = require("express-session");
const passport = require("passport");
const passsport = require("passport");
const dotenv = require("dotenv");
dotenv.config();
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FLASK_URL = "http://localhost:5000";

//Connect DB
const userDB = new sql.Database("./userDB.db");

const app = express();
app.use(express.json());

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);




passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.OAUTH_CLIENT,
      clientSecret: process.env.OAUTH_SECRET,
      callbackURL: "http://localhost:10000/process-google",
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



app.listen(10000, () => {
  console.log("SERVER LISTENING AT PORT 10,000");
});

app.get("/login", (req, res) => {
  fetch(`${FLASK_URL}/`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      res.send(data);
    });
});


app.get(
    "/google-auth",
    passport.authenticate("google", { scope: ["profile", "email"] })
    
  );
  
  app.get(
    "/process-google",
    passport.authenticate("google", {
      failureRedirect: "/",
      successRedirect: "http://localhost:5173/TrainModel",
      keepSessionInfo: true,
    })
  );

app.get("/trainModel", (req, res) => {
    res.send("LOGGED IN");
});