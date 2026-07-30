const makeParts = (word) => {
  if (word.includes(" ")) return word.split(" ");
  if (word.includes("-")) return word.split("-");
  const cut = Math.ceil(word.length / 2);
  return [word.slice(0, cut), word.slice(cut)];
};

const makeWords = (items, category) => items.map(([word, chinese]) => ({
  word,
  chinese,
  sentence: category === "Kata Kerja"
    ? `Murid-murid ${word} semasa aktiviti di sekolah.`
    : category === "Kata Adjektif"
      ? `Keadaan itu sangat ${word}.`
      : `Ini ialah ${word}.`,
  clue: `Maksud dalam bahasa Cina: ${chinese}`,
  parts: makeParts(word)
}));

window.BM_GAME_DATA = {
  theme: "Tema 1: Sekolah dan Pembelajaran",
  units: [
    {
      id: 1,
      title: "Bab 1",
      subtitle: "Tempat di Sekolah",
      category: "Kata Nama",
      unlocked: true,
      words: makeWords([
        ["sekolah","学校"],["kelas","教室"],["pejabat","办公室"],["perpustakaan","图书馆"],["kantin","食堂"],
        ["padang","草场"],["makmal sains","科学实验室"],["makmal komputer","电脑室"],["tandas","厕所"],["stor","储藏室"],
        ["dewan","大礼堂"],["surau","祈祷室"],["kedai buku","书局／贩卖部"],["bilik guru","教师办公室"],["bilik darjah","课室"],
        ["bilik kesihatan","保健室"],["bilik muzik","音乐室"],["bilik seni","美术室"],["pentas","舞台"],["pondok pengawal","保安亭"],
        ["tempat letak kereta","停车场"],["laluan pejalan kaki","人行道／走廊"],["taman sains","科学园"],["kebun sekolah","学校菜园"],["pintu pagar","大铁门"]
      ], "Kata Nama")
    },
    {
      id: 2,
      title: "Bab 2",
      subtitle: "Benda dan Perabot di Dalam Kelas",
      category: "Kata Nama",
      unlocked: true,
      words: makeWords([
        ["meja","桌子"],["kerusi","椅子"],["papan tulis","黑板／白板"],["papan kenyataan","布告栏"],["meja guru","老师桌子"],
        ["jam dinding","挂墙钟"],["bakul sampah","垃圾筐"],["penyapu","扫把"],["pencedok sampah","垃圾铲"],["pemadam papan tulis","板擦"],
        ["kapur","粉笔"],["pen penanda","白板笔／记号笔"],["projektor","投影机"],["skrin","屏幕"],["langsir","窗帘"],
        ["pintu","门"],["tingkap","窗户"],["rak buku","书架"],["kabinet","储物柜"],["peta","地图"],
        ["jadual waktu","时间表"],["jadual bertugas","值日表"],["peraturan kelas","班规"],["alatan kebersihan","打扫工具"],["pembasmi kuman","消毒剂"]
      ], "Kata Nama")
    },
    {
      id: 3,
      title: "Bab 3",
      subtitle: "Alat Tulis dan Bahan Pembelajaran",
      category: "Kata Nama",
      unlocked: true,
      words: makeWords([
        ["buku teks","课本"],["buku latihan","练习本"],["buku rujukan","参考书"],["kamus","字典"],["pensel","铅笔"],
        ["pembaris","尺"],["pemadam","橡皮擦"],["pengasah pensel","卷笔刀"],["kotak pensel","笔盒"],["pen","钢笔／圆珠笔"],
        ["pensel warna","彩色铅笔"],["krayon","蜡笔"],["gunting","剪刀"],["gam","胶水"],["kertas warna","彩色纸"],
        ["fail","文件夹"],["jangka lukis","圆规"],["buku nota","笔记本"],["kad imbasan","闪卡／字卡"],["majalah","杂志"],
        ["surat khabar","报纸"],["alat tulis","文具"],["gam pelekat","胶带／浆糊"],["kertas lukisan","画纸"],["papan selit","写字夹板"]
      ], "Kata Nama")
    },
    {
      id: 4,
      title: "Bab 4",
      subtitle: "Tindakan Pembelajaran Utama",
      category: "Kata Kerja",
      unlocked: true,
      words: makeWords([
        ["belajar","学习"],["membaca","阅读"],["menulis","书写"],["mengira","计算"],["melukis","绘画"],
        ["mewarna","涂色"],["mendengar","聆听"],["memperhatikan","注意看／观察"],["memahami","明白／理解"],["menghafal","背诵／记忆"],
        ["mengeja","拼写"],["menyalin","抄写"],["menjawab","回答"],["bertanya","提问"],["berbincang","讨论"],
        ["membentangkan","呈堂／发表"],["mengulang kaji","复习"],["meminjam","借（书）"],["memulangkan","归还"],["menyemak","检查（功课）"],
        ["menanda","批改／做记号"],["mengumpul","收集（作业）"],["mengagihkan","分发（书本）"],["menggunting","剪（纸）"],["menampal","粘贴"]
      ], "Kata Kerja")
    },
    {
      id: 5,
      title: "Bab 5",
      subtitle: "Aktiviti Sekolah dan Interaksi Sosial",
      category: "Kata Kerja",
      unlocked: true,
      words: makeWords([
        ["berhimpun","集会"],["berbaris","排队"],["bermain","玩耍"],["berbual","聊天"],["berkawan","交朋友"],
        ["membantu","帮助"],["menghormati","尊重"],["mematuhi","遵守（规则）"],["mendengar arahan","听从指示"],["datang","来／到达"],
        ["pulang","放学回家"],["masuk","进入"],["keluar","走出"],["duduk","坐下"],["berdiri","起立"],
        ["mengangkat tangan","举手"],["memberi salam","问安／敬礼"],["mengucapkan terima kasih","说谢谢"],["menyertai","参加"],["memenangi","赢取／获胜"],
        ["gagal","失败／不及格"],["berusaha","努力"],["bekerja sama","合作"],["menyapu kelas","打扫／扫课室"],["memadam papan tulis","擦黑板／白板"]
      ], "Kata Kerja")
    },
    {
      id: 6,
      title: "Bab 6",
      subtitle: "Persekitaran Sekolah dan Ciri Murid",
      category: "Kata Adjektif",
      unlocked: true,
      words: makeWords([
        ["bersih","干净的"],["kotor","肮脏的"],["kemas","整齐的"],["sepah","凌乱的"],["bising","吵闹的"],
        ["senyap","安静的"],["sunyi","寂静的"],["luas","宽敞的"],["sempit","狭窄的"],["teratur","有条理的"],
        ["rajin","勤劳的"],["malas","懒惰的"],["pandai","聪明的"],["bijak","明智的"],["cerdik","机灵的"],
        ["pintar","睿智的"],["sopan","有礼貌的"],["patuh","听话的／顺从的"],["fokus","专心的／专注的"],["leka","分心的／不专注的"],
        ["gembira","高兴的"],["seronok","开心的／有趣的"],["bosan","乏味的／无聊的"],["takut","害怕的"],["malu","害羞的"]
      ], "Kata Adjektif")
    }
  ],
  modes: [
    { id: "flash", title: "Flash Card", description: "Lihat perkataan dan maksudnya.", skill: "Kenal" },
    { id: "catch", title: "Word Catch", description: "Pilih perkataan sebelum masa tamat.", skill: "Pantas" },
    { id: "match", title: "Matching", description: "Padankan perkataan dengan maksud.", skill: "Padan" },
    { id: "typing", title: "Typing", description: "Taip ejaan yang betul.", skill: "Ejaan" },
    { id: "listening", title: "Listening", description: "Dengar sebutan dan pilih jawapan.", skill: "Dengar" },
    { id: "boss", title: "Boss Battle", description: "Jawab soalan untuk menewaskan boss.", skill: "Cabaran" },
    { id: "treasure", title: "Treasure Hunt", description: "Buka peti dengan jawapan tepat.", skill: "Ganjaran" },
    { id: "sentence", title: "Sentence Builder", description: "Lengkapkan ayat menggunakan perkataan sesuai.", skill: "Ayat" },
    { id: "detective", title: "Word Detective", description: "Cari perkataan berdasarkan petunjuk.", skill: "Faham" },
    { id: "factory", title: "Word Factory", description: "Cantum bahagian perkataan.", skill: "Bina Kata" }
  ]
};