var FuzzyVariable = require('./FuzzyVariable');

var fzvar = new FuzzyVariable("distance");

fzvar.addLeftShoulderSet("close", 0, 20, 50);
fzvar.addTriangleSet("average", 20, 50, 70);
fzvar.addRightShoulderSet("far", 50, 70, 100);
fzvar.fuzzify(55);
console.log(fzvar);