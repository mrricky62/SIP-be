const { InternalServerError, Ok } = require("../../utils/http-response");
const { StoreSPD } = require("./spd.Repository");

module.exports = {
  CreateSPD: async (req, res) => {
    try {
      await StoreSPD(req.body);

      return Ok(res, null, "SPD created successfully");
    } catch (error) {
      return InternalServerError(res, error, "Failed to create SPD");
    }
  },
};
