/**
 * 下記URLの活用形の情報を参考に動詞の変換テストを作成した
 * https://ja.wiktionary.org/wiki/%E4%BB%98%E9%8C%B2:%E6%97%A5%E6%9C%AC%E8%AA%9E%E3%81%AE%E6%B4%BB%E7%94%A8
 */
import { kuromojiTokenizer } from "../kurimoji.js";
import { convert } from "../zyotai2keitai.js";

const expect = (expect, value) => {
  if(expect === value) return;
  throw Error(`期待した値ではありませんでした。\nexpect: ${expect}\nvalue: ${value}`);
}

const tests = [];
const test = (title, content) => {
  tests.push({title, content});
}
const startTest = async () => {
  let successCount = 0;
  for (const t of tests) {
    console.group(t.title);
    console.info(`[start]${t.title}`);
    try{
      await t.content();
      console.info("SUCCESS !!!");
      successCount++;
    }
    catch(e){
      console.error(e);
    }
    console.groupEnd(t.title);
  }
  const resultText = `TEST PASSED ${successCount} / ${tests.length}`;
  if(successCount < tests.length){
    console.error(resultText);
  }
  else{
    console.info(resultText);
  }
};
setTimeout(startTest, 200);

test("動詞", ()=>{
  expect("咲きます。", convert("咲く。"));
  expect("割きます。", convert("割く。"));
  expect("継ぎます。", convert("継ぐ。"));
  expect("押します。", convert("押す。"));
  expect("打ちます。", convert("打つ。"));
  expect("死にます。", convert("死ぬ。"));
  expect("呼びます。", convert("呼ぶ。"));
  expect("読みます。", convert("読む。"));
  expect("有ります。", convert("有る。"));
  expect("あります。", convert("ある。"));
  expect("思います。", convert("思う。"));
  expect("老います。", convert("老いる。"));
  expect("着ます。", convert("着る。"));
  expect("落ちます。", convert("落ちる。"));
  expect("似ます。", convert("似る。"));
  expect("煮ます。", convert("煮る。"));
  expect("干ます。", convert("干る。"));
  expect("干からびます。", convert("干からびる。"));
  expect("伸びます。", convert("伸びる。"));
  expect("見ます。", convert("見る。"));
  expect("借ります。", convert("借りる。"));
  expect("乗ります。", convert("乗る。"));
});
test("敬語", ()=>{
  expect("いらっしゃいます。", convert("いらっしゃる。"));
  expect("おっしゃいます。", convert("おっしゃる。"));
  expect("くださいます。", convert("くださる。"));
  expect("ございます。", convert("ござる。"));
  expect("なさいます。", convert("なさる。"));
});
test("サ行、カ行", ()=>{
  expect("します。", convert("する。"));
  expect("勉強します。", convert("勉強する。"));
  expect("接します。", convert("接する。"));
  expect("命じます。", convert("命ずる。"));
  expect("来ます。", convert("来る。"));
  expect("きます。", convert("くる。"));
});
test("時制", ()=>{
  expect("明らかにします。", convert("明らかにする。"));
  expect("明らかにしました。", convert("明らかにした。"));
  expect("おっしゃいました", convert("おっしゃった"));
  expect("見つかっていません", convert("見つかっていない"));
  expect("来ません", convert("来ない"));
  expect("知りません", convert("知らない"));
  expect("知りませんでした", convert("知らなかった"));
  expect("知らないことがあります", convert("知らないことがある"));
  expect("知らないことがありました", convert("知らないことがあった"));
  expect("見たことが無いです", convert("見たことが無い"));
  expect("見たことが無かったです", convert("見たことが無かった"));
  expect("見つかりませんでした", convert("見つからなかった"));
  expect("来ませんでした", convert("来なかった"));
  
  expect("今日は晴れです。", convert("今日は晴れだ。"));
  expect("昨日は雨でした", convert("昨日は雨だった"));
  expect("そんなことはありません。", convert("そんなことはない。"));
  expect("満点の快晴です", convert("満点の快晴である"));
  expect("満点の快晴でした", convert("満点の快晴であった"));
  expect("満点の快晴でしょう", convert("満点の快晴であろう"));
  expect("満点の快晴でしょう", convert("満点の快晴だろう"));
  expect("今日は晴れですが、明日は雨です。", convert("今日は晴れだが、明日は雨だ。"));
});
test("否定を含むパターン", ()=>{
  expect("ですがしかし、ダメでした。", convert("だがしかし、ダメだった。"));
  expect("全てがダメになります。", convert("全てがダメになる。"));
  expect("全てがダメになりました。", convert("全てがダメになった。"));
  expect("全てがダメになりましたが、まだ希望はありました。", convert("全てがダメになったが、まだ希望はあった。"));
  expect("上手くいくように思えましたが、しかしダメでした。", convert("上手くいくように思えたが、しかしダメだった。"));

  expect("いよいよ後がありません", convert("いよいよ後がない"));
  expect("いよいよ後がなくなりました", convert("いよいよ後がなくなった"));
  expect("もう後がありませんでした", convert("もう後がなかった"));
});
test("過去形、否定など", ()=>{
  expect("むしろ、歓迎されていると言ってもよいです。", convert("むしろ、歓迎されていると言ってもよい。"));
  expect("批判が強いです", convert("批判が強い"));
  expect("批判が強いですが", convert("批判が強いが"));
  expect("味は濃いですが食べられないほどではありません", convert("味は濃いが食べられないほどではない"));
  expect("人が多かったです", convert("人が多かった"));
  expect("うるさかったです。", convert("うるさかった。"));
  expect("男は貧乏ですが、幸福でした。", convert("男は貧乏であるが、幸福であった。"));
});
test("だけ", ()=>{
  expect("一度か二度ぶつかっただけ", convert("一度か二度ぶつかっただけ"));
  expect("一度か二度ぶつかっただけです", convert("一度か二度ぶつかっただけだ"));
});
test("命令", ()=>{
  expect("ぶつからないでください", convert("ぶつかるな"));
  expect("脱走しないでください", convert("脱走するな"));
  expect("脱走しないでくださいよ", convert("脱走するなよ"));
});
test("test2", ()=>{
  expect("盗みを働いたことはありません", convert("盗みを働いたことはない"));
  expect("盗みを働いたことはありませんでした", convert("盗みを働いたことはなかった"));
  expect("盗みを働いていません", convert("盗みを働いていない"));
  expect("盗みを働いていませんでした", convert("盗みを働いていなかった"));
  expect("盗みを働いたか知りません", convert("盗みを働いたか知らない"));
  expect("盗みを働いたか知りませんでした", convert("盗みを働いたか知らなかった"));
  //console.log(kuromojiTokenizer.tokenize("盗みを働いていなかったが人は殺していた"));
  expect("盗みを働いていませんでしたが人は殺していました", convert("盗みを働いていなかったが人は殺していた"));
  //console.log(kuromojiTokenizer.tokenize("盗みを働いていなかったことを知った"));
  expect("盗みを働いていなかったことを知りました", convert("盗みを働いていなかったことを知った"));
  expect("盗んだことを認めました", convert("盗んだことを認めた"));
  expect("盗んだことを認めました", convert("盗んだことを認めた"));
  expect("盗まなかったことを認めました", convert("盗まなかったことを認めた"));
  //console.log(kuromojiTokenizer.tokenize("盗みを認めなかったそうだ"));
  expect("盗みを認めなかったそうです", convert("盗みを認めなかったそうだ"));
});
