# 🎯 Git Branching Strategy - Simulasi Kolaborasi Tim

## 📌 Konsep Utama

```
main (production-ready)
  │
  └── dev (integration branch)
        │
        ├── jobdesk/slicing-ui      (Frontend: HTML/CSS)
        ├── jobdesk/database        (Database setup)
        └── jobdesk/backend         (Backend logic)
```

## 🔑 Aturan Penting

### 1. Branch Hierarchy
- **main**: Kode yang sudah siap production
- **dev**: Tempat integrasi semua jobdesk sebelum ke main
- **jobdesk/\***: Branch untuk masing-masing tugas/fitur

### 2. Workflow Agar Tidak Overlap

```
┌─────────────────────────────────────────────────────────────────┐
│  GOLDEN RULE: Selalu PULL dari DEV sebelum PUSH ke DEV!        │
└─────────────────────────────────────────────────────────────────┘
```

**Setiap developer WAJIB:**
1. `git fetch origin` - Ambil update terbaru
2. `git merge origin/dev` - Merge perubahan dev ke branch jobdesk
3. Resolve conflict (jika ada)
4. Baru kemudian push dan create PR

## 📋 Simulasi Workflow

### Scenario: 3 Jobdesk Paralel

```
Timeline:
─────────────────────────────────────────────────────────────────►

Day 1: Semua mulai dari dev yang sama
        dev ──┬── jobdesk/slicing-ui
              ├── jobdesk/database  
              └── jobdesk/backend

Day 3: Slicing UI selesai, merge ke dev
        dev (+ UI) ◄── jobdesk/slicing-ui ✓

Day 3: Database & Backend HARUS sync dengan dev terbaru!
        jobdesk/database  ◄── merge dari dev (dapat UI)
        jobdesk/backend   ◄── merge dari dev (dapat UI)

Day 5: Database selesai, merge ke dev
        dev (+ UI + DB) ◄── jobdesk/database ✓

Day 5: Backend HARUS sync lagi!
        jobdesk/backend ◄── merge dari dev (dapat UI + DB)

Day 7: Backend selesai
        dev (+ UI + DB + Backend) ◄── jobdesk/backend ✓
        
Final: dev siap, merge ke main
        main ◄── dev
```

## 🛠️ Command Cheatsheet

### Setup Awal (Project Lead)
```bash
# Buat branch dev dari main
git checkout main
git checkout -b dev
git push -u origin dev
```

### Developer Mulai Jobdesk Baru
```bash
# SELALU mulai dari dev terbaru!
git checkout dev
git pull origin dev
git checkout -b jobdesk/nama-tugas
```

### Sync dengan Dev (WAJIB sebelum PR!)
```bash
# Di branch jobdesk kamu
git fetch origin
git merge origin/dev

# Jika ada conflict, resolve dulu
# Lalu commit hasil merge
git add .
git commit -m "Merge dev into jobdesk/nama-tugas"
```

### Selesai Jobdesk
```bash
git push -u origin jobdesk/nama-tugas
# Buat Pull Request ke dev di GitHub
```

## ⚠️ Yang Harus Dihindari

| ❌ Jangan | ✅ Lakukan |
|-----------|-----------|
| Langsung merge ke main | Merge ke dev dulu, test, baru ke main |
| Lupa sync dengan dev | Sync MINIMAL sekali sehari |
| Force push | Komunikasi dengan tim dulu |
| Commit langsung ke dev/main | Selalu via branch & PR |

## 📁 Struktur Project Simulasi

```
learn-git-eksperimen/
├── README.md
├── index.html          # Jobdesk 1: Slicing UI
├── css/
│   └── style.css       # Jobdesk 1: Slicing UI
├── database/
│   └── schema.sql      # Jobdesk 2: Database
├── backend/
│   └── server.js       # Jobdesk 3: Backend
└── docs/
    └── workflow.md     # Dokumentasi tambahan
```

## 🎮 Simulasi Praktik

Lihat file `docs/workflow.md` untuk step-by-step simulasi!
