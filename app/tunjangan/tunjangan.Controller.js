const { InternalServerError, Ok } = require("../../utils/http-response");
const { StoreTunjangan } = require("./tunjangan.Repository");

module.exports = {
  CreateTunjangan: async (req, res) => {
    try {
      await StoreTunjangan(req.body);

      return Ok(res, {}, "Tunjangan created successfully");
    } catch (error) {
      return InternalServerError(res, error, "Failed to create tunjangan");
    }
  },
};
