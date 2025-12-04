# 🎯 Git Branching Strategy - Issue-Driven Development

> **Konsep Utama:** Template project yang "terisi sendiri" melalui kontribusi paralel dari setiap developer, tanpa saling tunggu dan tanpa conflict.

---

## 📖 Daftar Isi

1. [Konsep & Filosofi](#-konsep--filosofi)
2. [Struktur Branch](#-struktur-branch)
3. [Panduan untuk Developer](#-panduan-untuk-developer)
4. [Workflow Lengkap](#-workflow-lengkap)
5. [Command Cheatsheet](#-command-cheatsheet)
6. [FAQ & Troubleshooting](#-faq--troubleshooting)

---

## 💡 Konsep & Filosofi

### Masalah yang Diselesaikan

```
❌ TANPA STRATEGI INI:
- Developer saling tunggu: "Aku butuh API-nya dulu!"
- Copy-paste file dari teman → conflict dependencies
- Merge ke main → BOOM! 💥 conflict dimana-mana
- Package.json bentrok karena beda versi

✅ DENGAN STRATEGI INI:
- Semua kerja paralel, tidak saling tunggu
- Template "terisi sendiri" via merge
- Dependencies konsisten (satu package.json)
- Assembly otomatis di branch dev
```

### Prinsip Utama

| Prinsip                  | Penjelasan                                                |
| ------------------------ | --------------------------------------------------------- |
| **Template Kosong**      | Project dimulai dengan "slot kosong" yang akan diisi      |
| **Tambah, Bukan Ubah**   | Developer menambah/mengisi, bukan mengubah file yang sama |
| **Sync Rutin**           | Selalu ambil update terbaru sebelum push                  |
| **Dev = Assembly Point** | Branch dev tempat semua kontribusi tergabung otomatis     |

### Visualisasi Konsep

```
AWAL: Template dengan slot kosong
┌─────────────────────────────────────┐
│  index.html   → [SLOT UI]           │
│  style.css    → [SLOT UI]           │
│  schema.sql   → [SLOT DATABASE]     │
│  server.js    → [SLOT BACKEND]      │
│  package.json → dependencies sama   │
└─────────────────────────────────────┘
        │
        ├── Developer #1 mengisi UI
        ├── Developer #2 mengisi Database
        └── Developer #3 mengisi Backend
        │
        ▼ (merge ke dev)
┌─────────────────────────────────────┐
│  index.html   → ✅ Terisi           │
│  style.css    → ✅ Terisi           │
│  schema.sql   → ✅ Terisi           │
│  server.js    → ✅ Terisi           │
│  + file baru dari masing-masing    │
└─────────────────────────────────────┘
        │
        ▼
   🎉 PROJECT COMPLETE!
```

---

## 🏗️ Struktur Branch

```
main (production-ready)
  │
  └── dev (integration/assembly branch)
        │
        ├── 1-feat-slicing-ui      ← dari Issue #1
        ├── 2-feat-database        ← dari Issue #2
        └── 3-feat-backend         ← dari Issue #3
```

| Branch        | Fungsi                 | Siapa yang Push                |
| ------------- | ---------------------- | ------------------------------ |
| `main`        | Production, kode final | Hanya via PR dari dev          |
| `dev`         | Integrasi semua fitur  | Hanya via PR dari branch issue |
| `{no}-{nama}` | Branch kerja per issue | Developer yang ditugaskan      |

---

## 👨‍💻 Panduan untuk Developer

### 🚀 Pertama Kali Bergabung

```bash
# 1. Clone repository
git clone https://github.com/AtokTajuddin/jobdesk-simulation-experimental.git
cd jobdesk-simulation-experimental

# 2. Install dependencies (WAJIB!)
npm install

# 3. Lihat branch yang tersedia
git branch -a

# 4. Pindah ke branch dev
git checkout dev
```

### 📋 Mulai Mengerjakan Issue

#### Step 1: Buat/Ambil Issue di GitHub

1. Buka tab **Issues** di repository
2. Pilih issue yang akan dikerjakan (atau buat baru)
3. **Assign diri sendiri** ke issue tersebut

#### Step 2: Buat Branch dari Issue

1. Di halaman Issue → klik **"Create a branch"** (sidebar kanan)
2. ⚠️ **PENTING:** Ganti source ke **`dev`** (default-nya main)
3. Klik **"Create branch"**

#### Step 3: Checkout di Local

```bash
git fetch origin
git checkout 1-feat-slicing-ui    # sesuaikan nama branch
```

#### Step 4: Kerjakan Tugasmu

```bash
# Edit file sesuai jobdesk...
# Contoh untuk UI developer:
# - Edit index.html
# - Edit css/style.css
# - Tambah komponen baru

# Commit dengan pesan yang jelas
git add .
git commit -m "feat: add responsive navbar #1"
```

#### Step 5: ⭐ SYNC SEBELUM PUSH (WAJIB!)

```bash
# Ambil update terbaru dari dev
git fetch origin
git merge origin/dev

# Jika ada conflict:
# 1. Buka file yang conflict
# 2. Pilih kode yang benar
# 3. git add . && git commit -m "resolve merge conflict"
```

#### Step 6: Push & Buat PR

```bash
git push origin 1-feat-slicing-ui
```

Di GitHub:

1. Buat **Pull Request**
2. Base: `dev` ← Compare: `1-feat-slicing-ui`
3. Di deskripsi tulis: `Closes #1`
4. Request review (opsional)
5. Merge setelah approved

---

## 🔄 Workflow Lengkap

### Diagram Timeline

```
WAKTU ──────────────────────────────────────────────────────────────►

dev:          ●━━━━━━━━━●━━━━━━━━━━●━━━━━━━━━━●━━━━━━━━●
              │         ▲          ▲          ▲        │
              │    (backend)  (ui)       (database)    │
              │         │          │          │        │
backend:      └──●──●───┘          │          │        │
                     ↘             │          │        │
ui:                   └────●───●───┘          │        │
                          sync↗    ↘          │        │
database:                   └───────●────●────┘        │
                                   sync↗               │
                                                       ▼
main:         ●━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━●
                                                   Release

Keterangan:
● = commit/merge point
↗ = sync (git merge origin/dev)
▲ = PR merged ke dev
```

### Daily Routine untuk Developer

```bash
# 🌅 PAGI - Mulai kerja
git fetch origin
git merge origin/dev          # Dapat update terbaru!
npm install                   # Jika ada package baru

# 💻 SIANG - Kerja seperti biasa
# ... coding ...
git add .
git commit -m "feat: progress hari ini #1"

# 🌙 SORE - Sebelum pulang
git fetch origin
git merge origin/dev          # Sync lagi!
git push origin nama-branch
```

---

## 🛠️ Command Cheatsheet

### Setup Awal

```bash
git clone <repo-url>
cd <repo-name>
npm install
git checkout dev
```

### Mulai Issue Baru

```bash
git fetch origin
git checkout <nama-branch-dari-issue>
```

### Sync dengan Dev (WAJIB!)

```bash
git fetch origin
git merge origin/dev
# Resolve conflict jika ada
npm install                   # Jika package.json berubah
```

### Commit dengan Reference Issue

```bash
git commit -m "feat: deskripsi singkat #1"      # Reference
git commit -m "fix: bug pada navbar - closes #1" # Auto-close
```

### Push & PR

```bash
git push origin nama-branch
# Buat PR di GitHub: base=dev, compare=nama-branch
```

### Setelah PR Merged

```bash
git checkout dev
git pull origin dev
git branch -d nama-branch-lama    # Hapus branch lokal (opsional)
```

---

## ⚠️ Yang Harus Dihindari

| ❌ JANGAN                       | ✅ LAKUKAN                         | Alasan                          |
| ------------------------------- | ---------------------------------- | ------------------------------- |
| Branch dari `main`              | Branch dari `dev`                  | Main hanya untuk production     |
| Push tanpa sync                 | Selalu `git merge origin/dev` dulu | Mencegah conflict besar         |
| PR langsung ke `main`           | PR ke `dev` dulu                   | Dev = testing ground            |
| Commit "update"                 | Commit "feat: add navbar #1"       | Pesan jelas + tracking          |
| Edit file yang bukan jobdesk-mu | Fokus pada area sendiri            | Mencegah conflict               |
| `git push --force`              | Diskusi dengan tim dulu            | Bisa menghapus kerja orang lain |

---

## ❓ FAQ & Troubleshooting

### Q: Bagaimana jika ada conflict saat merge?

```bash
# Setelah git merge origin/dev, jika conflict:
# 1. Buka file yang conflict (ditandai <<<<< ===== >>>>>)
# 2. Pilih kode yang benar, hapus marker conflict
# 3. Save file
# 4. git add .
# 5. git commit -m "resolve merge conflict with dev"
```

### Q: Saya butuh package baru, bagaimana?

```bash
npm install nama-package --save
git add package.json package-lock.json
git commit -m "chore: add nama-package for fitur X"
# Developer lain akan dapat saat mereka sync + npm install
```

### Q: Branch saya ketinggalan jauh dari dev?

```bash
git fetch origin
git merge origin/dev
# Mungkin ada banyak conflict, resolve satu per satu
# Ini kenapa sync RUTIN itu penting!
```

### Q: Saya tidak sengaja commit di branch yang salah?

```bash
# Pindahkan commit terakhir ke branch yang benar
git stash                           # Simpan perubahan sementara
git checkout branch-yang-benar
git stash pop                       # Ambil kembali perubahan
git add . && git commit -m "..."
```

### Q: Kapan dev di-merge ke main?

```
Ketika semua issue untuk release sudah merged ke dev:
1. Testing menyeluruh di dev
2. Buat PR: dev → main
3. Review final
4. Merge → Production release! 🚀
```

---

## 📁 Struktur Project

```
learn-git-eksperimen/
├── README.md              # Dokumentasi ini
├── package.json           # Dependencies (JANGAN EDIT SEMBARANGAN)
├── .gitignore             # File yang tidak di-track
├── .env.example           # Template environment variables
│
├── index.html             # [Issue #1: UI]
├── css/
│   └── style.css          # [Issue #1: UI]
├── js/
│   └── app.js             # [Issue #1: UI + Issue #3: API calls]
│
├── database/
│   ├── schema.sql         # [Issue #2: Database]
│   └── config.js          # [Issue #2: Database]
│
└── backend/
    ├── server.js          # [Issue #3: Backend]
    └── routes/
        ├── users.js       # [Issue #3: Backend]
        ├── products.js    # [Issue #3: Backend]
        └── orders.js      # [Issue #3: Backend]
```

---

## ✨ Quick Start

### Untuk Project Lead / Setup Awal

```bash
# 1. Buat repository di GitHub
# 2. Clone dan setup template
git clone <repo-url>
cd <repo-name>

# 3. Buat branch dev
git checkout -b dev
git push -u origin dev

# 4. Setup template project (file kosong dengan TODO)
# 5. Buat Issues di GitHub untuk setiap jobdesk
# 6. Assign developer ke masing-masing Issue
```

### Untuk Developer

```bash
# 1. Clone repository
git clone <repo-url>
cd <repo-name>
npm install

# 2. Ambil branch dari Issue yang ditugaskan
git fetch origin
git checkout <nama-branch-issue>

# 3. Kerjakan tugasmu
# ... coding ...

# 4. WAJIB SYNC sebelum push!
git fetch origin && git merge origin/dev

# 5. Push dan buat PR ke dev
git push origin <nama-branch>
```

---

## 📞 Kontak & Bantuan

Jika ada pertanyaan atau masalah:

1. Buat Issue baru dengan label `question`
2. Hubungi Project Lead
3. Diskusi di channel tim

---

## 📝 Changelog

| Tanggal    | Perubahan                                |
| ---------- | ---------------------------------------- |
| 2024-12-04 | Initial setup + workflow documentation   |
| 2024-12-04 | Issue #3: Backend API routes implemented |

---

**Happy Coding! 🚀**

_"Sync early, sync often, avoid conflicts!"_
