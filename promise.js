//一个Promise对象的实例
function timeout(ms) {
    return new Promise((resolve,reject) => {
        setTimeout(resolve,ms,'done');
    });
}

timeout(100).then(res => {
    console.log(res);
});