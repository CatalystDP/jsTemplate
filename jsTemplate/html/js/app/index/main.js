define(function(require,exports,module){
	var $=jQuery,$dm=dm,
		body=$("body");
	require("js/core/module");
	$dm.module.require("js/app/index/test.js",function(module){
		var c=module.use("C");
	});
});