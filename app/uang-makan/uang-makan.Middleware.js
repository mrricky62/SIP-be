const { InternalServerError } = require("../../utils/http-response");

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
};
