const arrayRandomPick = (arr) => arr[Math.floor(Math.random() * arr.length)];

const withY = c => [..."ャィュェョ"].map(v => c + v);
const withH = c => ["ャ", "", "ュ", "ェ", "ョ"].map(v => c + v);

const syllableMap = {
  "": [20, [..."アイウエオ"]],
  "k": [30, [..."カキクケコ"]], "ky": [2, withY("キ")], "q": [2, ["クァ", "クィ", "ク", "クェ", "クォ"]],
  "g": [6, [..."ガギグゲゴ"]], "gy": [1, withY("ギ")],
  "s": [30, [..."サシスセソ"]], "sy": [2, withY("シ")], "sh": [2, withH("シ")],
  "z": [6, [..."ザジズゼゾ"]], "zy": [1, withY("ジ")], "j": [1, withH("ジ")],
  "t": [30, [..."タチツテト"]],
  "ty": [2, withY("チ")], "ch": [2, withH("チ")],
  "ts": [2, ["ツァ", "ツィ", "ツ", "ツェ", "ツォ"]],
  "th": [2, withY("テ")],
  "tw": [1, ["トァ", "トィ", "トゥ", "トェ", "トォ"]],
  "d": [6, [..."ダヂヅデド"]], "dy": [1, withY("ヂ")], "dh": [1, withY("デ")],
  "n": [20, [..."ナニヌネノ"]], "ny": [2, withY("ニ")],
  "h": [25, [..."ハヒフヘホ"]], "hy": [2, withY("ヒ")],
  "f": [2, ["ファ", "フィ", "フ", "フェ", "フォ"]], "fy": [2, withY("フ")],
  "b": [6, [..."バビブベボ"]], "by": [1, withY("ビ")],
  "v": [1, ["ヴァ", "ヴィ", "ヴ", "ヴェ", "ヴォ"]], "vy": [1, withY("ヴ")],
  "p": [3, [..."パピプペポ"]], "py": [1, withY("ピ")],
  "m": [20, [..."マミムメモ"]], "my": [2, withY("ミ")],
  "y": [2, ["ヤ", "イ", "ユ", "イェ", "ヨ"]],
  "r": [20, [..."ラリルレロ"]],
  "w": [2, ["ワ", "ウィ", "ウ", "ウェ", "ヲ"]],
};
const total = Object.values(syllableMap).reduce((c,[num])=>c+num,0);
const getRandomKana = () => {
  let rand = Math.floor(Math.random()*total);
  for(const [num, list] of Object.values(syllableMap)){
    if(rand < num) return arrayRandomPick(list);
    rand -= num;
  }
}


const getRandomKanaPart = (length) => {
  const result = [getRandomKana()];
  for (let i = 1; i < length; i++) {
    const specialRand = Math.random();
    const before = result[i - 1];
    if (specialRand < 0.05 && before !== "ッ") {
      result.push("ッ");
    }
    else if (specialRand < 0.1 && !["ンー"].includes(before)) {
      result.push("ー");
    }
    else if (specialRand < 0.15 && !["ッンー"].includes(before)) {
      result.push("ン");
    }
    else {
      result.push(getRandomKana());
    }
  }
  return result.join("");
}


export { getRandomKana, getRandomKanaPart };