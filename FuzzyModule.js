var FuzzyTriangleSet = require("./FuzzyTriangleSet");
var FuzzyLeftShoulderSet = require("./FuzzyLeftShoulderSet");
var FuzzyRightShoulderSet = require("./FuzzyRightShoulderSet");
var FuzzyVariable = require("./FuzzyVariable");
var FuzzyRule = require("./FuzzyRule");
var FuzzyTerm = require("./FuzzyTerm");
var FzAND = require("./FzAND");
var FzOR = require("./FzOR");

module.exports = function() {
	var core = {
		_varMap : {},
		_fuzzyRules : [],
		createFLV : function(variableName) {
			var newVar = FuzzyVariable(variableName);
			core._varMap[variableName] = newVar;
			return newVar;
		},
		addRule : function(antecedent, consequence) {
			// console.log("antecedent", antecedent)
			var newRule = FuzzyRule(antecedent, consequence);
			core._fuzzyRules.push(newRule);
			return newRule;
		},
		fuzzify : function(nameOfFLV, crispValue) {
			var flv = core._varMap[nameOfFLV];
			flv.fuzzify(crispValue);
		},
		_setConfidenceOfConsequentsToZero : function() {
			for(var i = 0; i < core._fuzzyRules.length; i++) {
				core._fuzzyRules[i].setConfidenceOfConsequentToZero();
			}
		},
		deFuzzify : function(nameOfFLV) {
			var confidenceMap = {};
			var flv = core._varMap[nameOfFLV];

			core._setConfidenceOfConsequentsToZero();

			var rules = core._fuzzyRules;
			for(var i = 0; i < rules.length; i++) {
				rules[i].calculate();
			}
			for(key in flv._memberSets) {
				for(var j = 0; j < rules.length; j++) {
					if( (rules[j]._con.getName() === key)) {
						// if ( flv._memberSets[key].getDOM() > rules[j]._con.getDOM()) {
						// 	flv._memberSets[key].setDOM(rules[j]._con.getDOM());
						// }
						// confidenceMap[key] = flv._memberSets[key].getDOM()
						confidenceMap[key] = rules[j]._con.getDOM();
					}
				}
			}
			return flv.deFuzzify(confidenceMap);
		}
	}
	return core;
}