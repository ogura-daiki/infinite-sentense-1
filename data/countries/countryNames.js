// 出典：https://www.jpo.go.jp/system/patent/pct/tetuzuki/document/kuni-meisho/kuni-meisho-ichiran.pdf?utm_source=chatgpt.com

const list = [
  "アイスランド", "アイルランド", "アゼルバイジャン", "アフガニスタン",
  "アメリカ", "アラブ", "アルジェリア", "アルゼンチン", "アルバニア",
  "アルメニア", "アンゴラ", "アンティグア・バーブーダ", "アンドラ", "イエメン",
  "イスラエル", "イタリア", "イラク", "イラン・イスラム", "インド",
  "インドネシア", "ウガンダ", "ウクライナ", "ウズベキスタン", "ウルグアイ",
  "エクアドル", "エジプト・アラブ", "エストニア", "エスワティニ", "エチオピア",
  "エリトリア", "エルサルバドル", "オーストラリア", "オーストリア", "オマーン",
  "オランダ", "ガーナ", "カーボヴェルデ", "ガイアナ", "カザフスタン",
  "カタール", "カナダ", "ガボン", "カメルーン", "ガンビア",
  "カンボジア", "マケドニア", "ギニアビサウ", "ギニア", "キプロス",
  "キューバ", "ギリシャ", "キリバス", "キルギス", "グアテマラ",
  "クウェート", "クック", "グレート・ブリテン", "アイルラン", "ド",
  "グレナダ", "クロアチア", "ケニア", "コートジボワール", "コスタリカ",
  "コモロ", "コロンビア", "コンゴ", "コンゴ", "サウジアラビア",
  "サモア", "サントメ・プリンシペ", "ザンビア", "サンマリノ", "シエラレオネ",
  "ジブチ", "ジャマイカ", "ジョージア", "シリア・アラブ", "シンガポール",
  "ジンバブエ", "スイス", "スウェーデン", "スーダン", "スペイン",
  "スリナム", "スリランカ", "スロバキア", "スロベニア", "セーシェル",
  "ギニア", "セネガル", "セルビア", "セントクリストファー・ネーヴィス", "セントビンセント",
  "グレナディーン", "セントルシア", "ソマリア", "ソロモン", "タイ",
  "タジキスタン", "タンザニア", "チェコ", "チャド", "アフリカ",
  "チュニジア", "チリ", "ツバル", "デンマーク", "ドイツ",
  "トーゴ", "ドミニカ", "ドミニカ", "トリニダード・トバゴ", "トルクメニスタン",
  "トルコ", "トンガ", "ナイジェリア", "ナウル", "ナミビア",
  "ニウエ", "ニカラグア", "ニジェール", "ニュージーランド", "ネパール",
  "ノルウェー", "バーレーン", "ハイチ", "パキスタン・イスラム", "バチカン",
  "パナマ", "バヌアツ", "バハマ", "パプアニューギニア", "パラオ",
  "パラグアイ", "バルバドス", "ハンガリー", "バングラデシュ", "ティモール",
  "フィジー", "フィリピン", "フィンランド", "ブータン", "ブラジル",
  "フランス", "ブルガリア", "ブルキナファソ", "ブルネイ・ダルサラーム", "ブルンジ",
  "ベトナム", "ベナン", "ベネズエラ・ボリバル", "ベラルーシ", "ベリーズ",
  "ペルー", "ベルギー", "ポーランド", "ボスニア・ヘルツェゴビナ", "ボツワナ",
  "ボリビア", "ポルトガル", "ホンジュラス", "マーシャル", "マダガスカル",
  "マラウイ", "マリ", "マルタ", "マレーシア", "ミクロネシア",
  "アフリカ", "スーダン", "ミャンマー", "メキシコ", "モーリシャス",
  "モーリタニア・イスラム", "モザンビーク", "モナコ", "モルディブ", "モルドバ",
  "モロッコ", "モンゴル", "モンテネグロ", "ヨルダン・ハシェミット", "ラオス",
  "ラトビア", "リトアニア", "リビア", "リヒテンシュタイン", "リベリア",
  "ルーマニア", "ルクセンブルク", "ルワンダ", "レソト", "レバノン",
  "ロシア",
];

export { list as countryNames };