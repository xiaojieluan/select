let xx = {
    sangfor:100
}
Object.defineProperty(xx,'sangfor',{
    get() {
        return 200;
    }
})

xx.sangfor = 300;
console.log(xx.sangfor);  //虽然xx.sangfor被设置为300，但是xx.sangfor访问的时候会直接调用get方法返回200