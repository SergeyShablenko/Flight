var Plane = function (name, hp, width, height, maxAcceleration, acceleration, rotationSpeed) {
    AbstractPlane.apply(this, arguments);
};

Plane.prototype = Object.create(AbstractPlane.prototype);

Plane.prototype.constructor = Plane;