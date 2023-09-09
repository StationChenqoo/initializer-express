const mongoose = require("mongoose");
class DBHelper {
  constructor() {}

  connectDatabase = async (request, response, next) => {
    let connection = mongoose.createConnection();
    let db = await connection.openUri(
      "mongodb://root:123456@localhost/typecho?authSource=admin",
      { maxPoolSize: 100 }
    );
    return db;
  };

  disconnectDatabase = (db) => {
    db && db.close();
  };
}

module.exports = {
  DBHelper,
};
