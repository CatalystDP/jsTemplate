define(function (require, exports, module) {
    require.async("jquery", function () {
        require.async("jqueryColor", function () {
            require.async("js/core/dp_mz.js", function () {
                jQuery(function ($) {
                    require.async("./controller.js");
                });
            });
        });
    });
});
