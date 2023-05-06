const { Encrypt } = require("../../utils/hash-password");
const {
  InternalServerError,
  BadRequest,
} = require("../../utils/http-response");
const { FetchUserById, FetchUserByNIP } = require("./user.repository");

module.exports = {
  EditUserMiddleware: async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;

      const user = await FetchUserById(id);
      if (!user) return BadRequest(res, "User not found");

      if (body.nip !== user.nip) {
        const userNIP = await FetchUserByNIP(body.nip);
        if (userNIP) return BadRequest(res, "NIP already registered");
      }

      if (body.password) {
        req.body.password = await Encrypt(body.password);
      }

      next();
    } catch (error) {
      return InternalServerError(
        res,
        error,
        "Failed to update user in middleware"
      );
    }
  },
};
