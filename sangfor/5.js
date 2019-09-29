Function.prototype.sangfor = function() {
    return Function.prototype.call.bind(this);
}
console.log(Array.prototype.push.sangfor()([],0,1,2,3));  //所以这里是将this绑定到传入的[]上，返回push进去的参数的个数
console.log(Array.prototype.push());  //返回push进去的长度