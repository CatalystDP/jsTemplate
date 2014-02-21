(function (dm) {
    var $dm = dm,
        p;
    $dm.form = {};
    $dm.form.create = function () {
        return new validator();
    };
    function validator() {}

    p = validator.prototype;
    p.hasSpace = function (str) {
        var reg = /\s+/g;
        return ((str == "") || (str.match(reg) != null)) ? true : false;
    }
    p.isLegal = function (str,reg) {
        reg =reg || /\W+|SELECT|INSERT|UPDATE|CREATE|DROP|DELETE/gi;
        return str.match(reg) == null ? true : false;
    }
})(dm);
