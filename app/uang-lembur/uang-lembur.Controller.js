const { InternalServerError, Ok } = require("../../utils/http-response");
const { StoreUangLembur } = require("./uang-lembur.Repository");

module.exports = {
  CreateUangLembur: async (req, res) => {
    try {
      const body = req.body;
      await StoreUangLembur(body);

      return Ok(res, {}, "Uang Lembur created successfully");
    } catch (error) {
      console.log(error);
      return InternalServerError(res, error, "Failed to create Uang Lembur");
    }
  },
};
