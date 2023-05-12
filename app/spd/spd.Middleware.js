const { InternalServerError } = require("../../utils/http-response");

module.exports = {
  CreateSPDMiddleware: (req, res, next) => {
    try {
      req.body.tanggal = new Date(req.body.tanggal);
      req.body.tanggal_spm = new Date(req.body.tanggal_spm);
      req.body.lama = parseInt(req.body.lama);
      req.body.user_id = req.user.id;

      next();
    } catch (error) {
      return InternalServerError(
        res,
        error,
        "Failed to create SPD in middleware"
      );
    }
  },
};
