var res = +new Array(017);
console.log(res);  //NaN

/*
知识点：
+ new Array(017)  等价于  + new Array(15) （15的八进制是17）
按照规则，数组对象应该采用Number，所以先执行valueOf，发现valueOf返回的是自己，所以继续执行toString，过程如下：
Number(new Array(15)) 
// new Array(15).valueOf()不是原始值,所以执行toString()
Number(new Array(15).toString()) 
Number(",,,,,,,,,,,,,,") 
NaN

*/