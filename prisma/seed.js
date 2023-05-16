const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { Encrypt } = require("../utils/hash-password");

const USERS = require("./seed-user.json");

function seedUsers() {
  console.log(USERS.length);
  USERS.map(
    async (n) =>
      await prisma.tbm_user
        .create({
          data: {
            nip: n.nip,
            nama: n.nmpeg,
            pangkat: "Pengatur Muda",
            golongan: n.gol,
            password: await Encrypt(n.nip),
          },
        })
        .catch((e) => console.log("error", e))
  );
}

seedUsers();
