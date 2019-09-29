let oo = {
    get sangfor() {
        console.log('get');
        return '1';   //需要return语句,oo.sangfor访问才能拿到值
    },
    set sangfor(val) {
        console.log('set');
    }
}
oo.sangfor = '100';  //先设置值，所以先打印set
console.log(oo.sangfor);