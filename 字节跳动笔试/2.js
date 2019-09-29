console.log(([])?true:false);   //true
console.log(([]==false)?true:false);   //true
console.log(({}==false)?true:false) ;  //false
console.log([] == ![]);  //true
console.log({} == !{});  //false
/*
[] == ! []   ->   [] == false  ->  [] == 0  ->   '' == 0   ->  0 == 0   ->  true
[]会调用toString()方法 == ''
{} == ! {}   ->   {} == false  ->  {} == 0  ->   NaN == 0    ->  false
{}会调用toString()方法 == NaN
*/
console.log('------------------');

console.log(1 +  "2" + "2");  //122
console.log(1 +  +"2" + "2");  //32
console.log(1 +  -"1" + "2");  //02
console.log(+"1" +  "1" + "2");  //112
console.log( "A" - "B" + "2");    //NaN2
console.log( "A" - "B" + 2);  //NaN
console.log('------------------');

console.log(Number(true));  
console.log(Number(222));   
console.log(Number(null));  
console.log(Number(undefined));  
var obj = {
    a:'111'
};
console.log(Number({}));  //NaN
console.log(Number(obj)); //NaN

console.log(Number('aaa'));
console.log(Number('111'));  
console.log(Number('11.1'));  
console.log(Number('1234fdghs'));  
console.log(Number('0Xf000000000000000'));
console.log(Number('0x7FFFFFFFFFFFFFFF'));
console.log(Number(''));  //0

console.log('------------------');
console.log(parseInt('1234blue'));
console.log(parseInt('blue1234'));
console.log(parseInt('12blue34'));

console.log(Number('12blue34'));

console.log([].toString());  //''
console.log({}.toString());   //'[object Object]'
console.log(true.toString());  //'true'

console.log({} == {});  //false  NaN != NaN

console.log(2..toString());
console.log(2 .toString());
console.log((2).toString());

var res1 = 'foo' == new function() {return new String('foo')};
console.log(res1);
console.log('--'+![]);
console.log(!0);
console.log([] == 0);
var res2 = [1,2,-3].reduce((a, b) => a - b);
console.log(res2);


