function A(x){
    this.x = x;
 }
A.prototype.x = 1;
    
function B(x){
    this.x = x;
}
B.prototype = new A();

var a = new A(2), b = new B(3);
delete b.x;

console.log(a.x);  //2
console.log(b.x);  //2

/*
B.prototype = new A();
//B.prototype = { x :undefined }

var b = new B(3);
//b =  {x :3}
//b._proto_ = B.prototype = { x:undefined }

delete b.x
//b = { }
//b._proto_ = B.prototype = { x:undefined }
*/