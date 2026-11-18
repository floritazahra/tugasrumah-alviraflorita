
// 1. ARRAY DAN OBJECT: DAFTAR KEAHLIAN
const skills = [
  { nama: "HTML", level: "Menengah" },
  { nama: "CSS", level: "Menengah" },
  { nama: "Git dan GitHub", level: "Dasar" },
  { nama: "Desain poster dengan Canva", level: "Mahir" }
];

skills.push({ nama: "JavaScript", level: "Dasar" });
skills.push({ nama: "UI/UX Design", level: "Pemula" });

// PEMERIKSAAN DATA DI CONSOLE
console.log("Jumlah keahlian:", skills.length);
console.log("Daftar keahlian:");
console.table(skills);

const daftarSkill = document.querySelector("#daftar-skill");
const jumlahSkill = document.querySelector("#jumlah-skill");

if (daftarSkill && jumlahSkill) {
  skills.forEach((skill) => {
    const item = document.createElement("li");
    item.textContent = `${skill.nama} (${skill.level})`;
    daftarSkill.appendChild(item);
  });

  jumlahSkill.textContent = `Ada ${skills.length} keahlian.`;
}

// 2. MODE GELAP
const tombolTema = document.querySelector("#tombol-tema");

if (tombolTema) {
  tombolTema.addEventListener("click", () => {
    document.body.classList.toggle("gelap");

    tombolTema.textContent =
      document.body.classList.contains("gelap")
        ? "Mode Terang"
        : "Mode Gelap";
  });
}

// 3. PENGHITUNG KARAKTER
const kotakPesan = document.querySelector("#pesan");
const hitungKarakter = document.querySelector("#hitung-karakter");

if (kotakPesan && hitungKarakter) {
  kotakPesan.addEventListener("input", () => {
    hitungKarakter.textContent =
      `${kotakPesan.value.length}/300 karakter`;
  });
}

// 4. DATA PROYEK
const proyek = [
  {
    judul: "Halaman Profil Pertama",
    kategori: "HTML",
    gambar: "img/Cuplikan layar 2026-11-03 135217.png",
    deskripsi: "Halaman web pertama saya menggunakan HTML."
  },
  {
    judul: "Form Kontak",
    kategori: "HTML",
    gambar: "img/Cuplikan layar 2026-11-17 192813.png",
    deskripsi: "Form kontak dengan label dan validasi."
  },
  {
    judul: "Tabel Jadwal Belajar",
    kategori: "HTML",
    gambar: "img/Jadwal Belajar.png",
    deskripsi: "Tabel jadwal belajar mingguan."
  },
  {
    judul: "Portofolio Responsif",
    kategori: "CSS",
    gambar: "img/Portofolio.png",
    deskripsi: "Halaman profil yang menampilkan informasi pribadi dan kontak."
  },
  {
    judul: "Kalkulator Nilai Rapor",
    kategori: "JavaScript",
    gambar: "img/Kalkulator.png",
    deskripsi: "Kalkulator nilai menggunakan JavaScript."
  },
  {
    judul: "Lima Soal Logika",
    kategori: "JavaScript",
    gambar: "img/Cuplikan layar 2026-11-17 194158.png",
    deskripsi: "Latihan logika dengan JavaScript."
  }
];

// PEMERIKSAAN DATA PROYEK DI CONSOLE
console.log("Jumlah proyek:", proyek.length);
console.log("Daftar proyek:");
console.table(proyek);

// 5. MENAMPILKAN PROYEK
const daftarProyek = document.querySelector("#daftar-proyek");
const jumlahProyek = document.querySelector("#jumlah-proyek");

function buatKartu(item) {
  return `
    <article class="kartu">
      <span class="label">${item.kategori}</span>
      <h3>${item.judul}</h3>
      <img src="${item.gambar}" alt="${item.judul}" width="280">
      <p>${item.deskripsi}</p>
    </article>
  `;
}

function tampilkanProyek(daftar) {
  if (!daftarProyek || !jumlahProyek) return;

  daftarProyek.innerHTML = daftar.map(buatKartu).join("");
  jumlahProyek.textContent =
    `Menampilkan ${daftar.length} dari ${proyek.length} proyek`;
}

// 6. FILTER PROYEK
function pasangFilter(idTombol, kategori) {
  const tombol = document.querySelector(idTombol);

  if (!tombol) return;

  tombol.addEventListener("click", () => {
    document.querySelectorAll(".tombol-filter").forEach((btn) => {
      btn.classList.remove("aktif");
    });

    tombol.classList.add("aktif");

    if (kategori === "Semua") {
      tampilkanProyek(proyek);
    } else {
      const hasilFilter = proyek.filter(
        (item) => item.kategori === kategori
      );

      console.log(`Hasil filter &{kategori}`)
      console.table(hasilFilter);
      tampilkanProyek(hasilFilter);
    }
  });
}

if (daftarProyek) {
  tampilkanProyek(proyek);

  pasangFilter("#filter-semua", "Semua");
  pasangFilter("#filter-html", "HTML");
  pasangFilter("#filter-css", "CSS");
  pasangFilter("#filter-javascript", "JavaScript");
}
// 5. Repositori GitHub terbaru (halaman Proyek)
const username = "floritazahra";
const alamatRepo = `https://api.github.com/users/${username}/repos`;
const pilihan = "?sort=updated&per_page=6";
const daftarRepo = document.querySelector("#daftar-repo");
const statusRepo = document.querySelector("#status-repo");
async function ambilRepo() {
  statusRepo.textContent = "Memuat repositori...";

  try {
    const response = await fetch(alamatRepo + pilihan);

    if (!response.ok) {
      throw new Error(`Status ${response.status}`);
    }

    const repos = await response.json();

    daftarRepo.innerHTML = "";

    repos.forEach(repo => {
      const item = document.createElement("li");
      const tautan = document.createElement("a");

      tautan.href = repo.html_url;
      tautan.textContent = repo.name;
      tautan.target = "_blank";

      item.appendChild(tautan);
      daftarRepo.appendChild(item);
    });

    statusRepo.textContent = `Berhasil memuat ${repos.length} repositori.`;

  } catch (error) {
    statusRepo.textContent = "Maaf, repositori gagal dimuat.";
    console.error("Error:", error);
  }
}
if (daftarRepo) {
  ambilRepo();
}