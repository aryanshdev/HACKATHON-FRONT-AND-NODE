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
  axios.post(`${FLASK_URL}/deleteFile`, formData, {
    headers: {
      ...formData.getHeaders()
    }
  })
  .then(response => {
    res.status(200).json(response.data);
  })
  .catch(error => {
    res.status(500).json({
      message: 'Error deleting the file',
      error: error.message
    });
  });
  // fetch(`${FLASK_URL}/deleteFile`, {
  //   method: "POST",
  //   body: req.body,
  //   type: "formData",
  // }).then((response) => {
  //   res.send(response.data);
  // });-
});


// router.post("/cleanColumnNames", (req, res) => {
//   fetch(`${FLASK_URL}/cleanColumnNames`, {
//     method: 'POST',
//     body: req.body,
//     type: 'formData',
//   }).then((response) => {
//     res.send(response.data);
//   });
// });

router.post("/cleanColumnNames", (req, res) => {
  const formData = new FormData();
  formData.append("code", req.session.id);

  axios.post(`${FLASK_URL}/cleanColumnNames`, formData, {
    headers: {
      ...formData.getHeaders()
    }
  })
  .then(response => {
    res.status(200).json(response.data);
  })
  .catch(error => {
    res.status(500).json({
      message: 'Error cleaning column names',
      error: error.message
    });
  });
});


// router.post("/removeDuplicates", (req, res) => {
//   fetch(`${FLASK_URL}/removeDuplicates`, {
//     method: 'POST',
//     body: req.body,
//     type: 'formData',
//   }).then((response) => {
//     res.send(response.data);
//   });
// });

router.post("/removeDuplicates", (req, res) => {
  const formData = new FormData();
  formData.append("code", req.session.id);

  axios.post(`${FLASK_URL}/removeDuplicates`, formData, {
    headers: {
      ...formData.getHeaders()
    }
  })
  .then(response => {
    res.status(200).json(response.data);
  })
  .catch(error => {
    res.status(500).json({
      message: 'Error removing duplicates',
      error: error.message
    });
  });
});


// router.post("/checkMissing", (req, res) => {
//   fetch(`${FLASK_URL}/checkMissing`, {
//     method: 'POST',
//     body: req.body,
//     type: 'formData',
//   }).then((response) => {
//     res.send(response.data);
//   });
// });

router.post("/checkMissing", (req, res) => {
  const formData = new FormData();
  formData.append("code", req.session.id);

  axios.post(`${FLASK_URL}/checkMissing`, formData, {
    headers: {
      ...formData.getHeaders()
    }
  })
  .then(response => {
    res.status(200).json(response.data);
  })
  .catch(error => {
    res.status(500).json({
      message: 'Error checking for missing values',
      error: error.message
    });
  });
});


// router.post("/handle_NonNumeric_Fill", (req, res) => {
//   fetch(`${FLASK_URL}/handle_NonNumeric_Fill`, {
//     method: 'POST',
//     body: req.body,
//     type: 'formData',
//   }).then((response) => {
//     res.send(response.data);
//   });
// });

router.post("/handle_NonNumeric_Fill", (req, res) => {
  const formData = new FormData();
  formData.append("code", req.session.id);
  formData.append("col", req.body.col);

  axios.post(`${FLASK_URL}/handle_NonNumeric_Fill`, formData, {
    headers: {
      ...formData.getHeaders()
    }
  })
  .then(response => {
    res.status(200).json(response.data);
  })
  .catch(error => {
    res.status(500).json({
      message: 'Error handling non-numeric fill',
      error: error.message
    });
  });
});


// router.post("/handle_NonNumeric_Drop", (req, res) => {
//   fetch(`${FLASK_URL}/handle_NonNumeric_Drop`, {
//     method: 'POST',
//     body: req.body,
//     type: 'formData',
//   }).then((response) => {
//     res.send(response.data);
//   });
// });

router.post("/handle_NonNumeric_Drop", (req, res) => {
  const formData = new FormData();
  formData.append("code", req.session.id);
  formData.append("col", req.body.col);

  axios.post(`${FLASK_URL}/handle_NonNumeric_Drop`, formData, {
    headers: {
      ...formData.getHeaders()
    }
  })
  .then(response => {
    res.status(200).json(response.data);
  })
  .catch(error => {
    res.status(500).json({
      message: 'Error handling non-numeric drop',
      error: error.message
    });
  });
});


// router.post("/handle_Numeric_Missing", (req, res) => {
//   fetch(`${FLASK_URL}/handle_Numeric_Missing`, {
//     method: 'POST',
//     body: req.body,
//     type: 'formData',
//   }).then((response) => {
//     res.send(response.data);
//   });
// });

router.post("/handle_Numeric_Missing", (req, res) => {
  const formData = new FormData();
  formData.append("code", req.session.id);
  formData.append("col", req.body.col);

  axios.post(`${FLASK_URL}/handle_Numeric_Missing`, formData, {
    headers: {
      ...formData.getHeaders()
    }
  })
  .then(response => {
    res.status(200).json(response.data);
  })
  .catch(error => {
    res.status(500).json({
      message: 'Error handling numeric missing',
      error: error.message
    });
  });
});


// router.post("/dropColumn", (req, res) => {
//   fetch(`${FLASK_URL}/dropColumn`, {
//     method: 'POST',
//     body: req.body,
//     type: 'formData',
//   }).then((response) => {
//     res.send(response.data);
//   });
// });

router.post("/dropColumn", (req, res) => {
  const formData = new FormData();
  formData.append("code", req.session.id);
  formData.append("col", req.body.col);

  axios.post(`${FLASK_URL}/dropColumn`, formData, {
    headers: {
      ...formData.getHeaders()
    }
  })
  .then(response => {
    res.status(200).json(response.data);
  })
  .catch(error => {
    res.status(500).json({
      message: 'Error dropping column',
      error: error.message
    });
  });
});


// router.post("/cleanColumnNames", (req, res) => {
//   fetch(`${FLASK_URL}/cleanColumnNames`, {
//     method: 'POST}',
//      body: req.body,
//     type: 'formData',
//   }).then((response) => {
//     res.send(response.data);
//   });
// });

router.post("/cleanColumnNames", (req, res) => {
  const formData = new FormData();
  formData.append("code", req.session.id);

  axios.post(`${FLASK_URL}/cleanColumnNames`, formData, {
    headers: {
      ...formData.getHeaders()
    }
  })
  .then(response => {
    res.status(200).json(response.data);
  })
  .catch(error => {
    res.status(500).json({
      message: 'Error cleaning column names',
      error: error.message
    });
  });
});


// router.post("/convertNumeric", (req, res) => {
//   fetch(`${FLASK_URL}/convertNumeric`, {
//     method: 'POST',
//     body: req.body,
//     type: 'formData',
//   }).then((response) => {
//     res.send(response.data);
//   });
// });

router.post("/convertNumeric", (req, res) => {
  const formData = new FormData();
  formData.append("code", req.session.id);
  formData.append("col", req.body.col);

  axios.post(`${FLASK_URL}/convertNumeric`, formData, {
    headers: {
      ...formData.getHeaders()
    }
  })
  .then(response => {
    res.status(200).json(response.data);
  })
  .catch(error => {
    res.status(500).json({
      message: 'Error converting to numeric',
      error: error.message
    });
  });
});


// router.post("normalizseDate", (req, res) => {
//   fetch(`${FLASK_URL}/normalizseDate`, {
//     method: 'POST',
//     body: req.body,
//     type: 'formData',
//   }).then((response) => {
//     res.send(response.data);
//   });
// });

router.post("/normalizeDate", (req, res) => { 
  const formData = new FormData();
  formData.append("code", req.session.id);
  formData.append("col", req.body.col);

  axios.post(`${FLASK_URL}/normalizeDate`, formData, {
    headers: {
      ...formData.getHeaders()
    }
  })
  .then(response => {
    res.status(200).json(response.data);
  })
  .catch(error => {
    res.status(500).json({
      message: 'Error normalizing date',
      error: error.message
    });
  });
});


// router.post("/oneHot", (req, res) => {
//   fetch(`${FLASK_URL}/oneHot`, {
//     method: 'POST',
//     body: req.body,
//     type: 'formData',
//   }).then((response) => {
//     res.send(response.data);
//   });
// });

router.post("/oneHot", (req, res) => {
  const formData = new FormData();
  formData.append("code", req.session.id);
  formData.append("col", req.body.col);

  axios.post(`${FLASK_URL}/oneHot`, formData, {
    headers: {
      ...formData.getHeaders()
    }
  })
  .then(response => {
    res.status(200).json(response.data);
  })
  .catch(error => {
    res.status(500).json({
      message: 'Error performing one-hot encoding',
      error: error.message
    });
  });
});


// router.post("/get_Col_Datetypes", (req, res) => {
//   fetch(`${FLASK_URL}/get_Col_Datetypes`, {
//     method: 'POST',
//     body: req.body,
//     type: 'formData',
//   }).then((response) => {
//     res.send(response.data);
//   });
// });

router.post("/get_Col_Datetypes", (req, res) => {
  const formData = new FormData();
  formData.append("code", req.session.id);

  axios.post(`${FLASK_URL}/get_Col_Datetypes`, formData, {
    headers: {
      ...formData.getHeaders()
    }
  })
  .then(response => {
    res.status(200).json(response.data);
  })
  .catch(error => {
    res.status(500).json({
      message: 'Error getting column datatypes',
      error: error.message
    });
  });
});


// router.post("/drop_Rows_WO_Target", (req, res) => {
//   fetch(`${FLASK_URL}/drop_Rows_WO_Target`, {
//     method: 'POST',
//     body: req.body,
//     type: 'formData',
//   }).then((response) => {
//     res.send(response.data);
//   });
// });

router.post("/drop_Rows_WO_Target", (req, res) => {
  const formData = new FormData();
  formData.append("code", req.session.id);
  formData.append("col", req.body.col);

  axios.post(`${FLASK_URL}/drop_Rows_WO_Target`, formData, {
    headers: {
      ...formData.getHeaders()
    }
  })
  .then(response => {
    res.status(200).json(response.data);
  })
  .catch(error => {
    res.status(500).json({
      message: 'Error dropping rows without target',
      error: error.message
    });
  });
});


// router.post("/setTarget", (req, res) => {
//   fetch(`${FLASK_URL}/setTarget`, {
//     method: 'POST',
//     body: req.body,
//     type: 'formData',
//   }).then((response) => {
//     res.send(response.data);
//   });
// });

router.post("/setTarget", (req, res) => {
  const formData = new FormData();
  formData.append("code", req.session.id);
  formData.append("targetValue", req.body.targetValue);

  axios.post(`${FLASK_URL}/setTarget`, formData, {
    headers: {
      ...formData.getHeaders()
    }
  })
  .then(response => {
    res.status(200).json(response.data);
  })
  .catch(error => {
    res.status(500).json({
      message: 'Error setting target',
      error: error.message
    });
  });
});

// router.post("/saveSplits", (req, res) => {
//   fetch(`${FLASK_URL}/saveSplits`, {
//     method: 'POST',
//     body: req.body,
//     type: 'formData',
//   }).then((response) => {
//     res.send(response.data);
//   });
// });

router.post("/saveSplits", (req, res) => {
  const formData = new FormData();
  formData.append("code", req.session.id);
  formData.append("trainingSplits", req.body.trainingSplits);

  axios.post(`${FLASK_URL}/saveSplits`, formData, {
    headers: {
      ...formData.getHeaders()
    }
  })
  .then(response => {
    res.status(200).json(response.data);
  })
  .catch(error => {
    res.status(500).json({
      message: 'Error saving splits',
      error: error.message
    });
  });
});


// router.post("/setEncoder", (req, res) => {
//   fetch(`${FLASK_URL}/setEncoder`, {
//     method: 'POST',
//     body: req.body,
//     type: 'formData',
//   }).then((response) => {
//     res.send(response.data);
//   });
// });

router.post("/setEncoder", (req, res) => {
  const formData = new FormData();
  formData.append("code", req.session.id);
  formData.append("encoderStatus", req.body.encoderStatus);

  axios.post(`${FLASK_URL}/setEncoder`, formData, {
    headers: {
      ...formData.getHeaders()
    }
  })
  .then(response => {
    res.status(200).json(response.data);
  })
  .catch(error => {
    res.status(500).json({
      message: 'Error setting encoder',
      error: error.message
    });
  });
});


// router.post("/runSVM", (req, res) => {
//   fetch(`${FLASK_URL}/runSVM`, {
//     method: 'POST',
//     body: req.body,
//     type: 'formData',
//   }).then((response) => {
//     res.send(response.data);
//   });
// });

router.post("/runSVM", (req, res) => {
  const formData = new FormData();
  formData.append("code", req.session.id);
  formData.append("param1", req.body.param1);
  formData.append("param2", req.body.param2);
  formData.append("param3", req.body.param3);

  axios.post(`${FLASK_URL}/runSVM`, formData, {
    headers: {
      ...formData.getHeaders()
    }
  })
  .then(response => {
    res.status(200).json(response.data);
  })
  .catch(error => {
    res.status(500).json({
      message: 'Error running SVM',
      error: error.message
    });
  });
});


// router.post("/runRandomForest", (req, res) => {
//   fetch(`${FLASK_URL}/runRandomForest`, {
//     method: 'POST',
//     body: req.body,
//     type: 'formData',
//   }).then((response) => {
//     res.send(response.data);
//   });
// });

router.post("/runRandomForest", (req, res) => {
  const formData = new FormData();
  formData.append("code", req.session.id);
  formData.append("param1", req.body.param1);
  formData.append("param2", req.body.param2);
  formData.append("param3", req.body.param3);

  axios.post(`${FLASK_URL}/runRandomForest`, formData, {
    headers: {
      ...formData.getHeaders()
    }
  })
  .then(response => {
    res.status(200).json(response.data);
  })
  .catch(error => {
    res.status(500).json({
      message: 'Error running Random Forest',
      error: error.message
    });
  });
});



// router.post("/runXGBoost", (req, res) => {
//   fetch(`${FLASK_URL}/runXGBoost`, {
//     method: 'POST',
//     body: req.body,
//     type: 'formData',
//   }).then((response) => {
//     res.send(response.data);
//   });
// });

router.post("/runXGBoost", (req, res) => {
  const formData = new FormData();
  formData.append("code", req.session.id);
  formData.append("param1", req.body.param1);
  formData.append("param2", req.body.param2);
  formData.append("param3", req.body.param3);

  axios.post(`${FLASK_URL}/runXGBoost`, formData, {
    headers: {
      ...formData.getHeaders()
    }
  })
  .then(response => {
    res.status(200).json(response.data);
  })
  .catch(error => {
    res.status(500).json({
      message: 'Error running XGBoost',
      error: error.message
    });
  });
});


// router.post("/runDecision", (req, res) => {
//   fetch(`${FLASK_URL}/runDecision`, {
//     method: 'POST',
//     body: req.body,
//     type: 'formData',
//   }).then((response) => {
//     res.send(response.data);
//   });
// });

router.post("/runDecision", (req, res) => {
  const formData = new FormData();
  formData.append("code", req.session.id);
  formData.append("param1", req.body.param1);
  formData.append("param2", req.body.param2);
  formData.append("param3", req.body.param3);

  axios.post(`${FLASK_URL}/runDecision`, formData, {
    headers: {
      ...formData.getHeaders()
    }
  })
  .then(response => {
    res.status(200).json(response.data);
  })
  .catch(error => {
    res.status(500).json({
      message: 'Error running Decision Tree',
      error: error.message
    });
  });
});


// router.post("/runBagging", (req, res) => {
//   fetch(`${FLASK_URL}/runBagging`, {
//     method: 'POST',
//     body: req.body,
//     type: 'formData',
//   }).then((response) => {
//     res.send(response.data);
//   });
// });

router.post("/runBagging", (req, res) => {
  const formData = new FormData();
  formData.append("code", req.session.id);
  formData.append("param1", req.body.param1);
  formData.append("param2", req.body.param2);
  formData.append("param3", req.body.param3);

  axios.post(`${FLASK_URL}/runBagging`, formData, {
    headers: {
      ...formData.getHeaders()
    }
  })
  .then(response => {
    res.status(200).json(response.data);
  })
  .catch(error => {
    res.status(500).json({
      message: 'Error running Bagging',
      error: error.message
    });
  });
});


router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});


module.exports = router;
