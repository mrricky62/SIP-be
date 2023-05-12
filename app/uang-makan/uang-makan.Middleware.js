const {
  InternalServerError,
  BadRequest,
} = require("../../utils/http-response");
const { FetchUangMakanById } = require("./uang-makan.Repository");

module.exports = {
  CreateUangMakanMiddleware: (req, res, next) => {
    try {
      req.body.jml_hari = parseInt(req.body.jml_hari);
      req.body.tanggal = new Date(req.body.tanggal);
      req.body.tanggal_spm = new Date(req.body.tanggal_spm);

      next();
    } catch (error) {
      return InternalServerError(
        res,
        error,
        "Failed to create uang makan in middleware"
      );
    }
  },
  EditUangMakanMiddleware: (req, res, next) => {
    try {
      const { id } = req.params;
      const uangMakan = FetchUangMakanById(id);
      if (!uangMakan) return BadRequest(res, "Uang makan not found");

      req.body.jml_hari = parseInt(req.body.jml_hari);
      req.body.tanggal = new Date(req.body.tanggal);
      req.body.tanggal_spm = new Date(req.body.tanggal_spm);

      next();
    } catch (error) {
      return InternalServerError(
        res,
        error,
        "Failed to edit uang makan in middleware"
      );
    }
  },
  DeleteUangMakanMiddleware: (req, res, next) => {
    try {
      const { id } = req.params;
      const uangMakan = FetchUangMakanById(id);
      if (!uangMakan) return BadRequest(res, "Uang makan not found");

      next();
    } catch (error) {
      return InternalServerError(
        res,
        error,
        "Failed to edit uang makan in middleware"
      );
    }
  },
};
