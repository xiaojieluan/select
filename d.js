var n = 3;
var x = [1,2,1];
var y = [8,5,2];
var m = x.reduce((pre,next) => {return pre+next;});
//console.log(m);
var job = m/2;  //将m人分成两组
var temp = [];
for(var i=0;i<n;i++) {
    if(x[i] == 1) temp.push(y[i]);
    else {
        while(x[i]>=1) {
            temp.push(y[i]);
            x[i]--;
        }
    }
}
var res = temp.sort(compare);
console.log(res);

function compare(a,b) {
    if(a>b) return 1;
    else return -1;
}

var low = 0;
var high = res.length-1;
var result = res[low]+res[high];
while(low<=high) {
   if(res[low] + res[high] <result) {
       console.log(low);
       result = res[low]+res[high];
       low++;
       high--;
   }
   else {
       low++;
       high--;
   }
}
console.log(result);