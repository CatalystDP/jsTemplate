/**
 * Created by dp on 14-4-5.
 */
(function(dm){
    var Iterator=dm.klass(null,{
        __construct:function(target){
            /*@param array target 目标数组*/
            this.targetArr=target;
            this.pointer=0;
            this.arrLength=target.length;
        },
        hasNext:function(){
        	return this.pointer<this.arrLength; 
        },
        next:function(){
        	if(this.hasNext())
        	{
        		this.pointer+=1;
        		return this.targetArr[this.pointer];
        	}
      		else
        	{
        		return null;
        	}
        },
        rewind:function(){
        	this.pointer=0;
        },//重置迭代器指针
        at:function(index){
        	return index<this.arrLength? this.targetArr[index]:null;
        },
        first:function(){
        	return this.targetArr[0];
        },
        end:function(){
        	return this.targetArr[this.arrLength-1];
        },
        forEach:function(factory){
        	/*
        	@param function factory 回调函数，用来处理每一个数组元素
        	factory可传入三个参数,1:当前元素,2:当前索引,3:当前数组
        	*/
        }
    });
})(dm);