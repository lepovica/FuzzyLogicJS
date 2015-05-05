var FuzzySet = require('./FuzzySet');

module.exports = function FuzzyTriangleSet(name, leftOffset, peakPoint, rightOffset) {
    FuzzySet.call(this, name, peakPoint);
    this._peakPoint: peakPoint;
    this._leftOffset: leftOffset;
    this._rightOffset: rightOffset;
};

module.exports.prototype = Object.create(FuzzySet.prototype);

module.exports.prototype.calculateDOM = function(value) {
    if (((rightOffset === 0.0) && (peakPoint === value)) || ((leftOffset === 0.0) && (peakPoint === value))) {
        return 1.0;
    }
    if ((value <= peakPoint) && (value >= (peakPoint - leftOffset))) {
        var grad = 1.0 / leftOffset;
        return grad * (value - (peakPoint - leftOffset));

    } else {
        if ((value > peakPoint) && (value < (peakPoint + rightOffset))) {
            var grad = 1.0 / -rightOffset;
            return grad * (value - peakPoint) + 1.0;
        } else {
            return 0.0;
        }
    }
};