const arrayRandomPick = (arr) => arr[Math.floor(Math.random() * arr.length)];

const withY = c => [..."ャィュェョ"].map(v=>c+v);
const withH = c => ["ャ","","ュ","ェ","ョ"].map(v=>c+v);

const syllableMap = {
  "":[..."アイウエオ"],
  "k":[..."カキクケコ"],"ky":withY("キ"),"q":["クァ","クィ","ク","クェ","クォ"],
  "g":[..."ガギグゲゴ"],"gy":withY("ギ"),
  "s":[..."サシスセソ"],"sy":withY("シ"),"sh":withH("シ"),
  "z":[..."ザジズゼゾ"],"zy":withY("ジ"),"j":withH("ジ"),
  "t":[..."タチツテト"],
  "ty":withY("チ"),"ch":withH("チ"),
  "ts":["ツァ","ツィ","ツ","ツェ","ツォ"],
  "th":withY("テ"),
  "tw":["トァ","トィ","トゥ","トェ","トォ"],
  "d":[..."ダヂヅデド"],"dy":withY("ヂ"),"dh":withY("デ"),
  "n":[..."ナニヌネノ"],"ny":withY("ニ"),
  "h":[..."ハヒフヘホ"],"hy":withY("ヒ"),
  "f":["ファ","フィ","フ","フェ","フォ"],"fy":withY("フ"),
  "b":[..."バビブベボ"],"by":withY("ビ"),
  "v":["ヴァ","ヴィ","ヴ","ヴェ","ヴォ"],"vy":withY("ヴ"),
  "p":[..."パピプペポ"],"py":withY("ピ"),
  "m":[..."マミムメモ"],"my":withY("ミ"),
  "y":["ヤ","イ","ユ","イェ","ヨ"],
  "r":[..."ラリルレロ"],
  "w":["ワ","ウィ","ウ","ウェ","ヲ"],
  "l":[..."ァィゥェォ"],
};
const getRandomKana = ()=>arrayRandomPick(arrayRandomPick(Object.values(syllableMap)));

export {getRandomKana};