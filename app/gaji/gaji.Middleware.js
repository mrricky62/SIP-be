const {
  InternalServerError,
  BadRequest,
} = require("../../utils/http-response");
const { FetchGajiById } = require("./gaji.Repository");

module.exports = {
  CreateGajiMiddleware: (req, res, next) => {
    try {
      req.body.tanggal = new Date(req.body.tanggal);

      next();
    } catch (error) {
      return InternalServerError(
        res,
        error,
        "Failed to create gaji in middleware"
      );
    }
  },
  EditGajiMiddleware: (req, res, next) => {
    try {
      const { id } = req.params;
      const gaji = FetchGajiById(id);
      if (!gaji) return BadRequest(res, "Gaji not found");

      req.body.tanggal = new Date(req.body.tanggal);

      next();
    } catch (error) {
      return InternalServerError(
        res,
        error,
        "Failed to edit gaji in middleware"
      );
    }
  },
};
