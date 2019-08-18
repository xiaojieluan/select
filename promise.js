var p = new Promise((resolve,reject) => {
    setTimeout(function(){
      console.log('模拟异步函数');
      resolve('1s后调用');
    },1000);
}).then(res => {
    console.log(res);
})

/*
promise传入一个函数参数

*/