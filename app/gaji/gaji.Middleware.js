const { InternalServerError } = require("../../utils/http-response");

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
};
