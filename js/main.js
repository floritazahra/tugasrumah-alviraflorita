// JavaScript portofolio Alvira Florita Zahra
// Dipasang di semua halaman dengan defer

// 1. Daftar keahlian (halaman Beranda), data dari data/keahlian.json
const daftarSkill = document.querySelector("#daftar-skill");
const jumlahSkill = document.querySelector("#jumlah-skill");

async function muatKeahlian() {
  try {
    const response = await fetch("data/keahlian.json");
    if (!response.ok) {
      throw new Error(`Status ${response.status}`);
    }
    const skills = await response.json();

    skills.forEach((skill) => {
      const item = document.createElement("li");
      item.textContent = `${skill.nama} (${skill.level})`;
      daftarSkill.appendChild(item);
    });

    jumlahSkill.textContent = `Ada ${skills.length} keahlian yang sedang saya kembangkan.`;
  } catch (error) {
    jumlahSkill.textContent = "Daftar keahlian gagal dimuat.";
    console.error(error);
  }
}

if (daftarSkill) {
  muatKeahlian();
}

// 2. Tema gelap (semua halaman)
const tombolTema = document.querySelector("#tombol-tema");

// Membaca tema yang tersimpan
const temaTersimpan = localStorage.getItem("tema");

if (temaTersimpan === "gelap") {
  document.body.classList.add("gelap");
}

if (tombolTema) {
  // Menyesuaikan tulisan tombol
  tombolTema.textContent = document.body.classList.contains("gelap")
    ? "Mode Terang"
    : "Mode Gelap";

  tombolTema.addEventListener("click", () => {
    document.body.classList.toggle("gelap");

    if (document.body.classList.contains("gelap")) {
      tombolTema.textContent = "Mode Terang";
      localStorage.setItem("tema", "gelap");
    } else {
      tombolTema.textContent = "Mode Gelap";
      localStorage.setItem("tema", "terang");
    }
  });
}

// 3. Penghitung karakter pesan (halaman Kontak)
const kotakPesan = document.querySelector("#pesan");
const hitungKarakter = document.querySelector("#hitung-karakter");

if (kotakPesan) {
  kotakPesan.addEventListener("input", () => {
    hitungKarakter.textContent = `${kotakPesan.value.length}/300 karakter`;
  });
}

// 4. Daftar proyek dan filter (halaman Proyek), data dari data/proyek.json
const daftarProyek = document.querySelector("#daftar-proyek");
const jumlahProyek = document.querySelector("#jumlah-proyek");

let proyek = [];

function tampilkanProyek(data) {
  daftarProyek.innerHTML = "";

  data.forEach((item) => {
    const kartu = document.createElement("article");
    kartu.classList.add("kartu-proyek");

    const gambar = document.createElement("img");
    gambar.src = item.gambar;
    gambar.alt = item.alt;

    const judul = document.createElement("h3");
    judul.textContent = item.judul;

    const kategori = document.createElement("p");
    kategori.textContent = item.kategori;

    const deskripsi = document.createElement("p");
    deskripsi.textContent = item.deskripsi;

    kategori.classList.add("label");

kartu.appendChild(gambar);
kartu.appendChild(judul);
kartu.appendChild(kategori);
kartu.appendChild(deskripsi);

    daftarProyek.appendChild(kartu);
  });

  jumlahProyek.textContent = `Ada ${data.length} proyek.`;
}

function pasangFilter(id, kategori) {
  const tombol = document.querySelector(id);

  if (tombol) {
    tombol.addEventListener("click", () => {

      // Menghapus warna aktif dari semua tombol
      document.querySelectorAll(".tombol-filter").forEach((item) => {
        item.classList.remove("aktif");
      });

      // Memberi warna aktif pada tombol yang dipilih
      tombol.classList.add("aktif");

      if (kategori === "Semua") {
        tampilkanProyek(proyek);
      } else {
        const hasilFilter = proyek.filter(
          (item) => item.kategori === kategori
        );

        tampilkanProyek(hasilFilter);
      }
    });
  }
}

async function muatProyek() {
  try {
    jumlahProyek.textContent = "Memuat proyek...";

    const response = await fetch("data/proyek.json");
    if (!response.ok) {
      throw new Error(`Status ${response.status}`);
    }

    proyek = await response.json();
    tampilkanProyek(proyek);
  } catch (error) {
    jumlahProyek.textContent = "Data proyek gagal dimuat.";
    console.error(error);
  }
}

// Jalankan hanya pada halaman Proyek
if (daftarProyek) {
  document.querySelector("#filter-semua").classList.add("aktif");

  pasangFilter("#filter-semua", "Semua");
  pasangFilter("#filter-javascript", "JavaScript");
  pasangFilter("#filter-css", "CSS");
  pasangFilter("#filter-html", "HTML");

  muatProyek();
}

// 5. Repositori GitHub terbaru (halaman Proyek)
const username = "floritazahra";
const alamatRepo = `https://api.github.com/users/${username}/repos`;
const pilihan = "?sort=updated&per_page=6";

const daftarRepo = document.querySelector("#daftar-repo");
const statusRepo = document.querySelector("#status-repo");

async function ambilRepo() {
  statusRepo.textContent = "Memuat...";

  try {
    const response = await fetch(alamatRepo + pilihan);
    if (!response.ok) {
      throw new Error(`Status ${response.status}`);
    }
    const repos = await response.json();

    repos.forEach((repo) => {
      const item = document.createElement("li");
      const tautan = document.createElement("a");
      tautan.href = repo.html_url;
      tautan.target = "_blank";
      tautan.textContent = repo.name;
      item.appendChild(tautan);
      daftarRepo.appendChild(item);
    });

    statusRepo.textContent = `${repos.length} repositori yang terakhir diperbarui:`;
  } catch (error) {
    statusRepo.textContent =
      "Maaf, daftar repositori gagal dimuat. Periksa username atau coba lagi nanti.";
    console.error(error);
  }
}

if (daftarRepo) {
  ambilRepo();
}

// Tombol sembunyikan dan tampilkan repositori
const tombolRepo = document.querySelector("#tombol-repo");

if (tombolRepo && daftarRepo) {
  tombolRepo.addEventListener("click", () => {
    daftarRepo.classList.toggle("tersembunyi");

    if (daftarRepo.classList.contains("tersembunyi")) {
      tombolRepo.textContent = "Tampilkan Repositori";
    } else {
      tombolRepo.textContent = "Sembunyikan Repositori";
    }
  });
}