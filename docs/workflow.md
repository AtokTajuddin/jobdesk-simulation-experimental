# 🎮 Simulasi Praktik Git Branching

## Step 1: Setup Branch Structure

```bash
# Pastikan di main
git checkout main

# Buat branch dev
git checkout -b dev
git push -u origin dev

# Kembali ke main untuk baseline
git checkout main
```

## Step 2: Simulasi Jobdesk 1 - Slicing UI

```bash
# Developer 1 mulai kerja
git checkout dev
git pull origin dev
git checkout -b jobdesk/slicing-ui

# ... kerjakan slicing ...
# edit index.html dan css/style.css

git add .
git commit -m "feat: complete homepage slicing"
git push -u origin jobdesk/slicing-ui

# Buat PR di GitHub: jobdesk/slicing-ui → dev
# Setelah review, merge PR
```

## Step 3: Simulasi Jobdesk 2 - Database (Paralel)

```bash
# Developer 2 mulai kerja (anggap bersamaan dengan Dev 1)
git checkout dev
git pull origin dev
git checkout -b jobdesk/database

# ... kerjakan database schema ...

# ⚡ PENTING: Sebelum push, sync dulu!
git fetch origin
git merge origin/dev  # Ini akan dapat update dari slicing UI jika sudah merge

# Resolve conflict jika ada
git add .
git commit -m "feat: add database schema"
git push -u origin jobdesk/database

# Buat PR: jobdesk/database → dev
```

## Step 4: Simulasi Jobdesk 3 - Backend (Paralel)

```bash
# Developer 3 mulai kerja
git checkout dev
git pull origin dev
git checkout -b jobdesk/backend

# ... kerjakan backend ...

# ⚡ SYNC sebelum push!
git fetch origin
git merge origin/dev  # Dapat update dari UI + Database

git add .
git commit -m "feat: implement backend API"
git push -u origin jobdesk/backend

# Buat PR: jobdesk/backend → dev
```

## Step 5: Final - Dev ke Main

```bash
# Setelah semua jobdesk merge ke dev dan tested
git checkout main
git pull origin main
git merge dev
git push origin main

# Atau via PR di GitHub: dev → main
```

---

## 🔄 Diagram Visual

```
WAKTU ────────────────────────────────────────────────────────►

main:     ●━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━●
          │                                          ▲
          ▼                                          │
dev:      ●━━━━━●━━━━━━━━●━━━━━━━━━━●━━━━━━━━━━━━━━━●
          │     ▲        ▲          ▲               │
          │     │        │          │               │
          │     │        │          │               │
slicing:  └──●──┘        │          │               │
               ↘         │          │               │
database:       └────●───┘          │               │
                    ↘               │               │
backend:             └──────────●───┘               │
                                                    │
                                              RELEASE

Keterangan:
● = commit
━ = timeline branch
↘ = merge dari dev ke branch jobdesk (sync)
▲ = merge dari jobdesk ke dev (PR)
```

---

## 💡 Tips Menghindari Conflict

### 1. Pembagian File yang Jelas
```
Jobdesk 1 (UI):     index.html, css/*
Jobdesk 2 (DB):     database/*, config/db.js
Jobdesk 3 (Backend): backend/*, routes/*
```

### 2. Komunikasi
- Gunakan GitHub Issues untuk tracking
- Review PR dengan teliti
- Diskusi sebelum mengubah file yang di-share

### 3. Commit Atomic
```bash
# ✅ Baik - commit kecil dan spesifik
git commit -m "feat: add navbar component"
git commit -m "style: navbar responsive design"

# ❌ Hindari - commit besar campur aduk
git commit -m "update banyak file"
```

### 4. Sync Rutin
```bash
# Jadikan kebiasaan setiap mulai kerja:
git fetch origin
git merge origin/dev
```

---

## 🧪 Exercise: Coba Sendiri!

1. Clone repo ini
2. Buat branch `dev`
3. Buat 3 branch jobdesk
4. Edit file sesuai jobdesk masing-masing
5. Praktikkan merge ke dev satu per satu
6. Amati bagaimana perubahan ter-propagate

Good luck! 🚀
