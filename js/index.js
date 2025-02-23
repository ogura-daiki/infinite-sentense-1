import { create } from "./create.js";
import { kuromojiTokenizer } from "./kuromoji.js";
import { RandomGenerator } from "./generator/RandomGenerator.js";
import { MainNormalizer } from "./normalizer/MainNormalizer.js";


speechSynthesis.cancel();

const generator = new RandomGenerator();
const normalizer = new MainNormalizer();

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
    output.textContent = "生成中…";

    let translated = await generator.generate();
    console.log(translated);
    console.log(kuromojiTokenizer.tokenize(translated));
    translated = normalizer.normalize(translated);

    console.log(kuromojiTokenizer.tokenize(translated));

    output.textContent = translated;

    //音声読み上げ
    speechSynthesis.cancel();
    speechSynthesis.speak(new SpeechSynthesisUtterance(translated));
  },
}));
append(create("button", {
  textContent: "停止",
  style: `
        border:1px solid lightgray;
        padding:8px 16px;
    `,
  "@click": () => {
    speechSynthesis.cancel();
  }
}));