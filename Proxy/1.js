let obj = new Proxy({},{
    get: function (target, key, receiver) {
        console.log(`getting ${key}!`);
        return Reflect.get(target, key, receiver);
    },
    set: function (target, key, value, receiver) {
        console.log(`setting ${key}!`);
        return Reflect.set(target, key, value, receiver);
    }
});
obj.count = 1;
console.log(obj.count);
console.log('----------------');

var proxy = new Proxy({}, {  //Proxy接受两个参数，第一个参数是所要代理的目标对象，即空对象，第二个参数是一个配置对象，即拦截操作
    get: function(target, property) {
      return 35;
    }
  });
  
  console.log(proxy.time); // 35
 console.log( proxy.name); // 35
console.log(  proxy.title); // 35