const obj = {
    toString() {
      return 'abc';
    }
  };
  const sym = Symbol(obj);
 console.log(sym);  //Symbol(abc)
 let bar = Symbol('bar');
 console.log(bar);//Symbol(bar)
let s = Symbol();
console.log(s);  //Symbol()
console.log('-------------------');

//相同参数的Symbol函数的返回值是不相等的
let s1 = Symbol('1');
let s2 = Symbol('1');
console.log(s1 == s2);

var s3 = Symbol('My symbol');
console.log(String(s3) );// 'Symbol(My symbol)'
console.log(s3.toString()) // 'Symbol(My symbol)'
console.log('------------------')
//Symbol值可以显式转为字符串（不会隐式转换），也可以转为布尔值，但是不能转为数值
var s4 = Symbol();
console.log(Boolean(s4)) // true

//console.log(Number(s4)) // TypeError Symbol不能转换为数值
console.log('s4 = '+s4);  //报错  Symbol类型可以显示调用String()或者toString显示转换，但不能+隐式转换

