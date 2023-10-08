var express = require("express");
const { default: mongoose } = require("mongoose");
const { DBHelper } = require("../x/DBHelper");
const { StringUtils } = require("../x/StringUtils");
var router = express.Router();

/* GET users listing. */
router.get("/HelloWorld", function (request, response, next) {
  response.send(JSON.stringify({ data: "HelloWorld.", status: true }));
});

/** 记录搜索关键词 */
/** 只有登录的用户才记录搜索关键词 */
router.get("/submitSearch", async function (request, response, next) {
  let dbHelper = new DBHelper();
  let connection = await dbHelper.connectDatabase();
  // console.log("testDB.connectDatabase: ", connection.db == null);
  if (request.query?.personId) {
    let item = { ...request.query };
    item.time = new Date().toLocaleString();
    item.id = StringUtils.buildNanoid();
    await connection.db.collection("Search").insertOne(item);
  }
  dbHelper.disconnectDatabase(connection);
  response.send({ status: request.query?.personId ? true : false });
});

/** 搜索热词 */
router.get("/selectPopularSearches", async function (request, response, next) {
  let dbHelper = new DBHelper();
  let connection = await dbHelper.connectDatabase();
  // console.log("testDB.connectDatabase: ", connection.db == null);
  let result = await connection.db
    .collection("Search")
    .aggregate([
      {
        $group: {
          _id: "$text",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ])
    .limit(parseInt(request.query?.limit))
    .toArray();
  dbHelper.disconnectDatabase(connection);
  response.send({
    status: true,
    data: result.map((it) => ({ name: it._id, value: it.count })),
  });
});

/** 搜索教师 */
router.get("/searchTeachers", async function (request, response, next) {
  let dbHelper = new DBHelper();
  let connection = await dbHelper.connectDatabase();
  const { text, pageIndex = 1, pageSize = 10 } = request.query;
  const regexp = `.*${text}.*`;
  let result = await connection.db
    .collection("Teacher")
    .find({
      $or: [
        { name: { $regex: regexp } },
        { title: { $regex: regexp } },
        { message: { $regex: regexp } },
      ],
    })
    .skip((parseInt(pageIndex) - 1) * parseInt(pageSize))
    .limit(parseInt(pageSize))
    .toArray();
  dbHelper.disconnectDatabase(connection);
  response.send({ data: result, status: true });
});

/** 搜索 Series */
router.get("/searchSerieses", async function (request, response, next) {
  let dbHelper = new DBHelper();
  let connection = await dbHelper.connectDatabase();
  const { text, pageIndex = 1, pageSize = 10 } = request.query;
  const regexp = `.*${text}.*`;
  let result = await connection.db
    .collection("Series")
    .find({
      $or: [{ title: { $regex: regexp } }, { message: { $regex: regexp } }],
    })
    .skip((parseInt(pageIndex) - 1) * parseInt(pageSize))
    .limit(parseInt(pageSize))
    .toArray();
  let _datas = result.map((it) => {
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

/** 搜索 Chapters */
router.get("/searchChapters", async function (request, response, next) {
  let dbHelper = new DBHelper();
  let connection = await dbHelper.connectDatabase();
  const { text, pageIndex = 1, pageSize = 10 } = request.query;
  // console.log("testDB.connectDatabase: ", connection.db == null);
  const regexp = `.*${text}.*`;
  let result = await connection.db
    .collection("Series")
    .aggregate([
      { $unwind: "$chapters" },
      {
        $match: {
          $or: [
            { "chapters.title": { $regex: regexp } },
            { "chapters.message": { $regex: regexp } },
          ],
        },
      },
      {
        $addFields: {
          series: {
            id: "$id",
            title: "$title",
            message: "$message",
          },
        },
      },
      {
        $project: {
          _id: 0,
          series: 1,
          chapter: "$chapters",
        },
      },
      { $skip: (parseInt(pageIndex) - 1) * parseInt(pageSize) },
      { $limit: parseInt(pageSize) },
    ])
    .toArray();
  dbHelper.disconnectDatabase(connection);
  response.send({
    status: true,
    data: result,
  });
});

module.exports = router;
