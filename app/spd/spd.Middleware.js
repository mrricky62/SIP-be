const { InternalServerError } = require("../../utils/http-response");

module.exports = {
  CreateSPDMiddleware: (req, res, next) => {
    try {
      req.body.filepath = req.files.filepath[0].filename;
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
