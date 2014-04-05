/**
 * Created by dp on 14-2-11.
 */
define(function (require, exports, module) {
    var body, $ = jQuery, $dm = dm;
    module.exports = {
        exView: null,
        init: function (b) {
            body = b;
            this.exView = run();
        }
    };
    function run() {
        require("js/selfmodule/banner-swap.js");
        var prev=body.find(".js-prev-btn"),
            next=prev.siblings(".js-next-btn");
        $(".banner").bannerSwap({duration:800,prev:prev,next:next});
        var effect = require("./effect.js");
        effect.init(body);//启动effect.js
        var viewCollection = {};

        //your code goes here
        return viewCollection;
    }
});
