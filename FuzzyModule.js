var FuzzyTriangleSet = require("./FuzzyTriangleSet");
var FuzzyLeftShoulderSet = require("./FuzzyLeftShoulderSet");
var FuzzyRightShoulderSet = require("./FuzzyRightShoulderSet");
var FuzzyTrapezoidSet = require("./FuzzyTrapezoidSet");
var FuzzyVariable = require("./FuzzyVariable");
var FuzzyRule = require("./FuzzyRule");
var FuzzyTerm = require("./FuzzyTerm");


module.exports = function FuzzyModule() {
    this._varMap = {};
    this._fuzzyRules = [];
};
module.exports.prototype.createFLV = function(variableName) {
    this._varMap[variableName] = new FuzzyVariable(variableName);
    return this._varMap[variableName];
};
module.exports.prototype.getFLV = function(variableName) {
    var result = this._varMap[variableName];
    if (result) {
        return result;
    } else {
        console.log("This is a new FuzzyVariable (FLV) .");
        return this.createFLV(variableName);
    }
}
module.exports.prototype.makeNewFuzzyTerm = function(fuzzySet) {
    return new FuzzyTerm(fuzzySet);
};
module.exports.prototype.addRule = function(antecedent, consequence) {
    // console.log("antecedent", antecedent)
    var newRule = new FuzzyRule(antecedent, consequence);
    this._fuzzyRules.push(newRule);
    return newRule;
};
module.exports.prototype.fuzzify = function(nameOfFLV, crispValue) {
    var flv = this.getFLV(nameOfFLV);
    flv.fuzzify(crispValue);
};
module.exports.prototype._setConfidenceOfConsequentsToZero = function() {
    for (var i = 0; i < this._fuzzyRules.length; i++) {
        this._fuzzyRules[i].setConfidenceOfConsequentToZero();
    }
};
module.exports.prototype.deFuzzify = function(nameOfFLV) {
    var confidenceMap = {};
    var flv = this.getFLV(nameOfFLV);

    this._setConfidenceOfConsequentsToZero();

    var rules = this._fuzzyRules;
    for (var i = 0; i < rules.length; i++) {
        rules[i].calculate();
    }
    for (key in flv._memberSets) {
        for (var j = 0; j < rules.length; j++) {
            if ((rules[j]._con.getName() === key)) {
                // if ( flv._memberSets[key].getDOM() > rules[j]._con.getDOM()) {
                // 	flv._memberSets[key].setDOM(rules[j]._con.getDOM());
                // }
                // confidenceMap[key] = flv._memberSets[key].getDOM()
                confidenceMap[key] = rules[j]._con.getDOM();
            }
        }
    }
    return flv.deFuzzify(confidenceMap);
};