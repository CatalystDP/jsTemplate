var a=dm.module.define("A",function(module){
	console.log("in module A");
});
var b=dm.module.define("B",function(module){
	console.log("in module B");
});
var c=dm.module.define("C",["A","B"],function(module){
	console.log("in module C");
	console.log("has module A,B");
});
