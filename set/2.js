//WeakSet  它是不可遍历的
//var arr1 = [2,3,4,5];//报错
var arr1 = [[2,3],[4,5]];
let ws1 = new WeakSet(arr1);  
console.log(ws1);  


