var AbstractPlane = function (ctx, name, width, height, length, weight, engineForce, rotationSpeed) {
    this.ctx = ctx;
    this.name = name;
    this.hp = 100;
    this.width = width;
    this.height = height;
    this.length = length;
    this.s = this.width * this.height * this.length / 10;
    this.weight = weight;
    this.maxEngineForce = engineForce;
    this.maxAcceleration = engineForce / this.weight;
    this.increaseForceStep = this.maxEngineForce / 50;
    this.rotationSpeed = rotationSpeed;

    this.aVector = {x: 0, y: 0};
    this.vVector = {x: 0, y: 0};
    this.gVector = 0;

    this.movementDirection = 0;
    this.fireDirection = 0;

    this.engineForce = 0;
    this.acceleration = this.engineForce / this.weight;

    this.weapon = [];
    this.x = Math.random() * 4000;
    this.y = Math.random() * 4000;

    this.wasDrawn = false;
    this.engineStarted = false;
};

AbstractPlane.prototype.update = function (dt) {
    this.wasDrawn = false;

    this.movementDirection = (this.movementDirection + this.fireDirection) / 2;
    if (this.acceleration > 0) {
        this.aVector.x = Math.abs(this.acceleration * Math.cos(this.movementDirection));
        this.aVector.y = Math.abs(this.acceleration * Math.sin(this.movementDirection));
    }

    this.aVector.x += -1 * this.aVector.x.sign() * 0.025 * this.vVector.x * this.vVector.x / this.weight;
    this.aVector.y += -1 * this.aVector.y.sign() * 0.025 * this.vVector.y * this.vVector.y / this.weight;

    this.vVector.x += this.aVector.x;
    this.vVector.y += this.aVector.y;

    if (this.vVector.x < 0) {
        this.vVector.x = 0;
    }
    if (this.vVector.y < 0) {
        this.vVector.y = 0;
    }

    var g = 0.98 - Math.abs(0.22 * Math.sqrt(Math.pow(this.vVector.x, 2) + Math.pow(this.vVector.y + this.gVector, 2)) * this.s * Math.cos(this.fireDirection)) / this.weight;

    this.gVector += g + this.aVector.y * Math.sin(this.movementDirection);

    if (this.gVector < 0) {
        this.gVector = 0;
    }

    this.x += this.vVector.x * dt * Math.cos(this.movementDirection);
    this.y += this.vVector.y * dt * Math.sin(this.movementDirection) + this.gVector * dt;
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
    if (!this.engineStarted) {
        return;
    }
    this.engineForce += this.increaseForceStep;
    if (this.engineForce > this.maxEngineForce) {
        this.engineForce = this.maxEngineForce;
    }
    this.acceleration = this.engineForce / this.weight;
};

AbstractPlane.prototype.stopEngine = function () {
    this.engineStarted = false;
    this.engineForce = 0;
    this.acceleration = 0;
};

AbstractPlane.prototype.startEngine = function () {
    this.engineStarted = true;
};

AbstractPlane.prototype.slowDown = function () {
    if (!this.engineStarted) {
        return;
    }
    this.engineForce -= this.increaseForceStep;
    if (this.engineForce < 0) {
        this.engineForce = 0;
    }
    this.acceleration = this.engineForce / this.weight;
};