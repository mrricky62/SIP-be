const {
  InternalServerError,
  BadRequest,
} = require("../../utils/http-response");
const { FetchUangLemburById } = require("./uang-lembur.Repository");

module.exports = {
  CreateUangLemburMiddleware: (req, res, next) => {
    try {
      req.body.tanggal = new Date(req.body.tanggal);
      req.body.tanggal_spm = new Date(req.body.tanggal_spm);
      req.body.jam_kerja = parseInt(req.body.jam_kerja);
      req.body.jam_libur = parseInt(req.body.jam_libur);
      req.body.jam_makan = parseInt(req.body.jam_makan);

      next();
    } catch (error) {
      return InternalServerError(
        res,
        error,
        "Failed to create uang lembur in middleware"
      );
    }
  },
  EditUangLemburMiddleware: (req, res, next) => {
    try {
      const { id } = req.params;
      const uangLembur = FetchUangLemburById(id);
      if (!uangLembur) return BadRequest(res, "Uang Lembur not found");

      req.body.tanggal = new Date(req.body.tanggal);
      req.body.tanggal_spm = new Date(req.body.tanggal_spm);
      req.body.jam_kerja = parseInt(req.body.jam_kerja);
      req.body.jam_libur = parseInt(req.body.jam_libur);
      req.body.jam_makan = parseInt(req.body.jam_makan);

      next();
    } catch (error) {
      return InternalServerError(
        res,
        error,
        "Failed to create uang lembur in middleware"
      );
    }
  },
  DeleteUangLemburMiddleware: (req, res, next) => {
    try {
      const { id } = req.params;
      const uangLembur = FetchUangLemburById(id);
      if (!uangLembur) return BadRequest(res, "Uang Lembur not found");

      next();
    } catch (error) {
      return InternalServerError(
        res,
        error,
        "Failed to create uang lembur in middleware"
      );
    }
  },
};
