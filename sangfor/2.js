class Base {
    constructor () {
        this.name = 'base';
    }
}
class Test extends Base {
    name =  'xxx';   //这行代码会报错
    constructor() {
        this.name = 'Test';
        super();
    }
}
var test = new Test();
console.log(test.name);
console.log(name);
//这道题会报错