(function(_dm){
    var _slice=[].slice;
    function Promise(fn){
        if(!this instanceof Promise){
            return new Promise(fn);
        }
        this.fn=fn;
    }
    var _proto=Promise.prototype;
    _proto.then=function(fn){
        return this.next=new Promise(fn);
    };
    _proto.resolve=function(){
        var args=_slice.call(arguments);
        this.next && args.unshift(this.next);
        this.fn.apply(null,args);
    };
    dm.registLib('Promise',Promise);
})(dm);
