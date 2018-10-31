var Grid = function() {
    this.beatsPerMeter = 4;
    this.canvas = document.getElementById('canvas-grid');
    this.context = this.canvas.getContext("2d");
    this.measureCounter = document.getElementById("measure-counter-canvas");
    this.measureCounterContext = this.measureCounter.getContext("2d");
};

Grid.prototype.drawGrid = function(cellWidth, cellBeatLength) {

    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.cellWidth = cellWidth || this.width / 16;
    this.cellHeight = this.height / 32;
    this.cellBeatLength = cellBeatLength || 1;
    this.context.lineWidth = 0;
    var numCells = this.width / this.cellWidth;
    var numRows = this.height / this.cellHeight;
    var cellsInMeasure = this.beatsPerMeter / this.cellBeatLength;

    for(var i = 0; i < numCells; i++) {
        if(i % cellsInMeasure == 0) {
            this.context.strokeStyle = '#000';
        }
        else {
            this.context.strokeStyle = '#6E6E6E';
        }
        this.context.beginPath();
        this.context.moveTo(i * this.cellWidth, 0);
        this.context.lineTo(i * this.cellWidth, this.height);
        this.context.stroke();

        this.context.fillStyle = '#000';
        this.measureCounterContext.fillText(i + 1, i * this.cellWidth + this.cellWidth / 2, 12);
    }

    for(var j = 0; j < numRows; j++) {
        this.context.strokeStyle = '#6E6E6E';
        this.context.beginPath();
        this.context.moveTo(0, j * this.cellHeight);
        this.context.lineTo(this.width, j * this.cellHeight);
        this.context.stroke();
    }
};

var initialize = function() {
    var counterHeight = document.getElementById('measure-counter').clientHeight;
    var height = window.innerHeight - 40 - counterHeight - 20;
    document.getElementById('grid-container').style.height = height + "px";
    this.grid = new Grid();
    this.grid.drawGrid(100, 1);
};