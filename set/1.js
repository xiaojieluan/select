//利用Set结构数组去重
var arr = [1,1,2,3,4,5,5,5,6,7,8];
var s = new Set();
arr.map(val => s.add(val));
console.log(s);

console.log(...new Set(arr));
console.log('--------------');

//在Set内部比较两个数是否相等，算法等同于===，不会发生类型转换
//和===的区别是，===认为NaN！=NaN，而Set认为NaN == NaN

let s1 = new Set();
let a = NaN;
let b = NaN;
s1.add(a);
s1.add(b);
console.log(s1);  //{NaN}
console.log('----------');
//Set认为两个对象总是不相等
console.log({} === {}); //false
let s2 = new Set();
let o1 = {};
s2.add(o1);
console.log(s2);
console.log(s2.size);
let o2 = {};
s2.add(o2);
console.log(s2);
console.log(s2.size);  //Set的长度用size访问
console.log('----------');

let s3 = new Set([1,2,2,3,3,3]);
s3.add(4);
console.log(s3);  //{1,2,3,4}
s3.delete(1);
console.log(s3); //{2,3,4}
console.log(s3.has(1));  //false
s3.clear();//没有返回值
console.log(s3);   //{}
console.log('----------');

//Object结构和Set结构在判断是否包含一个键写法
var square = {
    width:100,
    height:100
}
if(square.width) {  //判断对象中是否有width结构
   console.log(square.width);
}
var s4 = new Set([1,2,3]);
if(s4.has(1)) {
    console.log(1);
}
console.log('----------');

//数组去重的两种方法
console.log(...new Set([1,2,2,3,3,3]));
console.log(Array.from(new Set([1,2,3,4,4,4])));
console.log('----------');

//set的遍历方法
let s5 = new Set(['red','green','blue']);
console.log(s5.keys());
console.log(s5.values());
console.log(s5.entries());
console.log('----------');

//set结构的遍历方法
//将set结构转化为数组
let arr1 = [...new Set([1,2,3,4,5,6])];
console.log(arr1);


