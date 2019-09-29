let x = 10;
let foo = () => {
 console.log(x);
 let x = 20;
 x++;
}
foo();
//会抛出错误，let声明的变量不会提升，而外部的let声明的变量函数里也不能访问