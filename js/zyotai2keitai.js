import { kuromojiTokenizer } from "./kurimoji.js";

/**
 * 
 * @param {object} ctx 
 * @param {string} basic_form 
 * @param {string} to 
 * @returns 
 */
const doushiBasicEditor = (ctx, basic_form, to) => {
  const katuyou = ctx.value[to];
  if(katuyou == null) throw new Error();
  const hiraganaCount = /[\u3040-\u309F]*$/.exec(basic_form)[0].length;
  const headerLength = basic_form.length - Math.min(hiraganaCount, ctx.value["basic"].length);
  const head = basic_form.substring(0,headerLength);
  return head+katuyou.slice(basic_form.length >= katuyou.length?0:head.length);
}

const katuyou = {
  doushi: {
    patterns: [
      {
        cond: (ct) => ct === "五段・ラ行特殊",
        "value": {
          "mizen_not": "ら",
          "mizen_prompt": "ら",
          "rennyou_now": "い",
          "rennyou_done": "っ",
          "basic": "る",
          "rentai": "る",
          "katei": "れ",
          "meirei": "れ",
        },
        editor(basic_form, to){
          return doushiBasicEditor(this, basic_form, to);
        }
      },
      {
        cond: (ct) => ct.startsWith("五段・カ行"),
        "value": {
          "mizen_not": "か",
          "mizen_prompt": "こ",
          "rennyou_now": "き",
          "rennyou_done": "い",
          "basic": "く",
          "rentai": "く",
          "katei": "け",
          "meirei": "け"
        },
        editor(basic_form, to){
          return doushiBasicEditor(this, basic_form, to);
        }
      },
      {
        cond: (ct) => ct.startsWith("五段・ガ行"),
        "value": {
          "mizen_not": "が",
          "mizen_prompt": "ご",
          "rennyou_now": "ぎ",
          "rennyou_done": "い",
          "basic": "ぐ",
          "rentai": "ぐ",
          "katei": "げ",
          "meirei": "げ"
        },
        editor(basic_form, to){
          return doushiBasicEditor(this, basic_form, to);
        }
      },
      {
        cond: (ct) => ct.startsWith("五段・サ行"),
        "value": {
          "mizen_not": "さ",
          "mizen_prompt": "そ",
          "rennyou_now": "し",
          "rennyou_done": "し",
          "basic": "す",
          "rentai": "す",
          "katei": "せ",
          "meirei": "せ"
        },
        editor(basic_form, to){
          return doushiBasicEditor(this, basic_form, to);
        }
      },
      {
        cond: (ct) => ct.startsWith("五段・タ行"),
        "value": {
          "mizen_not": "た",
          "mizen_prompt": "と",
          "rennyou_now": "ち",
          "rennyou_done": "っ",
          "basic": "つ",
          "rentai": "つ",
          "katei": "て",
          "meirei": "て"
        },
        editor(basic_form, to){
          return doushiBasicEditor(this, basic_form, to);
        }
      },
      {
        cond: (ct) => ct.startsWith("五段・ナ行"),
        "value": {
          "mizen_not": "な",
          "mizen_prompt": "の",
          "rennyou_now": "に",
          "rennyou_done": "ん",
          "basic": "ぬ",
          "rentai": "ぬ",
          "katei": "ね",
          "meirei": "ね"
        },
        editor(basic_form, to){
          return doushiBasicEditor(this, basic_form, to);
        }
      },
      {
        cond: (ct) => ct.startsWith("五段・バ行"),
        "value": {
          "mizen_not": "ば",
          "mizen_prompt": "ぼ",
          "rennyou_now": "び",
          "rennyou_done": "ん",
          "basic": "ぶ",
          "rentai": "ぶ",
          "katei": "べ",
          "meirei": "べ"
        },
        editor(basic_form, to){
          return doushiBasicEditor(this, basic_form, to);
        }
      },
      {
        cond: (ct) => ct.startsWith("五段・マ行"),
        "value": {
          "mizen_not": "ま",
          "mizen_prompt": "も",
          "rennyou_now": "み",
          "rennyou_done": "ん",
          "basic": "む",
          "rentai": "む",
          "katei": "め",
          "meirei": "め"
        },
        editor(basic_form, to){
          return doushiBasicEditor(this, basic_form, to);
        }
      },
      {
        cond: (ct) => ct.startsWith("五段・ラ行"),
        "value": {
          "mizen_not": "ら",
          "mizen_prompt": "ろ",
          "rennyou_now": "り",
          "rennyou_done": "っ",
          "basic": "る",
          "rentai": "る",
          "katei": "れ",
          "meirei": "れ"
        },
        editor(basic_form, to){
          return doushiBasicEditor(this, basic_form, to);
        }
      },
      {
        cond: (ct) => ct.startsWith("五段・ワ行"),
        "value": {
          "mizen_not": "わ",
          "mizen_prompt": "お",
          "rennyou_now": "い",
          "rennyou_done": "っ",
          "basic": "う",
          "rentai": "う",
          "katei": "え",
          "meirei": "え"
        },
        editor(basic_form, to){
          return doushiBasicEditor(this, basic_form, to);
        }
      },
      {
        cond: (ct) => ct.startsWith("一段"),
        "value": {
          "mizen_not": "",
          "mizen_prompt": "",
          "rennyou_now": "",
          "rennyou_done": "",
          "basic": "る",
          "rentai": "る",
          "katei": "れ",
          "meirei": "ろ"
        },
        editor(basic_form, to){
          return doushiBasicEditor(this, basic_form, to);
        }
      },
      {
        cond: (ct) => /サ変.*スル/.test(ct),
        "value": {
          "mizen_not": "し",
          "mizen_prompt": "せ",
          "rennyou_now": "し",
          "rennyou_done": "し",
          "basic": "する",
          "rentai": "する",
          "katei": "すれ",
          "meirei": "しろ"
        },
        editor(basic_form, to){
          return doushiBasicEditor(this, basic_form, to);
        }
      },
      {
        cond: (ct) => /サ変.*ズル/.test(ct),
        "value": {
          "mizen_not": "じ",
          "mizen_prompt": "ぜ",
          "rennyou_now": "じ",
          "rennyou_done": "ぜ",
          "basic": "ずる",
          "rentai": "ずる",
          "katei": "ずれ",
          "meirei": "じろ"
        },
        editor(basic_form, to){
          return doushiBasicEditor(this, basic_form, to);
        }
      },
      {
        cond: (ct) => /カ変/.test(ct),
        "value": {
          "mizen_not": "こ",
          "mizen_prompt": "こ",
          "rennyou_now": "き",
          "rennyou_done": "き",
          "basic": "くる",
          "rentai": "くる",
          "katei": "くれ",
          "meirei": "こい"
        },
        editor(basic_form, to){
          if(basic_form === "来る"){
            return "来" + this.value[to].slice(1);
          }
          return doushiBasicEditor(this, basic_form, to);
        }
      },
    ],
    edit(token, to) {
      const pattern = this.patterns.find(p => p.cond(token.conjugated_type));
      token.surface_form = pattern.editor(token.basic_form, to);
    },
  }
};


/**
 * 常体から敬体への変換パターンの参考元論文
 * https://ipsj.ixsq.nii.ac.jp/ej/?action=pages_view_main&active_action=repository_view_main_item_detail&item_id=47831&item_no=1&page_id=13&block_id=8
 */


/**
 * 文章の終わり
 */
const endSentence = o => !o || (o.pos === "記号" && (o.pos_detail_1 === "句点" || o.pos_detail_1 === "読点"));

const zyoutaiPatterns = [
  {
    conditions: [
      o => o.pos === "動詞" && o.conjugated_form === "基本形",
      endSentence,
    ],
    edit: (list) => {
      katuyou.doushi.edit(list[0], "rennyou_now");
      list[0].surface_form += "ます";
      return list;
    },
  },
  {
    conditions: [
      o => o.pos === "動詞" && (o.conjugated_form === "連用形" || o.conjugated_form === "連用タ接続"),
      o => o.pos === "助動詞" && o.basic_form === "た" && o.conjugated_form === "基本形",
      o => endSentence(o) || (o.pos === "助詞" && o.pos_detail_1 === "接続助詞"),
    ],
    edit: (list) => {
      katuyou.doushi.edit(list[0], "rennyou_now");
      list[0].surface_form += "まし";
      return list;
    },
  },
  {
    conditions: [
      o => o.pos === "動詞" && o.conjugated_form === "未然形",
      o => o.pos === "助動詞" && o.basic_form === "ない" && o.conjugated_form === "基本形",
      endSentence,
    ],
    edit: (list) => {
      katuyou.doushi.edit(list[0], "rennyou_now");
      list[1].surface_form = "ません";
      return list;
    },
  },
  {
    conditions: [
      o => o.pos === "動詞" && o.conjugated_form === "未然形",
      o => o.pos === "助動詞" && o.basic_form === "ない" && o.conjugated_form === "連用タ接続",
      o => o.pos === "助動詞" && o.basic_form === "た" && o.conjugated_form === "基本形",
    ],
    edit: (list) => {
      katuyou.doushi.edit(list[0], "rennyou_now");
      list[1].surface_form = "ません";
      list[2].surface_form = "でした";
      return list;
    },
  },
  {
    conditions: [
      o => o.pos === "助動詞" && o.basic_form === "だ" && o.conjugated_form === "基本形",
      endSentence,
    ],
    edit: (list) => {
      list[0].surface_form = "です";
      return list;
    },
  },
  {
    conditions: [
      o => o.pos === "助動詞" && o.basic_form === "だ" && o.conjugated_form === "連用タ接続",
      o => o.pos === "助動詞" && o.basic_form === "た" && o.conjugated_form === "基本形",
    ],
    edit: (list) => {
      list[0].surface_form = "でし";
      return list;
    },
  },
  {
    conditions: [
      o => o.pos === "助動詞" && o.basic_form === "ない" && o.conjugated_form === "基本形",
      endSentence,
    ],
    edit: (list) => {
      list[0].surface_form = "ありません";
      return list;
    },
  },
  {
    conditions: [
      o => o.pos === "助動詞" && o.basic_form === "だ" && o.conjugated_form === "連用形",
      o => o.pos === "助動詞" && o.basic_form === "ある" && o.conjugated_form === "基本形",
      o => endSentence(o) || (o.pos === "助詞" && o.pos_detail_1 === "接続助詞"),
    ],
    edit: (list) => {
      list[0].surface_form = "で";
      list[1].surface_form = "す";
      return list;
    },
  },
  {
    conditions: [
      o => o.pos === "助動詞" && o.basic_form === "だ" && o.conjugated_form === "連用形",
      o => o.pos === "助動詞" && o.basic_form === "ある" && o.conjugated_form === "連用タ接続",
      o => o.pos === "助動詞" && o.basic_form === "た" && o.conjugated_form === "基本形",
    ],
    edit: (list) => {
      list[0].surface_form = "で";
      list[1].surface_form = "し";
      return list;
    },
  },
  {
    conditions: [
      o => o.pos === "助動詞" && o.basic_form === "だ" && o.conjugated_form === "連用形",
      o => o.pos === "助動詞" && o.basic_form === "ある" && o.conjugated_form === "未然ウ接続",
      o => o.pos === "助動詞" && o.basic_form === "う" && o.conjugated_form === "基本形",
    ],
    edit: (list) => {
      list[0].surface_form = "で";
      list[1].surface_form = "しょ";
      return list;
    },
  },
  {
    conditions: [
      o => o.pos === "助動詞" && o.basic_form === "だ" && o.conjugated_form === "未然形",
      o => o.pos === "助動詞" && o.basic_form === "う" && o.conjugated_form === "基本形",
    ],
    edit: (list) => {
      list[0].surface_form = "でしょ";
      return list;
    },
  },
  {
    conditions: [
      o => o.pos === "助動詞" && o.basic_form === "だ" && o.conjugated_form === "基本形",
      o => o.pos === "助詞" && o.basic_form === "が",
    ],
    edit: (list) => {
      list[0].surface_form = "です";
      return list;
    },
  },
  {
    conditions: [
      o => o.pos === "接続詞" && (o.basic_form === "だが" || o.basic_form === "が"),
    ],
    edit: (list) => {
      list[0].surface_form = "ですが";
      return list;
    },
  },
  {
    conditions: [
      o => o.pos === "形容詞" && o.basic_form === "ない" && o.conjugated_form === "基本形",
      endSentence,
    ],
    edit: (list) => {
      list[0].surface_form = "ありません";
      return list;
    },
  },
  {
    conditions: [
      o => o.pos === "形容詞" && o.conjugated_form === "基本形",
      o => endSentence(o) || (o.pos === "助詞" && o.pos_detail_1 === "接続助詞"),
    ],
    edit: (list) => {
      list[0].surface_form += "です";
      return list;
    },
  },
  {
    conditions: [
      o => o.pos === "形容詞" && o.basic_form === "ない" && o.conjugated_form === "連用タ接続",
      o => o.pos === "助動詞" && o.basic_form === "た" && o.conjugated_form === "基本形",
    ],
    edit: (list) => {
      list[0].surface_form = "ありません";
      list[1].surface_form = "でした";
      return list;
    },
  },
  {
    conditions: [
      o => o.pos === "形容詞" && o.conjugated_form === "連用タ接続",
      o => o.pos === "助動詞" && o.basic_form === "た" && o.conjugated_form === "基本形",
    ],
    edit: (list) => {
      list[1].surface_form += "です";
      return list;
    },
  },
  {
    conditions: [
      o => o.pos === "動詞" && o.conjugated_form === "基本形",
      o => o.pos_detail_1 === "終助詞" && o.basic_form === "な",
    ],
    edit: (list) => {
      katuyou.doushi.edit(list[0], "mizen_not");
      list[1].surface_form = "ないでください"
      return list;
    },
  },
];

const convert = text => {

  const tokenizeResult = kuromojiTokenizer.tokenize(text);
  let resultText = "";
  for (let tokenIndex = 0; tokenIndex < tokenizeResult.length; tokenIndex++) {
    let hasHit = false;
    for (const p of zyoutaiPatterns) {
      let hit = true;
      const list = [];
      for (let condIndex = 0; condIndex < p.conditions.length; condIndex++) {
        const needle = tokenizeResult[tokenIndex + condIndex];
        try {
          if (!p.conditions[condIndex](needle)) {
            throw new Error();
          }
        }
        catch (e) {
          hit = false;
          break;
        }
        list.push(needle);
      }
      if (hit) {
        hasHit = true;
        p.edit(list);
        tokenIndex += p.conditions.length - 1;
        resultText += list.map(token => token?.surface_form ?? "").join("");
        break;
      }
    }
    if (!hasHit) {
      resultText += tokenizeResult[tokenIndex].surface_form;
    }
  }
  return resultText;
}

export { convert };