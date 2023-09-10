const mongoose = require("mongoose");
class DBHelper {
  constructor() {}

  connectDatabase = async (request, response, next) => {
    let connection = mongoose.createConnection();
    let client = await connection.openUri(
      "mongodb://root:123456@localhost/BaijiaJiangtan?authSource=admin",
      { maxPoolSize: 100 }
    );
    // console.log('DBHelper.connectDatabase: ', db == null);
    return client;
  };

  disconnectDatabase = (db) => {
    db && db.close();
  };
}

module.exports = {
  DBHelper,
};
