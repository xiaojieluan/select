var bb = 1;
function aa(bb) {
    bb = 2;
    console.log(bb);  //2
};
aa(bb);
console.log(bb);  //1

/*
考点：局部变量和参数传递
函数内的bb是以参数的形式传入的，这个参数会在函数调用结束之后被销毁。
所以第一次打印出bb的值为2之后，函数内的bb就被销毁了；
然后在全局打印的bb值为1；


*/