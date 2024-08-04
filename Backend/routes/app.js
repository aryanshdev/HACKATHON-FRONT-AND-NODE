const router = require("express").Router();
const passport = require("passport");
const uuid = require("uuid");
const FormData = require("form-data");
const ensureAuthenticated = require("../middlewares/middlewares")
const multer = require("multer");
const uploadLocation = multer();
const axios = require("axios");
const FLASK_URL = "http://localhost:5000";

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
  res.redirect(`http://localhost:5173/UploadData/${req.session.id}`);
});

router.get("/router/trainModel", (req, res) => {
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
    res.status(200).json(response.data);
  })
  .catch(error => {
    res.status(500).json({
      message: 'Error forwarding the file',
      error: error.message
    });
  });
});

router.post("/deleteFile", (req, res) => {
  fetch(`${FLASK_URL}/deleteFile`, {
    method: "POST",
    body: req.body,
    type: "formData",
  }).then((response) => {
    res.send(response.data);
  });
});

module.exports = router;
