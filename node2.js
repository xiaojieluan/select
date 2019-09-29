var length = 10;
function fn() {
    console.log('1:'+this);
    console.log(this.length);
}
var obj = {
    length:5,
    mathod:function(fn) {
        //console.log(this);
        fn();
        arguments[0]();
        console.log(arguments);
    }
}
obj.mathod(fn,1);