const { InternalServerError, Ok } = require("../../utils/http-response");
const { StoreUangMakan } = require("./uang-makan.Repository");

module.exports = {
  CreateUangMakan: async (req, res) => {
    try {
      await StoreUangMakan(req.body);

      return Ok(res, null, "Uang makan created successfully");
    } catch (error) {
      console.log(error);
      return InternalServerError(res, error, "Failed to create uang makan");
    }
  },
};
