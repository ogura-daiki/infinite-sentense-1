import { randomChar } from "./chinese_char.js";
import { create } from "./create.js";
import { translate } from "./translate.js";
import { convert } from "./zyotai2keitai.js";
import { kuromojiTokenizer } from "./kurimoji.js";
import { replaceName } from "./name_replacer.js";


speechSynthesis.cancel();


const genRandomString = (length) => {
  let result = "";
  for (let i = 0; i < length - 1; i++) {
    if (i < 5) {
      result += randomChar();
      continue;
    }
    const signRand = Math.random();
    if (signRand < 0.02) {
      result += "。";
      continue;
    }
    else if (signRand < 0.05) {
      result += "，";
      continue;
    }
    result += randomChar();
  }
  result = result.replaceAll(
    /[。，]*([。，])/g,
    (all, last) => {
      const randoms = [...Array(all.length - 1)].map(randomChar);
      return randoms.join("") + last;
    }
  );
  result += "。";
  return result;
}

const append = (...e) => document.body.append(...e);

const normalizeSign = (input) => input.replace(/[,，、\.．。\?？!！]+/g, (_) => ({
  ",": "、",
  "，": "、",
  "、": "、",
  ".": "。",
  "．": "。",
  "。": "。",
  "?": "？",
  "？": "？",
  "!": "！",
  "！": "！",
}[_[0]] ?? "。"));

const keitaiList = ["です","ます","でした","ました","でしょう","ありません","ください"];

const output = create("p", {
  id: "output",
  style: `
        border:1px solid lightgray;
        padding:8px 16px;
    `,
});

const zenkakuNumOffset = "０".charCodeAt() - "0".charCodeAt();
const zenkakuNum2Hankaku = c => String.fromCharCode(c.charCodeAt() - zenkakuNumOffset);
append(output);
append(create("button", {
  style: `
        border:1px solid lightgray;
        padding:8px 16px;
    `,
  textContent: "生成",
  "@click": async (e) => {
    const randomString = genRandomString(500);
    let translated = await translate(randomString);
    console.log(translated);
    translated = translated.replaceAll(/\s{2,}/g, " ");
    translated = translated.replace(/[０-９]/g, zenkakuNum2Hankaku);
    translated = translated.replace(/\s*([\da-zA-Z]+)\s*/g, (_,g1)=>g1);
    translated = normalizeSign(translated);
    translated = replaceName(translated);
    translated = convert(translated);
    translated = translated.replace(/[」』]/g, a => "。" + a);
    translated = translated.replace(new RegExp(`(${keitaiList.join("|")})、`,"g"), (_, g1) => g1 + "。");
    translated = translated.replace(new RegExp(`(${keitaiList.join("|")})([「『])`,"g"), (_, g1, g2) => g1 + "。" + g2);
    
    translated = translated.replace(/\s+/g, "。");
    translated = normalizeSign(translated);
    
    output.textContent = translated;

    //音声読み上げ
    speechSynthesis.cancel();
    speechSynthesis.speak(new SpeechSynthesisUtterance(translated));
  },
}));
