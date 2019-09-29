const obj = {
    id:1,
    name:'zhangsan',
    age:18
}

for(let key  in obj){
console.log(key + ':' + obj[key])
}

console.log(Object.keys(obj));
console.log(Object.values(obj));
console.log('--------------');

console.log(Object.getOwnPropertyNames(obj));
Object.getOwnPropertyNames(obj).forEach(function(key){
    console.log(key+ '---'+obj[key])
})
console.log('--------------');
var obj1 = {};
var foo = Symbol("foo");
Object.defineProperty(obj1, foo, {
  value: "foobar",
});
for (var i in obj1) {
  console.log(i); // 无输出
}
console.log(Object.getOwnPropertyNames(obj1));
// []
console.log(Object.getOwnPropertySymbols(obj1));
// [Symbol(foo)]
console.log('---------');


//Reflect.ownKeys可以返回所有的键名，不管是symbol类型还是普通类型
var obj2 = {
    [Symbol('a')]:1,
    name:22,
    age:18
}
console.log(Reflect.ownKeys(obj2));