const {
  InternalServerError,
  BadRequest,
} = require("../../utils/http-response");
const { FetchSPDById } = require("./spd.Repository");

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
  EditSPDMiddleware: (req, res, next) => {
    try {
      const { id } = req.params;
      const spd = FetchSPDById(id);

      if (!spd) return BadRequest(res, {}, "SPD not found");

      if (req.files.filepath)
        req.body.filepath = req.files.filepath[0].filename;
      if (req.body.lama) req.body.lama = parseInt(req.body.lama);

      next();
    } catch (error) {
      return InternalServerError(
        res,
        error,
        "Failed to edit SPD in middleware"
      );
    }
  },
};
