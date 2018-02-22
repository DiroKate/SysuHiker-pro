const FIFTY_YIN = [
  /**
   * 清音
   * a  行：0 - 4
   * ka 行：5 - 9
   * sa 行：10 - 14
   * ta 行：15 - 19
   * na 行：20 - 24
   * ha 行：25 - 29
   * ma 行：30 - 34
   * ya 行：35 - 37
   * ra 行：38 - 42
   * wa 行：43 - 44
   * n  行：45
   *
   */
  {
    hiragana: 'あ', katakana: 'ア', roomaji: 'a',
  }, {
    hiragana: 'い', katakana: 'イ', roomaji: 'i',
  }, {
    hiragana: 'う', katakana: 'ウ', roomaji: 'u',
  }, {
    hiragana: 'え', katakana: 'エ', roomaji: 'e',
  }, {
    hiragana: 'お', katakana: 'オ', roomaji: 'o',
  }, {
    hiragana: 'か', katakana: 'カ', roomaji: 'ka',
  }, {
    hiragana: 'き', katakana: 'キ', roomaji: 'ki',
  }, {
    hiragana: 'く', katakana: 'ク', roomaji: 'ku',
  }, {
    hiragana: 'け', katakana: 'ケ', roomaji: 'ke',
  }, {
    hiragana: 'こ', katakana: 'コ', roomaji: 'ko',
  }, {
    hiragana: 'さ', katakana: 'サ', roomaji: 'sa',
  }, {
    hiragana: 'し', katakana: 'シ', roomaji: 'shi',
  }, {
    hiragana: 'す', katakana: 'ス', roomaji: 'su',
  }, {
    hiragana: 'せ', katakana: 'セ', roomaji: 'se',
  }, {
    hiragana: 'そ', katakana: 'ソ', roomaji: 'so',
  }, {
    hiragana: 'た', katakana: 'タ', roomaji: 'ta',
  }, {
    hiragana: 'ち', katakana: 'チ', roomaji: 'chi',
  }, {
    hiragana: 'つ', katakana: 'ツ', roomaji: 'tsu',
  }, {
    hiragana: 'て', katakana: 'テ', roomaji: 'te',
  }, {
    hiragana: 'と', katakana: 'ト', roomaji: 'to',
  }, {
    hiragana: 'な', katakana: 'ナ', roomaji: 'na',
  }, {
    hiragana: 'に', katakana: 'ニ', roomaji: 'ni',
  }, {
    hiragana: 'ぬ', katakana: 'ヌ', roomaji: 'nu',
  }, {
    hiragana: 'ね', katakana: 'ネ', roomaji: 'ne',
  }, {
    hiragana: 'の', katakana: 'ノ', roomaji: 'no',
  }, {
    hiragana: 'は', katakana: 'ハ', roomaji: 'ha',
  }, {
    hiragana: 'ひ', katakana: 'ヒ', roomaji: 'hi',
  }, {
    hiragana: 'ふ', katakana: 'フ', roomaji: 'fu',
  }, {
    hiragana: 'へ', katakana: 'ヘ', roomaji: 'he',
  }, {
    hiragana: 'ほ', katakana: 'ホ', roomaji: 'ho',
  }, {
    hiragana: 'ま', katakana: 'マ', roomaji: 'ma',
  }, {
    hiragana: 'み', katakana: 'ミ', roomaji: 'mi',
  }, {
    hiragana: 'む', katakana: 'ム', roomaji: 'mu',
  }, {
    hiragana: 'め', katakana: 'メ', roomaji: 'me',
  }, {
    hiragana: 'も', katakana: 'モ', roomaji: 'mo',
  }, {
    hiragana: 'や', katakana: 'ヤ', roomaji: 'ya',
  }, {
    hiragana: 'ゆ', katakana: 'ユ', roomaji: 'yu',
  }, {
    hiragana: 'よ', katakana: 'ヨ', roomaji: 'yo',
  }, {
    hiragana: 'ら', katakana: 'ラ', roomaji: 'ra',
  }, {
    hiragana: 'り', katakana: 'リ', roomaji: 'ri',
  }, {
    hiragana: 'る', katakana: 'ル', roomaji: 'ru',
  }, {
    hiragana: 'れ', katakana: 'レ', roomaji: 're',
  }, {
    hiragana: 'ろ', katakana: 'ロ', roomaji: 'ro',
  }, {
    hiragana: 'わ', katakana: 'ワ', roomaji: 'wa',
  }, {
    hiragana: 'を', katakana: 'ヲ', roomaji: 'wo',
  }, {
    hiragana: 'ん', katakana: 'ン', roomaji: 'n',
  },

  /**
   * 浊音
   * ga 行：46 - 50
   * za 行：51 - 55
   * da 行：56 - 60
   * ba 行：61 - 65
   */
  {
    hiragana: 'が', katakana: 'ガ', roomaji: 'ga',
  }, {
    hiragana: 'ぎ', katakana: 'ギ', roomaji: 'gi',
  }, {
    hiragana: 'ぐ', katakana: 'グ', roomaji: 'gu',
  }, {
    hiragana: 'げ', katakana: 'ゲ', roomaji: 'ge',
  }, {
    hiragana: 'ご', katakana: 'ゴ', roomaji: 'go',
  }, {
    hiragana: 'ざ', katakana: 'ザ', roomaji: 'za',
  }, {
    hiragana: 'じ', katakana: 'ジ', roomaji: 'ji',
  }, {
    hiragana: 'ず', katakana: 'ズ', roomaji: 'zu',
  }, {
    hiragana: 'ぜ', katakana: 'ゼ', roomaji: 'ze',
  }, {
    hiragana: 'ぞ', katakana: 'ゾ', roomaji: 'zo',
  }, {
    hiragana: 'だ', katakana: 'ダ', roomaji: 'da',
  }, {
    hiragana: 'ぢ', katakana: 'ヂ', roomaji: 'ji',
  }, {
    hiragana: 'づ', katakana: 'ヅ', roomaji: 'zu',
  }, {
    hiragana: 'で', katakana: 'デ', roomaji: 'de',
  }, {
    hiragana: 'ど', katakana: 'ド', roomaji: 'do',
  }, {
    hiragana: 'ば', katakana: 'バ', roomaji: 'ba',
  }, {
    hiragana: 'び', katakana: 'ビ', roomaji: 'bi',
  }, {
    hiragana: 'ぶ', katakana: 'ブ', roomaji: 'bu',
  }, {
    hiragana: 'べ', katakana: 'ベ', roomaji: 'be',
  }, {
    hiragana: 'ぼ', katakana: 'ボ', roomaji: 'bo',
  },

  /**
   * 半浊音
   * pa 行：66 - 70
   */
  {
    hiragana: 'ぱ', katakana: 'パ', roomaji: 'pa',
  }, {
    hiragana: 'ぴ', katakana: 'ピ', roomaji: 'pi',
  }, {
    hiragana: 'ぷ', katakana: 'プ', roomaji: 'pu',
  }, {
    hiragana: 'ぺ', katakana: 'ペ', roomaji: 'pe',
  }, {
    hiragana: 'ぽ', katakana: 'ポ', roomaji: 'po',
  },

  /**
   * 拗音
   * kya : 71 - 73
   * sha : 74 - 76
   * cha : 77 - 79
   * nya : 80 - 82
   * hya : 83 - 85
   * mya : 86 - 88
   * rya : 89 - 91
   * gya : 92 - 94
   * ja  : 95 - 97
   * bya : 98 - 100
   * pya : 101 - 103
   */
  {
    hiragana: 'きゃ', katakana: 'キャ', roomaji: 'kya',
  }, {
    hiragana: 'きゅ', katakana: 'キュ', roomaji: 'kyu',
  }, {
    hiragana: 'きょ', katakana: 'キョ', roomaji: 'kyo',
  }, {
    hiragana: 'しゃ', katakana: 'シャ', roomaji: 'sha',
  }, {
    hiragana: 'しゅ', katakana: 'シュ', roomaji: 'shu',
  }, {
    hiragana: 'しょ', katakana: 'ショ', roomaji: 'sho',
  }, {
    hiragana: 'ちゃ', katakana: 'チャ', roomaji: 'cha',
  }, {
    hiragana: 'ちゅ', katakana: 'チュ', roomaji: 'chu',
  }, {
    hiragana: 'ちょ', katakana: 'チョ', roomaji: 'cho',
  }, {
    hiragana: 'にゃ', katakana: 'ニャ', roomaji: 'nya',
  }, {
    hiragana: 'にゅ', katakana: 'ニュ', roomaji: 'nyu',
  }, {
    hiragana: 'にょ', katakana: 'ニョ', roomaji: 'nyo',
  }, {
    hiragana: 'ひゃ', katakana: 'ヒャ', roomaji: 'hya',
  }, {
    hiragana: 'ひゅ', katakana: 'ヒュ', roomaji: 'hyu',
  }, {
    hiragana: 'ひょ', katakana: 'ヒョ', roomaji: 'hyo',
  }, {
    hiragana: 'みゃ', katakana: 'ミャ', roomaji: 'mya',
  }, {
    hiragana: 'みゅ', katakana: 'ミュ', roomaji: 'myu',
  }, {
    hiragana: 'みょ', katakana: 'ミョ', roomaji: 'myo',
  }, {
    hiragana: 'りゃ', katakana: 'リャ', roomaji: 'rya',
  }, {
    hiragana: 'りゅ', katakana: 'リュ', roomaji: 'ryu',
  }, {
    hiragana: 'りょ', katakana: 'リョ', roomaji: 'ryo',
  }, {
    hiragana: 'ぎゃ', katakana: 'ギャ', roomaji: 'gya',
  }, {
    hiragana: 'ぎゅ', katakana: 'ギュ', roomaji: 'gyu',
  }, {
    hiragana: 'ぎょ', katakana: 'ギョ', roomaji: 'gyo',
  }, {
    hiragana: 'じゃ', katakana: 'ジャ', roomaji: 'ja',
  }, {
    hiragana: 'じゅ', katakana: 'ジュ', roomaji: 'ju',
  }, {
    hiragana: 'じょ', katakana: 'ジョ', roomaji: 'jo',
  }, {
    hiragana: 'びゃ', katakana: 'ビャ', roomaji: 'bya',
  }, {
    hiragana: 'びゅ', katakana: 'ビュ', roomaji: 'bya',
  }, {
    hiragana: 'びょ', katakana: 'ビョ', roomaji: 'byo',
  }, {
    hiragana: 'ぴゃ', katakana: 'ピャ', roomaji: 'pya',
  }, {
    hiragana: 'ぴゅ', katakana: 'ピュ', roomaji: 'pyu',
  }, {
    hiragana: 'ぴょ', katakana: 'ピョ', roomaji: 'pyo',
  },
];

const mapFIFTY = {
  あ: FIFTY_YIN[0],
  ア: FIFTY_YIN[0],
  a: FIFTY_YIN[0],
  い: FIFTY_YIN[1],
  イ: FIFTY_YIN[1],
  i: FIFTY_YIN[1],
  う: FIFTY_YIN[2],
  ウ: FIFTY_YIN[2],
  u: FIFTY_YIN[2],
  え: FIFTY_YIN[3],
  エ: FIFTY_YIN[3],
  e: FIFTY_YIN[3],
  お: FIFTY_YIN[4],
  オ: FIFTY_YIN[4],
  o: FIFTY_YIN[4],
  か: FIFTY_YIN[5],
  カ: FIFTY_YIN[5],
  ka: FIFTY_YIN[5],
  き: FIFTY_YIN[6],
  キ: FIFTY_YIN[6],
  ki: FIFTY_YIN[6],
  く: FIFTY_YIN[7],
  ク: FIFTY_YIN[7],
  ku: FIFTY_YIN[7],
  け: FIFTY_YIN[8],
  ケ: FIFTY_YIN[8],
  ke: FIFTY_YIN[8],
  こ: FIFTY_YIN[9],
  コ: FIFTY_YIN[9],
  ko: FIFTY_YIN[9],
  さ: FIFTY_YIN[10],
  サ: FIFTY_YIN[10],
  sa: FIFTY_YIN[10],
  し: FIFTY_YIN[11],
  シ: FIFTY_YIN[11],
  shi: FIFTY_YIN[11],
  す: FIFTY_YIN[12],
  ス: FIFTY_YIN[12],
  su: FIFTY_YIN[12],
  せ: FIFTY_YIN[13],
  セ: FIFTY_YIN[13],
  se: FIFTY_YIN[13],
  そ: FIFTY_YIN[14],
  ソ: FIFTY_YIN[14],
  so: FIFTY_YIN[14],
  た: FIFTY_YIN[15],
  タ: FIFTY_YIN[15],
  ta: FIFTY_YIN[15],
  ち: FIFTY_YIN[16],
  チ: FIFTY_YIN[16],
  chi: FIFTY_YIN[16],
  つ: FIFTY_YIN[17],
  ツ: FIFTY_YIN[17],
  tsu: FIFTY_YIN[17],
  て: FIFTY_YIN[18],
  テ: FIFTY_YIN[18],
  te: FIFTY_YIN[18],
  と: FIFTY_YIN[19],
  ト: FIFTY_YIN[19],
  to: FIFTY_YIN[19],
  な: FIFTY_YIN[20],
  ナ: FIFTY_YIN[20],
  na: FIFTY_YIN[20],
  に: FIFTY_YIN[21],
  ニ: FIFTY_YIN[21],
  ni: FIFTY_YIN[21],
  ぬ: FIFTY_YIN[22],
  ヌ: FIFTY_YIN[22],
  nu: FIFTY_YIN[22],
  ね: FIFTY_YIN[23],
  ネ: FIFTY_YIN[23],
  ne: FIFTY_YIN[23],
  の: FIFTY_YIN[24],
  ノ: FIFTY_YIN[24],
  no: FIFTY_YIN[24],
  は: FIFTY_YIN[25],
  ハ: FIFTY_YIN[25],
  ha: FIFTY_YIN[25],
  ひ: FIFTY_YIN[26],
  ヒ: FIFTY_YIN[26],
  hi: FIFTY_YIN[26],
  ふ: FIFTY_YIN[27],
  フ: FIFTY_YIN[27],
  fu: FIFTY_YIN[27],
  へ: FIFTY_YIN[28],
  ヘ: FIFTY_YIN[28],
  he: FIFTY_YIN[28],
  ほ: FIFTY_YIN[29],
  ホ: FIFTY_YIN[29],
  ho: FIFTY_YIN[29],
  ま: FIFTY_YIN[30],
  マ: FIFTY_YIN[30],
  ma: FIFTY_YIN[30],
  み: FIFTY_YIN[31],
  ミ: FIFTY_YIN[31],
  mi: FIFTY_YIN[31],
  む: FIFTY_YIN[32],
  ム: FIFTY_YIN[32],
  mu: FIFTY_YIN[32],
  め: FIFTY_YIN[33],
  メ: FIFTY_YIN[33],
  me: FIFTY_YIN[33],
  も: FIFTY_YIN[34],
  モ: FIFTY_YIN[34],
  mo: FIFTY_YIN[34],
  や: FIFTY_YIN[35],
  ヤ: FIFTY_YIN[35],
  ya: FIFTY_YIN[35],
  ゆ: FIFTY_YIN[36],
  ユ: FIFTY_YIN[36],
  yu: FIFTY_YIN[36],
  よ: FIFTY_YIN[37],
  ヨ: FIFTY_YIN[37],
  yo: FIFTY_YIN[37],
  ら: FIFTY_YIN[38],
  ラ: FIFTY_YIN[38],
  ra: FIFTY_YIN[38],
  り: FIFTY_YIN[39],
  リ: FIFTY_YIN[39],
  ri: FIFTY_YIN[39],
  る: FIFTY_YIN[40],
  ル: FIFTY_YIN[40],
  ru: FIFTY_YIN[40],
  れ: FIFTY_YIN[41],
  レ: FIFTY_YIN[41],
  re: FIFTY_YIN[41],
  ろ: FIFTY_YIN[42],
  ロ: FIFTY_YIN[42],
  ro: FIFTY_YIN[42],
  わ: FIFTY_YIN[43],
  ワ: FIFTY_YIN[43],
  wa: FIFTY_YIN[43],
  を: FIFTY_YIN[44],
  ヲ: FIFTY_YIN[44],
  wo: FIFTY_YIN[44],
  ん: FIFTY_YIN[45],
  ン: FIFTY_YIN[45],
  n: FIFTY_YIN[45],
  が: FIFTY_YIN[46],
  ガ: FIFTY_YIN[46],
  ga: FIFTY_YIN[46],
  ぎ: FIFTY_YIN[47],
  ギ: FIFTY_YIN[47],
  gi: FIFTY_YIN[47],
  ぐ: FIFTY_YIN[48],
  グ: FIFTY_YIN[48],
  gu: FIFTY_YIN[48],
  げ: FIFTY_YIN[49],
  ゲ: FIFTY_YIN[49],
  ge: FIFTY_YIN[49],
  ご: FIFTY_YIN[50],
  ゴ: FIFTY_YIN[50],
  go: FIFTY_YIN[50],
  ざ: FIFTY_YIN[51],
  ザ: FIFTY_YIN[51],
  za: FIFTY_YIN[51],
  じ: FIFTY_YIN[52],
  ジ: FIFTY_YIN[52],
  ji: FIFTY_YIN[52],
  ず: FIFTY_YIN[53],
  ズ: FIFTY_YIN[53],
  zu: FIFTY_YIN[53],
  ぜ: FIFTY_YIN[54],
  ゼ: FIFTY_YIN[54],
  ze: FIFTY_YIN[54],
  ぞ: FIFTY_YIN[55],
  ゾ: FIFTY_YIN[55],
  zo: FIFTY_YIN[55],
  だ: FIFTY_YIN[56],
  ダ: FIFTY_YIN[56],
  da: FIFTY_YIN[56],
  ぢ: FIFTY_YIN[57],
  ヂ: FIFTY_YIN[57],
  ji: FIFTY_YIN[57],
  づ: FIFTY_YIN[58],
  ヅ: FIFTY_YIN[58],
  zu: FIFTY_YIN[58],
  で: FIFTY_YIN[59],
  デ: FIFTY_YIN[59],
  de: FIFTY_YIN[59],
  ど: FIFTY_YIN[60],
  ド: FIFTY_YIN[60],
  do: FIFTY_YIN[60],
  ば: FIFTY_YIN[61],
  バ: FIFTY_YIN[61],
  ba: FIFTY_YIN[61],
  び: FIFTY_YIN[62],
  ビ: FIFTY_YIN[62],
  bi: FIFTY_YIN[62],
  ぶ: FIFTY_YIN[63],
  ブ: FIFTY_YIN[63],
  bu: FIFTY_YIN[63],
  べ: FIFTY_YIN[64],
  ベ: FIFTY_YIN[64],
  be: FIFTY_YIN[64],
  ぼ: FIFTY_YIN[65],
  ボ: FIFTY_YIN[65],
  bo: FIFTY_YIN[65],
  ぱ: FIFTY_YIN[66],
  パ: FIFTY_YIN[66],
  pa: FIFTY_YIN[66],
  ぴ: FIFTY_YIN[67],
  ピ: FIFTY_YIN[67],
  pi: FIFTY_YIN[67],
  ぷ: FIFTY_YIN[68],
  プ: FIFTY_YIN[68],
  pu: FIFTY_YIN[68],
  ぺ: FIFTY_YIN[69],
  ペ: FIFTY_YIN[69],
  pe: FIFTY_YIN[69],
  ぽ: FIFTY_YIN[70],
  ポ: FIFTY_YIN[70],
  po: FIFTY_YIN[70],
  きゃ: FIFTY_YIN[71],
  キャ: FIFTY_YIN[71],
  kya: FIFTY_YIN[71],
  きゅ: FIFTY_YIN[72],
  キュ: FIFTY_YIN[72],
  kyu: FIFTY_YIN[72],
  きょ: FIFTY_YIN[73],
  キョ: FIFTY_YIN[73],
  kyo: FIFTY_YIN[73],
  しゃ: FIFTY_YIN[74],
  シャ: FIFTY_YIN[74],
  sha: FIFTY_YIN[74],
  しゅ: FIFTY_YIN[75],
  シュ: FIFTY_YIN[75],
  shu: FIFTY_YIN[75],
  しょ: FIFTY_YIN[76],
  ショ: FIFTY_YIN[76],
  sho: FIFTY_YIN[76],
  ちゃ: FIFTY_YIN[77],
  チャ: FIFTY_YIN[77],
  cha: FIFTY_YIN[77],
  ちゅ: FIFTY_YIN[78],
  チュ: FIFTY_YIN[78],
  chu: FIFTY_YIN[78],
  ちょ: FIFTY_YIN[79],
  チョ: FIFTY_YIN[79],
  cho: FIFTY_YIN[79],
  にゃ: FIFTY_YIN[80],
  ニャ: FIFTY_YIN[80],
  nya: FIFTY_YIN[80],
  にゅ: FIFTY_YIN[81],
  ニュ: FIFTY_YIN[81],
  nyu: FIFTY_YIN[81],
  にょ: FIFTY_YIN[82],
  ニョ: FIFTY_YIN[82],
  nyo: FIFTY_YIN[82],
  ひゃ: FIFTY_YIN[83],
  ヒャ: FIFTY_YIN[83],
  hya: FIFTY_YIN[83],
  ひゅ: FIFTY_YIN[84],
  ヒュ: FIFTY_YIN[84],
  hyu: FIFTY_YIN[84],
  ひょ: FIFTY_YIN[85],
  ヒョ: FIFTY_YIN[85],
  hyo: FIFTY_YIN[85],
  みゃ: FIFTY_YIN[86],
  ミャ: FIFTY_YIN[86],
  mya: FIFTY_YIN[86],
  みゅ: FIFTY_YIN[87],
  ミュ: FIFTY_YIN[87],
  myu: FIFTY_YIN[87],
  みょ: FIFTY_YIN[88],
  ミョ: FIFTY_YIN[88],
  myo: FIFTY_YIN[88],
  りゃ: FIFTY_YIN[89],
  リャ: FIFTY_YIN[89],
  rya: FIFTY_YIN[89],
  りゅ: FIFTY_YIN[90],
  リュ: FIFTY_YIN[90],
  ryu: FIFTY_YIN[90],
  りょ: FIFTY_YIN[91],
  リョ: FIFTY_YIN[91],
  ryo: FIFTY_YIN[91],
  ぎゃ: FIFTY_YIN[92],
  ギャ: FIFTY_YIN[92],
  gya: FIFTY_YIN[92],
  ぎゅ: FIFTY_YIN[93],
  ギュ: FIFTY_YIN[93],
  gyu: FIFTY_YIN[93],
  ぎょ: FIFTY_YIN[94],
  ギョ: FIFTY_YIN[94],
  gyo: FIFTY_YIN[94],
  じゃ: FIFTY_YIN[95],
  ジャ: FIFTY_YIN[95],
  ja: FIFTY_YIN[95],
  じゅ: FIFTY_YIN[96],
  ジュ: FIFTY_YIN[96],
  ju: FIFTY_YIN[96],
  じょ: FIFTY_YIN[97],
  ジョ: FIFTY_YIN[97],
  jo: FIFTY_YIN[97],
  びゃ: FIFTY_YIN[98],
  ビャ: FIFTY_YIN[98],
  bya: FIFTY_YIN[98],
  びゅ: FIFTY_YIN[99],
  ビュ: FIFTY_YIN[99],
  bya: FIFTY_YIN[99],
  びょ: FIFTY_YIN[100],
  ビョ: FIFTY_YIN[100],
  byo: FIFTY_YIN[100],
  ぴゃ: FIFTY_YIN[101],
  ピャ: FIFTY_YIN[101],
  pya: FIFTY_YIN[101],
  ぴゅ: FIFTY_YIN[102],
  ピュ: FIFTY_YIN[102],
  pyu: FIFTY_YIN[102],
  ぴょ: FIFTY_YIN[103],
  ピョ: FIFTY_YIN[103],
  pyo: FIFTY_YIN[103],
};

module.exports = {
  FIFTY_YIN,
  mapFIFTY,
};
