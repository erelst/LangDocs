# Seed Memory Prompt – Pemicu Re-run Workflow

Cara pakai: copy-paste seluruh blok di bawah ke chat jcode, atau cukup bilang
"baca dan jalankan `templates/seed-memory-prompt.md`".

File ini SENGAJA tidak memuat aturan/template apa pun. Seluruh aturan dan template
workflow ada di `AGENTS.md` (single source of truth).

---

Jalankan prosedur **Seeding & Re-run Workflow** yang didefinisikan di `AGENTS.md`
pada bagian `## Seeding & Re-run Workflow`.

Ketentuan:
- Anggap ini perintah **PERTAMA KALI (RE-RUN TOTAL)** — meskipun kamu merasa pernah
  membaca, menginstall, atau menjalankan workflow ini sebelumnya (di project ini
  maupun project lain). Jangan lompati satu langkah pun, jangan anggap sudah terpasang.
- Prosedurnya TIDAK ditulis ulang di file ini. Baca dan ikuti `AGENTS.md`.
- Lokasi file di proyek target: skill ada di `.jcode/skills/strict-workflow/SKILL.md`
  (bukan `jcode/...`), sedangkan `AGENTS.md` dan `templates/` ada di root project.
- Setelah selesai, laporkan ke user: `Workflow Hash` yang tersimpan, jumlah entry
  memory workflow lama yang dihapus, dan konfirmasi bahwa aturan terbaru sudah aktif
  pada sesi ini.
