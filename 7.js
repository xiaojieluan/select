var name = 'window';
var obj = {
     name: 'netease',
     print1: () => {
         console.log(this.name);
     },
     print2 () {
         console.log(this.name);
     }
};
obj.print1();  //window，在这里执行的时候会打出undefined
obj.print2();  //netease

/*
知识点：箭头函数的this永远指向window

*/

