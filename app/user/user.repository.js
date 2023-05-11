const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  FetchUser: async () => {
    return await prisma.tbm_user.findMany();
  },
  FetchUserNotAdmin: async () => {
    return await prisma.tbm_user.findMany({
      where: {
        is_admin: false,
      },
      select: {
        id: true,
        nip: true,
        nama: true,
      },
      orderBy: {
        nama: "asc",
      },
    });
  },
  FetchUserByNIP: async (nip) => {
    return await prisma.tbm_user.findUnique({
      where: {
        nip: nip,
      },
    });
  },
  FetchUserById: async (id) => {
    return await prisma.tbm_user.findUnique({
      where: {
        id: id,
      },
    });
  },
  StoreUser: async (payload) => {
    return await prisma.tbm_user.create({
      data: payload,
    });
  },
  UpdateUser: async (id, payload) => {
    return await prisma.tbm_user.update({
      where: {
        id: id,
      },
      data: payload,
    });
  },
};
