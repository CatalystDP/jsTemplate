define(function(require,exports,module){
    require("jquery");
    require("jqueryColor");
    var Model,View,Controller;
    jQuery(function($){
        Controller=require("./Controller.js");
        Controller.init($);
    });
});
