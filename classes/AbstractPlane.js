var AbstractPlane = function (name, hp, width, height, maxSpeed, acceleration, rotationSpeed) {
    this.name = name;
    this.hp = hp;
    this.width = width;
    this.height = height;
    this.maxSpeed = maxSpeed;
    this.acceleration = acceleration;
    this.rotationMaxSpeed = rotationSpeed;
    this.rotationAcceleration = rotationSpeed;

    this.currentAcceleration = 0;
    this.currentRotationAcceleration = 0;
    this.direction = 45;
    this.weapon = [];
    this.x = 0;
    this.y = 0;
};

AbstractPlane.prototype.move = function (direction) {

};