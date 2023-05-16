const {
  InternalServerError,
  BadRequest,
} = require("../../utils/http-response");
const { FetchUserByNIP } = require("../user/user.repository");
const { FetchTunjanganById } = require("./tunjangan.Repository");

module.exports = {
  CreateTunjanganMiddleware: async (req, res, next) => {
    try {
      req.body.tanggal = new Date(req.body.tanggal);

      next();
    } catch (error) {
      return InternalServerError(
        res,
        error,
        "Failed to create tunjangan in middleware"
      );
    }
  },
  ImportTunjanganMiddleware: async (req, res, next) => {
    try {
      const data = req.body.data;
      for (const iterator of data) {
        const user = await FetchUserByNIP(iterator.nip);
        if (!user) {
          const message = `NIP pegawai ${iterator.nip} tidak ditemukan`;
          return BadRequest(res, {}, message);
        }

        delete iterator.nip;

        iterator.user_id = user.id;
        iterator.grade = iterator.grade.toString();
        iterator.tanggal = new Date(iterator.tanggal);
      }

      req.body.data = data;
      next();
    } catch (error) {
      return InternalServerError(
        res,
        error,
        "Failed to create tunjangan in middleware"
      );
    }
  },
  EditTunjanganMiddleware: async (req, res, next) => {
    try {
      const { id } = req.params;

      const tunjangan = await FetchTunjanganById(id);
      if (!tunjangan) return BadRequest(res, "Tunjangan not found");

      req.body.tanggal = new Date(req.body.tanggal);

      next();
    } catch (error) {
      return InternalServerError(
        res,
        error,
        "Failed to create tunjangan in middleware"
      );
    }
  },
  DeleteTunjanganMiddleware: async (req, res, next) => {
    try {
      const { id } = req.params;

      const tunjangan = await FetchTunjanganById(id);
      if (!tunjangan) return BadRequest(res, "Tunjangan not found");

      next();
    } catch (error) {
      return InternalServerError(
        res,
        error,
        "Failed to create tunjangan in middleware"
      );
    }
  },
};
