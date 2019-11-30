let appConfig = {
  port: 4000,
  allowedOrgins: "*",
  env: "dev",
  database: {
    url: "growisto-rds-in.cjvlpxovny5i.us-east-1.rds.amazonaws.com",
    user: "admin",
    password: "Growisto123",
    port: 3306,
    database: "growistodevdb"
  },
  apiVersion: "/api/v1.0.0"
};

module.exports = {
  port: appConfig.port,
  allowedOrgins: appConfig.allowedOrgins,
  env: appConfig.env,
  database: appConfig.database,
  apiVersion: appConfig.apiVersion
};
