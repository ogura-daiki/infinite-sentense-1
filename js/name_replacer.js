
import { randomGet } from "./jp_name.js";
import { kuromojiTokenizer } from "./kurimoji.js";
import { getAreaName, getCountryName } from "./place_name.js";

const isHumanName = token => {
  if(token.pos !== "名詞" || token.pos_detail_1 === "数"){
    return false;
  }
  if(token.surface_form.length === 0) return true;
  if(token.pos_detail_2 === "人名") return true;
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

const isPlaceName = t => t.pos === "名詞" && t.pos_detail_2 === "地域";

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
      resultText += randomGet();
      i-=1;
      continue;
    }
    //--------------------------
    //地名を置換
    //--------------------------
    if(isPlaceName(tokens[i])){
      if(tokens[i].pos_detail_3 === "国"){
        resultText+=getCountryName(tokens.word_id);
      }
      else {
        resultText+=getAreaName(tokens.word_id);
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