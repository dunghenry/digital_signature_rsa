const hashCode = function (s) {
  var h = 0,
    l = s.length,
    i = 0;
  if (l > 0) while (i < l) h = ((h << 5) - h + s.charCodeAt(i++)) | 0;
  return h;
};
// Test
const signature = parseInt(hashCode("a"));
// console.log(signature);
var hashed = (Math.pow(signature, 7) % 943)
p = 2, q = 5
n = p * q
phiN = (p - 1) * (q - 1)
d = (1 + phiN * 1) / 3
console.log(n)
c = Math.pow(31, 5) % n
m = (Math.pow(c, d)) % n
console.log(c, m);

console.log()