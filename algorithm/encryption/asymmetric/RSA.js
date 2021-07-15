const BigNumber = require('big-number')

function isPrimeNumber(v) {
  for (let i = 2; i < v; i++) {
    if (v % i === 0) {
      return false;
    }
  }
  return true;
}

function getPrimeNumber(min, max) {
  let rst = [];
  for(let i = Math.max(2, min); i <= max; i++) {
    if(isPrimeNumber(i)) {
      rst.push(i);
    }
  }
  return rst;
}

function getGCD(a, b) {
  const big = a > b ? a : b;
  const small = a < b ? a : b;
  if (big%small===0) return small;
  return getGCD(big%small, small);
}

// 扩展欧几里得算法计算乘法逆元 其中一个
// 这里递归基(x, y)取的(1, 0)
function exGetGCD(a, b, receiveObj) {
  if (b === 0) {
    receiveObj.x = 1;
    receiveObj.y = 0;
    return a;
  }
  
  const greatestCommonDivisor = exGetGCD(b, a%b, receiveObj);
  const temp = receiveObj.y;
  receiveObj.y = receiveObj.x - Math.floor(a/b) * receiveObj.y;
  receiveObj.x = temp;
  return greatestCommonDivisor;
}

// range: [min, max)
function getRandom(min, max) {
  return Math.floor(Math.random() * (max-min)) + min;
}

let primeNumberList = getPrimeNumber(10, 100);

// step 1: select prime number p and q(p != q)
const pIndex = Math.floor(Math.random() * 1000) % primeNumberList.length;
const p = primeNumberList[pIndex];
primeNumberList.splice(pIndex, 1);
const qIndex = Math.floor(Math.random() * 1000) % primeNumberList.length;
const q = primeNumberList[qIndex]

// step 2: culculate n (length of key)
const n = p * q;

// step 3: culculate olan
const olaN = (p-1) * (q-1);

// step 4: select a random e, 1 < e < olaN, e
primeNumberList = [];

for(let i = 1; i < olaN; i++) {
  if (getGCD(i, olaN) === 1) primeNumberList.push(i);
}

const e = primeNumberList[getRandom(2, primeNumberList.length)];

// step 5: culculate x, y, ed ≡ 1 (mod φ(n)) => ed - 1 = kφ(n) => ex + φ(n)y = 1
const receiveObj = {x: null, y: null};
const testVal = exGetGCD(e, olaN, receiveObj); // testVal = 1, just for teach
while (receiveObj.x < 0) {
  receiveObj.x += olaN
}

const d = receiveObj.x;

// step 6
console.log(`public key: (${n}, ${e})`);
console.log(`private key: (${n}, ${d})`)
console.log(`p, q, olaN: ${p}, ${q}, ${olaN}`)
console.log(`n, e, d: ${n}, ${e}, ${d}`)

// step 7 null
// step 8
function rsaEncrypt(n, e, content) {
  return BigNumber(content).pow(e).mod(n);
}

function rsaDecrypt(n, d, content) {
  return BigNumber(content).pow(d).mod(n);
}

const content  = '69';

console.log('content: ', content);
const encryptedContent =  rsaEncrypt(n, e, content)
console.log('encrypted content: ', encryptedContent.toString())
const decryptContent = rsaDecrypt(n, d, encryptedContent)
console.log('decrypted content: ', decryptContent.toString())

