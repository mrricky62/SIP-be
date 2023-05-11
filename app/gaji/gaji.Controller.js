const { InternalServerError, Ok } = require("../../utils/http-response");
const { StoreGaji } = require("./gaji.Repository");

module.exports = {
  CreateGaji: async (req, res) => {
    try {
      await StoreGaji(req.body);

      return Ok(res, {}, "Gaji created successfully");
    } catch (error) {
      console.log(error);
      return InternalServerError(res, error, "Failed to create gaji");
    }
  },
};
