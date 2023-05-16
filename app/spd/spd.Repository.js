const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  FetchSPD: async (userId) => {
    return await prisma.tbl_spd.findMany({
      where: {
        ...(userId && { user_id: userId }),
      },
      select: {
        id: true,
        user: {
          select: {
            nip: true,
          },
        },
        no_spd: true,
        no_st: true,
        tujuan: true,
        sifat: true,
        lama: true,
        status: true,
        total: true,
        tanggal_spm: true,
      },
      orderBy: {
        created_at: "desc",
      },
    });
  },
  StoreSPD: async (payload) => {
    return await prisma.tbl_spd.create({
      data: payload,
    });
  },
};
