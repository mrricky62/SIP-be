const { InternalServerError, Ok } = require("../../utils/http-response");
const { FetchUser, FetchUserById } = require("./user.repository");

module.exports = {
  GetUser: async (req, res) => {
    try {
      const result = await FetchUser();

      return Ok(res, result, "User fetched successfully");
    } catch (error) {
      return InternalServerError(res, error, "Failed to get user");
    }
  },
  GetUserById: async (req, res) => {
    try {
      const { id } = req.params;

      const result = await FetchUserById(id);

      return Ok(res, result, "User fetched successfully");
    } catch (error) {
      return InternalServerError(res, error, "Failed to get user");
    }
  },
};
