const {
  InternalServerError,
  BadRequest,
} = require("../../utils/http-response");
const { FetchTunjanganById } = require("./tunjangan.Repository");

module.exports = {
  CreateTunjanganMiddleware: async (req, res, next) => {
    try {
      req.body.tanggal = new Date(req.body.tanggal);

      next();
    } catch (error) {
      return InternalServerError(
        res,
        error,
        "Failed to create tunjangan in middleware"
      );
    }
  },
  EditTunjanganMiddleware: async (req, res, next) => {
    try {
      const { id } = req.params;

      const tunjangan = await FetchTunjanganById(id);
      if (!tunjangan) return BadRequest(res, "Tunjangan not found");

      req.body.tanggal = new Date(req.body.tanggal);

      next();
    } catch (error) {
      return InternalServerError(
        res,
        error,
        "Failed to create tunjangan in middleware"
      );
    }
  },
  DeleteTunjanganMiddleware: async (req, res, next) => {
    try {
      const { id } = req.params;

      const tunjangan = await FetchTunjanganById(id);
      if (!tunjangan) return BadRequest(res, "Tunjangan not found");

      next();
    } catch (error) {
      return InternalServerError(
        res,
        error,
        "Failed to create tunjangan in middleware"
      );
    }
  },
};
