const {
  InternalServerError,
  BadRequest,
  Ok,
} = require("../../utils/http-response");
const {
  FetchGajiSummary,
  FetchTunjanganSummary,
  FetchUangMakanSummary,
  FetchSPDSummary,
  FetchUangLemburSummary,
} = require("./summary.Repository");
const moment = require("moment");

module.exports = {
  GetSummary: async (req, res) => {
    try {
      const { id, is_admin } = req.user;
      if (is_admin) return BadRequest(res, {}, "Admin can't access");

      const tanggal = req.query.tanggal ? req.query.tanggal : new Date();

      const pegawai = {
        nip: req.user.nip,
        nama: req.user.nama,
        pangkat: req.user.pangkat,
        golongan: req.user.golongan,
      };

      //   Gaji
      const AllGaji = await FetchGajiSummary(id);
      AllGaji.forEach((item) => {
        let total_potongan = 0;
        let total_tunjangan = 0;

        Object.keys(item).forEach((key) => {
          if (key.startsWith("pot_")) {
            total_potongan += +item[key];
          }
          if (key.startsWith("tunj_")) {
            total_tunjangan += +item[key];
          }
        });

        item.total_potongan = total_potongan;
        item.total_tunjangan = total_tunjangan;
      });

      const gaji = AllGaji.filter((item) => {
        return (
          moment(item.tanggal).format("YYYY-MM") ===
          moment(tanggal).format("YYYY-MM")
        );
      });

      const AllTunjangan = await FetchTunjanganSummary(id);
      const tunjangan = AllTunjangan.filter((item) => {
        return (
          moment(item.tanggal).format("YYYY-MM") ===
          moment(tanggal).format("YYYY-MM")
        );
      });

      const AllUangMakan = await FetchUangMakanSummary(id);
      const uang_makan = AllUangMakan.filter((item) => {
        return (
          moment(item.tanggal_spm).format("YYYY-MM") ===
          moment(tanggal).format("YYYY-MM")
        );
      });

      const AllSPD = await FetchSPDSummary(id);
      const spd = AllSPD.filter((item) => {
        return (
          moment(item.tanggal_spm).format("YYYY-MM") ===
          moment(tanggal).format("YYYY-MM")
        );
      });

      const AllUangLembur = await FetchUangLemburSummary(id);
      const uang_lembur = AllUangLembur.filter((item) => {
        return (
          moment(item.tanggal_spm).format("YYYY-MM") ===
          moment(tanggal).format("YYYY-MM")
        );
      });

      let jumlah_kotor = 0;
      let jumlah_bersih = 0;

      let gaji_pokok = gaji.length > 0 ? +gaji[0].gaji_pokok : 0;
      let total_tunjangan = gaji.length > 0 ? +gaji[0].total_tunjangan : 0;
      let pembulatan = gaji.length > 0 ? +gaji[0].pembulatan : 0;
      let total_potongan = gaji.length > 0 ? +gaji[0].total_potongan : 0;
      let bersih_uang_makan = uang_makan.length > 0 ? +uang_makan[0].bersih : 0;
      let bersih_uang_lembur =
        uang_lembur.length > 0 ? +uang_lembur[0].bersih : 0;
      let tunj_dibayar = tunjangan.length > 0 ? +tunjangan[0].tunj_dibayar : 0;

      jumlah_kotor =
        gaji_pokok +
        total_tunjangan +
        pembulatan +
        bersih_uang_makan +
        bersih_uang_lembur +
        tunj_dibayar;

      console.log("jumlah_kotor", jumlah_kotor);
      console.log("total_potongan", total_potongan);

      jumlah_bersih = +jumlah_kotor - +total_potongan;

      const payload = {
        bulan: moment(tanggal).format("MMMM"),
        tahun: moment(tanggal).format("YYYY"),
        pegawai,
        gaji: gaji.length > 0 ? gaji[0] : false,
        tunjangan: tunjangan.length > 0 ? tunjangan[0] : false,
        uang_makan: uang_makan.length > 0 ? uang_makan[0] : false,
        spd: spd.length > 0 ? spd[0] : false,
        uang_lembur: uang_lembur.length > 0 ? uang_lembur[0] : false,
        jumlah_kotor: jumlah_kotor,
        jumlah_bersih: jumlah_bersih,
      };

      return Ok(res, payload, "Success get summary");
    } catch (error) {
      console.log(error);
      return InternalServerError(res, error, "Failed to get summary");
    }
  },
};
