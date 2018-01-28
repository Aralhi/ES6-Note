function getAllArray(arr, num) {
	var r=[];
        (function f(t,a,n)
        {
            if (n==0)
            {
                return r.push(t);
           }
            for (var i=0,l=a.length; i<=l-n; i++)
            {
                f(t.concat(a[i]), a.slice(i+1), n-1);
            }
        })([],arr,num);
        return r;
}
getAllArray([1, 2, 3, 4], 3);
function getResult(arr, num, result){
    arrays = getAllArray(arr, num);
    for(var i=0; i<arrays.length; i++) {
        if(sum(arrays[i]) === result){
            console.info(arrays[i]);
        }
    }
}
function sum(array) {
    var result = 0;
    for(var i=0; i< array.length; i++) {
        result += array[i];
    }
    return result;
}