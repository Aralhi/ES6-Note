// 插入排序比冒泡排序要快，因为可以提前终止循环
function insertSort(arr){  
  var len=arr.length;  
  var temp,i,j;  
  for(i=1;i<len;i++){  
      temp=arr[i];  //暂时保存待插入元素  
      for(j=i-1;j>=0;j--){  
          if(temp<arr[j]){  
              arr[j+1]=arr[j]  
          }  
          else{
              break;  
          }  
      }  
      arr[j+1]=temp;  
  }  
}  

var arr=[49,38,65,97,76,13,27,49];  
insertSort(arr);  
alert(arr);  