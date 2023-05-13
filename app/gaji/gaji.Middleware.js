const {
  InternalServerError,
  BadRequest,
} = require("../../utils/http-response");
const { FetchUserByNIP } = require("../user/user.repository");
const { FetchGajiById } = require("./gaji.Repository");

module.exports = {
  CreateGajiMiddleware: async (req, res, next) => {
    try {
      req.body.tanggal = new Date(req.body.tanggal);

      next();
    } catch (error) {
      return InternalServerError(
        res,
        error,
        "Failed to create gaji in middleware"
      );
    }
  },
  ImportGajiMiddleware: async (req, res, next) => {
    try {
      const data = req.body.data;

      let i = 2;
      for (const iterator of data) {
        const user = await FetchUserByNIP(iterator.nip);

        if (!user) {
          const message = `NIP pegawai ${iterator.nip} tidak ditemukan pada baris ${i}`;
          return BadRequest(res, {}, message);
        }

        delete iterator.nip;

        iterator.user_id = user.id;
        iterator.tanggal = new Date(iterator.tanggal);
        i++;
      }

      req.body.data = data;
      next();
    } catch (error) {
      return InternalServerError(
        res,
        error,
        "Failed to create gaji in middleware"
      );
    }
  },
  EditGajiMiddleware: async (req, res, next) => {
    try {
      const { id } = req.params;
      const gaji = FetchGajiById(id);
      if (!gaji) return BadRequest(res, "Gaji not found");

      req.body.tanggal = new Date(req.body.tanggal);

      next();
    } catch (error) {
      return InternalServerError(
        res,
        error,
        "Failed to edit gaji in middleware"
      );
    }
  },
  DeleteGajiMiddleware: async (req, res, next) => {
    try {
      const { id } = req.params;

      const gaji = FetchGajiById(id);
      if (!gaji) return BadRequest(res, "Gaji not found");

      next();
    } catch (error) {
      return InternalServerError(
        res,
        error,
        "Failed to edit gaji in middleware"
      );
    }
  },
};
