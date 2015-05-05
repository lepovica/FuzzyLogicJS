var FuzzySet = require('./FuzzySet');

module.exports = function FuzzyLeftShoulderSet(name, leftOffset, peakPoint, rightOffset) {
    FuzzySet.call(this, name, (((peakPoint - leftOffset) + peakPoint) / 2));
    this._peakPoint = peakPoint;
    this._leftOffset = leftOffset;
    this._rightOffset = rightOffset;
};

module.exports.prototype = Object.create(FuzzySet.prototype);

module.exports.prototype.calculateDOM = function(value) {
    if ((this._rightOffset === 0.0) && (value === this._peakPoint)) {
        return 1.0;
    }
    if ((value >= this._peakPoint) && (value < (this._peakPoint + this._rightOffset))) {
        var grad = 1.0 / -this._rightOffset;
        return grad * (value - this._peakPoint) + 1.0;
    } else {
        if (value < this._peakPoint) {
            return 1.0;
        } else {
            return 0.0;
        }
    }
};