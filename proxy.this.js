//this
//一旦proxy代理target.m，后者内部的this就是指向proxy，而不是target。
const target = {
    m: function () {
      console.log(this === proxy);
    }
  };
  const handler = {};
  
  const proxy = new Proxy(target, handler);
  
  target.m() // false
  proxy.m()  // true

/*
目标对象jane的name属性，实际保存在外部WeakMap对象_name上面，通过this键区分。由于通过proxy.name访问时，
this指向proxy，导致无法取到值，所以返回undefined。
*/
const _name = new WeakMap();
class Person {
  constructor(name) {
    _name.set(this, name);
  }
  get name() {
    return _name.get(this);
  }
}
const jane = new Person('Jane');
jane.name // 'Jane'
const proxy = new Proxy(jane, {});
proxy.name // undefined

/*
有些原生对象的内部属性，只有通过正确的this才能拿到，所以 Proxy 也无法代理这些原生对象的属性。
getDate方法只能在Date对象实例上面拿到，如果this不是Date对象实例就会报错。
*/
const target = new Date();
const handler = {};
const proxy = new Proxy(target, handler);
proxy.getDate();
// TypeError: this is not a Date object.

//这时，this绑定原始对象，就可以解决这个问题。
const target = new Date('2015-01-01');
const handler = {
  get(target, prop) {
    if (prop === 'getDate') {
      return target.getDate.bind(target);
    }
    return Reflect.get(target, prop);
  }
};
const proxy = new Proxy(target, handler);
proxy.getDate() // 1

