define(function (require, exports, module) {
    require.async("jquery", function () {
        require.async("jqueryColor", function () {
            require.async("js/core/dp_mz_v2.js", function () {
                jQuery(function ($) {

                    require.async("./main.js");
                });
            });
        });
    });
});
