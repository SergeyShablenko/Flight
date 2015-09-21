var Game = function (element, options) {
    this.element = element;
    this.$element = $(element);
    this.options = $.extend({}, this.DEFAULT_OPTIONS, options);

    this.map = null;
    this.started = false;

    /** Variable which contains games main timer */
    this.proc = null;
};

Game.prototype.DEFAULT_OPTIONS = {
    screenWidth: 1024,
    screenHeight: 768
};

Game.prototype.init = function () {

};

Game.prototype.start = function () {

};

Game.prototype.stop = function () {

};