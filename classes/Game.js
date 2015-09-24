var Game = function (element, options) {
    this.element = element;
    this.$element = $(element);
    this.options = $.extend({}, this.DEFAULT_OPTIONS, options);

    this.map = null;
    this.started = false;
    this.t = Date.now();

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

    this.options.screenHeight = window.innerHeight;
    this.options.screenWidth = window.innerWidth;

    canvas.width = this.options.screenWidth;
    canvas.height = this.options.screenHeight;

    this.map = new Map(ctx, {
        screenWidth: this.options.screenWidth,
        screenHeight: this.options.screenHeight
    });
    this.plane = new Plane(ctx, 'player 1', 26, 6, 1, 3, 5);

    /** test **/
    this.anotherPlanes = [];
    for (var i=0; i<20; i++) {
        this.anotherPlanes.push(new Plane(ctx, 'player 2', 30, 15, 1, 3, 5));
        this.anotherPlanes[i].currentSpeed = Math.random() * 200;
    }
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
    this.map.follow(this.plane.x, this.plane.y);
    this.map.draw();
    this.plane.draw();
    /** test **/
    for (var i=0; i<this.anotherPlanes.length; i++) {
        this.anotherPlanes[i].draw();
    }

    var dt = (Date.now() - this.t) / 1000;
    this.t = Date.now();

    this.map.update(dt);
    this.plane.update(dt);
    /** test **/
    for (var i=0; i<this.anotherPlanes.length; i++) {
        this.anotherPlanes[i].update(dt);
        this.anotherPlanes[i].rotate(1);
    }
    this.map.follow(this.plane.x, this.plane.y);
    this.map.putObject(this.plane);
};

Game.prototype.initPlayerControls = function () {
    var self = this;
    $(document).on('keydown', function (e) {
        if (-1 !== $.inArray(e.which, [87, 38])) {
            self.plane.accelerate();
        }
        if (-1 !== $.inArray(e.which, [83, 40])) {
            self.plane.slowDown();
        }
        if (-1 !== $.inArray(e.which, [65, 37])) {
            self.plane.rotate(-1);
        }
        if (-1 !== $.inArray(e.which, [68, 39])) {
            self.plane.rotate(1);
        }
    });
};
