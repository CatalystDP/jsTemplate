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
            var F;
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
                    F=function(){};
                    F.prototype=Parent;
                    Child.prototype = new F();
                    Child.superKlass = Parent;
                }
                else if (typeof Parent == "function") {
                        F = function () {
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
        var e = dm.event = {};
        e.create = function () {
            return new EventsHandler();//内置一个dom无关事件处理
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
            var c = this._callbacks;
            if (!events) {
                for (var p in c)
                    delete c[p];
                return this;
            }//删除所有事件
            if (Object.prototype.toString.call(events) == "[object Array]")
                for (var i = 0, j = events.length; i < j; i++) {
                    delete c[events[i]];
                }
            if (typeof events == "string")
                delete c[events];
            return this;
        };//移除一个事件
    })();//Events类
    (function () {
        dm.SandBox = function () {
            /*
            * @param */
            var args = Array.prototype.slice.call(arguments, 0),
                callback,
                length = args.length;
            var ex = {};//导出对象
            if (length == 1) {
                //此时是有factory参数为一个无参匿名函数
                callback = args.pop();
                callback.call(ex);
            }
            else if (length == 2 && (Object.prototype.toString.call(args[0]) == "[object Array]")) {
                callback = args.pop();
                callback.apply(ex, args[0]);
            }
            else {
                callback = args.pop();
                callback.apply(ex, args);
            }
            return ex;
        };
    })();//沙箱类
    var r={
        addRouter: function (name, args, factory) {
            /*
             * 1、[@param String routerName 路由名称
             * @param Array arglist 传递给factory参数列表
             * @param Function factory 沙箱函数参数为arglist传递]
             *
             * 2、[@param Array [{name:'',args:[],factory:function(){}}]
             *       数组里可放多个对象
             * ]
             * @return Object this 返回当前对象;
             * */
            var routerStore = this.routerStore;
            var argList = Array.prototype.slice.call(arguments, 0);
            var i, j, currentList;
            if (argList.length == 1 && (Object.prototype.toString.call(argList[0]) == "[object Array]")) {
                for (i = 0, j = argList[0].length; i < j; i++) {
                    currentList = argList[0][i];
                    if (currentList.args && (currentList.args.length != 0))
                        routerStore[currentList.name] = dm.SandBox(currentList.args, currentList.factory);
                }
                return this;
            }//参数demo [{name:'',args:[],factory:function(){}}]
            if (typeof args == "function") {
                factory = args;
                routerStore[name] = dm.SandBox(factory);
                return this;
            }
            if (Object.prototype.toString.call(args) == "[object Array]")
                routerStore[name] = dm.SandBox(args, factory);
            return this;
        },//内部封装Sandbox
        removeRouter: function () {
            var p, routerStore = this.routerStore, tmp;
            if (arguments.length == 0) {
                for (p in routerStore)
                    delete routerStore[p];
                return this;
            }//没有参数时删除所有ROUTER
            var args = Array.prototype.slice.call(arguments),
                length = args.length;
            if ((Object.prototype.toString.call(args[0]) == "[objec Array]")) {
                tmp = args[0];
            }
            if (length >= 1) {
                tmp = args;
            }
            for (var i = 0, j = tmp.length; i < j; i++)
                delete routerStore[tmp[i]];
            return this;
        }
    };//父ROUTER，需要被view,controller,model继承
    (function () {
        var Controller = dm.klass(r, {
                __construct: function (config) {
                    var configEv;
                    this.domStore = config ? (config.domStore ? config.domStore : {}) : {};
                    this.routerStore = {};//存放router名与内部沙箱导出对象映射
                    var ev = this.events = dm.event.create();
                    if (config)
                        if (config.events) {
                            configEv = config.events;
                            for (var p in configEv)
                                ev.on(p, configEv[p]);
                        }
                },
                addDom: function () {
                    var args = Array.prototype.slice.call(arguments, 0);
                    var p;
                    if ((args.length == 1) && (typeof args[0] == "object")) {
                        for (p in args[0])
                            this.domStore[p] = args[0][p];
                    }
                    if (args.length == 2)
                        this.domStore[args[0]] = args[1];
                    return this;
                },
                removeDom: function () {
                    var args = Array.prototype.slice.call(arguments, 0);
                    var i, j, tmp, d = this.domStore;
                    if (args.length == 1 && (Object.prototype.toString.call(args[0]) == "[object Array]")) {
                        tmp = args[0];
                        for (i = 0, j = tmp.length; i < j; i++)
                            delete d[tmp[i]];
                    }
                    if (args.length > 1) {
                        for (i = 0, j = args.length; i < j; i++)
                            delete d[args[i]];
                    }
                    return this;
                },
                addEvent: function () {
                    var args = Array.prototype.slice.call(arguments, 0);
                    var p, ev = this.events;
                    if (args.length == 1 && (typeof args[0] == "object"))
                        for (p in args[0])
                            ev.on(p, args[0][p]);
                    if (args.length == 2) {
                        if ((typeof args[0] == 'string') && (typeof args[1] == "function"))
                            ev.on(args[0], args[1]);
                    }
                    return this;
                },
                removeEvent: function () {
                    if (arguments.length == 0) {
                        this.events.off();
                        return this;
                    }
                    var args = Array.prototype.slice.call(arguments, 0),
                        length = args.length;
                    var ev = this.events;
                    if (length == 1 && (Object.prototype.toString.call(args[0]) == "[object Array]")) {
                        ev.off(args[0]);
                    }
                    if (length == 1 && (typeof args[0] == 'string'))
                        ev.off(args[0]);
                    if (length > 1) {
                        ev.off(args);
                    }
                }
            }
        );
        dm.Controller=Controller;
    })();//Controller类
    (function () {
        /*
        * model要使用事件之前必须与至少一个控制器绑定*/
        var m = dm.model = {};
        var Model = dm.klass(null, {
            __construct: function () {
                this.events = {};
                this.record = {};
            },
            addRecord: function () {
                var args = Array.prototype.slice.call(arguments, 0),
                    length = args.length;
                var record = this.record;
                if (length == 1 && (Object.prototype.toString.call(args[0]) == "[object Object]")) {
                    for (var p in args[0])
                        record[p] = args[0][p];
                    return this;
                }
                if (length == 2 && (typeof args[0] == "string"))
                    record[args[0]] = args[1];
            },
            removeRecord:function(){
                var p,record=this.record,args,length, i,j;
                if(arguments.length==0)
                {
                    for(p in record)
                        delete record[p];
                    return this;
                }
                args=Array.prototype.slice.call(arguments,0);
                length=args.length;
                if(length==1&&(Object.prototype.toString.call(args[0])=="[object Array]")){
                    for(i=0,j=args[0].length;i<j;i++)
                        delete record[args[0][i]];
                    return this;
                }
                for(i=0,j=args.length;i<j;i++)
                    delete record[args[i]];
                return this;
            },
            fetchData:function(options){
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
            }
        });
        m.create = function () {
            return new Model();
        };

        var p = Model.prototype;
        p.fetchData = function (options) {

        };
        p.requestRouter = function (name) {
            /*@param String name 请求路由的名字(必须)
             * @param Function callback用于返回数据*/
            var args = Array.prototype.slice.call(arguments, 0);
            var f, _ = this;
            args.shift();
            if ((f = _[name]) != undefined) {
                if (args.length == 1 && (typeof args[0] == "function"))
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


})(window, $);//基于导入全局变量
