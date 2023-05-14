const { InternalServerError, Ok } = require("../../utils/http-response");
const {
  StoreUangMakan,
  FetchUangMakan,
  FetchUangMakanById,
  UpdateUangMakan,
  DestroyUangMakan,
} = require("./uang-makan.Repository");
const moment = require("moment/moment");

module.exports = {
  GetUangMakan: async (req, res) => {
    try {
      const { user } = req;
      const userId = user.is_admin ? "" : user.id;

      const result = await FetchUangMakan(userId);

      result.forEach((item) => {
        item.bulan = moment(item.tanggal).format("MMMM");
        item.tahun = moment(item.tanggal).format("YYYY");
        item.tanggal = moment(item.tanggal).format("YYYY-MM");
        item.tanggal_spm = moment(item.tanggal_spm).format("DD MMMM YYYY");
      });

      return Ok(res, result, "Uang makan fetched successfully");
    } catch (error) {
      return InternalServerError(res, error, "Failed to get uang makan");
    }
  },
  GetUangMakanById: async (req, res) => {
    try {
      const result = await FetchUangMakanById(req.params.id);

      result.bulan = moment(result.tanggal).format("MMMM");
      result.tahun = moment(result.tanggal).format("YYYY");
      result.tanggal = moment(result.tanggal).format("YYYY-MM");
      result.tanggal_spm = moment(result.tanggal_spm).format("YYYY-MM-DD");

      return Ok(res, result, "Uang makan fetched successfully");
    } catch (error) {
      return InternalServerError(res, error, "Failed to get uang makan");
    }
  },
  CreateUangMakan: async (req, res) => {
    try {
      await StoreUangMakan(req.body);

      return Ok(res, null, "Uang makan created successfully");
    } catch (error) {
      return InternalServerError(res, error, "Failed to create uang makan");
    }
  },
  ImportUangMakan: async (req, res) => {
    try {
      for (const iterator of req.body.data) {
        await StoreUangMakan(iterator);
      }

      return Ok(res, null, "Uang makan imported successfully");
    } catch (error) {
      return InternalServerError(res, error, "Failed to import uang makan");
    }
  },
  EditUangMakan: async (req, res) => {
    try {
      await UpdateUangMakan(req.params.id, req.body);

      return Ok(res, null, "Uang makan updated successfully");
    } catch (error) {
      console.log(error);
      return InternalServerError(res, error, "Failed to update uang makan");
    }
  },
  DeleteUangMakan: async (req, res) => {
    try {
      await DestroyUangMakan(req.params.id);

      return Ok(res, null, "Uang makan deleted successfully");
    } catch (error) {
      return InternalServerError(res, error, "Failed to delete uang makan");
    }
  },
};
