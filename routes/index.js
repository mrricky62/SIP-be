const { AuthToken } = require("../shared/middleware.shared");

const authRoute = require("../app/auth/auth.route");
const userRoute = require("../app/user/user.route");

const gajiRoute = require("../app/gaji/gaji.Route");
const tunjanganRoute = require("../app/tunjangan/tunjangan.Route");
const uangMakanRoute = require("../app/uang-makan/uang-makan.Route");
const uangLemburRoute = require("../app/uang-lembur/uang-lembur.Route");

module.exports = function (app) {
  const apiVersion = process.env.API_VERSION || "v1";
  const preRoute = `/api/${apiVersion}`;

  app.use(`${preRoute}/`, authRoute);

  app.use(`${preRoute}/user`, AuthToken, userRoute);

  app.use(`${preRoute}/gaji`, AuthToken, gajiRoute);
  app.use(`${preRoute}/tunjangan`, AuthToken, tunjanganRoute);
  app.use(`${preRoute}/uang-makan`, AuthToken, uangMakanRoute);
  app.use(`${preRoute}/uang-lembur`, AuthToken, uangLemburRoute);

  app.get(`${preRoute}/whoIs`, AuthToken, (req, res) => {
    res.json({ user: req.user });
  });
};
