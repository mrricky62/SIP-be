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
  FetchTunjanganById: async (id) => {
    return await prisma.tbl_tunjangan.findUnique({
      where: {
        id: id,
      },
      include: {
        user: true,
      },
    });
  },
  StoreTunjangan: async (payload) => {
    return await prisma.tbl_tunjangan.create({
      data: payload,
    });
  },
};
