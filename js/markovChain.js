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
  /**
   * @type {Map<String, Map<String, int>>}
   */
  bMatrix = new Map();
  /**
   * @type {Map<String, Map<String, int>>}
   */
  bMatrixCount = new Map();

  constructor({n=1}={}){
    this.n = n;
  }

  _getMatrix({m, from}){
    if(m.has(from)){
      return m.get(from);
    }
    const map = new Map();
    m.set(from, map);
    return map;
  }

  _addMap({m, key}){
    let count = 1;
    if(m.has(key)){
      count += m.get(key);
    }
    m.set(key, count);
  }

  /**
   * マルコフ連鎖に使うデータを追加する
   * @param {String} data 
   */
  addData(data){
    const dataLength = data.length;
    for (let i = this.n; i <= dataLength; i += 1) {
      const from = data.substring(i - this.n, i);
      const next = data[i] ?? "";
      const previous = data[i-this.n-1] ?? "";

      const nextMap = this._getMatrix({m:this.matrix, from});
      this._addMap({m:nextMap, key:next});
      this._addMap({m:this.matrixCount, key:from});
      const prevMap = this._getMatrix({m:this.bMatrix, from});
      this._addMap({m:prevMap, key:previous});
      this._addMap({m:this.bMatrixCount, key:from});
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

  getRandomChar({m, mc}) {
    const total = mc.values().reduce((c,v,i,a)=>c+v);
    const index = Math.floor(Math.random() * total);

    let count = 0;
    let last;
    for(const entry of mc.entries()){
      if(count >= index){
        return entry[0];
      }
      count += entry[1];
      last = entry;
    }
    if(last != null){
      return last[0];
    }

    const randomIndex = Math.floor(Math.random() * m.size);
    return m.keys().find((v, i) => i === randomIndex);
  }

  getNextChar({current, fill, m, mc}){
    const list = m.get(current);
    const nextList = list.get(current);

    let returnFirst = !mc.has(current);
    if(!returnFirst){
      returnFirst = nextList?.size == 1 && [...nextList?.values()][0] === ""
    }

    if (returnFirst) {
      if(fill){
        const result = this.getRandomChar({m, mc});
        return result;
      }
      return "";
    }

    const index = Math.floor(Math.random() * mc.get(current));
    let count = 0;
    let last;
    for (const data of m.get(current).entries()) {
      if(count >= index){
        return data[0];
      }
      count += data[1];
      last = data;
    }
    if(last != null){
      return last[0];
    }
    
    if(fill){
      const result = this.getRandomChar({m, mc});
      return result;
    }
    return "";
  }

  /**
   * 
   * @param {Object} obj 
   * @param {int} obj.length
   * @param {boolean} obj.fill
   */
  getText({length, fill=false, prev=false}){
    const nSet = {m: this.matrix, mc:this.matrixCount};
    const pSet = {m: this.bMatrix, mc:this.bMatrixCount};
    let result = this.getRandomChar(nSet);
    for (let count = result.length; count < length; count += 1) {
      const current = result.slice(-this.n);
      const last = this.getNextChar({current, fill, ...nSet});
      result += last;
      if(last.length == 0){
        break;
      }
    }
    if(prev){
      for (let count = result.length; count < length; count += 1) {
        const current = result.substring(0, this.n);
        const last = this.getNextChar({current, fill, ...pSet});
        if(last.length == 0){
          break;
        }
        result = last + result;
      }
    }
    if(fill){
      let retry = 0;
      let retryMax = 100;
      while(result.length < length && retry < retryMax){
        const current = result.slice(-this.n);
        let last = this.getNextChar({current, fill, ...nSet});
        if(last.length === 0){
          if(retry >= retryMax){
            break;
          }
          retry+=1;
          continue;
        }
        result += last;
      }
    }
    return result;
  }
}


export {NGramMarkovChain};
