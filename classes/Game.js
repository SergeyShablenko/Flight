var Game = function (element, options) {
    this.element = element;
    this.$element = $(element);
    this.options = $.extend({}, this.DEFAULT_OPTIONS, options);

    this.map = null;
    this.started = false;
    this.t = Date.now();
    this.fpsts = 1000 / this.options.fps;

    /** Variable which contains games main timer */
    this.proc = null;

    this.init();
    this.start();
};

Game.prototype.DEFAULT_OPTIONS = {
    screenWidth: 1024,
    screenHeight: 768,
    fps: 40
};

Game.prototype.init = function () {
    var canvas = this.$element.find('canvas')[0],
        ctx = canvas.getContext('2d');

    canvas.width = this.options.screenWidth;
    canvas.height = this.options.screenHeight;

    this.map = new Map(ctx, {
        screenWidth: this.options.screenWidth,
        screenHeight: this.options.screenHeight
    });
};

Game.prototype.start = function () {
    this.started = true;
    this.proc = setInterval($.proxy(this.gameProc, this), 1000 / this.options.fps);
};

Game.prototype.stop = function () {
    this.started = false;
    clearInterval(this.proc);
};

Game.prototype.gameProc = function () {
    this.map.draw();

    var dt = Date.now() - this.t;
    this.t = Date.now();

    if (dt > this.fpsts) {
        dt = this.fpsts;
    }

    this.map.update(dt);
};