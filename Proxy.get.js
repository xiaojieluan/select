/*get()方法
get方法用于拦截某个属性的读取操作
*/

var person = {
    name: "张三"
  };
  
var personProxy = new Proxy(person, {
    get: function(target, property) {  //target表示目标对象person，property表示person的属性
        if (property in target) {
        return target[property];
        } else {
        throw new ReferenceError("Property \"" + property + "\" does not exist.");
        }
    }
});
  
  console.log(personProxy.name); // "张三"
  console.log(personProxy.age); // 抛出一个错误
  //向外暴露的是personProxy
//如果访问目标对象不存在的属性，会抛出一个错误。如果没有这个拦截函数，访问不存在的属性，只会返回undefined

let proto = new Proxy({}, {
    get(target, propertyKey, receiver) {
      console.log('GET '+propertyKey);
      return target[propertyKey];
    }
  });
  
  let obj = Object.create(proto);
 console.log( obj.xxx );// "GET xxx"
 //拦截操作定义在Prototype对象上面，所以如果读取obj对象继承的属性时，拦截会生效。


 //使用get拦截，实现数组读取负数的索引。
 function createArray(...elements) {
  let handler = {
    get(target, propKey, receiver) {
      let index = Number(propKey);
      if (index < 0) {
        propKey = String(target.length + index);
      }
      return Reflect.get(target, propKey, receiver);
    }
  };

  let target = [];
  target.push(...elements);
  return new Proxy(target, handler);
}

let arr = createArray('a', 'b', 'c');
console.log(arr[-1]); // c
//上面代码中，数组的位置参数是-1，就会输出数组的倒数最后一个成员。


//利用 Proxy，可以将读取属性的操作（get），转变为执行某个函数，从而实现属性的链式操作。
var pipe = (function () {
  return function (value) {
    var funcStack = [];
    var oproxy = new Proxy({} , {
      get : function (pipeObject, fnName) {
        if (fnName === 'get') {
          return funcStack.reduce(function (val, fn) {
            return fn(val);
          },value);
        }
        funcStack.push(window[fnName]);
        return oproxy;
      }
    });

    return oproxy;
  }
}());

var double = n => n * 2;
var pow    = n => n * n;
var reverseInt = n => n.toString().split("").reverse().join("") | 0;

var res = pipe(3).double.pow.reverseInt.get; // 63
console.log(res);


//利用get拦截，实现一个生成各种DOM节点的通用函数dom。
const dom = new Proxy({}, {
  get(target, property) {
    return function(attrs = {}, ...children) {
      const el = document.createElement(property);
      for (let prop of Object.keys(attrs)) {
        el.setAttribute(prop, attrs[prop]);
      }
      for (let child of children) {
        if (typeof child === 'string') {
          child = document.createTextNode(child);
        }
        el.appendChild(child);
      }
      return el;
    }
  }
});

const el = dom.div({},
  'Hello, my name is ',
  dom.a({href: '//example.com'}, 'Mark'),
  '. I like:',
  dom.ul({},
    dom.li({}, 'The web'),
    dom.li({}, 'Food'),
    dom.li({}, '…actually that\'s it')
  )
);

document.body.appendChild(el);
