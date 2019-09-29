var arr = [[12,'088888888888'],[3,'000'],[14,'13888888888888'],[8,'12345678']];
var telInfo;
var len;
var tel;
var res = [];
for(var i=0;i<arr.length;i++) {
    telInfo = arr[i];
    len = telInfo[0];
    tel = telInfo[1];
    if(len<11) res.push('NO');  
    else {
        var reg = /8/g;
        var arr_8 = tel.match(reg).join('');
        console.log(arr_8);
        if(arr_8.length >= 11) res.push('YES');
        else res.push('NO');
    }
}
for(var i=0;i<res.length;i++) {
    console.log(res[i]);
}