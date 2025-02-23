class SentenceNormalizer {
  /**
   * 名詞の置き換え、敬体常体の変更など
   * @param {string} text 
   */
  normalize(text) {
    throw new Error("abstract method");
  }
}

export { SentenceNormalizer };