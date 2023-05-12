const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  StoreUangMakan: async (payload) => {
    return await prisma.tbl_uang_makan.create({
      data: payload,
    });
  },
};
