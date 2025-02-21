class NGramMarkovChain {
  /**
   * @type {int}
   */
  n;
  /**
   * @type {Map<String, Map<String, int>>}
   */
  matrix = new Map();
  /**
   * @type {Map<String, Map<String, int>>}
   */
  matrixCount = new Map();

  constructor({n=1}={}){
    this.n = n;
  }

  /**
   * マルコフ連鎖に使うデータを追加する
   * @param {String} data 
   */
  addData(data){
    const dataLength = data.length;
    for (let i = this.n; i < dataLength; i += 1) {
      const from = data.substring(i - this.n, i);
      const to = data[i];

      let map = this.matrix.get(from);
      if (map == null) {
        map = new Map();
        this.matrix.set(from, map);
        this.matrixCount.set(from, 0);
      }

      if (map.has(to)) {
        map.set(to, map.get(to) + 1);
      }
      else {
        map.set(to, 1);
      }
      this.matrixCount.set(from, this.matrixCount.get(from) + 1);
    }
  }
  /**
   * マルコフ連鎖に使うデータを追加する
   * @param {String[]} dataList 
   */
  addAllData(dataList){
    for (const data of dataList) {
      this.addData(data);
    }
  }

  getRandomChar() {
    const initialIndex = Math.floor(Math.random() * this.matrix.size);
    return this.matrix.keys().find((v, i) => i === initialIndex);
  }

  getNextChar(current, fill){
    if (!this.matrixCount.has(current)) {
      if(fill) return this.getRandomChar();
      return "";
    }

    const index = Math.floor(Math.random() * this.matrixCount.get(current));
    let count = 0;
    let last;
    for (const data of this.matrix.get(current).entries()) {
      if(count >= index){
        return data[0];
      }
      count += data[1];
      last = data;
    }
    if(last != null){
      return last[0];
    }
    
    if(fill) return this.getRandomChar();
    return "";
  }

  /**
   * 
   * @param {Object} obj 
   * @param {int} obj.length
   * @param {boolean} obj.fill
   */
  getText({length, fill=false}){
    let result = this.getRandomChar();
    for (let count = result.length; count < length; count += 1) {
      const current = result.slice(-this.n);
      const last = this.getNextChar(current, fill);
      result += (last);
    }
  
    return result;
  }
}


export {NGramMarkovChain};
