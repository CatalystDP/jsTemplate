/**
 * Created by dp on 14-2-11.
 */
define(function (require, exports, module) {
    var body, $ = jQuery, $dm = dm;
    module.exports = {
        exModel: null,
        init: function (b) {
            body = b;
            this.exModel = run();
        }
    };
    function run() {
        var modelCollection = {};
        require.async("js/lib/iterator");
        //your code goes here

        return modelCollection;
    }
});