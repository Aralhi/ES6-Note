//就是比参考元素小的放置左边部分，比参考元素大的放置右边部分，而后分别对两部分进行快排。
function quickSort(arr){
    if(arr.length<=1){
        return arr;//如果数组只有一个数，就直接返回；
    }

    var num = Math.floor(arr.length/2);//找到中间数的索引值，如果是浮点数，则向下取整
    var numValue = arr.splice(num,1);//找到中间数的值
    var left = [];
    var right = [];

    for(var i=0;i<arr.length;i++){
        if(arr[i]<numValue){
            left.push(arr[i]);//基准点的左边的数传到左边数组
        }
        else{
            right.push(arr[i]);//基准点的右边的数传到右边数组
        }
    }
    return quickSort(left).concat(numValue,quickSort(right));//递归不断重复比较
}