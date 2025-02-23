import { replaceName } from "../NameReplacer.js";
import { convert } from "../ZyotaiKeitaiConverter.js";
import { SentenceNormalizer } from "./interface/SentenceNormalizer.js";

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

const keitaiList = ["です", "ます", "でした", "ました", "でしょう", "ません", "ください"];

const zenkakuNumOffset = "０".charCodeAt() - "0".charCodeAt();
const zenkakuNum2Hankaku = c => String.fromCharCode(c.charCodeAt() - zenkakuNumOffset);

class MainNormalizer extends SentenceNormalizer {
  normalize(text) {

    text = text.replaceAll(/\s{2,}/g, " ");
    text = text.replace(/[０-９]/g, zenkakuNum2Hankaku);
    text = text.replace(/\s*([\da-zA-Z]+)\s*/g, (_, g1) => g1);
    text = normalizeSign(text);
    text = replaceName(text);
    text = convert(text);
    text = text.replace(/[」』]/g, a => "。" + a);
    text = text.replace(new RegExp(`(${keitaiList.join("|")})、`, "g"), (_, g1) => g1 + "。");
    text = text.replace(new RegExp(`(${keitaiList.join("|")})([「『])`, "g"), (_, g1, g2) => g1 + "。" + g2);

    text = text.replace(/\s+/g, "。");
    text = normalizeSign(text);

    return text;
  }
}

export { MainNormalizer };