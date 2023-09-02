var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/HelloWorld", function (request, response, next) {
  request.send(JSON.stringify({ data: "HelloWorld.", status: 0 }));
});

module.exports = router;