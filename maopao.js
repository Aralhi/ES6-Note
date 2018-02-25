//https://segmentfault.com/a/1190000000471260
//实现基本思路：冒泡排序是经过n-1趟子排序完成的，第i趟子排序从第1个数至第n-i个数，若第i个数比后一个数大（则升序，小则降序）则交换两数。
let arr = [1, 3, 2]
let len = arr.length

for(let i = 0; i < len; i++){
    for(let j = 0; j < len-i-1; j++){
        if(arr[j]>arr[j+1]){
            temp=arr[j];
            arr[j]=arr[j+1];
            arr[j+1]=temp;
        }
    }
}

    ///时间复杂度 n^2