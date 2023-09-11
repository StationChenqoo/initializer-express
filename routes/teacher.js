var express = require("express");
const { DBHelper } = require("../x/DBHelper");
var router = express.Router();

/** 随机的n个Series */
router.get("/selectShuffleTeachers", async function (request, response, next) {
  let dbHelper = new DBHelper();
  let connection = await dbHelper.connectDatabase();
  // console.log("testDB.connectDatabase: ", connection.db == null);
  let size = request.query?.limit || 10;
  let datas = await connection.db
    .collection("Teacher")
    .aggregate([{ $sample: { size: parseInt(size) } }])
    .toArray();
  dbHelper.disconnectDatabase(connection);
  response.send({ datas, status: 0 });
});

module.exports = router;
