const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  StoreUangLembur: async (payload) => {
    return await prisma.tbl_uang_lembur.create({
      data: payload,
    });
  },
};
