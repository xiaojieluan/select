sangfor = [1,2,3];
console.log(Object.prototype.toString.bind(sangfor)() == '[object Array]');
//sangfor调用toString方法
console.log(Object.prototype.toString.call(sangfor) == '[object Array]');//sangfor调用toString方法
console.log(Object.prototype.toString.apply(sangfor) == '[object Array]');//sangfor调用toString方法
//而bind是返回一个函数，所以后面还需要加()来执行绑定后的函数，而call和apply不需要

//toString方法如何做到判断一个对象是否为数组？

var res = [2,3,4].toString();
console.log(res);

var res2 = typeof([2,3,4]);
console.log(res2);
