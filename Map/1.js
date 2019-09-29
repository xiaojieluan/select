var map = new Map();
var o = {
    p:'Hello'
}
map.set(o,'content');
console.log(map);
console.log(map.get(o));
console.log(map.has(o));
console.log(map.delete(o));
console.log(map.has(o));
console.log('------------------');

//Map接受数组作为参数,数组的成员应该表示键值对
var arr = [['name','zhangsan'],['age',18]];
var m1 = new Map(arr);
console.log(m1);
console.log('------------------');

var m2 = new Map();
m2.set(['a'],'555');
console.log(m2.get(['a']));  //undefined
console.log('------------------');

//Map中，两个NaN是相等的，+0和-0是相等的
let m3 = new Map();
m3.set(NaN,111);  
console.log(m3);
m3.set(-0,'222');
console.log(m3.get(+0));

//Map的size返回长度
console.log(m3.size);

console.log('------------------');
//Map的链式调用

let m4 = new Map();
m4.set(1,'1').set(undefined,[12,3]).set({aaa:111},true);
console.log(m4);

//Map结构转为数组结构：结合使用扩展运算符
let map2 = new Map([
    [1, 'one'],
    [2, 'two'],
    [3, 'three'],
  ]);
  console.log(...map2.keys());
  console.log(...map2.values());

  console.log(...map2.entries());
  console.log(...map2);