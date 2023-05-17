const { InternalServerError, Ok } = require("../../utils/http-response");
const {
  StoreTunjangan,
  FetchTunjangan,
  FetchTunjanganById,
  UpdateTunjangan,
  DestroyTunjangan,
} = require("./tunjangan.Repository");
const moment = require("moment/moment");

module.exports = {
  GetTunjangan: async (req, res) => {
    try {
      const { user } = req;
      const userId = user.is_admin ? "" : user.id;

      const result = await FetchTunjangan(userId);

      result.forEach((item) => {
        item.tanggal = moment(result.tanggal).format("YYYY-MM");
      });

      return Ok(res, result, "Tunjangan fetched successfully");
    } catch (error) {
      return InternalServerError(res, error, "Failed to fetch tunjangan");
    }
  },
  GetTunjanganById: async (req, res) => {
    try {
      const result = await FetchTunjanganById(req.params.id);

      result.tanggal = moment(result.tanggal).format("YYYY-MM");

      return Ok(res, result, "Tunjangan fetched successfully");
    } catch (error) {
      return InternalServerError(res, error, "Failed to fetch tunjangan");
    }
  },
  CreateTunjangan: async (req, res) => {
    try {
      await StoreTunjangan(req.body);

      return Ok(res, {}, "Tunjangan created successfully");
    } catch (error) {
      return InternalServerError(res, error, "Failed to create tunjangan");
    }
  },
  ImportTunjangan: async (req, res) => {
    try {
      for (const iterator of req.body.data) {
        await StoreTunjangan(iterator);
      }

      return Ok(res, {}, "Tunjangan imported successfully");
    } catch (error) {
      console.log(error);
      return InternalServerError(res, error, "Failed to import tunjangan");
    }
  },
  ImportTunjanganPotongan: async (req, res) => {
    try {
      for (const iterator of req.body.data) {
        await UpdateTunjangan(iterator.id, iterator);
      }

      return Ok(res, {}, "Tunjangan imported successfully");
    } catch (error) {
      console.log(error);
      return InternalServerError(res, error, "Failed to import tunjangan");
    }
  },
  EditTunjangan: async (req, res) => {
    try {
      await UpdateTunjangan(req.params.id, req.body);

      return Ok(res, {}, "Tunjangan updated successfully");
    } catch (error) {
      return InternalServerError(res, error, "Failed to update tunjangan");
    }
  },
  DeleteTunjangan: async (req, res) => {
    try {
      await DestroyTunjangan(req.params.id);

      return Ok(res, {}, "Tunjangan deleted successfully");
    } catch (error) {
      return InternalServerError(res, error, "Failed to delete tunjangan");
    }
  },
};
