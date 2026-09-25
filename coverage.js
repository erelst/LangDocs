/* Medan makna: the word fields a learner needs inside the topics, and which surfaces are meant to
 * carry them.
 *
 * This is a target list, not a dictionary. Each word here is a word somebody decided the deck
 * should teach, and `check.js` prints which of them no sentence uses yet. An unused word is a
 * RECORDED GAP, not a failed check: see T6 in docs/SPEC.md for why a gap is allowed to stand.
 *
 * Why this is a separate file and not part of const.js: const.js ships to the page, and the page
 * has no use for a list of words it should be teaching. Only check.js reads this.
 *
 * The list is by field, not by topic, on purpose. A word belongs to a field ("things on a table"),
 * and the field is filled wherever the situation that needs it lives: 箸 belongs in makan, お腹 in
 * klinik, 祖父 in rumah_santai. T6 says a field has no quota of its own because the survey cannot
 * measure one; it measures places and activities, and a noun has neither.
 *
 * `must` marks the words the topic plan promises. The rest are members of the same field that were
 * added because the field looked thin without them, and they may be removed with a line of reason
 * if they turn out to be words this deck does not need.
 */
'use strict';
window.COVERAGE = {
  /* Nama latar: the place and time words a sentence needs to say when and where it happens. */
  latar: {
    note: 'nama tempat dan waktu yang dipakai untuk membuka keadaan',
    words: ['家', '外', '中', '朝', '昼', '夜', '今朝', '今晩', '昨日', '明日', '今週', '週末',
            '今年', '去年', '夏', '冬', '春', '秋', '雨の日', '昼休み'],
    needEntry: ['春', '雨の日'],
  },
  /* Benda: everything a hand can pick up, grouped by where it is used. */
  benda_dapur: {
    note: 'benda yang dipakai waktu makan dan memasak',
    words: ['箸', '皿', '茶碗', 'コップ', 'スプーン', 'フォーク', '鍋', '冷蔵庫', '包丁', 'まな板',
            'ふきん'],
    needEntry: ['茶碗', 'まな板', 'ふきん'],
  },
  benda_rumah: {
    note: 'benda di dalam rumah di luar dapur',
    words: ['タオル', '石鹸', '歯ブラシ', '布団', '枕', '掛け布団', 'ハンガー', '洗剤', 'ごみ袋',
            '電池', '電球', '鍵'],
    needEntry: [],
  },
  benda_bawa: {
    note: 'benda yang dibawa orang sehari-hari',
    words: ['財布', '鍵', '傘', 'かばん', 'スマホ', '充電器', 'ハンカチ', '眼鏡', '薬', '切符'],
    needEntry: ['かばん', '充電器', 'ハンカチ'],
  },
  /* Bangunan dan tempat umum. */
  bangunan: {
    note: 'bangunan dan tempat yang orang datangi',
    words: ['学校', '病院', '駅', '公園', '建物', 'アパート', '図書館', '本屋', '体育館', '郵便局',
            '銀行', '交番', '美容院', '八百屋', 'コンビニ', '駐車場', '階段', 'エレベーター'],
    needEntry: [],
  },
  /* Keadaan sekitar: how a place looks and what happened to it. */
  keadaan: {
    note: 'keadaan tempat dan benda, termasuk yang rusak atau sedang terjadi',
    words: ['古い', '新しい', 'きれい', '汚い', '静か', 'うるさい', '広い', '狭い', '暗い', '明るい',
            '涼しい', '暖かい', '混んでいる', '空いている', '壊れる', '故障', '停電', '洪水', '地震',
            '台風', '渋滞'],
    needEntry: [],
  },
  /* Anggota tubuh. 尻尾 is here rather than in a pet field because the deck has no pet topic and the
   * tail is only ever named while talking about an animal. */
  tubuh: {
    note: 'anggota tubuh, dipakai waktu mengeluh atau menjelaskan. Semua katanya sudah punya '
        + 'entri lexicon sejak batch tubuh ditulis',
    words: ['手', '足', '目', '耳', '口', '鼻', '顔', '頭', '首', '肩', '背', 'お腹', '腰', '指',
            '歯', '髪', 'のど', '尻尾'],
    needEntry: [],
  },
  /* Keluarga. The deck counted the family share by relationship line, so these are the words that
   * make the family sentences concrete instead of only numerous. */
  keluarga: {
    note: 'sebutan anggota keluarga. 祖母 親 夫 妻 sudah dipakai di tiap kalimat rumah_santai, '
        + 'jadi field ini tidak punya celah entry lagi',
    words: ['父', '母', '兄', '姉', '弟', '妹', '祖父', '祖母', 'いとこ', '親', '息子', '娘', '夫',
            '妻', 'おじ', 'おば', '家族', '両親'],
    needEntry: [],
  },
  /* Bakat dan kemahiran: how good somebody is at something, said about oneself and about others. */
  bakat: {
    note: 'bakat, kemahiran, dan cara menyebutnya',
    words: ['上手', '下手', '得意', '苦手', '才能', '練習', '覚える', '慣れる', '間に合う'],
    needEntry: ['下手', '得意', '間に合う'],
  },
  /* Hobi dan kegiatan waktu luang. */
  hobi: {
    note: 'hobi dan kegiatan waktu luang',
    words: ['趣味', '歌', '歌う', 'ギター', 'ピアノ', '読書', '本', '映画', 'ゲーム', '釣り', '写真',
            '旅行', '散歩', '泳ぐ', '絵'],
    needEntry: [],
  },
  /* Nama pekerjaan. */
  pekerjaan: {
    note: 'nama pekerjaan dan cara menanyakan pekerjaan',
    words: ['会社員', '公務員', '看護師', '医者', '先生', '店員', '運転手', '学生', '歌手', '俳優',
            '農家', '美容師', '料理人', '警官'],
    needEntry: [],
  },
  /* Kebiasaan: what somebody does every day, on purpose or by accident. */
  kebiasaan: {
    note: 'kebiasaan harian, termasuk yang gagal dilakukan',
    words: ['早起き', '寝坊', 'シャワー', 'お風呂', '歯磨き', '洗濯', '掃除', '片付ける', '起きる',
            '寝る', '眠い', '目覚まし'],
    needEntry: ['早起き', 'シャワー', '歯磨き', '片付ける', '起きる', '寝る', '目覚まし'],
  },
  /* Perkenalan sendiri. T6 keeps this out of the topic table: a self-introduction is one fixed
   * scene, not a 場所 × 活動 cell, so no measured share exists for it. */
  perkenalan: {
    note: 'memperkenalkan diri: nama, asal, pekerjaan, dan penutupnya',
    words: ['名前', '出身', '専攻', '留学生', '自己紹介', 'よろしく', '大学', '国', '来る', '住む'],
    needEntry: ['住む'],
  },
  /* Arah: asking for and giving directions. */
  arah: {
    note: 'menanyakan dan memberi arah',
    words: ['右', '左', '前', '後ろ', '隣', '近く', '遠い', '角', '曲がる', 'まっすぐ', '道', '交差点',
            '通り', '信号', '渡る', '地図', '目印'],
    needEntry: ['通り'],
  }
};
