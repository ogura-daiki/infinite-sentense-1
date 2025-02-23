import { randomChar } from "../chineseChar.js";
import { translate } from "../translate.js";
import { SentenceGenerator } from "./interface/SentenceGenerator.js";



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
  result += "。";
  result = result.replaceAll(
    /[。，]*([。，])/g,
    (all, last) => {
      const randoms = [...Array(all.length - 1)].map(randomChar);
      return randoms.join("") + last;
    }
  );
  return result;
}

class RandomGenerator extends SentenceGenerator {
  length = 500;
  async generate() {
    const baseText = genRandomString(this.length);
    return await translate(baseText);
  }
}

export { RandomGenerator };