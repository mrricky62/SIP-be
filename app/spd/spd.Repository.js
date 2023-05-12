const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  StoreSPD: async (payload) => {
    return await prisma.tbl_spd.create({
      data: payload,
    });
  },
};
