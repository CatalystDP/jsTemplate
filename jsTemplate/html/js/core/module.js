(function(dm, undefined) {
	var m = dm.module = {};
	var moduleStore = {}, fileStore = {};
	toString = Object.prototype.toString;
	var type;
	var body = document.getElementsByTagName("body")[0];
	var Status = {
		EXECING: 0,
		EXECED: 1
	};
	m.define = function(name, dep, factory) {
		/*
		@param String name 模块的名字
		@param Function factory 工厂函数
		需传入参数module，module里包含所有在name,dep中包含的模块
		@param Array dep 依赖的模块*/
		var module = {};
		module.status = Status["EXECING"];
		type = toString.call(dep);
		if (type == "[object Array]")
			module.dependencies = dep;
		if (type == "[object Function]") {
			factory = dep;
			dep = undefined;
		}
		if (!moduleStore[name]) {
			module['name'] = name;
			module['factory'] = factory;
			moduleStore[name] = module;
		}
		module.status = Status["EXECED"];
		return moduleStore[name];
	};
	m.use = function(name) {
		var c = {}, dep;
		if (moduleStore[name]) {
			c[name] = moduleStore[name];
			dep = c[name]['dependencies'];
			if (dep && dep.length != 0) {
				for (var i = 0, j = dep.length; i < j; i++) {
					if (!moduleStore[dep[i]])
						continue;
					c[dep[i]] = moduleStore[dep[i]];
				}
			}
			moduleStore[name]['factory'](c);
		} else
			console.log("当前模块不存在");
		return this;
	};
	m.require = function(path, callback) {
		var content, status;
		var node,_this=this;
		node=document.createElement("script");
		node.src=path;
		node.onload=function(){
			fileStore[path]=true;
			body.removeChild(node);
			node.onload=null;
			callback(_this);
		};
		body.appendChild(node);
	};

})(dm, window.undefined);