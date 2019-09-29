var arr = [0,0,0,0,0,0,0];
function compare(a,b) {
    if(a>b) return 1;
    else return -1;
 }

 var min;
 var temp;
 arr = arr.sort(compare);
 if(arr.lastIndexOf(0) == arr.length-1) console.log(0);
 while(arr.length>0) {
    min = arr[0];
    console.log(min);
    arr.shift();
    temp = arr.map(val => val-min);
    console.log(temp);
    arr = temp;
 }