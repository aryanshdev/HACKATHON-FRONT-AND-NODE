const router = require("express").Router();
const sql = require("sqlite3").verbose();
const passport = require("passport");
const uuid = require("uuid");
const FormData = require("form-data");
const ensureAuthenticated = require("../middlewares/middlewares")
const multer = require("multer");
const uploadLocation = multer();
const axios = require("axios");
const FLASK_URL = "http://localhost:5000";


//Connect DB
const userDB = new sql.Database("../userDB.db");


router.get("/", (req, res) => {
  res.send(200);
});

router.get("/login", (req, res) => {
  fetch(`${FLASK_URL}/`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      res.send(data);
    });
});

router.get(
  "/google-auth",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/process-google",
  passport.authenticate("google", {
    failureRedirect: "/",
    successRedirect: "/app/genID",
    keepSessionInfo: true,
  })
);

router.get("/genID", ensureAuthenticated, (req, res) => {
  req.session.id = uuid.v4();
  console.log(req.user);
  userDB.run("INSERT INTO users (ssid, uuid, date, 'upload') VALUES (?, ?, ?)", [req.session.id, req.user.id , new Date()]);
  res.redirect(`http://localhost:5173/UploadData/${req.session.id}`);
});

router.get("/trainModel", (req, res) => {
  res.send("LOGGED IN");
});

router.post("/uploadFile", uploadLocation.single("uploadFile"),  (req, res) => {
  const formData = new FormData();
  formData.append('uploadFile', req.file.buffer, req.file.originalname);
  formData.append("code", req.session.id);
  axios.post(`${FLASK_URL}/uploadFile`, formData, {
    headers: {
      ...formData.getHeaders()
    }
  })
  .then(response => {
    req.session.dataset = response.data;
    res.status(200).json(response.data); 
  })
  .catch(error => {
    console.log(error);
    res.sendStatus(500);
  });
});

router.post("/getDatasetDisplay", (req, res) => {
  res.json(req.session.dataset);}

);

router.get("/RunModels", (req, res) => {
  delete req.session.dataset
  res.redirect("http://localhost:5173/RunModels/"+req.session.id);
});

router.get("/TransformData", (req, res) => {
  res.redirect("http://localhost:5173/TransformData/"+req.session.id);
});

router.post("/deleteFile", (req, res) => {
  const formData = new FormData();
  formData.append("code", req.session.id);

  fetch(`${FLASK_URL}/deleteFile`, {
    method: "POST",
    body: req.body,
    type: "formData",
  }).then((response) => {
    res.send(response.data);
  });
});


router.post("/cleanColumnNames", (req, res) => {
  fetch(`${FLASK_URL}/cleanColumnNames`, {
    method: 'POST',
    body: req.body,
    type: 'formData',
  }).then((response) => {
    res.send(response.data);
  });
});

router.post("/removeDuplicates", (req, res) => {
  fetch(`${FLASK_URL}/removeDuplicates`, {
    method: 'POST',
    body: req.body,
    type: 'formData',
  }).then((response) => {
    res.send(response.data);
  });
});

router.post("/checkMissing", (req, res) => {
  fetch(`${FLASK_URL}/checkMissing`, {
    method: 'POST',
    body: req.body,
    type: 'formData',
  }).then((response) => {
    res.send(response.data);
  });
});

router.post("/handle_NonNumeric_Fill", (req, res) => {
  fetch(`${FLASK_URL}/handle_NonNumeric_Fill`, {
    method: 'POST',
    body: req.body,
    type: 'formData',
  }).then((response) => {
    res.send(response.data);
  });
});

router.post("/handle_NonNumeric_Drop", (req, res) => {
  fetch(`${FLASK_URL}/handle_NonNumeric_Drop`, {
    method: 'POST',
    body: req.body,
    type: 'formData',
  }).then((response) => {
    res.send(response.data);
  });
});

router.post("/handle_Numeric_Missing", (req, res) => {
  fetch(`${FLASK_URL}/handle_Numeric_Missing`, {
    method: 'POST',
    body: req.body,
    type: 'formData',
  }).then((response) => {
    res.send(response.data);
  });
});

router.post("/dropColumn", (req, res) => {
  fetch(`${FLASK_URL}/dropColumn`, {
    method: 'POST',
    body: req.body,
    type: 'formData',
  }).then((response) => {
    res.send(response.data);
  });
});

router.get("/cleanColumnNames", (req, res) => {
  fetch(`${FLASK_URL}/cleanColumnNames`, {
    method: 'GET',
  }).then((response) => {
    res.send(response.data);
  });
});

router.post("/convertNumeric", (req, res) => {
  fetch(`${FLASK_URL}/convertNumeric`, {
    method: 'POST',
    body: req.body,
    type: 'formData',
  }).then((response) => {
    res.send(response.data);
  });
});

router.post("normalizseDate", (req, res) => {
  fetch(`${FLASK_URL}/normalizseDate`, {
    method: 'POST',
    body: req.body,
    type: 'formData',
  }).then((response) => {
    res.send(response.data);
  });
});

router.post("/oneHot", (req, res) => {
  fetch(`${FLASK_URL}/oneHot`, {
    method: 'POST',
    body: req.body,
    type: 'formData',
  }).then((response) => {
    res.send(response.data);
  });
});

router.post("/get_Col_Datetypes", (req, res) => {
  fetch(`${FLASK_URL}/get_Col_Datetypes`, {
    method: 'POST',
    body: req.body,
    type: 'formData',
  }).then((response) => {
    res.send(response.data);
  });
});

router.post("/drop_Rows_WO_Target", (req, res) => {
  fetch(`${FLASK_URL}/drop_Rows_WO_Target`, {
    method: 'POST',
    body: req.body,
    type: 'formData',
  }).then((response) => {
    res.send(response.data);
  });
});

router.post("/setTarget", (req, res) => {
  fetch(`${FLASK_URL}/setTarget`, {
    method: 'POST',
    body: req.body,
    type: 'formData',
  }).then((response) => {
    res.send(response.data);
  });
});

router.post("/saveSplits", (req, res) => {
  fetch(`${FLASK_URL}/saveSplits`, {
    method: 'POST',
    body: req.body,
    type: 'formData',
  }).then((response) => {
    res.send(response.data);
  });
});

router.post("/setEncoder", (req, res) => {
  fetch(`${FLASK_URL}/setEncoder`, {
    method: 'POST',
    body: req.body,
    type: 'formData',
  }).then((response) => {
    res.send(response.data);
  });
});

router.post("/runSVM", (req, res) => {
  fetch(`${FLASK_URL}/runSVM`, {
    method: 'POST',
    body: req.body,
    type: 'formData',
  }).then((response) => {
    res.send(response.data);
  });
});

router.post("/runRandomForest", (req, res) => {
  fetch(`${FLASK_URL}/runRandomForest`, {
    method: 'POST',
    body: req.body,
    type: 'formData',
  }).then((response) => {
    res.send(response.data);
  });
});


router.post("/runXGBoost", (req, res) => {
  fetch(`${FLASK_URL}/runXGBoost`, {
    method: 'POST',
    body: req.body,
    type: 'formData',
  }).then((response) => {
    res.send(response.data);
  });
});

router.post("/runDecision", (req, res) => {
  fetch(`${FLASK_URL}/runDecision`, {
    method: 'POST',
    body: req.body,
    type: 'formData',
  }).then((response) => {
    res.send(response.data);
  });
});

router.post("/runBagging", (req, res) => {
  fetch(`${FLASK_URL}/runBagging`, {
    method: 'POST',
    body: req.body,
    type: 'formData',
  }).then((response) => {
    res.send(response.data);
  });
});


router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});


module.exports = router;
