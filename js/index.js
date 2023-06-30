import { randomChar } from "./chinese_char.js";
import { create } from "./create.js";
import { translate } from "./translate.js";
import { randomGet } from "./jp_name.js";
import { convert } from "./zyotai2keitai.js";


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

const output = create("p", {
  id: "output",
  style: `
        border:1px solid lightgray;
        padding:8px 16px;
    `,
});
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
    const nameSuffixList = [""+"氏","さん","様","殿","君"];
    translated = translated.replace(/\s+/, "");
    translated = translated.replace(/[,，.．?!]/, (_,g1)=>({",":"、","，":"、",".":"。","．":"。","?":"？","!":"！"}[g1]));
    translated = translated.replace(/(です|ます)、/, (_,g1)=>g1+"。");
    translated = translated.replaceAll(/[a-zA-Z\s]+(氏|さん|様|殿|君)?/g, a=>randomGet()+nameSuffixList[Math.floor(Math.random()*nameSuffixList.length)]);
    translated = convert(translated);
    output.textContent = translated;
    //音声読み上げ
    speechSynthesis.cancel();
    speechSynthesis.speak(new SpeechSynthesisUtterance(translated));
  },
}))