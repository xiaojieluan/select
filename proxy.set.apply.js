//set方法
//set方法用来拦截某个属性的赋值操作。

//场景一，假定Person对象有一个age属性，该属性应该是一个不大于200的整数，那么可以使用Proxy保证age的属性值符合要求。
let validator = {
    set: function(obj, prop, value) {
      if (prop === 'age') {
        if (!Number.isInteger(value)) {
          throw new TypeError('The age is not an integer');  //如果不是数值，则报错
        }
        if (value > 200) {
          throw new RangeError('The age seems invalid');  //如果大于200，报错
        }
      }
  
      // 对于age以外的属性，直接保存
      obj[prop] = value;
    }
  };
  
  let person = new Proxy({}, validator);
  person.age = 100;
  person.age // 100
  person.age = 'young' // 报错
  person.age = 300 // 报错
//利用set方法，还可以数据绑定，即每当对象发生变化时，会自动更新DOM。

//场景二
//有时，我们会在对象上面设置内部属性，属性名的第一个字符使用下划线开头，表示这些属性不应该被外部使用。结合get和set方法，就可以做到防止这些内部属性被外部读写。
var handler = {
    get (target, key) {
      invariant(key, 'get');
      return target[key];
    },
    set (target, key, value) {
      invariant(key, 'set');
      target[key] = value;
      return true;
    }
  };
  function invariant (key, action) {
    if (key[0] === '_') {
      throw new Error(`Invalid attempt to ${action} private "${key}" property`);
    }
  }
  var target = {};
  var proxy = new Proxy(target, handler);
  proxy._prop
  // Error: Invalid attempt to get private "_prop" property
  proxy._prop = 'c'
  // Error: Invalid attempt to set private "_prop" property





  //apply()方法，apply方法拦截函数的调用、call和apply操作。
  var handler = {
    apply (target, ctx, args) {
      return Reflect.apply(...arguments);
    }
  };
//参数解析：apply方法可以接受三个参数，分别是目标对象、目标对象的上下文对象（this）和目标对象的参数数组。

//例子一：变量p是Proxy的实例，当它作为函数调用时（p()），就会被apply方法拦截，返回一个字符串。
var target = function () { return 'I am the target'; };
var handler = {
  apply: function () {
    return 'I am the proxy';
  }
};
var p = new Proxy(target, handler);
p()
// "I am the proxy"

//例子二：每当执行proxy函数（直接调用或call和apply调用），就会被apply方法拦截。
//另外，直接调用Reflect.apply方法，也会被拦截。
var twice = {
    apply (target, ctx, args) {
      return Reflect.apply(...arguments) * 2;
    }
  };
  function sum (left, right) {
    return left + right;
  };
  var proxy = new Proxy(sum, twice);
  proxy(1, 2) // 6
  proxy.call(null, 5, 6) // 22
  proxy.apply(null, [7, 8]) // 30
  Reflect.apply(proxy, null, [9, 10]) // 38
  