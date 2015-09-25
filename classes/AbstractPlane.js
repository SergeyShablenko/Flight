var AbstractPlane = function (ctx, name, width, height, length, weight, acceleration, rotationSpeed, slowingSpeed) {
    this.ctx = ctx;
    this.name = name;
    this.hp = 100;
    this.width = width;
    this.height = height;
    this.length = length;
    this.weight = weight;
    this.acceleration = acceleration;
    this.rotationSpeed = rotationSpeed;
    this.slowingSpeed = slowingSpeed;

    this.aVector = 0;
    this.vVector = 0;
    this.gVector = 0;
    this.gDirection = 1.57079633;
    this.movementDirection = 0.5;
    this.fireDirection = 0.5;
    this.weapon = [];
    this.x = Math.random() * 4000;
    this.y = Math.random() * 4000;

    this.wasDrawn = false;
};

AbstractPlane.prototype.update = function (dt) {
    this.wasDrawn = false;

    this.movementDirection = (this.movementDirection + this.fireDirection) / 2;

    this.aVector = (this.aVector * this.weight - 0.0025 * this.vVector * this.vVector) / this.weight;
    if (this.aVector < 0) {
        this.aVector = 0;
    }

    this.vVector += this.aVector;
    this.gVector += 0.98;

    var dx = this.vVector * dt * Math.cos(this.movementDirection),
        dy = this.vVector * dt * Math.sin(this.movementDirection) + this.gVector * dt * Math.sin(this.gDirection);

    this.x += dx;
    this.y += dy;
};

AbstractPlane.prototype.draw = function () {
    if (this.wasDrawn) {
        return;
    }

    var halfX = this.length / 2,
        halfY = this.height / 2,
        ctx = this.ctx;

    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.fireDirection);
    ctx.fillStyle = 'green';
    ctx.fillRect(-halfX, -halfY, this.length, this.height);
    ctx.restore();

    this.wasDrawn = true;
};

AbstractPlane.prototype.rotate = function (deg) {
    this.fireDirection += deg * 0.0174532925 * this.rotationSpeed;
};

AbstractPlane.prototype.accelerate = function () {
    this.aVector += this.acceleration;
};

AbstractPlane.prototype.slowDown = function () {
    this.vVector /= 2;
    this.movementDirection -= 3.14159265;
    this.fireDirection -= 3.14159265;
};