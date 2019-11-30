const db = require("./../db/dbConfig");
const XLSX = require("xlsx");
const incomingForm = require("formidable").IncomingForm;
var getFormData = (req, res) => {
  var form = new incomingForm();

  form.on("file", (field, file) => {
    console.log(file.path);
    var workbook = XLSX.readFile(file.path);
    var sheet_name_list = workbook.SheetNames;
    this.apiResponse = XLSX.utils.sheet_to_json(
      workbook.Sheets[sheet_name_list[0]]
    );
  });

  form.on("end", () => {
    res.json({
      error: false,
      status: 200,
      message: "Excel parsed successfully",
      data: this.apiResponse
    });
  });

  form.parse(req);
};

module.exports = {
  getFormData: getFormData
};
