//Generater函数内部，调用另一个Generator函数，默认情况下是没有效果的。
function* foo() {
    yield 'a';
    yield 'b';
  }
  
  function* bar() {
    yield 'x';
    foo();
    yield 'y';
  }
  
  for (let v of bar()){
    console.log(v);
  }
  // "x"
  // "y"
  //这种情况下foo()没有效果

  //yield*语句，用来在一个Generator函数里面执行另一个Generator函数
  function* bar() {
    yield 'x';
    yield* foo();
    yield 'y';
  }
  // 等同于
  function* bar() {
    yield 'x';
    yield 'a';
    yield 'b';
    yield 'y';
  }
  // 等同于
function* bar() {
    yield 'x';
    for (let v of foo()) {
      yield v;
    }
    yield 'y';
  }
  
  for (let v of bar()){
    console.log(v);
  }
  // "x"
  // "a"
  // "b"
  // "y"
  //yield*语句加进去之后，for...of可以遍历所有的状态了

  //再看一个对比的例子
  function* inner() {
    yield 'hello!';
  }
  
  function* outer1() {
    yield 'open';
    yield inner();
    yield 'close';
  }
  
  var gen = outer1()
  gen.next().value // "open"
  gen.next().value // 返回一个遍历器对象
  gen.next().value // "close"
  
  function* outer2() {
    yield 'open'
    yield* inner()
    yield 'close'
  }
  var gen = outer2()
gen.next().value // "open"
gen.next().value // "hello!"
gen.next().value // "close"
//outer2使用了yield*，outer1没使用。结果就是，outer1返回一个遍历器对象，outer2返回该遍历器对象的内部值。

//再一个例子
let delegatedIterator = (function* () {
    yield 'Hello!';
    yield 'Bye!';
  }());
  
  let delegatingIterator = (function* () {
    yield 'Greetings!';
    yield* delegatedIterator;
    yield 'Ok, bye.';
  }());
  
  for(let value of delegatingIterator) {
    console.log(value);
  }
  // "Greetings!
  // "Hello!"
  // "Bye!"
  // "Ok, bye."
  /*delegatingIterator是代理者，delegatedIterator是被代理者。由于yield* delegatedIterator语句得到的值，
  是一个遍历器，所以要用星号表示。运行结果就是使用一个遍历器，遍历了多个Generator函数，有递归的效果。*/


  //yield*后面的Generator函数（没有return语句时），等同于在Generator函数内部，部署一个for...of循环。
  function* concat(iter1, iter2) {
    yield* iter1;
    yield* iter2;
  }
  
  // 等同于 
  function* concat(iter1, iter2) {
    for (var value of iter1) {
      yield value;
    }
    for (var value of iter2) {
      yield value;
    }
  }

  //任何数据结构只要有Iterator接口，就可以被yield*遍历。
  //遍历数组
  function* gen(){
    yield* ["a", "b", "c"];
  }
  
  gen().next() // { value:"a", done:false }
//遍历字符串
let read = (function* () {
    yield 'hello';
    yield* 'hello';
  })();
  
  read.next().value // "hello"
  read.next().value // "h"
  //yield语句返回整个字符串，yield*语句返回单个字符。因为字符串具有Iterator接口，所以被yield*遍历。


  //如果被代理的Generator函数有return语句，那么就可以向代理它的Generator函数返回数据。
  function *foo() {
    yield 2;
    yield 3;
    return "foo";
  }
  
  function *bar() {
    yield 1;
    var v = yield *foo();
    console.log( "v: " + v );
    yield 4;
  }
  
  var it = bar();
  
  it.next()
  // {value: 1, done: false}
  it.next()
  // {value: 2, done: false}
  it.next()
  // {value: 3, done: false}
  it.next();
  // "v: foo"
  // {value: 4, done: false}   会有两个输出，因为执行了return返回之后，还会再执行到下一个yield语句
  it.next()
  // {value: undefined, done: true}

  //又一个例子
  function* genFuncWithReturn() {
    yield 'a';
    yield 'b';
    return 'The result';
  }
  function* logReturned(genObj) {
    let result = yield* genObj;
    console.log(result);
  }
  
  [...logReturned(genFuncWithReturn())]
  // The result
  // 值为 [ 'a', 'b' ]
  /*
  上面代码中，存在两次遍历。第一次是扩展运算符遍历函数logReturned返回的遍历器对象，第二次是yield*语句遍历函数
  genFuncWithReturn返回的遍历器对象。这两次遍历的效果是叠加的，最终表现为扩展运算符遍历函数genFuncWithReturn
  返回的遍历器对象。所以，最后的数据表达式得到的值等于[ 'a', 'b' ]。但是，函数genFuncWithReturn的return语句
  的返回值The result，会返回给函数logReturned内部的result变量，因此会有终端输出。
   */

   //yield*命令可以很方便地取出嵌套数组的所有成员。yield命令遍历嵌套数组
   function* iterTree(tree) {
    if (Array.isArray(tree)) {
      for(let i=0; i < tree.length; i++) {
        yield* iterTree(tree[i]);
      }
    } else {
      yield tree;
    }
  }
  
  const tree = [ 'a', ['b', 'c'], ['d', 'e'] ];
  
  for(let x of iterTree(tree)) {
    console.log(x);
  }
  // a
  // b
  // c
  // d
  // e

  //yield命令遍历完全二叉树
  // 下面是二叉树的构造函数，
// 三个参数分别是左树、当前节点和右树
function Tree(left, label, right) {
    this.left = left;
    this.label = label;
    this.right = right;
  }
  
  // 下面是中序（inorder）遍历函数。
  // 由于返回的是一个遍历器，所以要用generator函数。
  // 函数体内采用递归算法，所以左树和右树要用yield*遍历
  function* inorder(t) {
    if (t) {
      yield* inorder(t.left);
      yield t.label;
      yield* inorder(t.right);
    }
  }
  
  // 下面生成二叉树
  function make(array) {
    // 判断是否为叶节点
    if (array.length == 1) return new Tree(null, array[0], null);
    return new Tree(make(array[0]), array[1], make(array[2]));
  }
  let tree = make([[['a'], 'b', ['c']], 'd', [['e'], 'f', ['g']]]);
  
  // 遍历二叉树
  var result = [];
  for (let node of inorder(tree)) {
    result.push(node);
  }
  
  result
  // ['a', 'b', 'c', 'd', 'e', 'f', 'g']

  //Generator函数总是返回一个遍历器,这个遍历器是Generator函数的实例，也继承了Generator函数的prototype对象上的方法。
  function* g() {}

g.prototype.hello = function () {
  return 'hi!';
};
let obj = g();
obj instanceof g // true obj是g的实例
obj.hello() // 'hi!'  obj可以访问g原型上的方法

//遍历器中访问this
function* g() {
    this.a = 11;
  }
  let obj = g();
  obj.a // undefined

  //generator函数跟new一起使用会报错
  function* F() {
    yield this.x = 2;
    yield this.y = 3;
  }
  new F()
  // TypeError: F is not a constructor

  //让Generator函数返回一个正常的对象实例，既可以用next方法，又可以获得正常的this的写法
  function* F() {
    this.a = 1;
    yield this.b = 2;
    yield this.c = 3;
  }
  var obj = {};
  var f = F.call(obj);  //以前是var f = F.call();现在改写成这样以后就可以用this了。
  
  f.next();  // Object {value: 2, done: false}
  f.next();  // Object {value: 3, done: false}
  f.next();  // Object {value: undefined, done: true}
  
  obj.a // 1
  obj.b // 2
  obj.c // 3
//上面代码中，执行的是遍历器对象f，但是生成的对象实例是obj，将这两个对象统一的一个办法就是将obj换成F.prototype。
function* F() {
    this.a = 1;
    yield this.b = 2;
    yield this.c = 3;
  }
  var f = F.call(F.prototype);
  f.next();  // Object {value: 2, done: false}
  f.next();  // Object {value: 3, done: false}
  f.next();  // Object {value: undefined, done: true}
  f.a // 1
  f.b // 2
  f.c // 3
  //再将F改成构造函数，就可以对它执行new命令了。
  function* gen() {
    this.a = 1;
    yield this.b = 2;
    yield this.c = 3;
  }
  function F() {
    return gen.call(gen.prototype);
  }
  var f = new F();
  f.next();  // Object {value: 2, done: false}
  f.next();  // Object {value: 3, done: false}
  f.next();  // Object {value: undefined, done: true}
  f.a // 1
  f.b // 2
  f.c // 3

  