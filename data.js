const makeParts = (word) => {
  if (word.includes(" ")) return word.split(" ");
  if (word.includes("-")) return word.split("-");
  const cut = Math.ceil(word.length / 2);
  return [word.slice(0, cut), word.slice(cut)];
};

const makeWords = (items, category, context) => items.map(([word, chinese]) => ({
  word,
  chinese,
  sentence: category === "Kata Kerja"
    ? `Murid menggunakan perkataan ${word} dalam situasi ${context}.`
    : category === "Kata Adjektif"
      ? `Keadaan itu digambarkan sebagai ${word}.`
      : `Perkataan ini ialah ${word}.`,
  clue: `Maksud dalam bahasa Cina: ${chinese}`,
  parts: makeParts(word)
}));

window.BM_GAME_DATA = {
  themes: [
    { id: 1, title: "Tema 1", subtitle: "Sekolah dan Pembelajaran", unitIds: [1,2,3,4,5,6], unlocked: true },
    { id: 2, title: "Tema 2", subtitle: "Komuniti dan Keselamatan Jalan Raya", unitIds: [7,8,9,10,11,12], unlocked: true },
    { id: 3, title: "Tema 3", subtitle: "Haiwan, Tumbuhan dan Alam Semula Jadi", unitIds: [13,14,15,16,17,18], unlocked: true }
  ],
  units: [
    { id:1, themeId:1, title:"Bab 1", subtitle:"Tempat di Sekolah", category:"Kata Nama", unlocked:true, words:makeWords([
      ["sekolah","学校"],["kelas","教室"],["pejabat","办公室"],["perpustakaan","图书馆"],["kantin","食堂"],["padang","草场"],["makmal sains","科学实验室"],["makmal komputer","电脑室"],["tandas","厕所"],["stor","储藏室"],["dewan","大礼堂"],["surau","祈祷室"],["kedai buku","书局／贩卖部"],["bilik guru","教师办公室"],["bilik darjah","课室"],["bilik kesihatan","保健室"],["bilik muzik","音乐室"],["bilik seni","美术室"],["pentas","舞台"],["pondok pengawal","保安亭"],["tempat letak kereta","停车场"],["laluan pejalan kaki","人行道／走廊"],["taman sains","科学园"],["kebun sekolah","学校菜园"],["pintu pagar","大铁门"]
    ],"Kata Nama","sekolah")},
    { id:2, themeId:1, title:"Bab 2", subtitle:"Benda dan Perabot di Dalam Kelas", category:"Kata Nama", unlocked:true, words:makeWords([
      ["meja","桌子"],["kerusi","椅子"],["papan tulis","黑板／白板"],["papan kenyataan","布告栏"],["meja guru","老师桌子"],["jam dinding","挂墙钟"],["bakul sampah","垃圾筐"],["penyapu","扫把"],["pencedok sampah","垃圾铲"],["pemadam papan tulis","板擦"],["kapur","粉笔"],["pen penanda","白板笔／记号笔"],["projektor","投影机"],["skrin","屏幕"],["langsir","窗帘"],["pintu","门"],["tingkap","窗户"],["rak buku","书架"],["kabinet","储物柜"],["peta","地图"],["jadual waktu","时间表"],["jadual bertugas","值日表"],["peraturan kelas","班规"],["alatan kebersihan","打扫工具"],["pembasmi kuman","消毒剂"]
    ],"Kata Nama","kelas")},
    { id:3, themeId:1, title:"Bab 3", subtitle:"Alat Tulis dan Bahan Pembelajaran", category:"Kata Nama", unlocked:true, words:makeWords([
      ["buku teks","课本"],["buku latihan","练习本"],["buku rujukan","参考书"],["kamus","字典"],["pensel","铅笔"],["pembaris","尺"],["pemadam","橡皮擦"],["pengasah pensel","卷笔刀"],["kotak pensel","笔盒"],["pen","钢笔／圆珠笔"],["pensel warna","彩色铅笔"],["krayon","蜡笔"],["gunting","剪刀"],["gam","胶水"],["kertas warna","彩色纸"],["fail","文件夹"],["jangka lukis","圆规"],["buku nota","笔记本"],["kad imbasan","闪卡／字卡"],["majalah","杂志"],["surat khabar","报纸"],["alat tulis","文具"],["gam pelekat","胶带／浆糊"],["kertas lukisan","画纸"],["papan selit","写字夹板"]
    ],"Kata Nama","pembelajaran")},
    { id:4, themeId:1, title:"Bab 4", subtitle:"Tindakan Pembelajaran Utama", category:"Kata Kerja", unlocked:true, words:makeWords([
      ["belajar","学习"],["membaca","阅读"],["menulis","书写"],["mengira","计算"],["melukis","绘画"],["mewarna","涂色"],["mendengar","聆听"],["memperhatikan","注意看／观察"],["memahami","明白／理解"],["menghafal","背诵／记忆"],["mengeja","拼写"],["menyalin","抄写"],["menjawab","回答"],["bertanya","提问"],["berbincang","讨论"],["membentangkan","呈堂／发表"],["mengulang kaji","复习"],["meminjam","借（书）"],["memulangkan","归还"],["menyemak","检查（功课）"],["menanda","批改／做记号"],["mengumpul","收集（作业）"],["mengagihkan","分发（书本）"],["menggunting","剪（纸）"],["menampal","粘贴"]
    ],"Kata Kerja","pembelajaran")},
    { id:5, themeId:1, title:"Bab 5", subtitle:"Aktiviti Sekolah dan Interaksi Sosial", category:"Kata Kerja", unlocked:true, words:makeWords([
      ["berhimpun","集会"],["berbaris","排队"],["bermain","玩耍"],["berbual","聊天"],["berkawan","交朋友"],["membantu","帮助"],["menghormati","尊重"],["mematuhi","遵守（规则）"],["mendengar arahan","听从指示"],["datang","来／到达"],["pulang","放学回家"],["masuk","进入"],["keluar","走出"],["duduk","坐下"],["berdiri","起立"],["mengangkat tangan","举手"],["memberi salam","问安／敬礼"],["mengucapkan terima kasih","说谢谢"],["menyertai","参加"],["memenangi","赢取／获胜"],["gagal","失败／不及格"],["berusaha","努力"],["bekerja sama","合作"],["menyapu kelas","打扫／扫课室"],["memadam papan tulis","擦黑板／白板"]
    ],"Kata Kerja","sekolah")},
    { id:6, themeId:1, title:"Bab 6", subtitle:"Persekitaran Sekolah dan Ciri Murid", category:"Kata Adjektif", unlocked:true, words:makeWords([
      ["bersih","干净的"],["kotor","肮脏的"],["kemas","整齐的"],["sepah","凌乱的"],["bising","吵闹的"],["senyap","安静的"],["sunyi","寂静的"],["luas","宽敞的"],["sempit","狭窄的"],["teratur","有条理的"],["rajin","勤劳的"],["malas","懒惰的"],["pandai","聪明的"],["bijak","明智的"],["cerdik","机灵的"],["pintar","睿智的"],["sopan","有礼貌的"],["patuh","听话的／顺从的"],["fokus","专心的／专注的"],["leka","分心的／不专注的"],["gembira","高兴的"],["seronok","开心的／有趣的"],["bosan","乏味的／无聊的"],["takut","害怕的"],["malu","害羞的"]
    ],"Kata Adjektif","sekolah")},
    { id:7, themeId:2, title:"Bab 1", subtitle:"Tempat dan Kemudahan Awam", category:"Kata Nama", unlocked:true, words:makeWords([
      ["taman","公园／住宅区"],["pasar","菜市场"],["pasar raya","超级市场"],["kedai","商店"],["bank","银行"],["balai polis","警察局"],["balai bomba","消防局"],["pejabat pos","邮政局"],["klinik","诊所"],["hospital","医院"],["stesen bas","巴士总站／巴士站"],["lapangan terbang","机场"],["stesen kereta api","火车站"],["taman permainan","游乐场"],["panggung wayang","电影院"],["restoran","餐厅"],["hotel","酒店"],["muzium","博物馆"],["zoo","动物园"],["perpustakaan awam","公共图书馆"],["pemberhentian bas","巴士候车站"],["pusat komuniti","社区中心"],["dewan orang ramai","民众大会堂"],["balai raya","社区／村民礼堂"],["stesen minyak","加油站"]
    ],"Kata Nama","komuniti")},
    { id:8, themeId:2, title:"Bab 2", subtitle:"Jalan Raya dan Kemudahan Lalu Lintas", category:"Kata Nama", unlocked:true, words:makeWords([
      ["jalan raya","马路"],["lintasan belang","斑马线"],["jejantas","行人天桥"],["lampu isyarat","红绿灯"],["papan tanda","路标／告示牌"],["pembahagi jalan","道路分界堤"],["lorong","小巷／车道"],["simpang","路口／岔路"],["bulatan","环岛／交通圈"],["lebuh raya","高速公路"],["tol","收费站／过路费"],["laluan pejalan kaki","人行道"],["longkang","沟渠"],["tiang lampu","灯柱"],["tong kitar semula","回收桶"],["hentian sebelah","休息站"],["kawasan perumahan","住宅区"],["stesen LRT","轻快铁站"],["jejambat","高架桥／高架公路"],["pagar jalan","马路护栏"],["petak parkir","停车位"],["rel kereta api","火车铁轨"],["papan iklan","广告牌"],["kamera AES","自动执法相机"],["bonggol jalan","减速带"]
    ],"Kata Nama","jalan raya")},
    { id:9, themeId:2, title:"Bab 3", subtitle:"Kenderaan dan Pengguna Jalan Raya", category:"Kata Nama", unlocked:true, words:makeWords([
      ["kenderaan","交通工具"],["kereta","汽车"],["motosikal","摩托车"],["basikal","自行车"],["bas","巴士"],["teksi","出租车／德士"],["lori","卡车／货车"],["kereta api","火车"],["kapal terbang","飞机"],["helikopter","直升机"],["kapal","轮船"],["feri","渡轮"],["sampan","小舟"],["bot","小艇"],["van","面包车／客货车"],["ambulans","救护车"],["kereta polis","警车"],["jentera bomba","消防车"],["pemandu","司机"],["penunggang","骑手"],["penumpang","乘客"],["pejalan kaki","行人"],["petugas","工作人员"],["pengawal","保安／警卫"],["jiran","邻居"]
    ],"Kata Nama","pengangkutan")},
    { id:10, themeId:2, title:"Bab 4", subtitle:"Aktiviti Komuniti dan Saling Membantu", category:"Kata Kerja", unlocked:true, words:makeWords([
      ["bergotong-royong","分工合作大扫除"],["bekerjasama","合作"],["membantu","帮助"],["menolong","协助"],["berkumpul","聚集"],["berbincang","讨论"],["merancang","计划"],["membersihkan","清理"],["mengutip sampah","捡垃圾"],["menanam pokok","种树"],["mengecat","刷漆"],["membaiki","修理"],["menderma","捐款／捐赠"],["melawat","探访／参观"],["menziarahi","拜访（邻居／亲友）"],["bertegur sapa","互相问候／打招呼"],["berbual-bual","聊天"],["beriadah","进行休闲活动"],["bersenam","做运动"],["berjoging","慢跑"],["membeli-belah","购物"],["menghadiri","出席（活动）"],["menjaga","照顾／看守"],["mengawasi","监督／留意"],["melaporkan","报告／举报"]
    ],"Kata Kerja","komuniti")},
    { id:11, themeId:2, title:"Bab 5", subtitle:"Pergerakan dan Perjalanan", category:"Kata Kerja", unlocked:true, words:makeWords([
      ["memandu","驾驶"],["menunggang","骑（摩托车／自行车）"],["menaiki","搭乘"],["melintas","穿过／横渡"],["berjalan kaki","步行"],["menyeberang","越过（马路／桥）"],["berhenti","停止"],["membelok","转弯"],["memotong","超车（交通）"],["meletakkan kenderaan","停车"],["menunggu","等候"],["berbaris","排队"],["menaiki bas","上巴士／搭巴士"],["turun dari bas","下巴士"],["membayar","付费"],["membeli tiket","买车票"],["memperlahankan","减速"],["mempercepatkan","加速"],["mematuhi","遵守（交通规则）"],["melanggar","撞击／违反"],["terperangkap","受困（堵车）"],["menghadapi kesesakan jalan raya","遇上交通堵塞"],["berwaspada","提高警惕"],["memakai tali pinggang keledar","系安全带"],["memakai topi keledar","戴安全帽"]
    ],"Kata Kerja","perjalanan")},
    { id:12, themeId:2, title:"Bab 6", subtitle:"Persekitaran Komuniti dan Keadaan Lalu Lintas", category:"Kata Adjektif", unlocked:true, words:makeWords([
      ["indah","优美的"],["ceria","充满生气的"],["bersih","干净的"],["kotor","肮脏的"],["aman","和平的"],["harmoni","和谐的"],["mesra","亲切的"],["akrab","亲密的"],["selamat","安全的"],["bahaya","危险的"],["sibuk","繁忙的"],["sesak","拥挤的"],["lancar","顺畅的"],["laju","快速的"],["pantas","迅速的"],["perlahan","缓慢的"],["bising","吵闹的"],["sunyi","宁静的"],["luas","宽阔的"],["sempit","狭窄的"],["prihatin","关心的"],["bertanggungjawab","有责任感的"],["cuai","粗心的／疏忽的"],["malang","不幸的"],["waspada","警惕的"]
    ],"Kata Adjektif","komuniti")},
    { id:13, themeId:3, title:"Bab 1", subtitle:"Haiwan dan Ciri-ciri Badan", category:"Kata Nama", unlocked:true, words:makeWords([
      ["haiwan","动物"],["binatang","动物"],["kucing","猫"],["anjing","狗"],["arnab","兔子"],["lembu","牛"],["kambing","羊"],["kuda","马"],["ayam","鸡"],["itik","鸭"],["burung","鸟"],["ikan","鱼"],["kura-kura","乌龟"],["gajah","大象"],["harimau","老虎"],["singa","狮子"],["monyet","猴子"],["ular","蛇"],["buaya","鳄鱼"],["bulu","毛／羽毛"],["ekor","尾巴"],["sayap","翅膀"],["tanduk","角"],["paruh","鸟嘴"],["gading","象牙"]
    ],"Kata Nama","haiwan")},
    { id:14, themeId:3, title:"Bab 2", subtitle:"Serangga, Habitat dan Alam Semula Jadi", category:"Kata Nama", unlocked:true, words:makeWords([
      ["serangga","昆虫"],["semut","蚂蚁"],["lebah","蜜蜂"],["rama-rama","蝴蝶"],["nyamuk","蚊子"],["lalat","苍蝇"],["sarang","鸟巢"],["sangkar","笼子"],["reban","鸡舍"],["kandang","畜栏"],["sungai","河流"],["laut","大海"],["pantai","海边"],["gunung","高山"],["bukit","山丘"],["hutan","森林"],["air terjun","瀑布"],["awan","云"],["langit","天空"],["batu","石头"],["tanah","土地"],["pasir","沙子"],["gua","山洞"],["pulau","岛屿"],["lembah","山谷"]
    ],"Kata Nama","alam semula jadi")},
    { id:15, themeId:3, title:"Bab 3", subtitle:"Tumbuhan dan Struktur Buah-buahan serta Sayur-sayuran", category:"Kata Nama", unlocked:true, words:makeWords([
      ["tumbuhan","植物"],["pokok","树"],["bunga","花"],["daun","叶子"],["batang pokok","树干"],["ranting","细树枝"],["dahan","树枝"],["akar","树根"],["pucuk","嫩芽"],["buah","水果"],["sayur","蔬菜"],["rumput","草"],["biji benih","种子"],["kulit buah","果皮"],["isi buah","果肉"],["duri","刺"],["lalang","茅草"],["cendawan","蘑菇"],["paku pakis","蕨类"],["pokok kelapa","椰子树"],["pokok pisang","香蕉树"],["pokok getah","橡胶树"],["padi","水稻"],["bunga raya","大红花"],["bunga mawar","玫瑰"]
    ],"Kata Nama","tumbuhan")},
    { id:16, themeId:3, title:"Bab 4", subtitle:"Pergerakan Haiwan dan Fenomena Kehidupan", category:"Kata Kerja", unlocked:true, words:makeWords([
      ["terbang","飞"],["berenang","游泳"],["berjalan","走"],["berlari","跑"],["melompat","跳"],["merangkak","爬"],["memanjat","攀爬"],["menggonggong","叼"],["mematuk","啄"],["menerkam","扑"],["memburu","捕猎"],["mengejar","追"],["menangkap","捕捉"],["menyorok","躲藏"],["menggigit","咬"],["menyengat","叮"],["menyalak","狗吠"],["mengiau","猫叫"],["bertelur","生蛋"],["menetas","孵化"],["bernafas","呼吸"],["membesar","长大"],["hidup","活着"],["mati","死亡"],["pupus","灭绝"]
    ],"Kata Kerja","haiwan")},
    { id:17, themeId:3, title:"Bab 5", subtitle:"Penanaman dan Tindakan Alam Sekitar", category:"Kata Kerja", unlocked:true, words:makeWords([
      ["menanam","种植"],["menyiram","浇水"],["membaja","施肥"],["mencabut rumput","拔草"],["memangkas dahan","修剪树枝"],["memetik bunga","采花"],["mengutip buah","拾水果"],["mengait buah","钩水果"],["menebang pokok","砍树"],["memotong","切／砍"],["mengorek tanah","挖土"],["menggembur tanah","翻土"],["melindungi","保护"],["memelihara","饲养／照顾"],["memulihara","保育"],["mencemarkan","污染"],["merosakkan","破坏"],["menjaga","照顾"],["menyelamatkan","拯救"],["mengalir","流动"],["bertiup","吹"],["gugur","掉落"],["layu","枯萎"],["tumbuh","生长"],["berbuah","结果"]
    ],"Kata Kerja","alam sekitar")},
    { id:18, themeId:3, title:"Bab 6", subtitle:"Ciri Haiwan dan Keadaan Alam", category:"Kata Adjektif", unlocked:true, words:makeWords([
      ["jinak","温驯"],["liar","野生"],["berbisa","有毒"],["beracun","有毒"],["pantas","敏捷"],["perlahan","缓慢"],["kuat","强壮"],["lemah","虚弱"],["subur","茂盛"],["layu","枯萎"],["segar","新鲜"],["indah","美丽"],["nyaman","舒适"],["sejuk","凉爽"],["panas","炎热"],["mendung","阴天"],["cerah","晴朗"],["lebat","茂密"],["deras","湍急"],["tenang","平静"],["luas","宽广"],["dalam","深"],["cetek","浅"],["tinggi","高"],["rendah","低"]
    ],"Kata Adjektif","alam semula jadi")}
  ],
  modes: [
    { id:"flash", title:"Flash Card", description:"Lihat perkataan dan maksudnya.", skill:"Kenal" },
    { id:"catch", title:"Word Catch", description:"Pilih perkataan sebelum masa tamat.", skill:"Pantas" },
    { id:"match", title:"Matching", description:"Padankan perkataan dengan maksud.", skill:"Padan" },
    { id:"typing", title:"Typing", description:"Taip ejaan yang betul.", skill:"Ejaan" },
    { id:"listening", title:"Listening", description:"Dengar sebutan dan pilih jawapan.", skill:"Dengar" },
    { id:"boss", title:"Boss Battle", description:"Jawab soalan untuk menewaskan boss.", skill:"Cabaran" },
    { id:"treasure", title:"Treasure Hunt", description:"Buka peti dengan jawapan tepat.", skill:"Ganjaran" },
    { id:"sentence", title:"Sentence Builder", description:"Lengkapkan ayat menggunakan perkataan sesuai.", skill:"Ayat" },
    { id:"detective", title:"Word Detective", description:"Cari perkataan berdasarkan petunjuk.", skill:"Faham" },
    { id:"factory", title:"Word Factory", description:"Cantum bahagian perkataan.", skill:"Bina Kata" }
  ]
};