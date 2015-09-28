var Map = function (ctx, options) {
    this.ctx = ctx;
    this.options = $.extend({}, this.DEFAULT_OPTIONS, options);

    this.grid = [];
    this.offset = {x: 0, y: 0};
    this.rpf = parseInt(this.options.screenWidth / this.options.gridSize);
    this.cpf = parseInt(this.options.screenHeight / this.options.gridSize);
    this.init();
};

Map.prototype.DEFAULT_OPTIONS = {
    screenWidth: 1024,
    screenHeight: 768,
    mapWidth: 10000,
    mapHeight: 10000,
    gridSize: 100,
    translationSteps: 10
};

Map.prototype.init = function () {
    this.createGrid();
};

Map.prototype.draw = function () {
    var startRow = parseInt(-this.offset.x / this.options.gridSize),
        startCol = parseInt(-this.offset.y / this.options.gridSize),
        stopRow = startRow + this.rpf + 2,
        stopCol = startCol + this.cpf + 2,
        ctx = this.ctx;

    ctx.fillStyle = '#F0F0F0';
    ctx.fillRect(0, 0, this.options.mapWidth, this.options.mapHeight);
    ctx.strokeStyle = '#989898';
    ctx.lineWidth = 1;

    for (var i=startRow; i<stopRow && i<this.grid.length; i++) {
        for (var j=startCol; j<stopCol && j<this.grid[0].length; j++) {
            ctx.strokeRect(this.grid[i][j].x, this.grid[i][j].y, this.grid[i][j].size, this.grid[i][j].size);
        }
    }
};

Map.prototype.update = function () {

};

Map.prototype.createGrid = function () {
    var rows = this.options.mapHeight / this.options.gridSize,
        cols = this.options.mapWidth / this.options.gridSize;

    for (var i=0; i<rows; i++) {
        this.grid.push([]);
        for (var j=0; j<cols; j++) {
            this.grid[i].push({
                x: i * this.options.gridSize,
                y: j * this.options.gridSize,
                size: this.options.gridSize,
                objects: {}
            });
        }
    }
};

Map.prototype.translate = function (dx, dy) {
    var offset = {
        x: dx,
        y: dy
    };

    if(this.offset.x + dx > 0) {
        offset.x = dx - (this.offset.x + dx);
    }
    if(Math.abs(this.offset.x + dx) + this.options.screenWidth > this.options.mapWidth) {
        offset.x = - this.offset.x - (this.options.mapWidth - this.options.screenWidth);
    }
    if(this.offset.y + dy > 0) {
        offset.y = dy - (this.offset.y + dy);
    }
    if(Math.abs(this.offset.y + dy) + this.options.screenHeight > this.options.mapHeight) {
        offset.y = -this.offset.y - (this.options.mapHeight - this.options.screenHeight);
    }

    this.offset.x += offset.x;
    this.offset.y += offset.y;

    this.ctx.translate(offset.x, offset.y);
};

Map.prototype.follow = function (x, y) {
    var dx = x + this.offset.x - this.options.screenWidth / 2,
        dy = y + this.offset.y - this.options.screenHeight / 2;

    this.translate(-dx, -dy);
};

Map.prototype.getDrawingInterval = function () {
    return {
        x: Math.abs(this.offset.x),
        y: Math.abs(this.offset.y),
        x1: Math.abs(this.offset.x) + (this.rpf + 2) * this.options.gridSize,
        y1: Math.abs(this.offset.y) + (this.cpf + 2) * this.options.gridSize
    };
};

