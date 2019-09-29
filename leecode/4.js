/*
给定一个包含 n 个整数的数组 nums 和一个目标值 target，判断 nums 中是否存在四个元素 a，b，c 和 d ，使得 a + b + c + d 的值与 target 相等？找出所有满足条件且不重复的四元组。

注意：
答案中不可以包含重复的四元组。
示例：
给定数组 nums = [1, 0, -1, 0, -2, 2]，和 target = 0。
满足要求的四元组集合为：
[
  [-1,  0, 0, 1],
  [-2, -1, 1, 2],
  [-2,  0, 0, 2]
]
来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/4sum
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
*/
var fourSum = function(nums, target) {
    nums.sort((a,b) => a-b);
    var res = [];
    var len = nums.length;
    for(var i=0;i<len-3;i++) {
         //去重
         if(i>0&&nums[i]==nums[i-1])continue;
         //优化，若i的连续四数之和大于target，后面肯定没有符合题意的组合，直接跳出
         if((nums[i]+nums[i+1]+nums[i+2]+nums[i+3])>target)
             break;
         //若i和前三大的数之和都小于target，那i肯定太小，遍历下一个
         if((nums[i]+nums[len-1]+nums[len-2]+nums[len-3])<target)
             continue;
        for(var j=i+1;j<len-2;j++) {
            //if(j>1 && nums[j] == nums[j-1]) continue;
            if(j>i+1&&nums[j]==nums[j-1])continue;
                //针对特殊情况优化，同上
                if((nums[i]+nums[j]+nums[j+1]+nums[j+2])>target)
                    break;
                if((nums[i]+nums[j]+nums[len-1]+nums[len-2])<target)
                    continue;
            var low = j+1;
            var high = len-1;
            while(low <high) {
                var sum = nums[i]+nums[j]+nums[low]+nums[high];
                if(sum == target) {
                    res.push([nums[i],nums[j],nums[low],nums[high]]);
                    while(low<high && nums[low] == nums[low+1]) low++;
                    while(low<high && nums[high] == nums[high-1]) high--;
                    low++;
                    high--;
                }
                else if(sum <target) {
                    low++;
                }else high--;
            }
        }
    }
    return res;
};
//var nums = [1, 0, -1, 0, -2, 2];
var nums = [-3,-2,-1,0,0,1,2,3];
//var nums = [0,0,0,0];
var target = 0;
var res = fourSum(nums,target);
console.log(res);