const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  FetchTunjangan: async (userId) => {
    return await prisma.tbl_tunjangan.findMany({
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
  FetchTunjanganByIdUserAndTanggal: async (userId, tanggal) => {
    return await prisma.tbl_tunjangan.findFirst({
      where: {
        user_id: userId,
        tanggal: new Date(tanggal),
      },
    });
  },
  StoreTunjangan: async (payload) => {
    return await prisma.tbl_tunjangan.create({
      data: payload,
    });
  },
  UpdateTunjangan: async (id, payload) => {
    return await prisma.tbl_tunjangan.update({
      where: {
        id: id,
      },
      data: payload,
    });
  },
  DestroyTunjangan: async (id) => {
    return await prisma.tbl_tunjangan.delete({
      where: {
        id: id,
      },
    });
  },
};
