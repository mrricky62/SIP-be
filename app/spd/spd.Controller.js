const { InternalServerError, Ok } = require("../../utils/http-response");
const { StoreSPD, FetchSPD } = require("./spd.Repository");
const moment = require("moment");

module.exports = {
  GetSPD: async (req, res) => {
    try {
      const { user } = req;
      const userId = user.is_admin ? "" : user.id;

      const result = await FetchSPD(userId);

      result.forEach((item) => {
        if (item.status === "DISETUJUI") {
          item.total = item.total.toLocaleString("id-ID");
          item.tanggal_spm = moment(item.tanggal_spm).format("DD MMMM YYYY");
        } else {
          item.total = "-";
          item.tanggal_spm = "-";
        }
      });

      return Ok(res, result, "SPD fetched successfully");
    } catch (error) {
      return InternalServerError(res, error, "Failed to get SPD");
    }
  },
  CreateSPD: async (req, res) => {
    try {
      await StoreSPD(req.body);

      return Ok(res, null, "SPD created successfully");
    } catch (error) {
      return InternalServerError(res, error, "Failed to create SPD");
    }
  },
};
