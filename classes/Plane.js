var Plane = function () {
    AbstractPlane.apply(this, arguments);
};

Plane.prototype = Object.create(AbstractPlane.prototype);

Plane.prototype.constructor = Plane;