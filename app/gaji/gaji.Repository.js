const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  FetchGaji: async () => {
    return await prisma.tbl_gaji.findMany({
      include: {
        user: {
          select: {
            nip: true,
            nama: true,
          },
        },
      },
    });
  },
  FetchGajiById: async (id) => {
    return await prisma.tbl_gaji.findUnique({
      where: {
        id: id,
      },
    });
  },
  StoreGaji: async (payload) => {
    return await prisma.tbl_gaji.create({
      data: payload,
    });
  },
};
