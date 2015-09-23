var AbstractPlane = function (ctx, name, width, height, acceleration, rotationSpeed) {
    this.ctx = ctx;
    this.name = name;
    this.hp = 100;
    this.width = width;
    this.height = height;
    this.acceleration = acceleration;
    this.rotationMaxSpeed = rotationSpeed;
    this.rotationAcceleration = rotationSpeed;

    this.currentRotationAcceleration = 0;
    this.currentAcceleration = 0;
    this.currentSpeed = 0;
    this.movementDirection = 0;
    this.fireDirection = 0;
    this.weapon = [];
    this.x = 0;
    this.y = 0;
};

AbstractPlane.prototype.update = function (dt) {
    if (this.currentSpeed === 0) {
        return;
    }

    this.movementDirection = (this.movementDirection + this.fireDirection) / 2;
    this.x += this.currentSpeed * dt * Math.cos(this.movementDirection);
    this.y += this.currentSpeed * dt * Math.sin(this.movementDirection);
};

AbstractPlane.prototype.draw = function () {
    var halfX = this.width / 2,
        halfY = this.height / 2,
        ctx = this.ctx;

    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.fireDirection);
    ctx.fillStyle = 'green';
    ctx.fillRect(-halfX, halfY, this.width, this.height);
    ctx.restore();
};

AbstractPlane.prototype.rotate = function (deg) {
    this.fireDirection += deg * 0.0174532925;
};

AbstractPlane.prototype.accelerate = function () {
    this.currentAcceleration += this.acceleration;
    this.currentSpeed += this.currentAcceleration;
};