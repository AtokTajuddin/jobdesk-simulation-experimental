# 🎯 Git Branching Strategy - Issue-Driven Development

## 📌 Konsep Utama

```
main (production-ready)
  │
  └── dev (integration branch)
        │
        ├── 1-slicing-ui-homepage      ← dari Issue #1
        ├── 2-setup-database           ← dari Issue #2
        └── 3-backend-api              ← dari Issue #3
```

## 🎫 Issue-Driven Workflow

### Langkah 1: Buat Issue di GitHub
1. Buka tab **Issues** di repository
2. Klik **New Issue**
3. Isi judul & deskripsi jobdesk
4. Assign ke developer yang bertanggung jawab
5. Tambahkan label (enhancement, bug, dll)

### Langkah 2: Buat Branch dari Issue
1. Di halaman Issue, klik **"Create a branch"** (sidebar kanan)
2. Pilih source branch: `dev` (PENTING!)
3. GitHub akan buat branch dengan format: `{issue-number}-{issue-title}`
4. Checkout branch tersebut di local

### Langkah 3: Kerjakan & Push
```bash
git fetch origin
git checkout 1-slicing-ui-homepage
# ... kerjakan ...
git add .
git commit -m "feat: complete homepage slicing"
git push
```

### Langkah 4: Buat Pull Request
1. PR otomatis ter-link ke Issue
2. Gunakan keyword: `Closes #1` di deskripsi PR
3. Issue akan auto-close saat PR di-merge

---

## 🔑 Aturan Penting

### Branch Hierarchy
- **main**: Kode production-ready
- **dev**: Integrasi semua fitur
- **{issue-number}-{title}**: Branch per Issue/jobdesk

### Golden Rule

```
┌─────────────────────────────────────────────────────────────────┐
│  Selalu SYNC dengan DEV sebelum membuat PR!                    │
└─────────────────────────────────────────────────────────────────┘
```

**Setiap developer WAJIB:**
1. `git fetch origin` - Ambil update terbaru
2. `git merge origin/dev` - Merge perubahan dev ke branch
3. Resolve conflict (jika ada)
4. Baru kemudian push dan create PR

## 📋 Workflow Visual

```
Timeline:
─────────────────────────────────────────────────────────────────►

Day 1: Buat 3 Issues di GitHub
        Issue #1: Slicing UI Homepage
        Issue #2: Setup Database Schema  
        Issue #3: Backend API Development

Day 1: Developer buat branch DARI ISSUE (source: dev)
        dev ──┬── 1-slicing-ui-homepage
              ├── 2-setup-database  
              └── 3-backend-api

Day 3: Issue #1 selesai, PR merged ke dev
        dev (+ UI) ◄── PR #4 closes #1 ✓

Day 3: Developer lain SYNC dengan dev terbaru!
        2-setup-database  ◄── merge origin/dev (dapat UI)
        3-backend-api     ◄── merge origin/dev (dapat UI)

Day 5: Issue #2 selesai
        dev (+ UI + DB) ◄── PR #5 closes #2 ✓

Day 7: Issue #3 selesai
        dev (complete) ◄── PR #6 closes #3 ✓
        
Release: dev → main
        main ◄── PR #7 (Release v1.0)
```

## 🛠️ Command Cheatsheet

### Checkout Branch dari Issue
```bash
# Setelah buat branch dari Issue di GitHub
git fetch origin
git checkout 1-slicing-ui-homepage
```

### Sync dengan Dev (WAJIB sebelum PR!)
```bash
# Di branch kamu
git fetch origin
git merge origin/dev

# Jika ada conflict, resolve dulu
git add .
git commit -m "Merge dev updates"
git push
```

### Commit dengan Reference Issue
```bash
# Reference issue di commit message
git commit -m "feat: add navbar component #1"

# Atau close issue via commit
git commit -m "feat: complete homepage - closes #1"
```

## ⚠️ Yang Harus Dihindari

| ❌ Jangan | ✅ Lakukan |
|-----------|-----------|
| Buat branch manual tanpa Issue | Selalu buat Issue dulu |
| Branch dari main | Branch dari dev |
| Lupa sync dengan dev | Sync MINIMAL sekali sehari |
| Langsung merge ke main | Merge ke dev dulu, test, baru ke main |

## 📁 Struktur Project

```
learn-git-eksperimen/
├── README.md
├── index.html          # Issue #1: Slicing UI
├── css/
│   └── style.css       # Issue #1: Slicing UI
├── database/
│   ├── schema.sql      # Issue #2: Database
│   └── config.js       # Issue #2: Database
├── backend/
│   ├── server.js       # Issue #3: Backend
│   └── client.js       # Issue #3: Backend
└── docs/
    └── workflow.md
```

## 🎮 Cara Memulai

### 1. Buat Issues di GitHub
Buat 3 Issue dengan detail:

**Issue #1: Slicing UI Homepage**
```
Membuat tampilan homepage dengan HTML & CSS
- [ ] Navbar responsive
- [ ] Hero section
- [ ] Footer
```

**Issue #2: Setup Database Schema**
```
Setup struktur database
- [ ] Users table
- [ ] Products table
- [ ] Orders table
```

**Issue #3: Backend API Development**
```
Membuat REST API
- [ ] GET /api/users
- [ ] POST /api/users
- [ ] GET /api/products
```

### 2. Assign Developer ke Issue
### 3. Buat Branch dari Issue (source: dev)
### 4. Kerjakan, Sync, PR, Merge!

Good luck! 🚀
