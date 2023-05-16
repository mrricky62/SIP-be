const status = require("../../constant/status");
const { InternalServerError, Ok } = require("../../utils/http-response");
const {
  StoreSPD,
  FetchSPD,
  FetchSPDById,
  UpdateSPD,
} = require("./spd.Repository");
const moment = require("moment");

module.exports = {
  GetSPD: async (req, res) => {
    try {
      const { user } = req;
      const userId = user.is_admin ? "" : user.id;

      const result = await FetchSPD(userId);

      result.forEach((item) => {
        if (item.status === status.DISETUJUI) {
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
  GetSPDById: async (req, res) => {
    try {
      const result = await FetchSPDById(req.params.id);

      result.tanggal_spm = moment(result.tanggal_spm).format("DD MMMM YYYY");

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
  ApproveSPD: async (req, res) => {
    try {
      await UpdateSPD(req.params.id, {
        ...req.body,
        tanggal_spm: new Date(),
        status: status.DISETUJUI,
        catatan: "",
      });

      return Ok(res, {}, "SPD approved successfully");
    } catch (error) {
      return InternalServerError(res, error, "Failed to approve SPD");
    }
  },
  RejectSPD: async (req, res) => {
    try {
      await UpdateSPD(req.params.id, {
        ...req.body,
        status: status.DITOLAK,
      });

      return Ok(res, {}, "SPD rejected successfully");
    } catch (error) {
      return InternalServerError(res, error, "Failed to reject SPD");
    }
  },
  EditSPD: async (req, res) => {
    try {
      await UpdateSPD(req.params.id, {
        ...req.body,
        status: status.PENDING,
      });

      return Ok(res, {}, "SPD edited successfully");
    } catch (error) {
      console.log(error);
      return InternalServerError(res, error, "Failed to edit SPD");
    }
  },
};
