var FuzzyTerm = require('./FuzzyTerm');
var FuzzyTrapezoidSet = require('./FuzzyTrapezoidSet');
var FuzzyRule = require('./FuzzyRule');

var set = new FuzzyTrapezoidSet("close", 10, 10, 30, 10);

set.setDOM(set.calculateDOM(33));

console.log(set);

var set2 = new FuzzyTrapezoidSet("ammo", 15, 15, 30, 15);
set2.setDOM(set2.calculateDOM(10));

console.log(set2);

var set3 = new FuzzyTrapezoidSet("desirable", 20, 100, 0);
console.log(set3);

var ant = new FuzzyTerm(set).fzAndWith(new FuzzyTerm(set2));
var con = new FuzzyTerm(set3);
var ant2 = new FuzzyTerm(set).fzOrWith(new FuzzyTerm(set2));

var rule = new FuzzyRule(ant, con);
var rule2 = new FuzzyRule(ant2, con);

console.log("raw : ")
console.log(rule);
console.log(rule2);
rule.calculate();
console.log("calculate 1 : ");
console.log(rule);
console.log(rule2);
rule2.calculate();
console.log("calculate 2 : ");
console.log(rule);
console.log(rule2);