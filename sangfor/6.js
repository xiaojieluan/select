var res = [[0],1].reduce((p,v) => p.push([v]));
console.log(res);   //push方法是返回新的长度
var res2 = [[0],1].reduce((p,v) => p.push([v])).toString();
console.log(res2);

