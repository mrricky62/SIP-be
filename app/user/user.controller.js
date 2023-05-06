const { InternalServerError, Ok } = require("../../utils/http-response");
const { FetchUser } = require("./user.repository");

module.exports = {
  GetUser: async (req, res) => {
    try {
      const result = await FetchUser();

      return Ok(res, result, "User fetched successfully");
    } catch (error) {
      return InternalServerError(res, error, "Failed to get user");
    }
  },
};
