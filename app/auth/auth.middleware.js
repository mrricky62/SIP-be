const { Compare } = require("../../utils/hash-password");
const {
  BadRequest,
  InternalServerError,
} = require("../../utils/http-response");
const { FetchUserByNIP, FetchUserById } = require("../user/user.repository");

module.exports = {
  RegisterMiddleware: async (req, res, next) => {
    try {
      const body = req.body;
      const { nip } = body;

      const user = await FetchUserByNIP(nip);
      if (user) return BadRequest(res, {}, "NIP already registered");

      next();
    } catch (error) {
      return InternalServerError(res, error, "Failed to register user");
    }
  },
  LoginMiddleware: async (req, res, next) => {
    try {
      const { nip, password } = req.body;

      const user = await FetchUserByNIP(nip);
      if (!user) return BadRequest(res, {}, "NIP not registered");

      console.log(user);

      if (!user.is_active) return BadRequest(res, {}, "User is not active");

      const isPasswordValid = await Compare(password, user.password);
      if (!isPasswordValid) return BadRequest(res, {}, "Password is incorrect");

      next();
    } catch (error) {
      console.log(error);
      return InternalServerError(
        res,
        error,
        "Failed to login user in middleware"
      );
    }
  },
  ChangePasswordMiddleware: async (req, res, next) => {
    try {
      const user = await FetchUserById(req.user.id);
      if (!user) return BadRequest(res, "User not found");

      const isPasswordValid = await Compare(
        req.body.old_password,
        user.password
      );
      if (!isPasswordValid) return BadRequest(res, {}, "Password is incorrect");

      next();
    } catch (error) {
      console.log(error);
      return InternalServerError(res, error, "Failed to change password");
    }
  },
};
