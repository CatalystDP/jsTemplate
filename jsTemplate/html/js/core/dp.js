(function (root, $) {
    if (!$) {
        alert("jQuery未加载");
        return;
    }
    var dm = root.dm = {};//向全局对象添加dm属性
    if (!root.Object.create)
        dm.create = function (o) {
            var F = function () {
            };
            F.prototype = o;
            return new F();
        };
    else
        dm.create = root.Object.create;//对象生成器
    (function () {
        dm.klass = function (Parent, props) {
            var Child, i;
            Child = function () {
                if (Child.superKlass && Child.superKlass.hasOwnProperty("__construct")) {
                    Child.superKlass.__construct.apply(this, arguments);
                    //Child.superKlass指向parent的原型
                }
                if (Child.prototype.hasOwnProperty("__construct")) {
                    Child.prototype.__construct.apply(this, arguments);
                }
            };
//构造函数内判断__construct
            Parent = Parent || Object;
            if (Parent !== Object) {
                if (typeof Parent == "object") {
                    Child.prototype = Parent;
                    Child.superKlass = Parent;
                }
                else if (typeof Parent == "function") {
                    var F = function () {
                    };
                    F.prototype = Parent.prototype;
                    Child.prototype = new F();
                    Child.superKlass = Parent.prototype;
                }
            }
//    继承
            Child.prototype.constructor = Child;
//    将props中的属性放到Child原形中
            for (i in props) {
                if (props.hasOwnProperty(i))
                    Child.prototype[i] = props[i];
            }
            return Child;
        };

    })();
    (function () {
        var c = dm.controller = {};
        c.create = function () {
            return new function () {
                this.domMap = new DomMap();//Dom关系表
            };
        };

        function DomMap() {
            this.dMap = {};
        }

        var domP = DomMap.prototype;
        domP.insertMap = function (domName, selector) {
            this.dMap[domName] = selector;
            return this;
        };
        domP.removeMap = function (domName) {
            delete this.dMap[domName];
            return this;
        };
    })();//Controller类
    (function () {
        var m = dm.model = {};
        m.create = function () {
            return new Model();
        };
        function Model() {
            this.record = {};
        }

        var p = Model.prototype;
        p.fetchData = function (options) {
            /*options:{reqWay:"get/post",reqUrl:"url",
             reqData:"data",
             reqDone:function(){},
             reqFail:function(){},
             reqAlways:function(){}
             }*/
            var way = eval("$." + options.reqWay.toLowerCase()),
                req;
            req = options.reqData !== undefined ? way(options.reqUrl, options.reqData) : way(options.reqUrl);
            //req=way(options.reqUrl,options.reqData);
            req.
                done(options.reqDone || function () {
                }).
                fail(options.reqFail || function () {
                }).
                always(options.reqAlways || function () {
                });
        };
        p.requestRouter = function (name) {
            /*@param String name 请求路由的名字(必须)
             * @param Function callback用于返回数据*/
            var args = Array.prototype.slice.call(arguments, 0);
            var f, _ = this;
            args.shift();
            if ((f = _[name]) != undefined) {
                if(args.length==1&&(typeof args[0]=="function"))
                    f(args[0]);
                else
                    f();
            }
        }
    })();//Model类
    (function () {
        var v = dm.view = {};
        v.create = function () {
            return new function () {
                this.render = new Render();
            };
        };
        function Render() {
            this.render = {};//内置渲染器名称空间
        }

        var p = Render.prototype;
        p.registerRender = function (name, callback) {
            /*
             * @param String name 渲染器名称
             * @param Function callback 渲染器
             * 渲染器模版function(selector,data)必须提供选择器和数据这两个参数*/
            this.render[name] = callback;
        };//注册一个渲染器
        p.renderRouter = function (name) {
            /*
             * @param String name 必须提供的渲染器的名称
             * */
            var args = Array.prototype.slice.call(arguments, 0),
                length;
            args.shift();//去除第一个参数
            length = args.length;
            if (length == 1 && (typeof args[0] == "object")) {
                this.render[name](args[0].selector, args[0].data);
            }//第二个参数为对象，包含selector与data两个属性
            if (length == 2) {
                this.render[name](args[0], args[1]);
            }//第二个参数为selector，第三个参数为data
        };//渲染器路由
    })();//view类
    (function () {
        var e = dm.event = {};
        e.create = function () {
            return new function () {
                this.eventHandler = new EventsHandler();//内置一个dom无关事件处理器
            };
        };
        function EventsHandler() {
            this._callbacks = {};//事件表
        }

        var ep = EventsHandler.prototype;
        ep.on = function (event, callback) {
            (this._callbacks[event] || (this._callbacks[event] = [])).push(callback);
            return this;
        };//注册一个事件
        ep.emit = function () {
            var args = Array.prototype.slice.call(arguments, 0),
                ev = args.shift();
            var list;
            if (!(list = this._callbacks[ev])) return this;
            for (var i = 0, j = list.length; i < j; i++)
                list[i].apply(null, args);
            return this;
        };//触发一个事件
        ep.off = function (events) {
            delete this._callbacks[events];
            return this;
        };//移除一个事件
    })();//Events类
    (function(){
        dm.SandBox=function(factory){
            if(typeof factory!="function")
                return false;
            factory.call(null);
        };
    })();//沙箱类
})(window, $);//基于导入全局变量
