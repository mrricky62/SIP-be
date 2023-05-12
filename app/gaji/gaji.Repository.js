const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  FetchGaji: async (userId) => {
    return await prisma.tbl_gaji.findMany({
      where: {
        ...(userId && { user_id: userId }),
      },
      include: {
        user: {
          select: {
            nip: true,
            nama: true,
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });
  },
  FetchGajiById: async (id) => {
    return await prisma.tbl_gaji.findUnique({
      where: {
        id: id,
      },
      include: {
        user: true,
      },
    });
  },
  StoreGaji: async (payload) => {
    return await prisma.tbl_gaji.create({
      data: payload,
    });
  },
  UpdateGaji: async (id, payload) => {
    return await prisma.tbl_gaji.update({
      where: {
        id: id,
      },
      data: payload,
    });
  },
  DestroyGaji: async (id) => {
    return await prisma.tbl_gaji.delete({
      where: {
        id: id,
      },
    });
  },
};
