var FuzzySet = require('./FuzzySet');

module.exports = function FuzzyRightShoulderSet(name, leftOffset, peakPoint, rightOffset) {
    FuzzySet.call(this, name, (((peakPoint + rightOffset) + peakPoint) / 2));
    this._peakPoint = peakPoint;
    this._leftOffset = leftOffset;
    this._rightOffset = rightOffset;
};

module.exports.prototype = Object.create(FuzzySet.prototype);

module.exports.prototype.calculateDOM = function(value) {
    if ((this._leftOffset === 0.0) && (value === this._peakPoint)) {
        return 1.0;
    }
    if ((value <= this._peakPoint) && (value > (this._peakPoint - this._leftOffset))) {
        var grad = 1.0 / this._leftOffset;
        return grad * (value - (this._peakPoint - this._leftOffset));
    } else {
        if (value > this._peakPoint) {
            return 1.0;
        } else {
            return 0.0;
        }
    }
};