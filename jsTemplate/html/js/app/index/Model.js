/**
 * Created by DP on 14-2-8.
 */
define(function(require,exports,module){
    var Model,$;
    module.exports={
        init:function(jq){
            Model=require("js/core/Model.js").init(jq);
            $=jq;
            return this;
        },
        registEventHandler:function(model,eventObName,eventObject){
            model=eval(model);
            if(!model) return false;
            model.installEventHandler(eventObName,eventObject);
            return this;
        }
    };
});