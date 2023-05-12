const { InternalServerError } = require("../../utils/http-response");

module.exports = {
  CreateTunjanganMiddleware: (req, res, next) => {
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
};
