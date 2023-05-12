const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  FetchUangMakan: async () => {
    return await prisma.tbl_uang_makan.findMany({
      select: {
        id: true,
        user: {
          select: {
            nip: true,
          },
        },
        tanggal: true,
        jml_hari: true,
        bersih: true,
        tanggal_spm: true,
      },
      orderBy: {
        created_at: "desc",
      },
    });
  },
  StoreUangMakan: async (payload) => {
    return await prisma.tbl_uang_makan.create({
      data: payload,
    });
  },
};
