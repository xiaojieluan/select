/*
给定一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？找出所有满足条件且不重复的三元组。

注意：答案中不可以包含重复的三元组。

例如, 给定数组 nums = [-1, 0, 1, 2, -1, -4]，

满足要求的三元组集合为：
[
  [-1, 0, 1],
  [-1, -1, 2]
]

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/3sum
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

*/
var threeSum = function(nums) {
    console.log(nums);
    var len = nums.length;
    var sum = 0;
    var res = [];
    for(var i=0;i<len-1;i++) {
        for(var j=i+1;j<len;j++) {
            sum = nums[i]+nums[j];
            var index = nums.indexOf(0-sum);
            if(index == -1) continue;
            else {
                if(index == i || index == j) continue;
                else {
                    var temp = [];
                    temp.push(nums[i]);
                    temp.push(nums[j]);
                    temp.push(nums[index]);
                    for(var k = 0;k<res.length;k++) {
                        if(res[k].sort().toString() == temp.sort().toString()) 
                          break;  
                    }
                    if(k == res.length) res.push(temp);
                }
            }
        }
    }
    return res;
};
var nums = [-1, 0, 1, 2, -1, -4];
var res = threeSum(nums);
console.log(res);
//上面这个解法，时间复杂度过大
var threeSum2 = function(nums) {
  nums.sort((a,b) => a-b);  //排序
  var len = nums.length;
  var res = [];
  for(var i=0;i<len;i++) {
      if(nums[i] >0) break;
      if(i>0 && nums[i] == nums[i-1]) continue;  //去重
      var low = i+1;
      var high = len-1;
      while(low < high) {
          var sum = nums[i] + nums[low] + nums[high];
          if(sum == 0) {
              res.push([nums[i],nums[low],nums[high]]);
              while(low < high && nums[low] == nums[low+1]) low++;
              while(low <high && nums[high] == nums[high-1]) high--;
              low++;
              high--;
          }
          else if(sum < 0) low++;
          else high--; 
      }

  }
  return res;
}
var res2 = threeSum2(nums);
console.log(res2);