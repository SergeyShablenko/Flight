Array.prototype.pushIfNotExit = function (value) {
    if (-1 === $.inArray(value, this)) {
        this.push(value);
    }

    return this;
};