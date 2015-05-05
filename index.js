var FuzzySet = require('./FuzzySet.js');

var set = new FuzzySet(59);
console.log(set);
console.log(set.getRepValue());
set.setDOM(10);
console.log(set.getDOM());
set.ORwithDOM(20);
console.log(set.getDOM());