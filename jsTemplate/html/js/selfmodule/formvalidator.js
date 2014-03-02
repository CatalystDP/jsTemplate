(function (dm) {
    var $dm = dm,
        p;
    $dm.form = {};
    $dm.form.create = function () {
        return new validator();
    };
    function validator() {
        this.fn = validator.prototype;//对原型进行扩展
        this.instance = this;//基于对象的扩展;
        this.mapOfvalidator = {};//表单对象与验证器映射
    }

    p = validator.prototype;
    p.hasSpace = function (str) {
        var reg = /\s+/g;
        return ((str == "") || (str.match(reg) != null)) ? true : false;
    };
    p.isLegal = function (str, reg) {
        reg = reg || /\W+|SELECT|INSERT|UPDATE|CREATE|DROP|DELETE|null/gi;
        return str.match(reg) == null ? true : false;
    };
    p.config = function (method, func) {
        /*
         * method:""，扩展方式选择fn或instance,fn是对原型进行扩展,instance对对象进行扩展,
         * option是一个对象{
         *
         *   函数名:function(){},需要扩展的函数
         * }*/
        var self = this;
        if (Object.prototype.toString.call(func) != "[object Object]")
            return false;
        for (var p in func)
            self[method][p] = func[p];
    };
    p.addValidatorMap = function () {
        /*
         * 1.@param object  {表单对象：验证器}验证器类型为数组元素为Function类型
         * 2.@param [object],[array] obeject:表单对象,array:内部元素为Function类型,验证器函数*/
        var args = Array.prototype.slice.call(arguments, 0),
            length = args.length;
        var tmp;
        if (length == 1 && typeof args[0] == "object") {
            tmp = args[0];
            for (var p in tmp) {
                this.mapOfvalidator[p] = tmp[p];
            }
        }
        if (length == 2) {
            this.mapOfvalidator[args[0]] = args[1];
        }
    };
    p.removeValidatorMap = function () {
        var t=this.mapOfvalidator;
        if(!arguments[0]){
            for(var p in t)
                delete t[p];
            return;
        }
        var args = Array.prototype.slice.call(arguments, 0),
            length = args.length,
            tmp, i,j;
        if (length == 1) {
            if (typeof args[0] == "object")
                delete this.mapOfvalidator[args[0]];
            if (Object.prototype.toString.call(args[0]) == "[object Array]") {
                tmp=args[0];
                for(i=0,j=tmp.length;i<j;i++)
                    delete this.mapOfvalidator[tmp[i]];
            }
        }
    }
})(dm);
