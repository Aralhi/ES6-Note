function binarySearch(arr,key){
       var low=0,
           high=arr.length-1,
           mid=Math.floor((low+high)/2);
       while(low<=high){
           mid=Math.floor((low+high)/2);
           if(key==arr[mid]){
               return mid;
           }else if(key<arr[mid]){
               high=mid-1;
          }else{
              low=mid+1;
          }
      }
      return -1;
  }