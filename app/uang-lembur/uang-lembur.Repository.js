const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  FetchUangLembur: async () => {
    return await prisma.tbl_uang_lembur.findMany({
      select: {
        id: true,
        user: {
          select: {
            nip: true,
          },
        },
        tanggal: true,
        jam_kerja: true,
        jam_libur: true,
        jam_makan: true,
        bersih: true,
        tanggal_spm: true,
      },
      orderBy: {
        created_at: "desc",
      },
    });
  },
  StoreUangLembur: async (payload) => {
    return await prisma.tbl_uang_lembur.create({
      data: payload,
    });
  },
};
