const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  FetchUangLembur: async (userId) => {
    return await prisma.tbl_uang_lembur.findMany({
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
  FetchUangLemburById: async (id) => {
    return await prisma.tbl_uang_lembur.findUnique({
      where: {
        id: id,
      },
      include: {
        user: true,
      },
    });
  },
  StoreUangLembur: async (payload) => {
    return await prisma.tbl_uang_lembur.create({
      data: payload,
    });
  },
  UpdateUangLembur: async (id, payload) => {
    return await prisma.tbl_uang_lembur.update({
      where: {
        id: id,
      },
      data: payload,
    });
  },
  DestroyUangLembur: async (id) => {
    return await prisma.tbl_uang_lembur.delete({
      where: {
        id: id,
      },
    });
  },
};
