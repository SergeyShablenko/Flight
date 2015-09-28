var AbstractPlane = function (ctx, name, width, height, length, weight, engineForce, rotationSpeed) {
    this.ctx = ctx;
    this.name = name;
    this.hp = 100;
    this.width = width;
    this.height = height;
    this.length = length;
    this.s = this.width * this.height * this.length;
    this.weight = weight;
    this.engineForce = engineForce;
    this.acceleration = this.engineForce / this.weight;
    this.rotationSpeed = rotationSpeed;

    this.aVector = {x: 0, y: 0};
    this.vVector = {x: 0, y: 0};

    this.gVector = 0;
    this.gDirection = 1.57079633;
    this.movementDirection = 0;
    this.fireDirection = 0;
    this.weapon = [];
    this.x = Math.random() * 4000;
    this.y = Math.random() * 4000;

    this.wasDrawn = false;
    this.engineStarted = false;
};

AbstractPlane.prototype.update = function (dt) {
    this.wasDrawn = false;

    this.movementDirection = (this.movementDirection + this.fireDirection) / 2;

    if (this.engineStarted === false) {
        this.aVector.x = -0.025 * this.vVector.x * this.vVector.x / this.weight;
        this.aVector.y = -0.025 * this.vVector.y * this.vVector.y / this.weight;
    }

    var p = Math.abs(0.22 * this.vVector.x * this.s * Math.cos(this.fireDirection)),
        currentG = 9.8 - p;

    if (currentG >= 0) {
        this.gVector += currentG;
    }

    this.vVector.x += this.aVector.x;
    this.vVector.y += this.aVector.y;

    if (this.vVector.x < 0) {
        this.vVector.x = 0;
    }

    this.x += this.vVector.x * dt * Math.cos(this.movementDirection);
    this.y += this.vVector.y * dt * Math.sin(this.movementDirection) + this.gVector * dt;
    
    this.gVector += this.aVector.y * Math.sin(this.movementDirection);
    if (this.gVector < 0) {
        this.gVector = 0;
    }
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
    this.engineStarted = true;
    this.aVector.x = this.acceleration;
    this.aVector.y = this.acceleration;
};

AbstractPlane.prototype.stopEngine = function () {
    this.engineStarted = false;
};

AbstractPlane.prototype.slowDown = function () {
    this.vVector.x /= 2;
    this.vVector.y /= 2;
};