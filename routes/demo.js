var express = require("express");
const { getReadableDatabase } = require("../x/DBHelper");
var router = express.Router();

/* GET users listing. */
router.get("/HelloWorld", function (request, response, next) {
  request.send(JSON.stringify({ data: "HelloWorld.", status: 0 }));
});

router.get("/testDB", async function (request, response, next) {
  let db = await getReadableDatabase();
  request.send(JSON.stringify({ data: "HelloWorld.", status: 0 }));
});

module.exports = router;
