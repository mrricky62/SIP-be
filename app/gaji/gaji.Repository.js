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
  StoreGaji: async (payload) => {
    return await prisma.tbl_gaji.create({
      data: payload,
    });
  },
};
