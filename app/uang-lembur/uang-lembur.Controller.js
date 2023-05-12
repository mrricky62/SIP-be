const { InternalServerError, Ok } = require("../../utils/http-response");
const {
  StoreUangLembur,
  FetchUangLembur,
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
