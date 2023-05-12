const { InternalServerError, Ok } = require("../../utils/http-response");
const { StoreUangMakan, FetchUangMakan } = require("./uang-makan.Repository");
const moment = require("moment/moment");

module.exports = {
  GetUangMakan: async (req, res) => {
    try {
      const result = await FetchUangMakan();

      result.forEach((item) => {
        item.bulan = moment(item.tanggal).format("MMMM");
        item.tahun = moment(item.tanggal).format("YYYY");
        item.tanggal = moment(item.tanggal).format("YYYY-MM");
        item.tanggal_spm = moment(item.tanggal_spm).format("DD MMMM YYYY");
      });

      return Ok(res, result, "Uang makan fetched successfully");
    } catch (error) {
      return InternalServerError(res, error, "Failed to get uang makan");
    }
  },
  CreateUangMakan: async (req, res) => {
    try {
      await StoreUangMakan(req.body);

      return Ok(res, null, "Uang makan created successfully");
    } catch (error) {
      return InternalServerError(res, error, "Failed to create uang makan");
    }
  },
};
