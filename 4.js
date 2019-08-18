var neteaseArray = [3,4,5];
var neteaseSliceArray = neteaseArray.slice(0, 1);
var neteaseConcatArray = neteaseArray.concat("a");
var neteaseSpliceArray = neteaseArray.splice(0, 1);
console.log(neteaseArray);
console.log(neteaseSliceArray);
console.log(neteaseConcatArray);
console.log(neteaseSpliceArray);
/*

slice()返回截取的数组，不会改变原数组
concat()连接数组，返回新连接的数组，不会改变原数组
splice()返回删除的数组，会改变原数组

*/