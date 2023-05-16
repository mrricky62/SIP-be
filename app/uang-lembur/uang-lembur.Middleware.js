const {
  InternalServerError,
  BadRequest,
} = require("../../utils/http-response");
const { FetchUserByNIP } = require("../user/user.repository");
const { FetchUangLemburById } = require("./uang-lembur.Repository");

module.exports = {
  CreateUangLemburMiddleware: (req, res, next) => {
    try {
      req.body.tanggal = new Date(req.body.tanggal);
      req.body.tanggal_spm = new Date(req.body.tanggal_spm);
      req.body.jam_kerja = parseInt(req.body.jam_kerja);
      req.body.jam_libur = parseInt(req.body.jam_libur);
      req.body.jam_makan = parseInt(req.body.jam_makan);

      next();
    } catch (error) {
      return InternalServerError(
        res,
        error,
        "Failed to create uang lembur in middleware"
      );
    }
  },
  ImportUangLemburMiddleware: async (req, res, next) => {
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
        iterator.tanggal = new Date(iterator.tanggal);
        iterator.tanggal_spm = new Date(iterator.tanggal_spm);
        iterator.jam_kerja = parseInt(iterator.jam_kerja);
        iterator.jam_libur = parseInt(iterator.jam_libur);
        iterator.jam_makan = parseInt(iterator.jam_makan);
      }

      req.body.data = data;
      next();
    } catch (error) {
      return InternalServerError(
        res,
        error,
        "Failed to import uang lembur in middleware"
      );
    }
  },
  EditUangLemburMiddleware: (req, res, next) => {
    try {
      const { id } = req.params;
      const uangLembur = FetchUangLemburById(id);
      if (!uangLembur) return BadRequest(res, "Uang Lembur not found");

      req.body.tanggal = new Date(req.body.tanggal);
      req.body.tanggal_spm = new Date(req.body.tanggal_spm);
      req.body.jam_kerja = parseInt(req.body.jam_kerja);
      req.body.jam_libur = parseInt(req.body.jam_libur);
      req.body.jam_makan = parseInt(req.body.jam_makan);

      next();
    } catch (error) {
      return InternalServerError(
        res,
        error,
        "Failed to create uang lembur in middleware"
      );
    }
  },
  DeleteUangLemburMiddleware: (req, res, next) => {
    try {
      const { id } = req.params;
      const uangLembur = FetchUangLemburById(id);
      if (!uangLembur) return BadRequest(res, "Uang Lembur not found");

      next();
    } catch (error) {
      return InternalServerError(
        res,
        error,
        "Failed to create uang lembur in middleware"
      );
    }
  },
};
