/**
 * Created by DP on 14-2-8.
 */
define(function(require,exports,module){
    var Model,View,Controller,$;
    module.exports={
        init:function(jq){
            Model=require("./Model.js").init(jq);
            View=require("./View.js").init(jq);
            Controller=require("js/core/Controller.js").init(jq);
            $=jq;
            ControllerStart();
        }
    };
    function ControllerStart(){
        var testController=Controller.createController();//实例化一个控制器
    }
});