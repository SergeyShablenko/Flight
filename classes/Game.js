var Game = function (element, options) {
    this.element = element;
    this.$element = $(element);
    this.options = $.extend({}, this.DEFAULT_OPTIONS, options);

    this.map = null;
    this.started = false;
    this.t = Date.now();
    this.playerId = null;
    this.planes = {};

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
        ctx = canvas.getContext('2d'),
        tmp = null;

    this.options.screenHeight = window.innerHeight;
    this.options.screenWidth = window.innerWidth;

    canvas.width = this.options.screenWidth;
    canvas.height = this.options.screenHeight;

    this.map = new Map(ctx, {
        screenWidth: this.options.screenWidth,
        screenHeight: this.options.screenHeight
    });

    tmp = new Plane(ctx, 'player 1', 13, 6, 26, 20000, 130000, 3, 5);
    tmp.index = 0;
    this.planes[tmp.index] = $.extend(true, {}, tmp);
    this.playerId = tmp.index;
    delete(tmp);

    /** test **/
/*
    for (var i=1; i<=20; i++) {
        tmp = new Plane(ctx, 'player ' + i, 13, 6, 26, 20000, 130000, 3, 5);
        tmp.currentSpeed = Math.random() * 200;
        tmp.index = i;
        this.planes[tmp.index] = $.extend(true, {}, tmp);
        delete(tmp);
    }
*/
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
    this.map.follow(this.planes[this.playerId].x, this.planes[this.playerId].y);

    var interval = this.map.getDrawingInterval();

    this.map.draw();
    $.each(this.planes, function () {
        if (this.x < interval.x || this.x > interval.x1 || this.y < interval.y || this.y > interval.y1) {
            return;
        }

        this.draw();
    });

    var dt = (Date.now() - this.t) / 1000;
    this.t = Date.now();

    $.each(this.planes, function () {
        this.update(dt);
    });
};

Game.prototype.initPlayerControls = function () {
    var self = this;
    $(document).on('keydown', function (e) {
        if (-1 !== $.inArray(e.which, [87, 38])) {
            self.planes[self.playerId].accelerate();
        }
        if (-1 !== $.inArray(e.which, [83, 40])) {
            self.planes[self.playerId].slowDown();
        }
        if (-1 !== $.inArray(e.which, [65, 37])) {
            self.planes[self.playerId].rotate(-1);
        }
        if (-1 !== $.inArray(e.which, [68, 39])) {
            self.planes[self.playerId].rotate(1);
        }
    });

    $(document).on('keyup', function (e) {
        if (-1 !== $.inArray(e.which, [87, 38])) {
            self.planes[self.playerId].stopEngine();
        }
    });
};
