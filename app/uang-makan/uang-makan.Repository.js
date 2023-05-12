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
  FetchUangMakanById: async (id) => {
    return await prisma.tbl_uang_makan.findUnique({
      where: {
        id: id,
      },
      include: {
        user: true,
      },
    });
  },
  StoreUangMakan: async (payload) => {
    return await prisma.tbl_uang_makan.create({
      data: payload,
    });
  },
  UpdateUangMakan: async (id, payload) => {
    return await prisma.tbl_uang_makan.update({
      where: {
        id: id,
      },
      data: payload,
    });
  },
  DestroyUangMakan: async (id) => {
    return await prisma.tbl_uang_makan.delete({
      where: {
        id: id,
      },
    });
  },
};
