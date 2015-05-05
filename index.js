var FuzzyTerm = require('./FuzzyTerm');
var FuzzyTriangleSet = require('./FuzzyTriangleSet');
var FuzzyRule = require('./FuzzyRule');

var set = new FuzzyTriangleSet("close", 20, 50, 30);

set.setDOM(set.calculateDOM(39));

console.log(set);