const buildKuromoji = () => new Promise(r => {
  kuromoji.builder({ dicPath: "https://cdn.jsdelivr.net/npm/kuromoji@0.1.2/dict/" }).build(function (err, tokenizer) {
    r(tokenizer);
  })
});
const kuromojiTokenizer = await buildKuromoji();

export {kuromojiTokenizer};