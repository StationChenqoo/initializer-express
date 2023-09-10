var express = require("express");
const { default: mongoose } = require("mongoose");
const { DBHelper } = require("../x/DBHelper");
const { useHttpGet } = require("../x/HttpHelper");
var router = express.Router();

/* GET users listing. */
router.get("/HelloWorld", function (request, response, next) {
  response.send(JSON.stringify({ data: "HelloWorld.", status: 0 }));
});

/** 测试 */
router.get("/testDB", async function (request, response, next) {
  let dbHelper = new DBHelper();
  let connection = await dbHelper.connectDatabase();
  // console.log("testDB.connectDatabase: ", connection.db == null);
  let result = await useHttpGet(
    "http://localhost:8889/selectTeachersAndCounts.do",
    { pageIndex: 1, pageSize: 8888 }
  );
  // console.log(result);
  let datas = await connection.db.collection("test").find().toArray();
  dbHelper.disconnectDatabase(connection);
  let data = result.data.map((it) => {
    let _it = { ...it };
    delete _it["series"];
    delete _it["clickCount"];
    delete _it["chapters"];
    delete _it["durations"];
    _it.updateTime = new Date().toISOString();
    _it.createTime = new Date().toISOString();
    return _it;
  });
  await connection.db.collection("Teacher").insertMany(data);
  response.send({ data, status: 0 });
});

/** Series & Chapter */
router.get("/series", async function (request, response, next) {
  let dbHelper = new DBHelper();
  let connection = await dbHelper.connectDatabase();
  // console.log("testDB.connectDatabase: ", connection.db == null);
  let result = await useHttpGet("http://localhost:8889/selectSerieses.do", {
    pageIndex: 1,
    pageSize: 8888,
  });
  // console.log(result);
  // let datas = await connection.db.collection("test").find().toArray();
  let datas = [];
  for (let i = 0; i < result.data.length; i++) {
    let it = { ...result.data[i] };
    it.updateTime = new Date().toISOString();
    it.createTime = new Date().toISOString();
    let chapters = await useHttpGet(
      "http://localhost:8889/selectChaptersBySeries.do",
      { id: it.id }
    );
    let _chapters = chapters.data.map((jt) => {
      return new Object({
        id: jt.id,
        title: jt.title,
        message: jt.message,
        duration: jt.duration,
        capture: jt.capture,
        cctv: {
          id: jt.cctvId,
          web: jt.cctvWeb,
          m3u8: jt.cctvM3u8,
          mp3: jt.cctvMp3,
        },
        counts: {
          like: 0,
          dislike: 0,
          click: 0,
          collect: 0,
        },
      });
    });
    it.chapters = _chapters;
    datas.push(it);
  }
  await connection.db.collection("Series").insertMany(datas);
  dbHelper.disconnectDatabase(connection);
  response.send({ data: datas, status: 0 });
});

module.exports = router;
