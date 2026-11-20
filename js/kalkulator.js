const inputTugas = document.querySelector("#nilaiTugas");
const inputUts = document.querySelector("#nilaiUts");
const inputUas = document.querySelector("#nilaiUas");
const tombol = document.querySelector("#hitungButton");
const hasil = document.querySelector("#hasil");

function hitungRataRata(tugas, uts, uas) {
  return (tugas + uts + uas) / 3;
}

function predikat(nilai) {
  if (nilai >= 85) return "A";
  if (nilai >= 70) return "B";
  if (nilai >= 55) return "C";
  return "D";
}

tombol.addEventListener("click", () => {
  const teks = [inputTugas.value, inputUts.value, inputUas.value];
  const nilai = teks.map(Number);

  if (teks.some((v) => v.trim() === "") || nilai.some((n) => n < 0 || n > 100)) {
    hasil.textContent = "Isi ketiga nilai dengan angka 0 sampai 100.";
    return;
  }

  const rata = hitungRataRata(...nilai);
  hasil.textContent = `Rata-rata ${rata.toFixed(2)}, predikat ${predikat(rata)}`;
});