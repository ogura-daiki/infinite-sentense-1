import { getRandomKana, getRandomKanaPart } from "./get_random_kana.js";
import { randArr, randomLength } from "./util.js";





const join = (str, vals) => str.reduce((c, v, i) => c + vals[i - 1] + v);
const p = (str, ...vals) => {
  return () => join(str, vals.map((input) => {
    if (typeof input[Symbol.iterator] !== "function") {
      return "";
    }
    input = [...input];
    if (input.length === 2 && input.every(v => typeof v === "number")) {
      const result = getRandomKanaPart(randomLength(...input));
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

const countrySuffixPatterns = [
  [0.6, countryNameSuffix],
  [0.25, groupStateSuffix],
  [0.15, govNameSuffix],
];
const getCountrySuffix = () => {
  let patternRand = Math.random();
  for (const [num, pattern] of countrySuffixPatterns) {
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
    if (patternRand < num) {
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
  const result = getCountryPattern() + getCountrySuffix();
  countryCache.set(key, result);
  return result;
}

const getAreaSuffix = () => randArr(["領", "市", "町", "村", "州", "区", "神殿", "寺院", "森", "鉱山", "山", "川", "橋", "盆地", "火山", "隔離区域", "保護地域", "区域", "地区", "地域", "地方",]);

const areaCache = new Map();
const getAreaName = key => {
  if (areaCache.has(key)) {
    return areaCache.get(key);
  }
  let suffix = "";
  if(Math.random() < 0.7){
    suffix = getAreaSuffix();
  }
  const result = getRandomKanaPart(randomLength(3,8)) + suffix;
  areaCache.set(key, result);
  return result;
}

export { getCountryName, getAreaName };