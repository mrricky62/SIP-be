const moment = require("moment/moment");
require("moment/locale/id");
const { InternalServerError, Ok } = require("../../utils/http-response");
const {
  StoreGaji,
  FetchGaji,
  FetchGajiById,
  UpdateGaji,
  DestroyGaji,
} = require("./gaji.Repository");

module.exports = {
  GetGaji: async (req, res) => {
    try {
      const { user } = req;
      const userId = user.is_admin ? "" : user.id;

      const result = await FetchGaji(userId);

      result.forEach((item) => {
        item.tanggal = moment(item.tanggal).format("YYYY-MMMM");
        item.bulan = moment(item.tanggal).format("MMMM");
        item.tahun = moment(item.tanggal).format("YYYY");

        let total_potongan = 0;
        let total_tunjangan = 0;

        Object.keys(item).forEach((key) => {
          if (key.startsWith("pot_")) {
            total_potongan += +item[key];
          }
          if (key.startsWith("tunj_")) {
            total_tunjangan += +item[key];
          }
        });

        item.total_potongan = total_potongan;
        item.total_tunjangan = total_tunjangan;
      });

      return Ok(res, result, "Gaji fetched successfully");
    } catch (error) {
      return InternalServerError(res, error, "Failed to create gaji");
    }
  },
  GetGajiById: async (req, res) => {
    try {
      const { id } = req.params;

      const result = await FetchGajiById(id);

      result.tanggal = moment(result.tanggal).format("YYYY-MM");

      let total_potongan = 0;
      let total_tunjangan = 0;

      Object.keys(result).forEach((key) => {
        if (key.startsWith("pot_")) {
          total_potongan += +result[key];
        }
        if (key.startsWith("tunj_")) {
          total_tunjangan += +result[key];
        }
      });

      result.total_potongan = total_potongan;
      result.total_tunjangan = total_tunjangan;

      return Ok(res, result, "Gaji fetched successfully");
    } catch (error) {
      return InternalServerError(res, error, "Failed to create gaji");
    }
  },
  CreateGaji: async (req, res) => {
    try {
      await StoreGaji(req.body);

      return Ok(res, {}, "Gaji created successfully");
    } catch (error) {
      console.log(error);
      return InternalServerError(res, error, "Failed to create gaji");
    }
  },
  ImportGaji: async (req, res) => {
    try {
      const data = req.body.data;
      for (const iterator of data) {
        await StoreGaji(iterator);
      }

      return Ok(res, {}, "Gaji imported successfully");
    } catch (error) {
      return InternalServerError(res, error, "Format data tidak sesuai");
    }
  },
  EditGaji: async (req, res) => {
    try {
      await UpdateGaji(req.params.id, req.body);

      return Ok(res, {}, "Gaji updated successfully");
    } catch (error) {
      console.log(error);
      return InternalServerError(res, error, "Failed to update gaji");
    }
  },
  DeleteGaji: async (req, res) => {
    try {
      await DestroyGaji(req.params.id);

      return Ok(res, {}, "Gaji deleted successfully");
    } catch (error) {
      return InternalServerError(res, error, "Failed to delete gaji");
    }
  },
};
