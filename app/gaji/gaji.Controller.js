const moment = require("moment/moment");
const { InternalServerError, Ok } = require("../../utils/http-response");
const { StoreGaji, FetchGaji } = require("./gaji.Repository");

module.exports = {
  GetGaji: async (req, res) => {
    try {
      const result = await FetchGaji();

      result.forEach((item) => {
        item.tanggal = moment(result.tanggal).format("YYYY-MM");
      });

      return Ok(res, result, "Gaji fetched successfully");
    } catch (error) {
      return InternalServerError(res, error, "Failed to create gaji");
    }
  },
  CreateGaji: async (req, res) => {
    try {
      await StoreGaji(req.body);

      return Ok(res, {}, "Gaji created successfully");
    } catch (error) {
      console.log(error);
      return InternalServerError(res, error, "Failed to create gaji");
    }
  },
};
