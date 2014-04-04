(function (dm) {
    var s = {
        insertSort: (function () {
            var insertSort = function (arr, func) {
                /*@param array arr 待排序数组*/
                func = func || function (prev, current) {
                    if (prev > current)
                        return 1;
                    else
                        return 0;
                };
                var i, j, k, key;
                for (i = 1, k = arr.length; i < k; i++) {
                    key = arr[i];
                    j = i - 1;
                    while ((j > -1) && (func(arr[j], key))) {
                        arr[j + 1] = arr[j];
                        j = j - 1;
                    }
                    arr[j + 1] = key;
                }
            };
            return insertSort;
        })(),
        heapSort: (function () {
            var utils = {
                parent: function (i) {
                    return Math.floor(i / 2);
                },
                left: function (i) {
                    return 2 * i;
                },
                right: function (i) {
                    return 2 * i + 1;
                },
                maxHeap: function (arr, i) {
                    var k, l, r, largest = null, temp;
                    var status;
                    var heapSize=arr.length;
                    k = i;
                    status = true;
                    while (status) {
                        l = utils.left(k);
                        r = utils.right(k);
                        if ((l < heapSize) && (arr[l] > arr[k]))
                            largest = l;
                        else
                            largest = k;
                        if (r < heapSize && (arr[r] > arr[largest]))
                            largest = r;
                        if (largest != k) {
                            temp = arr[k];
                            arr[k] = arr[largest];
                            arr[largest] = temp;
                            k = largest;
                        }
                        else {
                            status = false;
                        }
                    }
                },
                buildMaxHeap: function (arr) {
                    var heapSize = arr.length,
                        node = Math.floor((heapSize - 1) / 2),
                        i, j;
                    for (i = node, j = 0; i >= j; i--) {
                        utils.maxHeap(arr,i);
                    }
                },
                minHeap: function (arr, i) {

                }
            };

            return function (arr, func, method) {
                /*
                 * @param array arr 要排序的数组
                 * @param Function func 排序函数
                 * @param string method 构建堆方式默认为最大堆[optional] max min*/
                func = func || undefined;
                method = method || "max";
                if(method=="max")
                    utils["buildMaxHeap"](arr);
                var i, j,length=arr.length;
                var temp,result=[];
                for(i=length-1,j=0;i>=j;i--){
                    temp=arr[0];
                    arr[0]=arr[i];
                    arr[i]=temp;
                    result.unshift(arr.pop());
                    utils.maxHeap(arr,0);
                }
                return result;
            }
        })(),
        mergeSort:(function(){
            return function(arr){

            }
        })()
    };
    var sort = dm.libs.sort = function (method) {
        /*@param string method 选择排序方法
         * @return 返回的结果为调用的排序方法对应的返回值*/
        var args = Array.prototype.slice.call(arguments, 0);
        args.shift();
        var m = method.toLowerCase() + "Sort";
        var r = s[m];
        return r;
    };

})(dm);
