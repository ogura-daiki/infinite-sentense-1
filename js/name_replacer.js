
import { getRandomKana, getRandomKanaPart } from "./get_random_kana.js";
import { randomGet } from "./jp_name.js";
import { kanaHumanName } from "./kana_human_name.js";
import { kuromojiTokenizer } from "./kuromoji.js";
import { getAreaName, getCountryName } from "./place_name.js";
import { randomLength } from "./util.js";

const isHumanName = token => {
  if(token.pos !== "名詞" || token.pos_detail_1 === "数"){
    return false;
  }
  if(token.surface_form.length === 0) return true;
  if(token.pos_detail_2 === "人名" && token.pos_detail_1 !== "接尾") return true;
  if(token.word_type==="UNKNOWN"){
    if(/^[a-zA-Z]+$/.test(token.surface_form)){
      return true;
    }
    else if(token.surface_form.includes("・")){
      return true;
    }
  }
  return false;
}

const isPlaceName = t => t.pos === "名詞" && t.pos_detail_2 === "地域" && t.pos_detail_1 === "固有名詞";


const humanNameCache = new Map();
const getRandomHumanName = (key) => {
  if(key.includes("・")){
    return key.split("・").map(v=>getRandomHumanName(v)).join("・");
  }
  if(humanNameCache.has(key)){
    return humanNameCache.get(key);
  }

  let result;
  if(Math.random()<0.3) result = randomGet();
  else result = kanaHumanName(randomLength(Math.round((2*1.5+key.length*0.5)/2), Math.round((7*1.5+key.length*0.5)/2)));
  humanNameCache.set(key, result);
  return result;
}

const replaceName = (input) => {
  const tokens = kuromojiTokenizer.tokenize(input);
  let resultText = "";
  const notHumanName = [];
  for(let i = 0;i < tokens.length;i++){
    //--------------------------
    //人名を置換
    //--------------------------
    const humanName = [];
    while(i < tokens.length && isHumanName(tokens[i])){
      humanName.push(tokens[i]);
      i++;
    }
    notHumanName.push(tokens[i]);
    if(humanName.length){
      const joined = humanName.reduce((c,v)=>c+v.surface_form,"");
      resultText += getRandomHumanName(joined);
      i-=1;
      continue;
    }
    //--------------------------
    //地名を置換
    //--------------------------
    if(isPlaceName(tokens[i])){
      if(tokens[i].pos_detail_3 === "国"){
        resultText+=getCountryName(tokens[i].surface_form);
      }
      else {
        resultText+=getAreaName(tokens[i].surface_form);
      }
      continue;
    }
    resultText+=tokens[i].surface_form;
  }

  const meishi = notHumanName.filter(v=>v.pos==="名詞" && v.pos_detail_2 === "地域");
  meishi.forEach(t => {
    delete t.pronunciation;
    delete t.reading;
    delete t.word_id;
    delete t.word_position;
  });
  console.log(meishi);


  return resultText;
}

export { replaceName }