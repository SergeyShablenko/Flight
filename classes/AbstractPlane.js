var AbstractPlane = function (name, hp, width, height, maxAcceleration, acceleration, rotationSpeed) {
    this.name = name;
    this.hp = hp;
    this.width = width;
    this.height = height;
    this.acceleration = acceleration;
    this.maxAcceleration = maxAcceleration;
    this.rotationMaxSpeed = rotationSpeed;
    this.rotationAcceleration = rotationSpeed;

    this.currentRotationAcceleration = 0;
    this.currentAcceleration = 0;
    this.currentSpeed = 0;
    this.direction = 0;
    this.weapon = [];
    this.x = 0;
    this.y = 0;
};

AbstractPlane.prototype.move = function (direction, dt) {

};