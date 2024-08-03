const router = require("express").Router();
const passport = require("passport");
const uuid = require("uuid");

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

router.get("/genID", (req, res) => {
  req.session.id = uuid.v4();
  res.redirect(`http://localhost:5173/UploadData/${req.session.id}`);
});

router.get("/router/trainModel", (req, res) => {
  res.send("LOGGED IN");
});

router.post("/uploadFile", (req, res) => {
  fetch(`${FLASK_URL}/uploadFile`, {
    method: "POST",
    body: req.body,
    type: "formData",
  }).then((response) => {
    res.send(response.data);
  });
});

module.exports = router;
