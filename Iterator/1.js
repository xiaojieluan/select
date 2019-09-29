//模拟next返回值的方法

function makeInterator(arr) {
    var index = 0;
    return {
        next:function() {
            return index<arr.length?
            {value:arr[index++]} :
            {done:true}
        }
    }
}
var it = makeInterator([1,2,3]);
console.log(it.next());
console.log(it.next());
console.log(it.next());
