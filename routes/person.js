var express = require("express");
const { default: mongoose } = require("mongoose");
const { DBHelper } = require("../x/DBHelper");
const { StringUtils } = require("../x/StringUtils");
var router = express.Router();

/* GET users listing. */
router.get("/HelloWorld", function (request, response, next) {
  response.send(JSON.stringify({ data: "HelloWorld.", status: true }));
});

/** 测试 */
router.get("/testDB", async function (request, response, next) {
  let dbHelper = new DBHelper();
  let connection = await dbHelper.connectDatabase();
  // console.log("testDB.connectDatabase: ", connection.db == null);
  let datas = await connection.db.collection("test").find().toArray();
  dbHelper.disconnectDatabase(connection);
  response.send({ data: datas, status: true });
});

/** 密码登录 */
router.get("/checkPassword", async function (request, response, next) {
  let dbHelper = new DBHelper();
  let connection = await dbHelper.connectDatabase();
  let { mobile, password } = request.query;
  let result = {};
  let person = await connection.db
    .collection("Person")
    .findOne({ mobile, password });
  if (mobile && password && person) {
    result = { data: person, status: true };
  } else {
    result = { status: false, message: "手机号码或者密码错误 ..." };
  }
  dbHelper.disconnectDatabase(connection);
  response.send(result);
});

/** 发送短信验证码 */
router.get("/sendSMS", async function (request, response, next) {
  let result = {};
  let mobile = request.query?.mobile;
  let ip = request.ip;
  let date = new Date().toISOString().slice(0, 10);
  let code = StringUtils.buildSmsCode();
  if (StringUtils.isPhone(mobile)) {
    let dbHelper = new DBHelper();
    let connection = await dbHelper.connectDatabase();
    // let datas = await connection.db.collection("test").find().toArray();
    if (
      (
        await connection.db
          .collection("Sms")
          .find({
            date,
            $or: [{ ip }, { mobile }],
          })
          .toArray()
      ).length >= 5
    ) {
      result = { status: false, message: "每天最多发送5条 ..." };
    } else {
      /** 阿里云短信逻辑 ... */
      let id = StringUtils.buildNanoid();
      await connection.db.collection("Sms").insertOne({
        id,
        ip,
        mobile,
        code,
        date,
        time: new Date().toLocaleString(),
      });
      result = { status: true, data: id };
    }
    dbHelper.disconnectDatabase(connection);
  } else {
    result = { status: false, message: "手机号码暂不支持 ..." };
  }
  // console.log("testDB.connectDatabase: ", connection.db == null);
  response.send(result);
});

/** 验证验证码 */
// db.getCollection('Sms').find({date: '2023-09-11', mobile: '15552198996'}).sort({time: -1}).limit(1);
router.get("/checkSMS", async function (request, response, next) {
  let dbHelper = new DBHelper();
  let connection = await dbHelper.connectDatabase();
  // console.log("testDB.connectDatabase: ", connection.db == null);
  const { mobile, code } = request.query;
  let result = {};
  let date = new Date().toISOString().slice(0, 10);
  if (StringUtils.isPhone(mobile) && code.length == 6) {
    let sms = await connection.db
      .collection("Sms")
      .find({ mobile, date })
      .sort({ time: -1 })
      .limit(1)
      .toArray();
    if (sms?.[0]?.code == code) {
      let person = await connection.db.collection("Person").findOne({ mobile });
      if (person?.id) {
        /** 已注册 */
      } else {
        /** 未注册 */
        let id = StringUtils.buildNanoid();
        person = {
          id,
          avatar: "https://cdn.cctv3.net/net.cctv3.BaijiaJiangtan/i.gif",
          mobile,
          password: StringUtils.buildNanoid(),
          nick: `用户${id.substring(0, 9)}`,
          motto: "请用一句话来描述自己 ...",
          createTime: new Date().toLocaleString(),
          updateTime: new Date().toLocaleString(),
          qq: "",
          wechat: "",
          apple: "",
        };
        await connection.db.collection("Person").insertOne(person);
      }
      /** Person */
      result = { status: true, data: person };
    } else {
      result = { status: false, message: "验证码错误 ..." };
    }
  } else {
    result = { status: false, message: "参数错误 ..." };
  }
  dbHelper.disconnectDatabase(connection);
  response.send(result);
});

module.exports = router;
