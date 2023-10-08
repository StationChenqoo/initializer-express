var express = require("express");
const { DBHelper } = require("../x/DBHelper");
var router = express.Router();

/** 最新一期更新的 */
router.get("/selectLatestSeries", async function (request, response, next) {
  let dbHelper = new DBHelper();
  let connection = await dbHelper.connectDatabase();
  // console.log("testDB.connectDatabase: ", connection.db == null);
  let datas = await connection.db
    .collection("Series")
    .find()
    .sort({ updateTime: -1 })
    .limit(1)
    .toArray();
  let data = { ...datas[0] };
  data.chapter = {
    size: data.chapters.length,
    durations: data.chapters.reduce((count, item, index) => {
      return count + item.duration;
    }, 0),
  };
  delete data["chapters"];
  dbHelper.disconnectDatabase(connection);
  response.send({ data, status: true });
});

/** 随机的n个Series */
router.get("/selectShuffleSerieses", async function (request, response, next) {
  let dbHelper = new DBHelper();
  let connection = await dbHelper.connectDatabase();
  // console.log("testDB.connectDatabase: ", connection.db == null);
  let size = request.query?.limit || 10;
  let datas = await connection.db
    .collection("Series")
    .aggregate([{ $sample: { size: parseInt(size) } }])
    .toArray();
  let _datas = datas.map((it) => {
    let data = { ...it };
    data.chapter = {
      size: data.chapters.length,
      durations: data.chapters.reduce((count, item, index) => {
        return count + item.duration;
      }, 0),
    };
    delete data["chapters"];
    return data;
  });

  dbHelper.disconnectDatabase(connection);
  response.send({ data: _datas, status: true });
});

module.exports = router;
