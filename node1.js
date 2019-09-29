const buf = Buffer.alloc(10,1);
buf[3] = 4;
buf[10] = 9;

console.log(buf);
console.log(buf[3]);
console.log(buf[10]);
console.log(buf);