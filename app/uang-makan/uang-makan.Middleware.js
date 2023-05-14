const {
  InternalServerError,
  BadRequest,
} = require("../../utils/http-response");
const { FetchUserByNIP } = require("../user/user.repository");
const { FetchUangMakanById } = require("./uang-makan.Repository");

module.exports = {
  CreateUangMakanMiddleware: (req, res, next) => {
    try {
      req.body.jml_hari = parseInt(req.body.jml_hari);
      req.body.tanggal = new Date(req.body.tanggal);
      req.body.tanggal_spm = new Date(req.body.tanggal_spm);

      next();
    } catch (error) {
      return InternalServerError(
        res,
        error,
        "Failed to create uang makan in middleware"
      );
    }
  },
  ImportUangMakanMiddleware: async (req, res, next) => {
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
        iterator.jml_hari = parseInt(iterator.jml_hari);
        iterator.tanggal = new Date(iterator.tanggal);
        iterator.tanggal_spm = new Date(iterator.tanggal_spm);
      }

      req.body.data = data;
      next();
    } catch (error) {
      return InternalServerError(
        res,
        error,
        "Failed to create uang makan in middleware"
      );
    }
  },
  EditUangMakanMiddleware: (req, res, next) => {
    try {
      const { id } = req.params;
      const uangMakan = FetchUangMakanById(id);
      if (!uangMakan) return BadRequest(res, "Uang makan not found");

      req.body.jml_hari = parseInt(req.body.jml_hari);
      req.body.tanggal = new Date(req.body.tanggal);
      req.body.tanggal_spm = new Date(req.body.tanggal_spm);

      next();
    } catch (error) {
      return InternalServerError(
        res,
        error,
        "Failed to edit uang makan in middleware"
      );
    }
  },
  DeleteUangMakanMiddleware: (req, res, next) => {
    try {
      const { id } = req.params;
      const uangMakan = FetchUangMakanById(id);
      if (!uangMakan) return BadRequest(res, "Uang makan not found");

      next();
    } catch (error) {
      return InternalServerError(
        res,
        error,
        "Failed to edit uang makan in middleware"
      );
    }
  },
};
