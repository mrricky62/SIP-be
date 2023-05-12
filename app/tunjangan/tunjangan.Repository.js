const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  StoreTunjangan: async (payload) => {
    return await prisma.tbl_tunjangan.create({
      data: payload,
    });
  },
};
