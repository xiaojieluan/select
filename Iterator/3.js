var str = 'hello world';
for(var i=0;i<str.length;i++) {
    //console.log(str[i]);
}

//遍历对象
var obj = {
    name:'name',
    age:18,
    sex:'girl'
}
for(var item of Object.keys(obj)){
    console.log(item);
    console.log(obj[item]);
}
function *gen() {
    yield* [[1,2,3],[2,3,4]];
}
var g = gen();
console.log(g.next());
console.log(g.next());
console.log(g.next());
console.log(g.next());
console.log(g.next());
console.log(g.next());
