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
    fps: 60
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
    this.plane = new Plane(ctx, 'player 1', 75, 25, 0.01, 30);

    this.initPlayerControls();
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
    this.plane.draw();

    var dt = Date.now() - this.t;
    this.t = Date.now();

    if (dt > this.fpsts) {
        dt = this.fpsts;
    }

    this.map.update(dt);
    this.plane.update(dt);
};

Game.prototype.initPlayerControls = function () {
    var self = this;
    $(document).on('keydown', function (e) {
        if (-1 !== $.inArray(e.which, [87, 38])) {
            self.plane.accelerate();
        }
        if (-1 !== $.inArray(e.which, [65, 37])) {
            self.plane.rotate(-1);
        }
        if (-1 !== $.inArray(e.which, [68, 39])) {
            self.plane.rotate(1);
        }
    });
};
