var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (reqest, response, next) {
  response.render("index", { title: "Express" });
});

router.get("/testGet", function (reqest, response, next) {
  response.send({ prams: reqest.query });
});
module.exports = router;
