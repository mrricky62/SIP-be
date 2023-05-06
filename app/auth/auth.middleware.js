const { Compare } = require("../../utils/hash-password");
const {
  BadRequest,
  InternalServerError,
  Unauthorized,
} = require("../../utils/http-response");
const { DecryptToken } = require("../../utils/jwt");
const {
  FetchUserByEmail,
  FetchUserById,
  FetchUserByNIP,
} = require("../user/user.repository");

module.exports = {
  RegisterMiddleware: async (req, res, next) => {
    try {
      const body = req.body;
      const { nip } = body;

      const user = await FetchUserByNIP(nip);
      if (user) return BadRequest(res, "NIP already registered");

      next();
    } catch (error) {
      return InternalServerError(res, error, "Failed to register user");
    }
  },
  LoginMiddleware: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const user = await FetchUserByEmail(email);
      if (!user) return BadRequest(res, "Email not registered");

      const isPasswordValid = await Compare(password, user.password);
      if (!isPasswordValid) return BadRequest(res, "Password is incorrect");

      next();
    } catch (error) {
      return InternalServerError(res, error, "Failed to login user");
    }
  },
};
