var FuzzySet = require('./FuzzySet');

module.exports = function FuzzyTrapezoidSet(name, leftOffset, leftPeakPoint, rightPeakPoint, rightOffset) {
    FuzzySet.call(this, name, (((leftPeakPoint + leftOffset) + leftPeakPoint) / 2));
    this._leftPeakPoint = leftPeakPoint;
    this._rightPeakPoint = rightPeakPoint;
    this._leftOffset = leftOffset;
    this._rightOffset = rightOffset;
};

module.exports.prototype = Object.create(FuzzySet.prototype);

module.exports.prototype.calculateDOM = function(value) {
    if ((this._leftOffset === 0.0) && (value === this._leftPeakPoint)) {
        return 1.0;
    }
    if ((value <= this._leftPeakPoint) && (value > (this._leftPeakPoint - this._leftOffset))) {
        var grad = 1.0 / this._leftOffset;
        return grad * (value - (this._leftPeakPoint - this._leftOffset));
    } else {
        if ((value > this._leftPeakPoint) && (value < this._rightPeakPoint)) {
            return 1.0;
        } else {
            if ((this._rightOffset === 0.0) && (value === this._rightPeakPoint)) {
                return 1.0;
            }
            if ((value >= this._rightPeakPoint) && (value < (this._rightPeakPoint + this._rightOffset))) {
                var grad = 1.0 / -this._rightOffset;
                return grad * (value - this._rightPeakPoint) + 1.0;
            } else {
                if (value < this._rightPeakPoint) {
                    return 1.0;
                } else {
                    return 0.0;
                }
            }
        }
    }
};