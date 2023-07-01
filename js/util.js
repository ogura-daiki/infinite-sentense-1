const randArr = (arr) => arr[Math.floor(Math.random() * arr.length)];

const randomLength = (min, max) => {
  const baseRand = Math.random();
  let value = Math.sin(Math.random() * Math.PI) / 2;
  if (baseRand > 0.5) {
    value = 1 - value;
  }
  return Math.floor((max - min - 1) * value) + min;
}

export {randArr, randomLength};