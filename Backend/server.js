const express = require("express");
const sql = require("sqlite3").verbose();
const session = require("express-session");
const passport = require("passport");
const dotenv = require("dotenv");
const uuid = require("uuid");

dotenv.config();
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FLASK_URL = "http://127.0.0.1:5000";

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
      successRedirect: "/genID",
      keepSessionInfo: true,
    })
  );

app.get("/genID", (req, res) => {
  const id = uuid.v4();
  res.redirect(`http://localhost:5173/TrainModel/${id}`)
})

app.get("/trainModel", (req, res) => {
    res.send("LOGGED IN");
});

app.post("/uploadFile", (req, res) => {
  fetch(`${FLASK_URL}/uploadFile`, {
    method:'POST',
    body: req.body,
    type: 'formData',
  }).then((response) => {
    res.send(response.data);
  });
});

// app.delete("/deleteFile", (req, res) => {
//   fetch(`${FLASK_URL}/deleteFile`, {
//     method: 'DELETE',
//     body: req.body,
//     type: 'formData',
//   }).then((response) => {
//     res.send(response.data);
//   });
// });


app.post("/cleanColumnNames", (req, res) => {
  fetch(`${FLASK_URL}/cleanColumnNames`, {
    method: 'POST',
    body: req.body,
    type: 'formData',
  }).then((response) => {
    res.send(response.data);
  });
});

app.post("/removeDuplicates", (req, res) => {
  fetch(`${FLASK_URL}/removeDuplicates`, {
    method: 'POST',
    body: req.body,
    type: 'formData',
  }).then((response) => {
    res.send(response.data);
  });
});

app.post("/checkMissing", (req, res) => {
  fetch(`${FLASK_URL}/checkMissing`, {
    method: 'POST',
    body: req.body,
    type: 'formData',
  }).then((response) => {
    res.send(response.data);
  });
});

app.post("/handle_NonNumeric_Fill", (req, res) => {
  fetch(`${FLASK_URL}/handle_NonNumeric_Fill`, {
    method: 'POST',
    body: req.body,
    type: 'formData',
  }).then((response) => {
    res.send(response.data);
  });
});

app.post("/handle_NonNumeric_Drop", (req, res) => {
  fetch(`${FLASK_URL}/handle_NonNumeric_Drop`, {
    method: 'POST',
    body: req.body,
    type: 'formData',
  }).then((response) => {
    res.send(response.data);
  });
});

app.post("/handle_Numeric_Missing", (req, res) => {
  fetch(`${FLASK_URL}/handle_Numeric_Missing`, {
    method: 'POST',
    body: req.body,
    type: 'formData',
  }).then((response) => {
    res.send(response.data);
  });
});

app.post("/dropColumn", (req, res) => {
  fetch(`${FLASK_URL}/dropColumn`, {
    method: 'POST',
    body: req.body,
    type: 'formData',
  }).then((response) => {
    res.send(response.data);
  });
});

app.get("/cleanColumnNames", (req, res) => {
  fetch(`${FLASK_URL}/cleanColumnNames`, {
    method: 'GET',
  }).then((response) => {
    res.send(response.data);
  });
});

app.post("/convertNumeric", (req, res) => {
  fetch(`${FLASK_URL}/convertNumeric`, {
    method: 'POST',
    body: req.body,
    type: 'formData',
  }).then((response) => {
    res.send(response.data);
  });
});

app.post("normalizseDate", (req, res) => {
  fetch(`${FLASK_URL}/normalizseDate`, {
    method: 'POST',
    body: req.body,
    type: 'formData',
  }).then((response) => {
    res.send(response.data);
  });
});

app.post("/oneHot", (req, res) => {
  fetch(`${FLASK_URL}/oneHot`, {
    method: 'POST',
    body: req.body,
    type: 'formData',
  }).then((response) => {
    res.send(response.data);
  });
});

app.post("/get_Col_Datetypes", (req, res) => {
  fetch(`${FLASK_URL}/get_Col_Datetypes`, {
    method: 'POST',
    body: req.body,
    type: 'formData',
  }).then((response) => {
    res.send(response.data);
  });
});

app.post("/drop_Rows_WO_Target", (req, res) => {
  fetch(`${FLASK_URL}/drop_Rows_WO_Target`, {
    method: 'POST',
    body: req.body,
    type: 'formData',
  }).then((response) => {
    res.send(response.data);
  });
});

app.post("/setTarget", (req, res) => {
  fetch(`${FLASK_URL}/setTarget`, {
    method: 'POST',
    body: req.body,
    type: 'formData',
  }).then((response) => {
    res.send(response.data);
  });
});

app.post("/saveSplits", (req, res) => {
  fetch(`${FLASK_URL}/saveSplits`, {
    method: 'POST',
    body: req.body,
    type: 'formData',
  }).then((response) => {
    res.send(response.data);
  });
});

app.post("/setEncoder", (req, res) => {
  fetch(`${FLASK_URL}/setEncoder`, {
    method: 'POST',
    body: req.body,
    type: 'formData',
  }).then((response) => {
    res.send(response.data);
  });
});

app.post("/runSVM", (req, res) => {
  fetch(`${FLASK_URL}/runSVM`, {
    method: 'POST',
    body: req.body,
    type: 'formData',
  }).then((response) => {
    res.send(response.data);
  });
});

app.post("/runRandomForest", (req, res) => {
  fetch(`${FLASK_URL}/runRandomForest`, {
    method: 'POST',
    body: req.body,
    type: 'formData',
  }).then((response) => {
    res.send(response.data);
  });
});


app.post("/runXGBoost", (req, res) => {
  fetch(`${FLASK_URL}/runXGBoost`, {
    method: 'POST',
    body: req.body,
    type: 'formData',
  }).then((response) => {
    res.send(response.data);
  });
});

app.post("/runDecision", (req, res) => {
  fetch(`${FLASK_URL}/runDecision`, {
    method: 'POST',
    body: req.body,
    type: 'formData',
  }).then((response) => {
    res.send(response.data);
  });
});

app.post("/runBagging", (req, res) => {
  fetch(`${FLASK_URL}/runBagging`, {
    method: 'POST',
    body: req.body,
    type: 'formData',
  }).then((response) => {
    res.send(response.data);
  });
});


app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});