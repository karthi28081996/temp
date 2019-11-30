const mysql = require("mysql");
const appConfig = require("./../../config/appConfig");

var conn = mysql.createConnection({
  host: appConfig.database.url,
  user: appConfig.database.user,
  password: appConfig.database.password,
  port: appConfig.database.port,
  database: appConfig.database.database
});

conn.connect(function(err) {
  if (err) {
    console.error("Database connection failed: " + err.stack);
    return;
  }

  console.log("connected to database");
});
