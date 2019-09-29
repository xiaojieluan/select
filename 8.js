var foo = function(x, y){
 return x - y;
}
function foo(x, y){
 return x + y;
}
var num = foo(1, 2);
console.log(num);

/*
会被javascript编译器处理为：
var foo;   变量声明提升
var num;   变量声明提升

function foo(x, y){ //foo#2     函数声明提升
    return x + y;
}

foo = function(x, y){//foo#3   不会被提升
    return x - y;
}

*/