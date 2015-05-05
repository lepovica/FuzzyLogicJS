var FuzzyTriangleSet = require("./FuzzyTriangleSet");
var FuzzyLeftShoulderSet = require("./FuzzyLeftShoulderSet");
var FuzzyRightShoulderSet = require("./FuzzyRightShoulderSet");
var FuzzyTrapezoidSet = require('./FuzzyTrapezoidSet');

module.exports = function FuzzyVariable(name) {
    this._name = name;
    this._memberSets = {};
    this._minRange = 0.0;
    this._maxRange = 0.0;
};
module.exports.prototype.adjustRanges = function(left, right) {
    if (left < this._minRange) {
        this._minRange = left;
    };
    if (right > this._maxRange) {
        this._maxRange = right;
    };
};
module.exports.prototype.addTriangleSet = function(setName, leftBound, peakPoint, rightBound) {
    this._memberSets[setName] = new FuzzyTriangleSet(setName, peakPoint - leftBound, peakPoint, rightBound - peakPoint);
    this.adjustRanges(leftBound, rightBound);
    return this._memberSets[setName];
};
module.exports.prototype.addLeftShoulderSet = function(setName, leftBound, peakPoint, rightBound) {

    this._memberSets[setName] = new FuzzyLeftShoulderSet(setName, peakPoint - leftBound, peakPoint, rightBound - peakPoint);
    this.adjustRanges(leftBound, rightBound);
    return this._memberSets[setName];
};
module.exports.prototype.addRightShoulderSet = function(setName, leftBound, peakPoint, rightBound) {
    this._memberSets[setName] = new FuzzyRightShoulderSet(setName, peakPoint - leftBound, peakPoint, rightBound - peakPoint);
    this.adjustRanges(leftBound, rightBound);
    return this._memberSets[setName];
};
module.exports.prototype.addTrapezoidSet = function(setName, leftBound, leftPeakPoint, rightPeakPoint, rightBound) {
    this._memberSets[setName] = new FuzzyTrapezoidSet(setName, leftPeakPoint - leftBound, leftPeakPoint, rightPeakPoint, rightBound - rightPeakPoint);
    this.adjustRanges(leftBound, rightBound);
    return this._memberSets[setName];
};
module.exports.prototype.fuzzify = function(value) {
    for (key in this._memberSets) {
        this._memberSets[key].setDOM(this._memberSets[key].calculateDOM(value));
    }
};
module.exports.prototype.deFuzzify = function(confidenceMap) { //maxAv method
    var sumOfConfidenceMultiplyRepValue = 0.0;
    var sumOfConfidence = 0.0;
    for (key in this._memberSets) {
        var confidence = confidenceMap[key];
        var repValue = this._memberSets[key]._repValue;
        sumOfConfidenceMultiplyRepValue += (confidence * repValue);
        sumOfConfidence += confidence;
    }
    var crispValue = (sumOfConfidenceMultiplyRepValue / sumOfConfidence);
    if (isNaN(crispValue)) {
        crispValue = 0.0;
    }
    return crispValue;
};