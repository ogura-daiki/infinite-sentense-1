import { create } from "./create.js";
let docBase;
if(window.document){
  docBase = create("base", {href:"https://"});
  document.head.append(docBase);
}
else{
  docBase = {remove(){}};
}

const buildKuromoji = () => new Promise(r => {
  kuromoji.builder({ dicPath: "https://cdn.jsdelivr.net/npm/kuromoji@0.1.2/dict/" }).build(function (err, tokenizer) {
    r(tokenizer);
  })
});
const kuromojiTokenizer = await buildKuromoji();

docBase.remove();

export {kuromojiTokenizer};