var FuzzyTriangleSet = require("./FuzzyTriangleSet");
var FuzzyLeftShoulderSet = require("./FuzzyLeftShoulderSet");
var FuzzyRightShoulderSet = require("./FuzzyRightShoulderSet");

module.exports = function(name) {
	var core = {
		_name : name,
		_memberSets : {},
		_minRange : 0.0,
		_maxRange : 0.0,
		adjustRanges : function(left, right) {
			if ( left < core._minRange) {core._minRange = left;}
			if ( right < core._maxRange) {core._maxRange = right};
		},
		addTriangleSet: function(setName, leftBound, peakPoint, rightBound) {
			var newSet = FuzzyTriangleSet(setName, peakPoint - leftBound, peakPoint, rightBound - peakPoint);
			core._memberSets[setName] = newSet;
			core.adjustRanges(leftBound, rightBound);
			return newSet;
		},
		addLeftShoulderSet : function(setName, leftBound, peakPoint, rightBound){
			var newSet = FuzzyLeftShoulderSet(setName, peakPoint - leftBound, peakPoint, rightBound - peakPoint);
			core._memberSets[setName] = newSet;
			core.adjustRanges(leftBound, rightBound);
			return newSet;
		},
		addRightShoulderSet : function(setName, leftBound, peakPoint, rightBound) {
			var newSet = FuzzyRightShoulderSet(setName, peakPoint - leftBound, peakPoint, rightBound - peakPoint);
			core._memberSets[setName] = newSet;
			core.adjustRanges(leftBound, rightBound);
			return newSet;
		},
		addRectangularSet : function(setName, leftBound, peakPoint, rightBound) {
			var newSet = FuzzyRectangularSet(setName, peakPoint - leftBound, peakPoint, rightBound - peakPoint);
			core._memberSets[setName] = newSet;
			core.adjustRanges(leftBound, rightBound);
			return newSet;
		},
		fuzzify: function(value) {
			for(key in core._memberSets) {
				core._memberSets[key].setDOM(core._memberSets[key].calculateDOM(value));
			}
		},
		deFuzzify : function(confidenceMap) { //maxAv method
			var sumOfConfidenceMultiplyRepValue = 0.0;
			var sumOfConfidence = 0.0;
			for(key in core._memberSets) {
				var confidence = confidenceMap[key];
				var repValue = core._memberSets[key]._repValue;
				sumOfConfidenceMultiplyRepValue += confidence*repValue;
				sumOfConfidence += confidence;
			}
			var crispValue = sumOfConfidenceMultiplyRepValue / sumOfConfidence;
			if(isNaN(crispValue)) {
				crispValue = 0.0;
			}
			return crispValue;
		}
	}
	return core;
}