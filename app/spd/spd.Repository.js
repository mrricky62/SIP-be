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
  FetchSPDById: async (id) => {
    return await prisma.tbl_spd.findUnique({
      where: {
        id: id,
      },
      include: {
        user: true,
      },
    });
  },
  StoreSPD: async (payload) => {
    return await prisma.tbl_spd.create({
      data: payload,
    });
  },
  UpdateSPD: async (id, payload) => {
    return await prisma.tbl_spd.update({
      where: {
        id: id,
      },
      data: payload,
    });
  },
};
