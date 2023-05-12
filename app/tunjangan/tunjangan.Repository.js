const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  FetchTunjangan: async () => {
    return await prisma.tbl_tunjangan.findMany({
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
  StoreTunjangan: async (payload) => {
    return await prisma.tbl_tunjangan.create({
      data: payload,
    });
  },
};
