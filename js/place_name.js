import { getRandomKana } from "./get_random_kana.js";

const randArr = (arr) => arr[Math.floor(Math.random() * arr.length)];

const randomLength = (min, max) => {
  const baseRand = Math.random();
  let value = Math.sin(Math.random() * Math.PI) / 2;
  if (baseRand > 0.5) {
    value = 1 - value;
  }
  return Math.floor((max - min - 1) * value) + min;
}


const getRandomPart = (length) => {
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
  console.log(length, result);
  return result.join("");
}

const join = (str, vals) => str.reduce((c, v, i) => c + vals[i-1] + v);
const p = (str, ...vals) => {
  return () => join(str, vals.map((input) => {
    if (typeof input[Symbol.iterator] !== "function") {
      return "";
    }
    input = [...input];
    if (input.length === 2 && input.every(v => typeof v === "number")) {
      const result = getRandomPart(randomLength(...input));
      console.log(input, result);
      return result;
    }
    return input[Math.floor(Math.random() * input.length)];
  }));
}

const countryNameSuffix = () => {
  const head = ["", "王", "帝", "公", "皇", "神", "侯"];
  const foot = ["国", "国領", "諸島", "島", "大陸"];
  return randArr(head) + randArr(foot);
}
const groupStateSuffix = () => {
  const rand = Math.random();
  if (rand < 0.1) {
    return randArr(["組合", "同盟", "寄合"]);
  }
  else if (rand < 0.3) {
    return "";
  }
  else {
    const main = randArr(["独立", "連邦", "連合", "連合", "共和", "自治"]);
    return main + (Math.random() < 0.2 ? "国" : "") + (Math.random() < 0.2 ? "領" : "");
  }
}
const govNameSuffix = () => {
  return randArr(["", "議会", "評議会", "神殿", "王朝", "朝", "府", "政府", "政権"]);
}

const suffixPatterns = [
  [0.6, countryNameSuffix],
  [0.25, groupStateSuffix],
  [0.15, govNameSuffix],
];
const getSuffix = () => {
  let patternRand = Math.random();
  for (const [num, pattern] of suffixPatterns) {
    if (patternRand < num) return pattern();
    patternRand -= num;
  }
}

const countryPatterns = [
  [0.7, p`${[2, 7]}`],
  [0.2, p`${[2, 5]}・${[2, 7]}`],
  [0.1, p`${[2, 5]}及び${[3, 7]}`],
];
const getCountryPattern = () => {
  let patternRand = Math.random();
  for (const [num, pattern] of countryPatterns) {
    if (patternRand < num){
      return pattern();
    }
    patternRand -= num;
  }
}

const countryCache = new Map();
const getCountryName = key => {
  if (countryCache.has(key)) {
    return countryCache.get(key);
  }
  console.log(getCountryPattern());
  const result = getCountryPattern() + getSuffix();
  countryCache.set(key, result);
  return result;
}

export { getCountryName };