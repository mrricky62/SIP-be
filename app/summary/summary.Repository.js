const { PrismaClient } = require("@prisma/client");
const status = require("../../constant/status");
const prisma = new PrismaClient();

module.exports = {
  FetchGajiSummary: async (userId) => {
    return await prisma.tbl_gaji.findMany({
      where: {
        user_id: userId,
      },
    });
  },
  FetchTunjanganSummary: async (userId) => {
    return await prisma.tbl_tunjangan.findMany({
      where: {
        user_id: userId,
      },
    });
  },
  FetchUangMakanSummary: async (userId) => {
    return await prisma.tbl_uang_makan.findMany({
      where: {
        user_id: userId,
      },
    });
  },
  FetchSPDSummary: async (userId) => {
    return await prisma.tbl_spd.findMany({
      where: {
        user_id: userId,
        status: status.DISETUJUI,
      },
    });
  },
  FetchUangLemburSummary: async (userId) => {
    return await prisma.tbl_uang_lembur.findMany({
      where: {
        user_id: userId,
      },
    });
  },
};
