var AbstractPlane = function (ctx, name, width, height, acceleration, rotationSpeed, slowingSpeed) {
    this.ctx = ctx;
    this.name = name;
    this.hp = 100;
    this.width = width;
    this.height = height;
    this.acceleration = acceleration;
    this.rotationSpeed = rotationSpeed;
    this.slowingSpeed = slowingSpeed;

    this.currentAcceleration = 0;
    this.currentSpeed = 0;
    this.movementDirection = 0.5;
    this.fireDirection = 0.5;
    this.weapon = [];
    this.x = Math.random() * 4000;
    this.y = Math.random() * 4000;

    this.speedX = 0;
    this.speedY = 0;
    this.wasDrawn = false;
};

AbstractPlane.prototype.update = function (dt) {
    this.wasDrawn = false;
    if (this.currentSpeed === 0) {
        return;
    }

    this.movementDirection = (this.movementDirection + this.fireDirection) / 2;
    this.speedX = this.currentSpeed * dt * Math.cos(this.movementDirection);
    this.speedY = this.currentSpeed * dt * Math.sin(this.movementDirection);
    this.x += this.speedX;
    this.y += this.speedY;
};

AbstractPlane.prototype.draw = function () {
    if (this.wasDrawn) {
        return;
    }

    var halfX = this.width / 2,
        halfY = this.height / 2,
        ctx = this.ctx;

    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.fireDirection);
    ctx.fillStyle = 'green';
    ctx.fillRect(-halfX, -halfY, this.width, this.height);
    ctx.restore();

    this.wasDrawn = true;
};

AbstractPlane.prototype.rotate = function (deg) {
    this.fireDirection += deg * 0.0174532925 * this.rotationSpeed;
};

AbstractPlane.prototype.accelerate = function () {
    this.currentAcceleration += this.acceleration;
    this.currentSpeed += this.currentAcceleration;
};

AbstractPlane.prototype.slowDown = function () {
    this.currentSpeed /= 2;
    this.movementDirection -= 3.14159265;
    this.fireDirection -= 3.14159265;
};