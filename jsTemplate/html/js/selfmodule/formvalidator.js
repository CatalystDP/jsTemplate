(function (dm) {
    var $dm = dm,
        p;
    $dm.form = {};
    $dm.form.create = function () {
        return new validator();
    };
    function validator() {
        this.fn=validator.prototype;//对原型进行扩展
        this.instance={};//基于对象的扩展;
    }

    p = validator.prototype;
    p.hasSpace = function (str) {
        var reg = /\s+/g;
        return ((str == "") || (str.match(reg) != null)) ? true : false;
    }
    p.isLegal = function (str,reg) {
        reg =reg || /\W+|SELECT|INSERT|UPDATE|CREATE|DROP|DELETE/gi;
        return str.match(reg) == null ? true : false;
    }
    p.config=function(method,func){
        /*
        * method:""，扩展方式选择fn或instance,fn是对原型进行扩展,instance对对象进行扩展,
        * option是一个对象{
        *
        *   函数名:function(){},需要扩展的函数
        * }*/
        var self=this;
        if(Object.prototype.toString.call(func)!="[object Object]")
            return false;
        for(var p in func)
            self[method][p]=func[p];
     }
})(dm);
