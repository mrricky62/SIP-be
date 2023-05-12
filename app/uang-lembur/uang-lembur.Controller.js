const { InternalServerError, Ok } = require("../../utils/http-response");
const {
  StoreUangLembur,
  FetchUangLembur,
  FetchUangLemburById,
  UpdateUangLembur,
} = require("./uang-lembur.Repository");
const moment = require("moment/moment");

module.exports = {
  GetUangLembur: async (req, res) => {
    try {
      const result = await FetchUangLembur();

      result.forEach((item) => {
        item.tanggal_spm = moment(item.tanggal_spm).format("DD MMMM YYYY");
        item.tanggal = moment(item.tanggal).format("YYYY-MM");
        item.bulan = moment(item.tanggal).format("MMMM");
        item.tahun = moment(item.tanggal).format("YYYY");
        item.jumlah_jam = +item.jam_kerja + +item.jam_libur + +item.jam_makan;
      });

      return Ok(res, result, "Uang Lembur fetched successfully");
    } catch (error) {
      return InternalServerError(res, error, "Failed to fetch Uang Lembur");
    }
  },
  GetUangLemburById: async (req, res) => {
    try {
      const result = await FetchUangLemburById(req.params.id);

      result.tanggal_spm = moment(result.tanggal_spm).format("YYYY-MM-DD");
      result.tanggal = moment(result.tanggal).format("YYYY-MM");
      result.bulan = moment(result.tanggal).format("MMMM");
      result.tahun = moment(result.tanggal).format("YYYY");
      result.jumlah_jam =
        +result.jam_kerja + +result.jam_libur + +result.jam_makan;

      return Ok(res, result, "Uang Lembur fetched successfully");
    } catch (error) {
      return InternalServerError(res, error, "Failed to fetch Uang Lembur");
    }
  },
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
  EditUangLembur: async (req, res) => {
    try {
      const { id } = req.params;
      const body = req.body;
      await UpdateUangLembur(id, body);

      return Ok(res, {}, "Uang Lembur updated successfully");
    } catch (error) {
      console.log(error);
      return InternalServerError(res, error, "Failed to update Uang Lembur");
    }
  },
};
