const appConfig = require("./../../config/appConfig");
const deleteKey = require("./../controllers/deleteKeyController");
let setRoute = app => {
  let apiUrl = `${appConfig.apiVersion}`;

  app.post("/upload/excel/deleteKeyword", deleteKey.getFormData);
}; //end setRoute

module.exports = {
  setRoute: setRoute
};
