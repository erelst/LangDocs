# Strict Workflow Skill

Gunakan skill ini otomatis ketika mendeteksi tugas migrasi framework, refactor besar, atau penambahan fitur baru.

> **Aturan lengkap ada di `AGENTS.md` (single source of truth).**
> Skill ini hanya menyusun URUTAN LANGKAH operasional. Jangan menyalin isi aturan ke sini.
> Jika terjadi perbedaan, `AGENTS.md` yang menang.

## Langkah wajib (ikuti berurutan)

1. **Ontologi & alasan kode lama**
   - Identifikasi konsep domain, entity, relasi, invariant.
   - Baca kode target + konteks; jelaskan *kenapa* ditulis seperti itu sebelum edit.
   - Dilarang blind override / rewrite buta.
   - Detail: `AGENTS.md` → `## Before ANY code change` poin 1–2, `## Larangan Blind Override`.

2. **Memory Protection Check**
   - Jalankan prosedur pengecekan memory 2-tahap (ekstrak entitas via CodeGraph / Codebase Memory Graph → `memory search` semantik). DILARANG `memory list` mentah.
   - Tuliskan status pada rencana: `[Protected Memory Alignment Check: PASS / N/A / WARNING (butuh approval)]`.
   - Jika terdeteksi konflik dengan protected memory, hentikan dan minta persetujuan tertulis dari user.
   - Detail: `AGENTS.md` → `## Before ANY code change` poin 3.

3. **Branch**
   - Deteksi default branch (main atau master).
   - Buat branch baru dari default branch terbaru dengan naming `type/deskripsi-singkat`.
   - Detail: `AGENTS.md` → `## Branch Management`.

4. **Characterization / Safety Net**
   - Jika belum ada test relevan → buat characterization test yang merekam perilaku saat ini.
   - Pastikan test hijau sebelum mengubah production code.
   - Detail: `AGENTS.md` → `## Before ANY code change` poin 3.

5. **Feature Flag / Adapter (jika applicable)**
   - Migrasi → buat adapter + feature flag (default OFF).
   - Fitur baru → bungkus di feature flag (default OFF). Jangan langsung override path lama.
   - Detail: `AGENTS.md` → `## Before ANY code change` poin 4–5.

6. **Implementasi incremental & Commit Lokal Terpisah**
   - Kerjakan per vertical slice kecil; setelah setiap slice/topik jalankan test sampai hijau.
   - Untuk pengerjaan multi-topik (non-trivial), buat commit lokal terpisah per topik di feature branch.
   - Verifikasi: pakai dev server milik user bila dibutuhkan; DILARANG build untuk verifikasi lokal (gunakan verifikasi cepat).
   - Detail: `AGENTS.md` → `## During work`.

7. **Local First — Option Flow**
   - TIDAK ADA commit/push otomatis. Evaluasi jalur (Trivial vs Non-Trivial) SETELAH pengerjaan selesai via `git diff --stat`.
   - Tampilkan opsi memakai format wajib, lalu tawarkan Opsi A/B (trivial) atau A/B/C (non-trivial).
   - Pengecekan status CI remote dilakukan SEBELUM push ke remote; jangan menunggu CI pass untuk membuat commit baru.
   - Detail: `AGENTS.md` → `## Branch Management`, `## Template Tampilan Opsi`, `## Remote CI Monitoring & CI Generation`.

8. **Simpan & Bersihkan Memory**
   - Simpan memory `PROTECTED` HANYA setelah commit/merge sampai ke default branch (atau PR di-merge).
   - Jika pengerjaan dibatalkan/di-revert, jalankan `memory forget` HANYA untuk entry yang terkait pengerjaan itu.
   - Detail: `AGENTS.md` → `## Memory Protection & Anti-Regresi`.

9. **Cleanup**
   - Hapus feature branch (lokal + remote), kembali ke default branch dan pull.
   - Detail: `AGENTS.md` → `## Branch Management` (bagian Proteksi).

## Confidence
Selalu update todo + confidence score. Jangan claim selesai di bawah 90.
