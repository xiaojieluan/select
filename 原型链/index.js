function Person(name){
    this.name = name;
}
Person.prototype.say = function () {
    console.log(this.name);
}
let lisi = new Person('lisi');
lisi.say();
let liwu = new Person('liwu');
liwu.say();
//console.log(lisi.say === liwu.say); // true
//console.log(lisi.hasOwnProperty('say'), liwu.hasOwnProperty('say')); // false false
