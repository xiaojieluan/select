var mysymbol = Symbol();
var obj = {};
Object.defineProperty(obj,mysymbol,{value:'hello'});
console.log(obj[mysymbol]);
console.log(obj[mysymbol]);
console.log(obj.mysymbol);   //Symbol作为对象属性名，不可以用点运算符（.）访问
console.log('---------------');

let s = Symbol();
let obj1 = {
  [s]: function (arg) { 
      console.log(arg);
  }  //如果不放在方括号中，则表示为字符串
};
obj1[s](123);
console.log('------------');

//Symbol类型还可以用于定义一组常量，保证这组常量的值都是不相等的
let levels = {
    DEBUG: Symbol('debug'),
    INFO: Symbol('info'),
    WARN: Symbol('warn')
  };
  console.log(levels.DEBUG, 'debug message');
 console.log(levels.INFO, 'info message');
