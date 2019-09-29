var findMedianSortedArrays = function(nums1, nums2) {
    var m = nums1.length;
    var n = nums2.length;
    var arr = nums1.concat(nums2);
    arr.sort(compare);
    console.log(arr);
    if(arr.length%2 == 1) {
        //奇数
        return arr[(arr.length-1)/2];
    }
    else {  //偶数
        return (arr[arr.length/2-1]+arr[arr.length/2])/2;
    }
    
};
function compare(a,b){
    return a-b;
}
var nums1 = [1,2];
var nums2 = [3,4];
var res = findMedianSortedArrays(nums1,nums2);
console.log(res);
