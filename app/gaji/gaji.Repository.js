const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  StoreGaji: async (payload) => {
    return await prisma.tbl_gaji.create({
      data: payload,
    });
  },
};
