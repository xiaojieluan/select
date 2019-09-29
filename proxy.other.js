//has()
//has方法用来拦截HasProperty操作，即判断对象是否具有某个属性时，这个方法会生效。典型的操作就是in运算符。
var handler = {
    has (target, key) {
      if (key[0] === '_') {  //隐藏私有属性
        return false;
      }
      return key in target;  //如果不是私有属性，则返回
    }
  };
  var target = { _prop: 'foo', prop: 'foo' };
  var proxy = new Proxy(target, handler);
  '_prop' in proxy // false
  //如果原对象的属性名的第一个字符是下划线，proxy.has就会返回false，从而不会被in运算符发现。

  //如果原对象不可配置或者禁止扩展，这时has拦截会报错。
var obj = { a: 10 };
Object.preventExtensions(obj);  //调用Object.preventExtensions()禁止obj对象扩展，使用has()就会报错
var p = new Proxy(obj, {
  has: function(target, prop) {
    return false;
  }
});

'a' in p // TypeError is thrown

//值得注意的是，has方法拦截的是HasProperty操作，而不是HasOwnProperty操作，
//即has方法不判断一个属性是对象自身的属性，还是继承的属性。

//虽然for...in循环也用到了in运算符，但是has拦截对for...in循环不生效。即用for...in循环对象，Proxy不会起作用
let stu1 = {name: '张三', score: 59};
let stu2 = {name: '李四', score: 99};

let handler = {
  has(target, prop) {
    if (prop === 'score' && target[prop] < 60) {
      console.log(`${target.name} 不及格`);
      return false;
    }
    return prop in target;
  }
}

let oproxy1 = new Proxy(stu1, handler);
let oproxy2 = new Proxy(stu2, handler);
//测试
'score' in oproxy1
// 张三 不及格
// false

'score' in oproxy2
// true

for (let a in oproxy1) {
  console.log(oproxy1[a]);
}
// 张三  proxy没有影响，直接可以打印出59
// 59

for (let b in oproxy2) {
  console.log(oproxy2[b]);
}
// 李四
// 99



//construct 用于拦截new命令
//拦截对象的写法
var handler = {
    construct (target, args, newTarget) {
      return new target(...args);
    }
  };
//参数解析：target: 目标对象，args：构建函数的参数对象
var p = new Proxy(function() {}, {
    construct: function(target, args) {
      console.log('called: ' + args.join(', '));
      return { value: args[0] * 10 };  //必须返回一个对象，不是对象会报错
    }
  });
  
  new p(1).value
  // "called: 1"
  // 10



  //deleteProperty()：用于拦截delete操作，如果这个方法抛出错误或者返回false，当前属性就无法被delete命令删除。
  var handler = {
    deleteProperty (target, key) {
      invariant(key, 'delete');  //判断是否是私有属性，如果是，则直接报错，不会走到return true
      return true;
    }
  };
  function invariant (key, action) {
    if (key[0] === '_') {
      throw new Error(`Invalid attempt to ${action} private "${key}" property`);
    }
  }
  
  var target = { _prop: 'foo' };
  var proxy = new Proxy(target, handler);
  delete proxy._prop
  // Error: Invalid attempt to delete private "_prop" property




  //defineProperty()方法拦截了Object.defineProperty操作。
  var handler = {
    defineProperty (target, key, descriptor) {
      return false;
    }
  };
  var target = {};
  var proxy = new Proxy(target, handler);
  proxy.foo = 'bar'
  // TypeError: proxy defineProperty handler returned false for property '"foo"'
  //defineProperty方法返回false，导致添加新属性会抛出错误。


  //getOwnPropertyDescriptor()
  //handler.getOwnPropertyDescriptor方法对于第一个字符为下划线的属性名会返回undefined。
  var handler = {
    getOwnPropertyDescriptor (target, key) {
      if (key[0] === '_') {
        return;
      }
      return Object.getOwnPropertyDescriptor(target, key);
    }
  };
  var target = { _foo: 'bar', baz: 'tar' };
  var proxy = new Proxy(target, handler);
  Object.getOwnPropertyDescriptor(proxy, 'wat')
  // undefined
  Object.getOwnPropertyDescriptor(proxy, '_foo')
  // undefined
  Object.getOwnPropertyDescriptor(proxy, 'baz')
  // { value: 'tar', writable: true, enumerable: true, configurable: true }



  //getPrototypeOf方法主要用来拦截Object.getPrototypeOf()运算符，以及其他一些操作。
// Object.prototype.__proto__
// Object.prototype.isPrototypeOf()
// Object.getPrototypeOf()
// Reflect.getPrototypeOf()
// instanceof运算符
var proto = {};
var p = new Proxy({}, {
  getPrototypeOf(target) {
    return proto;
  }
});
Object.getPrototypeOf(p) === proto // true
//上面代码中，getPrototypeOf方法拦截Object.getPrototypeOf()，返回proto对象。


//isExtensible方法拦截Object.isExtensible操作。
var p = new Proxy({}, {
    isExtensible: function(target) {
      console.log("called");
      return true;
    }
  });
  
  Object.isExtensible(p) //调用 Object.isExtensible，传入参数p，会调用p.isExtensible()函数
  // "called"
  // true
  //这个方法有一个强限制，如果不能满足下面的条件，就会抛出错误。
Object.isExtensible(proxy) === Object.isExtensible(target)
var p = new Proxy({}, {
    isExtensible: function(target) {
      return false;
    }
  });
  
Object.isExtensible(p) // 报错





//ownKeys()拦截Object.keys()操作。
let target = {};
let handler = {
  ownKeys(target) {
    return ['hello', 'world'];
  }
};

let proxy = new Proxy(target, handler);
Object.keys(proxy)
// [ 'hello', 'world' ]
//上面代码拦截了对于target对象的Object.keys()操作，返回预先设定的数组。

let target = {
    _bar: 'foo',  //被拦截
    _prop: 'bar',  //被拦截
    prop: 'baz'
  };
  let handler = {
    ownKeys (target) {
      return Reflect.ownKeys(target).filter(key => key[0] !== '_');
    }
  }; 
  let proxy = new Proxy(target, handler);
  for (let key of Object.keys(proxy)) {
    console.log(target[key]);
  }
  // "baz"



  //preventExtensions()方法，阻止扩展
  /*
拦截Object.preventExtensions()。该方法必须返回一个布尔值。
只有当Object.isExtensible(proxy)为false（即不可扩展）时，proxy.preventExtensions才能返回true，否则会报错。
  */
var p = new Proxy({}, {
    preventExtensions: function(target) {
      return true;
    }
  });
  Object.preventExtensions(p) // 报错
  //proxy.preventExtensions方法返回true，但这时Object.isExtensible(proxy)会返回true，因此报错。
//为了防止出现这个问题，通常要在proxy.preventExtensions方法里面，调用一次Object.preventExtensions。
var p = new Proxy({}, {
    preventExtensions: function(target) {
      console.log("called");
      Object.preventExtensions(target);
      return true;
    }
  });
  
  Object.preventExtensions(p)
  // "called"
  // true



  //setPrototypeOf()方法：拦截Object.setPrototypeOf方法
  var handler = {
    setPrototypeOf (target, proto) {
      throw new Error('Changing the prototype is forbidden');
    }
  };
  var proto = {};
  var target = function () {};
  var proxy = new Proxy(target, handler);
  proxy.setPrototypeOf(proxy, proto);
  // Error: Changing the prototype is forbidden
  //只要修改target的原型对象，就会报错。

  //Proxy.revocable(),返回一个可取消的Proxy实例。
let target = {};
let handler = {};
let {proxy, revoke} = Proxy.revocable(target, handler);
proxy.foo = 123;
proxy.foo // 123
revoke();
proxy.foo // TypeError: Revoked
//Proxy.revocable方法返回一个对象，该对象的proxy属性是Proxy实例，revoke属性是一个函数，可以取消Proxy实例。上面代码中，当执行revoke函数之后，再访问Proxy实例，就会抛出一个错误。

