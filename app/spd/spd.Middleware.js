const status = require("../../constant/status");
const {
  InternalServerError,
  BadRequest,
} = require("../../utils/http-response");
const { FetchUserByNIP } = require("../user/user.repository");
const { FetchSPDById } = require("./spd.Repository");

module.exports = {
  CreateSPDMiddleware: (req, res, next) => {
    try {
      req.body.filepath = req.files.filepath[0].filename;
      req.body.lama = parseInt(req.body.lama);
      req.body.user_id = req.user.id;

      next();
    } catch (error) {
      return InternalServerError(
        res,
        error,
        "Failed to create SPD in middleware"
      );
    }
  },
  ImportSPDMiddleware: async (req, res, next) => {
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
        iterator.tanggal_spm = new Date(iterator.tanggal_spm);
        iterator.lama = parseInt(iterator.lama);
        iterator.status = status.DISETUJUI;
      }

      req.body.data = data;
      next();
    } catch (error) {
      return InternalServerError(res, error, "Format data tidak sesuai");
    }
  },
  EditSPDMiddleware: (req, res, next) => {
    try {
      const { id } = req.params;
      const spd = FetchSPDById(id);

      if (!spd) return BadRequest(res, {}, "SPD not found");

      if (req.files) {
        req.body.filepath = req.files.filepath[0].filename;
      }
      if (req.body.lama) req.body.lama = parseInt(req.body.lama);

      next();
    } catch (error) {
      console.log(error);
      return InternalServerError(
        res,
        error,
        "Failed to edit SPD in middleware"
      );
    }
  },
};
