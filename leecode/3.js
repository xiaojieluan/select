/*
给定一个包括 n 个整数的数组 nums 和 一个目标值 target。找出 nums 中的三个整数，使得它们的和与 target 最接近。返回这三个数的和。假定每组输入只存在唯一答案。

例如，给定数组 nums = [-1，2，1，-4], 和 target = 1.

与 target 最接近的三个数的和为 2. (-1 + 2 + 1 = 2).

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/3sum-closest
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
*/
var threeSumClosest = function(nums, target) {
    nums.sort((a,b) => a-b);
    var len = nums.length;
    var res = target - (nums[0] + nums[1] + nums[2]);
    for(var i=0;i<len-2;i++) {
       var low = i+1;
       var high = len-1;
       while(low < high) {
        var sum = nums[i] + nums[low] +nums[high];
        if(sum == target) return sum;  //如果sum 直接等于target，则可以直接返回
        else if(sum < target) {  
           while(nums[low] == nums[low+1]) low++;
           low++;
        }else {
            while(nums[high] == nums[high-1]) high--;
            high--;
        }
        //将与target最近的点储存起来
        if(Math.abs(target-sum) < Math.abs(res)) {
            res = target-sum;
        }
        
       }
     }
    return target-res;
};
var nums = [-1,2,1,-4];
var target = 1;
var res = threeSumClosest(nums,target);
console.log(res);
