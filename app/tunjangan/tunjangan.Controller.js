const { InternalServerError, Ok } = require("../../utils/http-response");
const { StoreTunjangan, FetchTunjangan } = require("./tunjangan.Repository");
const moment = require("moment/moment");

module.exports = {
  GetTunjangan: async (req, res) => {
    try {
      const result = await FetchTunjangan();

      result.forEach((item) => {
        item.tanggal = moment(result.tanggal).format("YYYY-MM");
      });

      return Ok(res, result, "Tunjangan fetched successfully");
    } catch (error) {
      return InternalServerError(res, error, "Failed to fetch tunjangan");
    }
  },
  CreateTunjangan: async (req, res) => {
    try {
      await StoreTunjangan(req.body);

      return Ok(res, {}, "Tunjangan created successfully");
    } catch (error) {
      return InternalServerError(res, error, "Failed to create tunjangan");
    }
  },
};
